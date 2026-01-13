/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly POCKETBASE_URL: string
  readonly SERVICE_URL_POCKETBASE: string
  readonly AUTH_POCKETBASE_URL: string
  readonly AUTH_POCKETBASE_GROUP: string
  readonly DISABLE_AUTH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
