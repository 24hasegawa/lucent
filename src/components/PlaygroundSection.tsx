import React, { useState } from 'react';
import { RotateCcw, Hand, Move, Github, Check, Copy } from 'lucide-react';

interface PlaygroundSectionProps {
  onResetPosition: () => void;
  isCustomPosition: boolean;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  onResetPosition,
  isCustomPosition,
}) => {
  const [copied, setCopied] = useState(false);
  const email = 'hello@example.com'; // ポートフォリオ用プレースホルダー

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between py-24 px-6 pointer-events-none"
    >
      {/* 上部: セクション見出し */}
      <div className="max-w-3xl mx-auto text-center pointer-events-auto">
        <span className="text-[11px] font-medium tracking-widest text-ice-600 uppercase mb-2 block">
          Kinetic Study & Contact
        </span>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 mb-4 leading-snug">
          動かす。その先に、感触。<br />
          <span className="font-normal text-slate-800">そして対話へ。</span>
        </h2>
        <p className="text-sm sm:text-base text-charcoal-500 font-light max-w-lg mx-auto leading-relaxed">
          ポインターでガラスキューブをつかみ、画面の自由な場所へ動かしてみてください。
          作品やプロジェクトに関する対話、制作のご相談はいつでも歓迎しています。
        </p>
      </div>

      {/* 中央: 操作スペース（キューブが大きく中央に配置される） */}
      <div className="flex-1 min-h-[380px] flex items-center justify-center relative my-4">
        {/* 操作ガイド用の繊細な円環ガイド（背景） */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-dashed border-slate-300 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-slate-200/60" />
        </div>
      </div>

      {/* 下部: 操作パネルとコンタクト */}
      <div className="max-w-2xl mx-auto w-full text-center pointer-events-auto space-y-8">
        {/* 操作コントロール */}
        <div className="space-y-3">
          <button
            onClick={onResetPosition}
            className={`glass-panel group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-400 active:scale-95 ${
              isCustomPosition
                ? 'text-ice-600 border-ice-300 shadow-md ring-2 ring-ice-100 bg-white/95'
                : 'text-charcoal-700 hover:text-charcoal-900 hover:border-slate-300 shadow-sm'
            }`}
            aria-label="キューブの位置を初期状態にリセット"
          >
            <RotateCcw
              size={14}
              className={`transition-transform duration-500 ${
                isCustomPosition ? 'rotate-180 text-ice-500' : 'group-hover:-rotate-45 text-charcoal-500'
              }`}
            />
            <span>キューブの位置を戻す</span>
            <kbd className="hidden sm:inline-block text-[10px] bg-slate-100 text-charcoal-400 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
              R
            </kbd>
          </button>

          <div className="flex items-center justify-center gap-4 text-[11px] text-charcoal-400 font-light">
            <span className="flex items-center gap-1">
              <Hand size={12} className="text-ice-500" />
              ドラッグ＆慣性
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Move size={12} className="text-ice-500" />
              Pointer Capture
            </span>
          </div>
        </div>

        {/* コンタクトリンクカード */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-200/70 shadow-sm">
          <div className="text-left">
            <span className="text-[11px] font-mono tracking-wider text-charcoal-400 uppercase block">
              Get in Touch
            </span>
            <p className="text-sm font-medium text-charcoal-800 mt-1">
              新しいプロジェクトやお仕事の相談を受け付けています
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-xs text-charcoal-700 font-mono transition-colors border border-slate-200/60"
              title="メールアドレスをコピー"
            >
              {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span>{copied ? 'コピー完了' : email}</span>
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-charcoal-700 transition-colors border border-slate-200/60"
              title="GitHub Profile"
            >
              <Github size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
