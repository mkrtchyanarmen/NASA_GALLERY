declare module '*.svg' {
  import type React from 'react';

  const svg: React.FC<React.SVGProps<SVGElement>>;
  export default svg;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
