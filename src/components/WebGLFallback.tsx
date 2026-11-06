import React from 'react';

export const WebGLFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-tr from-white/80 via-white/40 to-ice-100/60 backdrop-blur-xl border border-white/90 shadow-2xl flex items-center justify-center rotate-12 transition-transform duration-700">
        <div className="absolute inset-4 rounded-2xl border border-white/60 bg-gradient-to-br from-ice-50/30 to-transparent" />
        <span className="text-xs text-charcoal-400 font-mono tracking-wider">LUCENT CUBE</span>
      </div>
    </div>
  );
};
