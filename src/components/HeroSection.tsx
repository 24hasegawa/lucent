import React from 'react';
import { MousePointer, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 pointer-events-none select-none"
    >
      {/* 上部: タイトルとステートメント */}
      <div className="max-w-4xl mx-auto text-center mt-6 sm:mt-10 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 text-[12px] font-medium text-charcoal-600 mb-6 backdrop-blur-sm shadow-sm animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-ice-500 animate-pulse" />
          Design & Creative Engineering Portfolio
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-charcoal-900 leading-[1.15] mb-5 animate-fade-in">
          透明に、<span className="font-normal text-slate-800">触れる。</span>
        </h1>

        <p className="text-base sm:text-xl text-charcoal-500 font-light max-w-xl mx-auto leading-relaxed animate-fade-in">
          光、素材、動き。<br className="hidden sm:inline" />
          デジタル空間に、確かな手触りと心地よい秩序を。
        </p>
      </div>

      {/* 中央エリア: キューブの表示領域（背景Canvasに透過） */}
      <div className="flex-1 min-h-[280px]" aria-hidden="true" />

      {/* 下部: 操作案内とスクロールインジケーター */}
      <div className="max-w-md mx-auto text-center pointer-events-auto">
        <div className="glass-pill inline-flex items-center gap-4 px-5 py-2.5 rounded-full text-xs text-charcoal-600 shadow-sm transition-all duration-300 hover:border-ice-300">
          <div className="flex items-center gap-1.5">
            <MousePointer size={13} className="text-ice-500" />
            <span>キューブをつかむ</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <ArrowDown size={13} className="text-ice-500 animate-bounce" />
            <span>スクロールで作品を見る</span>
          </div>
        </div>

        <p className="mt-3 text-[11px] text-charcoal-400 font-light tracking-wide">
          キューブはページ全体を通してあなたと共に移動します
        </p>
      </div>
    </section>
  );
};
