/// <reference types="@remix-run/cloudflare" />
/// <reference types="vite/client" />

import type { KVNamespace, D1Database } from "@cloudflare/workers-types";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: {
      NELUMBO_CLOUD: KVNamespace;
      DB: D1Database;
    };
  }
}
