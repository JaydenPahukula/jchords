/// <reference types="vite/client" />

interface ImportMetaEnv {
  // define env variables
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
