import { useEffect, useRef, useState } from 'react';
import { ScrollInfo } from '../types';

export function useScrollProgress() {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    progress: 0,
    scrollY: 0,
    velocity: 0,
    activeSection: 0,
  });

  // 毎フレーム参照可能なRef（3Dシーン内部で再レンダリングなしで参照可能）
  const scrollRef = useRef<ScrollInfo>({
    progress: 0,
    scrollY: 0,
    velocity: 0,
    activeSection: 0,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const velocityRef = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max((now - lastTime.current) / 1000, 0.001);
      lastTime.current = now;

      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const rawProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

      // スクロール速度の計算 (px/s)
      const rawVelocity = (currentScrollY - lastScrollY.current) / dt;
      lastScrollY.current = currentScrollY;

      // 速度の急激なスパイクを抑えるためクランプ
      const clampedVelocity = Math.max(Math.min(rawVelocity, 3500), -3500);
      velocityRef.current = clampedVelocity;

      // セクション判定 (0: Hero, 1: Material, 2: Playground)
      let activeSection = 0;
      if (rawProgress > 0.65) {
        activeSection = 2;
      } else if (rawProgress > 0.25) {
        activeSection = 1;
      }

      scrollRef.current = {
        progress: rawProgress,
        scrollY: currentScrollY,
        velocity: clampedVelocity,
        activeSection,
      };

      setScrollInfo({
        progress: rawProgress,
        scrollY: currentScrollY,
        velocity: clampedVelocity,
        activeSection,
      });
    };

    // 慣性減衰ループ（スクロールが止まったあとも速度を0に向けて減衰）
    const decayLoop = () => {
      if (Math.abs(velocityRef.current) > 0.01) {
        velocityRef.current *= 0.88;
        scrollRef.current.velocity = velocityRef.current;
      } else {
        velocityRef.current = 0;
        scrollRef.current.velocity = 0;
      }
      rafId.current = requestAnimationFrame(decayLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId.current = requestAnimationFrame(decayLoop);

    // 初回実行
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { scrollInfo, scrollRef };
}
