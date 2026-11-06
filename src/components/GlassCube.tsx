import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollInfo } from '../types';

interface GlassCubeProps {
  scrollRef: React.MutableRefObject<ScrollInfo>;
  prefersReducedMotion: boolean;
  onDragStateChange?: (isDragging: boolean) => void;
  resetTrigger?: number;
  onResetComplete?: () => void;
}

export const GlassCube: React.FC<GlassCubeProps> = ({
  scrollRef,
  prefersReducedMotion,
  onDragStateChange,
  resetTrigger,
  onResetComplete,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { camera, viewport, gl } = useThree();

  // ホバー状態
  const [hovered, setHovered] = useState(false);

  // ドラッグ状態
  const isDragging = useRef(false);
  const dragPlane = useMemo(() => new THREE.Plane(), []);
  const dragOffset = useRef(new THREE.Vector3());
  const planeIntersectPoint = useMemo(() => new THREE.Vector3(), []);
  const dragVelocity = useRef(new THREE.Vector3());
  const lastDragPos = useRef(new THREE.Vector3());

  // 物理シミュレーション用変数
  const basePosition = useRef(new THREE.Vector3(0, 0, 0));
  const dragDisplacement = useRef(new THREE.Vector3(0, 0, 0));
  const dragDisplacementVelocity = useRef(new THREE.Vector3(0, 0, 0));

  // スクロール揺れ物理（ばね・減衰）
  const scrollSway = useRef(new THREE.Vector3(0, 0, 0));
  const scrollSwayVelocity = useRef(new THREE.Vector3(0, 0, 0));
  const scrollRotationSway = useRef(new THREE.Vector3(0, 0, 0));
  const scrollRotationVelocity = useRef(new THREE.Vector3(0, 0, 0));

  // 時間トラッキング
  const clockTime = useRef(0);

  // リセット命令の検知
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      dragDisplacementVelocity.current.set(0, 0, 0);
      scrollSwayVelocity.current.set(0, 0, 0);
      scrollRotationVelocity.current.set(0, 0, 0);
      onResetComplete?.();
    }
  }, [resetTrigger, onResetComplete]);

  // カーソル制御
  useEffect(() => {
    const canvas = gl.domElement;
    if (isDragging.current) {
      canvas.style.cursor = 'grabbing';
      document.body.style.cursor = 'grabbing';
    } else if (hovered) {
      canvas.style.cursor = 'grab';
      document.body.style.cursor = 'default';
    } else {
      canvas.style.cursor = 'default';
      document.body.style.cursor = 'default';
    }
  }, [hovered, gl]);

  // ポインターダウン (ドラッグ開始)
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!meshRef.current) return;

    const domTarget = e.nativeEvent.target as HTMLElement;
    if (domTarget && domTarget.setPointerCapture) {
      try {
        domTarget.setPointerCapture(e.pointerId);
      } catch (err) {}
    }

    isDragging.current = true;
    onDragStateChange?.(true);

    // カメラ対向仮想平面
    const cubeWorldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(cubeWorldPos);

    const normal = new THREE.Vector3();
    camera.getWorldDirection(normal);
    normal.negate();
    dragPlane.setFromNormalAndCoplanarPoint(normal, cubeWorldPos);

    if (e.ray.intersectPlane(dragPlane, planeIntersectPoint)) {
      // つかんだ位置のオフセットを保持
      dragOffset.current.copy(meshRef.current.position).sub(planeIntersectPoint);
      lastDragPos.current.copy(meshRef.current.position);
      dragVelocity.current.set(0, 0, 0);
    }
  };

  // ポインタームーブ (ドラッグ中)
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current || !meshRef.current) return;
    e.stopPropagation();

    if (e.ray.intersectPlane(dragPlane, planeIntersectPoint)) {
      const targetPos = new THREE.Vector3()
        .copy(planeIntersectPoint)
        .add(dragOffset.current);

      // 移動範囲を画面（ビューポート）内にクランプ
      const xBound = Math.max(viewport.width * 0.45, 1.2);
      const yBound = Math.max(viewport.height * 0.42, 1.2);

      targetPos.x = THREE.MathUtils.clamp(targetPos.x, -xBound, xBound);
      targetPos.y = THREE.MathUtils.clamp(targetPos.y, -yBound, yBound);

      dragDisplacement.current.x = targetPos.x - basePosition.current.x;
      dragDisplacement.current.y = targetPos.y - basePosition.current.y;
    }
  };

  // ドラッグ終了処理
  const endDrag = (e?: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current) return;
    if (e) {
      e.stopPropagation();
      const domTarget = e.nativeEvent.target as HTMLElement;
      if (domTarget && domTarget.releasePointerCapture) {
        try {
          domTarget.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }
    }

    isDragging.current = false;
    onDragStateChange?.(false);

    dragDisplacementVelocity.current.copy(dragVelocity.current).multiplyScalar(0.4);
    dragDisplacementVelocity.current.clampLength(0, 8.0);
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => endDrag(e);
  const handlePointerCancel = (e: ThreeEvent<PointerEvent>) => endDrag(e);

  // 毎フレームの更新（アニメーション & 物理シミュレーション）
  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    const dt = Math.min(delta, 0.05);
    clockTime.current += dt;

    const isMobile = viewport.width < 5.5;
    const { progress, velocity } = scrollRef.current;

    // 5セクションに応じた基本配置（basePosition）と回転（baseRotation）の補間
    // 1. Hero: progress 0.0 ~ 0.20
    // 2. Works: progress 0.20 ~ 0.45
    // 3. Material: progress 0.45 ~ 0.70
    // 4. About: progress 0.70 ~ 0.85
    // 5. Contact / Playground: progress 0.85 ~ 1.0
    let targetBaseX = 0;
    let targetBaseY = 0;
    let targetBaseZ = 0;
    let targetRotX = 0.2;
    let targetRotY = 0.35;
    let targetRotZ = 0.05;

    if (progress <= 0.22) {
      // Hero セクション
      const t = progress / 0.22;
      targetBaseX = THREE.MathUtils.lerp(0, isMobile ? 0 : 2.0, t);
      targetBaseY = THREE.MathUtils.lerp(0, isMobile ? -0.6 : 0.4, t);
      targetBaseZ = THREE.MathUtils.lerp(0, -0.6, t);
      targetRotX = THREE.MathUtils.lerp(0.2, 0.35, t);
      targetRotY = THREE.MathUtils.lerp(0.35, 0.9, t);
    } else if (progress <= 0.48) {
      // Works セクション -> Material セクションへ遷移
      const t = (progress - 0.22) / 0.26;
      targetBaseX = THREE.MathUtils.lerp(isMobile ? 0 : 2.0, isMobile ? 0 : 1.7, t);
      targetBaseY = THREE.MathUtils.lerp(isMobile ? -0.6 : 0.4, isMobile ? -0.3 : 0.0, t);
      targetBaseZ = THREE.MathUtils.lerp(-0.6, 0.0, t);
      targetRotX = THREE.MathUtils.lerp(0.35, 0.45, t);
      targetRotY = THREE.MathUtils.lerp(0.9, 1.35, t);
    } else if (progress <= 0.72) {
      // Material セクション -> About セクションへ遷移
      const t = (progress - 0.48) / 0.24;
      targetBaseX = THREE.MathUtils.lerp(isMobile ? 0 : 1.7, isMobile ? 0 : -1.8, t);
      targetBaseY = THREE.MathUtils.lerp(isMobile ? -0.3 : 0.0, isMobile ? -0.5 : 0.3, t);
      targetBaseZ = THREE.MathUtils.lerp(0.0, -0.5, t);
      targetRotX = THREE.MathUtils.lerp(0.45, 0.25, t);
      targetRotY = THREE.MathUtils.lerp(1.35, 0.75, t);
    } else if (progress <= 0.88) {
      // About セクション -> Playground / Contact へ遷移
      const t = (progress - 0.72) / 0.16;
      targetBaseX = THREE.MathUtils.lerp(isMobile ? 0 : -1.8, 0, t);
      targetBaseY = THREE.MathUtils.lerp(isMobile ? -0.5 : 0.3, 0.1, t);
      targetBaseZ = THREE.MathUtils.lerp(-0.5, 0.1, t);
      targetRotX = THREE.MathUtils.lerp(0.25, 0.18, t);
      targetRotY = THREE.MathUtils.lerp(0.75, 0.5, t);
    } else {
      // Playground & Contact (最後)
      targetBaseX = 0;
      targetBaseY = 0.1;
      targetBaseZ = 0.1;
      targetRotX = 0.18;
      targetRotY = 0.5;
    }

    basePosition.current.x = THREE.MathUtils.lerp(basePosition.current.x, targetBaseX, 0.08);
    basePosition.current.y = THREE.MathUtils.lerp(basePosition.current.y, targetBaseY, 0.08);
    basePosition.current.z = THREE.MathUtils.lerp(basePosition.current.z, targetBaseZ, 0.08);

    // 待機時の浮遊・微回転
    let idleFloatY = 0;
    let idleRotX = 0;
    let idleRotY = 0;
    if (!prefersReducedMotion) {
      idleFloatY = Math.sin(clockTime.current * 0.9) * 0.07;
      idleRotX = Math.sin(clockTime.current * 0.5) * 0.035;
      idleRotY = clockTime.current * 0.055;
    }

    // スクロール揺れ物理（ばね・減衰）
    if (!prefersReducedMotion) {
      const scrollForceY = -velocity * 0.00045;
      const scrollForceRotX = velocity * 0.0004;

      const springK = 38.0;
      const dampingC = 7.5;
      const accelY = -springK * scrollSway.current.y - dampingC * scrollSwayVelocity.current.y + scrollForceY;
      scrollSwayVelocity.current.y += accelY * dt;
      scrollSway.current.y += scrollSwayVelocity.current.y * dt;
      scrollSway.current.y = THREE.MathUtils.clamp(scrollSway.current.y, -0.6, 0.6);

      const rotSpringK = 32.0;
      const rotDampingC = 6.8;
      const accelRotX = -rotSpringK * scrollRotationSway.current.x - rotDampingC * scrollRotationVelocity.current.x + scrollForceRotX;
      scrollRotationVelocity.current.x += accelRotX * dt;
      scrollRotationSway.current.x += scrollRotationVelocity.current.x * dt;
      scrollRotationSway.current.x = THREE.MathUtils.clamp(scrollRotationSway.current.x, -0.4, 0.4);
    }

    // ドラッグ時の挙動 & 離したときの復元
    if (isDragging.current) {
      const currentPos = new THREE.Vector3(
        basePosition.current.x + dragDisplacement.current.x,
        basePosition.current.y + dragDisplacement.current.y,
        0
      );
      dragVelocity.current.subVectors(currentPos, lastDragPos.current).divideScalar(dt);
      lastDragPos.current.copy(currentPos);
    } else {
      const returnSpringK = 18.0;
      const returnDampingC = 5.2;

      const accelX = -returnSpringK * dragDisplacement.current.x - returnDampingC * dragDisplacementVelocity.current.x;
      dragDisplacementVelocity.current.x += accelX * dt;
      dragDisplacement.current.x += dragDisplacementVelocity.current.x * dt;

      const accelY = -returnSpringK * dragDisplacement.current.y - returnDampingC * dragDisplacementVelocity.current.y;
      dragDisplacementVelocity.current.y += accelY * dt;
      dragDisplacement.current.y += dragDisplacementVelocity.current.y * dt;

      if (
        Math.abs(dragDisplacement.current.x) < 0.001 &&
        Math.abs(dragDisplacementVelocity.current.x) < 0.001
      ) {
        dragDisplacement.current.x = 0;
        dragDisplacementVelocity.current.x = 0;
      }
      if (
        Math.abs(dragDisplacement.current.y) < 0.001 &&
        Math.abs(dragDisplacementVelocity.current.y) < 0.001
      ) {
        dragDisplacement.current.y = 0;
        dragDisplacementVelocity.current.y = 0;
      }
    }

    const tiltZ = THREE.MathUtils.clamp(-dragVelocity.current.x * 0.035, -0.3, 0.3);
    const tiltX = THREE.MathUtils.clamp(dragVelocity.current.y * 0.035, -0.3, 0.3);

    meshRef.current.position.x = basePosition.current.x + dragDisplacement.current.x;
    meshRef.current.position.y =
      basePosition.current.y +
      dragDisplacement.current.y +
      idleFloatY +
      scrollSway.current.y;
    meshRef.current.position.z = basePosition.current.z;

    meshRef.current.rotation.x =
      targetRotX + idleRotX + scrollRotationSway.current.x + tiltX;
    meshRef.current.rotation.y = targetRotY + idleRotY;
    meshRef.current.rotation.z = targetRotZ + tiltZ;

    if (materialRef.current) {
      const targetRoughness = hovered ? 0.025 : 0.045;
      materialRef.current.roughness = THREE.MathUtils.lerp(
        materialRef.current.roughness,
        targetRoughness,
        0.1
      );
    }
  });

  const isMobile = viewport.width < 5.5;
  const cubeSize = isMobile ? 1.75 : 2.15;
  const bevelRadius = 0.14;

  return (
    <group ref={meshRef}>
      <RoundedBox
        args={[cubeSize, cubeSize, cubeSize]}
        radius={bevelRadius}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <meshPhysicalMaterial
          ref={materialRef}
          transmission={0.96}
          opacity={1.0}
          transparent={true}
          roughness={0.045}
          ior={1.52}
          thickness={2.2}
          reflectivity={0.9}
          attenuationColor="#cce7f8"
          attenuationDistance={1.4}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
          specularIntensity={1.0}
          specularColor="#ffffff"
          color="#f4f9fd"
        />
      </RoundedBox>

      {/* エッジ輪郭ハイライト用のインナーメッシュ */}
      <mesh scale={[0.98, 0.98, 0.98]}>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        <meshBasicMaterial
          color="#e0f2fe"
          wireframe={false}
          transparent={true}
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};
