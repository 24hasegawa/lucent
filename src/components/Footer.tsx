import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-slate-200/60 py-12 px-6 bg-slate-50/60 backdrop-blur-sm pointer-events-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-charcoal-400">
        <div>
          <p className="font-medium text-charcoal-700 tracking-wider">
            LUCENT — Portfolio of Design & Creative Engineering
          </p>
          <p className="mt-1 font-light text-[11px] text-charcoal-400">
            Crafted with Three.js, React & Modern Typography
          </p>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-light">
          <span>Physical Based Rendering</span>
          <span>•</span>
          <span>Spring Dynamics</span>
          <span>•</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-charcoal-800 transition-colors cursor-pointer"
          >
            ページトップへ ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
