import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { GlassCube } from './GlassCube';
import { ScrollInfo } from '../types';

interface SceneProps {
  scrollRef: React.MutableRefObject<ScrollInfo>;
  prefersReducedMotion: boolean;
  onDragStateChange?: (isDragging: boolean) => void;
  resetTrigger?: number;
  onResetComplete?: () => void;
}

export const Scene: React.FC<SceneProps> = ({
  scrollRef,
  prefersReducedMotion,
  onDragStateChange,
  resetTrigger,
  onResetComplete,
}) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        dpr={[1, 2]} // 解像度制限で低性能端末・高解像度ディスプレイの両方に配慮
        style={{
          touchAction: 'pan-y', // 背景スワイプでモバイル縦スクロールを維持
        }}
      >
        <Suspense fallback={null}>
          {/* 全体のトーンを整える環境光 */}
          <ambientLight intensity={0.75} />

          {/* メインキーライト (右上前からの光) */}
          <directionalLight
            position={[6, 9, 7]}
            intensity={2.0}
            color="#ffffff"
          />

          {/* フィルライト (左下からの青みを含む柔らかな光) */}
          <directionalLight
            position={[-6, -3, 5]}
            intensity={0.7}
            color="#e0f2fe"
          />

          {/* リムライト (背後からの輪郭ハイライト。白背景でもエッジが埋もれないようにする) */}
          <directionalLight
            position={[0, 5, -6]}
            intensity={2.6}
            color="#ffffff"
          />

          {/* ソフトボックスの映り込みをシミュレートするプロシージャル反射板 */}
          <group position={[-3.5, 3.5, 3]} rotation={[0.4, 0.6, 0]}>
            <mesh>
              <planeGeometry args={[4.5, 9]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
          </group>

          <group position={[4.5, 1.8, 2]} rotation={[-0.3, -0.6, 0]}>
            <mesh>
              <planeGeometry args={[3.5, 7]} />
              <meshBasicMaterial color="#e0f2fe" side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Dreiの環境プリセット（シティまたはスタジオ光の反射） */}
          <Environment preset="city" />

          {/* ガラスキューブ本体 */}
          <GlassCube
            scrollRef={scrollRef}
            prefersReducedMotion={prefersReducedMotion}
            onDragStateChange={onDragStateChange}
            resetTrigger={resetTrigger}
            onResetComplete={onResetComplete}
          />

          {/* 接地感と浮遊感を支える柔らかなコンタクトシャドウ */}
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.3}
            scale={12}
            blur={2.5}
            far={4.8}
            color="#475569"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
