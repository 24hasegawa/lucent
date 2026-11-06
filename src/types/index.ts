export interface ScrollInfo {
  progress: number;       // 全体進捗 0 ~ 1
  scrollY: number;        // 現在のスクロール位置 (px)
  velocity: number;       // スクロール速度 (px/frame 相当, 減衰あり)
  activeSection: number;  // 0: Hero, 1: Material, 2: Playground
}

export interface CubePhysicsParams {
  springK: number;        // ばね定数
  damping: number;        // 減衰定数
  mass: number;           // 質量
  maxDisplacement: number;// 最大変位
}

export interface MaterialProperties {
  transmission: number;
  roughness: number;
  ior: number;
  thickness: number;
  attenuationColor: string;
  attenuationDistance: number;
  clearcoat: number;
  clearcoatRoughness: number;
}
