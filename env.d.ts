// / <reference types="vite/client" />
interface ImportMetaEnv {
  readonly ENV: string;

  readonly BASE_URL: string;
  readonly PORT: string;
  
  readonly API_URL: string;
  readonly API_PREFIX: string;
  readonly FILE_DOMAIN: string;

  readonly LOGGER_CONSOLE_LEVEL: string;
  
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}