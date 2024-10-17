/// <reference types="vite/client" />
/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly Connection : string
    readonly BaseUrl : string,
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly env: BaseUrl;
  }
  