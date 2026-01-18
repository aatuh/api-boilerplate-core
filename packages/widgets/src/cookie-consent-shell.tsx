"use client";

import type { ConsentConfig } from "@api-boilerplate-core/legal";
import { CookieConsentBanner, CookieConsentProvider } from "./cookie-consent";

type CookieConsentShellProps = {
  config: ConsentConfig;
  storageKey?: string;
};

export function CookieConsentShell({ config, storageKey }: CookieConsentShellProps) {
  return (
    <CookieConsentProvider
      config={config}
      {...(storageKey !== undefined ? { storageKey } : {})}
    >
      <CookieConsentBanner />
    </CookieConsentProvider>
  );
}
