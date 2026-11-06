import React, { useState, useEffect, useCallback } from 'react';
import { Scene } from './components/Scene';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorksSection } from './components/WorksSection';
import { MaterialSection } from './components/MaterialSection';
import { AboutSection } from './components/AboutSection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { Footer } from './components/Footer';
import { useScrollProgress } from './hooks/useScrollProgress';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export const App: React.FC = () => {
  const { scrollRef } = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();

  // ドラッグ中フラグ
  const [, setIsDragging] = useState(false);
  // 位置リセット用トリガー
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isCustomPosition, setIsCustomPosition] = useState(false);

  // リセットハンドラ
  const handleReset = useCallback(() => {
    setResetTrigger((prev) => prev + 1);
    setIsCustomPosition(false);
  }, []);

  // ドラッグ状態の変化
  const handleDragStateChange = useCallback((dragging: boolean) => {
    setIsDragging(dragging);
    if (dragging) {
      setIsCustomPosition(true);
    }
  }, []);

  // キーボードショートカット ('R' or 'r' でリセット)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'r' || e.key === 'R') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReset]);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-charcoal-800 font-sans selection:bg-ice-200/60 overflow-x-hidden">
      {/* 背景の微細な環境光（ガラスの透過感と未来感を深めるソフトグロー） */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-ice-100/35 via-ice-50/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-2/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-slate-200/30 via-ice-50/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 3D WebGL シーン (背面固定レイヤー) */}
      <Scene
        scrollRef={scrollRef}
        prefersReducedMotion={prefersReducedMotion}
        onDragStateChange={handleDragStateChange}
        resetTrigger={resetTrigger}
        onResetComplete={() => setIsCustomPosition(false)}
      />

      {/* ナビゲーションバー (最前面) */}
      <Navbar onResetPosition={handleReset} />

      {/* スクロール可能なコンテンツセクション (前景レイヤー: 余白は背面透過) */}
      <main className="relative z-10 pointer-events-none">
        <HeroSection />
        <WorksSection />
        <MaterialSection />
        <AboutSection />
        <PlaygroundSection
          onResetPosition={handleReset}
          isCustomPosition={isCustomPosition}
        />
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
};

export default App;
