import React from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  onResetPosition?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onResetPosition }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="glass-pill px-5 py-2.5 rounded-full flex items-center justify-between text-xs sm:text-sm font-normal text-charcoal-700 tracking-wide transition-all duration-300 hover:border-ice-200">
          {/* ロゴ・作品名 */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-400 rounded-full py-0.5 px-1"
          >
            <span className="w-2 h-2 rounded-full bg-ice-400 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            <span className="font-medium tracking-widest text-charcoal-900 group-hover:text-ice-600 transition-colors">
              LUCENT
            </span>
            <span className="hidden sm:inline-block text-[11px] text-charcoal-400 border-l border-slate-200 pl-2 ml-1 font-light">
              Portfolio
            </span>
          </button>

          {/* ナビゲーションリンク */}
          <div className="flex items-center gap-1 sm:gap-5">
            <button
              onClick={() => scrollTo('hero')}
              className="px-2 sm:px-2.5 py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors duration-200 rounded-md hover:bg-white/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-ice-300"
            >
              トップ
            </button>
            <button
              onClick={() => scrollTo('works')}
              className="px-2 sm:px-2.5 py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors duration-200 rounded-md hover:bg-white/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-ice-300"
            >
              作品
            </button>
            <button
              onClick={() => scrollTo('material')}
              className="hidden md:inline-block px-2.5 py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors duration-200 rounded-md hover:bg-white/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-ice-300"
            >
              質感・光
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="px-2 sm:px-2.5 py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors duration-200 rounded-md hover:bg-white/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-ice-300"
            >
              思想・概要
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-2 sm:px-2.5 py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors duration-200 rounded-md hover:bg-white/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-ice-300"
            >
              連絡・体験
            </button>

            {/* 位置リセットのクイックショートカット */}
            {onResetPosition && (
              <button
                onClick={onResetPosition}
                title="キューブの位置を初期状態に戻す (Key: R)"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1 text-[11px] text-ice-600 bg-ice-50/70 hover:bg-ice-100 border border-ice-200/60 rounded-full transition-all duration-200 active:scale-95"
              >
                <Sparkles size={12} className="text-ice-500" />
                <span>位置を戻す</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
