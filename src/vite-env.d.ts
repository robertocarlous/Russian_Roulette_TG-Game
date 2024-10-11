/// <reference types="vite/client" />
/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly Connection : string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  