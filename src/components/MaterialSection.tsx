import React from 'react';

export const MaterialSection: React.FC = () => {
  return (
    <section
      id="material"
      className="relative min-h-screen flex flex-col justify-center py-28 px-6 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* 左側: テキストブロック */}
        <div className="md:col-span-5 pointer-events-auto space-y-8">
          <div>
            <span className="text-[11px] font-medium tracking-widest text-ice-600 uppercase mb-2 block">
              Craft & Optical Research
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-snug">
              光を、<br />
              <span className="font-normal text-slate-800">かたちに。</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            無色透明のガラスの中に、微細な屈折率と厚みを持たせました。
            背景と同化しないよう計算されたソフトボックスの反射光が、
            わずかに丸められたエッジをなぞるように輝きます。
          </p>

          <p className="text-xs sm:text-sm text-charcoal-400 font-light leading-relaxed">
            テクスチャ画像や重い外部アセットに頼らず、Three.js のプロシージャルな環境光と物理シェーダー（PBR）のみで構成。軽量性と静止画としての審美性を両立しています。
          </p>

          {/* 素材の特性パラメータ表示 */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200/60 text-xs">
            <div>
              <p className="text-charcoal-400 font-light mb-1">屈折率 (IOR)</p>
              <p className="text-charcoal-800 font-mono text-base font-medium">1.52 <span className="text-xs font-normal text-charcoal-500 font-sans">Crown Glass</span></p>
            </div>
            <div>
              <p className="text-charcoal-400 font-light mb-1">透過率 (Transmission)</p>
              <p className="text-charcoal-800 font-mono text-base font-medium">96.0<span className="text-xs font-normal text-charcoal-500 font-sans">%</span></p>
            </div>
            <div>
              <p className="text-charcoal-400 font-light mb-1">表面粗さ (Roughness)</p>
              <p className="text-charcoal-800 font-mono text-base font-medium">0.045 <span className="text-xs font-normal text-charcoal-500 font-sans">Polished</span></p>
            </div>
            <div>
              <p className="text-charcoal-400 font-light mb-1">内部吸収 (Attenuation)</p>
              <p className="text-charcoal-800 font-mono text-base font-medium">Ice Blue <span className="text-xs font-normal text-charcoal-500 font-sans">Subtle</span></p>
            </div>
          </div>
        </div>

        {/* 右側: 3Dキューブが見える余白（キューブがこの領域にシフト） */}
        <div className="md:col-span-7 h-[360px] md:h-[480px]" aria-hidden="true" />
      </div>
    </section>
  );
};
