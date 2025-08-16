// src/vite-env.d.ts

/// <reference types="vite/client" />

import type { WebApp } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}