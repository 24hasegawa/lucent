import React from 'react';
import { ExternalLink, Sparkles, Layers, Box } from 'lucide-react';

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  description: string;
  tags: string[];
  role: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 'lucent',
    number: '01',
    title: 'LUCENT',
    subtitle: '触覚的な質感を持つ3D WebGLインタラクション研究',
    category: 'Creative Coding / 3D Experience',
    period: '2026',
    description:
      '無色透明な光学ガラスの屈折・透過・厚みと、物理方程式に基づく触覚的インタラクションをWeb上で探求したスタディ作品。ポインターをつかむオフセット保持や、スクロール風圧によるばね減衰の揺れを実装。',
    tags: ['Three.js', 'React Three Fiber', 'PBR Shaders', 'Kinetic Physics'],
    role: 'Concept, 3D Art & Development',
    icon: <Box size={16} className="text-ice-500" />,
  },
  {
    id: 'aura',
    number: '02',
    title: 'AURA Design System',
    subtitle: '静謐な余白と微細な陰影で紡ぐUIデザイン言語',
    category: 'Design System / Architecture',
    period: '2025 – 2026',
    description:
      '情報過多なデジタル環境において、認知的負荷を極限まで低減するために設計されたミニマルデザインシステム。半透明のレイヤー階層と緻密なタイポグラフィスケールを定義。',
    tags: ['Design Tokens', 'Accessibility', 'Micro-interactions', 'Tailwind'],
    role: 'UI/UX Design & Front-end Architecture',
    icon: <Layers size={16} className="text-ice-500" />,
  },
  {
    id: 'mono',
    number: '03',
    title: 'KINETIC TYPE',
    subtitle: '流体シミュレーションと連動する実験的タイポグラフィ',
    category: 'Interactive Web / WebGL',
    period: '2025',
    description:
      'ポインターの速度と加速度を流体力学モデルに変換し、日本語文字の骨格が有機的に揺らめくタイポグラフィ実験。静的な美しさと動的な生命感の境界を探求。',
    tags: ['WebGL', 'GLSL Canvas', 'Fluid Simulation', 'TypeScript'],
    role: 'Creative Coding & Typography Design',
    icon: <Sparkles size={16} className="text-ice-500" />,
  },
];

export const WorksSection: React.FC = () => {
  return (
    <section
      id="works"
      className="relative min-h-screen py-32 px-6 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* セクションヘッダー */}
        <div className="max-w-3xl mb-20 pointer-events-auto">
          <span className="text-[11px] font-medium tracking-widest text-ice-600 uppercase mb-3 block">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-snug">
            削ぎ落とし、<br />
            <span className="font-normal text-slate-800">本質だけを残す。</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-charcoal-500 font-light max-w-xl leading-relaxed">
            機能性と審美性、そして触れたときの心地よさを追求した自主制作プロジェクトです。
            見た目の華やかさだけでなく、パフォーマンスとコードの堅牢性を重視しています。
          </p>
        </div>

        {/* プロジェクト一覧 */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-3xl p-8 sm:p-12 transition-all duration-500 hover:shadow-xl hover:border-ice-200/80 pointer-events-auto group relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* 番号とカテゴリ */}
                <div className="lg:col-span-3 flex lg:flex-col justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-light text-slate-300 group-hover:text-ice-500 transition-colors">
                      {project.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                      {project.icon}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] tracking-wider text-charcoal-400 font-medium uppercase block">
                      {project.category}
                    </span>
                    <span className="text-xs text-charcoal-400 font-light mt-0.5 block">
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* メイン詳細 */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-normal text-charcoal-900 tracking-tight flex items-center gap-3">
                      {project.title}
                      {project.id === 'lucent' && (
                        <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-ice-50 text-ice-600 border border-ice-200 font-medium">
                          Featured Study
                        </span>
                      )}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-charcoal-600 bg-slate-100/70 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ロールとリンク */}
                <div className="lg:col-span-3 lg:text-right flex lg:flex-col justify-between items-start lg:items-end gap-4 h-full border-t lg:border-t-0 lg:border-l border-slate-200/60 pt-4 lg:pt-0 lg:pl-8">
                  <div>
                    <p className="text-[11px] text-charcoal-400 font-light mb-1">
                      Role & Responsibility
                    </p>
                    <p className="text-xs font-medium text-charcoal-800">
                      {project.role}
                    </p>
                  </div>

                  {project.id === 'lucent' ? (
                    <button
                      onClick={() => {
                        const el = document.getElementById('playground');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-ice-600 hover:text-ice-700 font-medium transition-colors group-hover:translate-x-0.5 duration-200"
                    >
                      <span>画面でキューブを体験</span>
                      <ExternalLink size={13} />
                    </button>
                  ) : (
                    <span className="text-xs text-charcoal-400 font-light">
                      Interactive Archive
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
