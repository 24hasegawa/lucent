import React from 'react';
import { Code2, Cpu, Palette } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen py-32 px-6 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* セクション見出し */}
        <div className="max-w-3xl mb-16 pointer-events-auto">
          <span className="text-[11px] font-medium tracking-widest text-ice-600 uppercase mb-3 block">
            Profile & Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-snug">
            工学の正確さと、<br />
            <span className="font-normal text-slate-800">美意識の調和。</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-charcoal-500 font-light max-w-xl leading-relaxed">
            デザインの直感とプログラミングの論理を架橋するクリエイティブエンジニア。
            Webブラウザというキャンバスの上で、ユーザーが「触れたくなる」手触りのある体験を探求しています。
          </p>
        </div>

        {/* 3つのコア領域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 pointer-events-auto">
          <div className="glass-panel rounded-3xl p-8 space-y-4 hover:border-ice-200 transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-ice-50 border border-ice-200 flex items-center justify-center text-ice-600">
              <Palette size={20} />
            </div>
            <h3 className="text-lg font-medium text-charcoal-900 tracking-tight">
              Design & Typography
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
              余白の呼吸、階層の明瞭さ、微細なコントラストを重んじるデザイン。派手な装飾に逃げず、本質的なタイポグラフィで情報を端正に整えます。
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-8 space-y-4 hover:border-ice-200 transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-ice-50 border border-ice-200 flex items-center justify-center text-ice-600">
              <Cpu size={20} />
            </div>
            <h3 className="text-lg font-medium text-charcoal-900 tracking-tight">
              3D & Creative Coding
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
              Three.js / WebGL / シェーダーによる空間表現。光学的リアリズム（PBR）と物理シミュレーションを融合させ、デジタルに確かな「物質感」をもたらします。
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-8 space-y-4 hover:border-ice-200 transition-all duration-300">
            <div className="w-10 h-10 rounded-2xl bg-ice-50 border border-ice-200 flex items-center justify-center text-ice-600">
              <Code2 size={20} />
            </div>
            <h3 className="text-lg font-medium text-charcoal-900 tracking-tight">
              Engineering Quality
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
              TypeScriptによる型安全性、不要な再レンダリングの排除、可読性の高いコンポーネント設計。60fps/120fpsの滑らかな動作を妥協なく支えます。
            </p>
          </div>
        </div>

        {/* 思考と技術指標 */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] tracking-widest text-ice-600 uppercase font-mono">
                Technical Capabilities
              </span>
              <h4 className="text-xl sm:text-2xl font-light text-charcoal-900 tracking-tight">
                大切にしている技術と姿勢
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
                単に最新ライブラリを使うことではなく、ユーザーの操作に0.1秒で寄り添う快適性と、持続可能なコードベースを維持することを最優先にしています。
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
              <div className="border-l border-slate-200 pl-4 py-1">
                <span className="text-charcoal-400 font-light block mb-1">Frontend</span>
                <span className="font-medium text-charcoal-800">React / TypeScript</span>
                <span className="text-[11px] text-charcoal-500 block">Next.js / Vite</span>
              </div>
              <div className="border-l border-slate-200 pl-4 py-1">
                <span className="text-charcoal-400 font-light block mb-1">Interactive</span>
                <span className="font-medium text-charcoal-800">Three.js / R3F</span>
                <span className="text-[11px] text-charcoal-500 block">GLSL / Canvas</span>
              </div>
              <div className="border-l border-slate-200 pl-4 py-1">
                <span className="text-charcoal-400 font-light block mb-1">Styling</span>
                <span className="font-medium text-charcoal-800">Tailwind CSS</span>
                <span className="text-[11px] text-charcoal-500 block">CSS Architecture</span>
              </div>
              <div className="border-l border-slate-200 pl-4 py-1">
                <span className="text-charcoal-400 font-light block mb-1">Physics & Math</span>
                <span className="font-medium text-charcoal-800">Spring Damping</span>
                <span className="text-[11px] text-charcoal-500 block">Raycasting / Vectors</span>
              </div>
              <div className="border-l border-slate-200 pl-4 py-1">
                <span className="text-charcoal-400 font-light block mb-1">Accessibility</span>
                <span className="font-medium text-charcoal-800">Reduced Motion</span>
                <span className="text-[11px] text-charcoal-500 block">Keyboard Nav</span>
              </div>
              <div className="border-l border-slate-200 pl-4 py-1">
                <span className="text-charcoal-400 font-light block mb-1">Design System</span>
                <span className="font-medium text-charcoal-800">Figma to Code</span>
                <span className="text-[11px] text-charcoal-500 block">Design Tokens</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
