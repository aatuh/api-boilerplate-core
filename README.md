# api-boilerplate-core

A **modular TypeScript core** for building Next.js apps fast.

This repo is a **pnpm workspace monorepo** containing reusable packages for:

- Auth primitives + a **Clerk adapter**
- Cookie consent primitives + legal document templates
- Consent-gated analytics (**Plausible** + **Umami** implementations)
- i18n helpers (locale parsing + routing helpers)
- SEO metadata helpers (canonical + hreflang + OG)
- UI + layout primitives (marketing/info/dashboard-style shells)
- Small infra utilities: env parsing (Zod), flags, HTTP client + error mapping

> This is **not a full application template**. It’s a set of core packages you plug into your Next.js app.

---

## What’s inside

Workspace root:

- `pnpm-workspace.yaml` — workspace definition citeturn0search1turn0search5
- `packages/*` — the reusable packages (all currently `private: true`)

Packages:

- `@api-boilerplate-core/analytics`
- `@api-boilerplate-core/analytics-plausible`
- `@api-boilerplate-core/analytics-umami`
- `@api-boilerplate-core/auth`
- `@api-boilerplate-core/auth-ui`
- `@api-boilerplate-core/auth-clerk`
- `@api-boilerplate-core/auth-setup`
- `@api-boilerplate-core/clerk`
- `@api-boilerplate-core/content`
- `@api-boilerplate-core/env`
- `@api-boilerplate-core/error-contracts`
- `@api-boilerplate-core/flags`
- `@api-boilerplate-core/http`
- `@api-boilerplate-core/i18n-shared`
- `@api-boilerplate-core/layouts`
- `@api-boilerplate-core/legal`
- `@api-boilerplate-core/seo`
- `@api-boilerplate-core/theme`
- `@api-boilerplate-core/ui`
- `@api-boilerplate-core/widgets`

---

## Requirements

- Node + pnpm
- Next.js (App Router) + React
- Most packages are ESM (`"type": "module"`)

---

## Working on this repo (contributors)

```bash
pnpm install
pnpm lint
pnpm typecheck
```

Run scripts across all packages:

```bash
pnpm -r lint
```

---

## Consuming the packages in an app

### Option A: Use as a workspace (recommended for active development)

Add this repo into your app monorepo and include its packages in your workspace globs.

Example `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "vendor/api-boilerplate-core/packages/*"
```

Then in your app’s `package.json`:

```json
{
  "dependencies": {
    "@api-boilerplate-core/ui": "workspace:*",
    "@api-boilerplate-core/seo": "workspace:*"
  }
}
```

The `workspace:` protocol forces pnpm to resolve to local workspace packages. citeturn0search9

### Option B: Depend directly on GitHub `#path:` packages

This repo also supports Git URL dependencies pointing to subpaths:

```json
{
  "dependencies": {
    "@api-boilerplate-core/ui": "https://github.com/aatuh/api-boilerplate-core.git#path:/packages/ui",
    "@api-boilerplate-core/seo": "https://github.com/aatuh/api-boilerplate-core.git#path:/packages/seo"
  }
}
```

Pin to a tag/commit for reproducible installs.

---

## Environment variables (common)

Client-exposed env vars must be prefixed with `NEXT_PUBLIC_`.

### Analytics (core)

- `NEXT_PUBLIC_ANALYTICS_ENABLED` = `"true"` to enable analytics (globally)
- `NEXT_PUBLIC_ANALYTICS_TRACK_LOCALHOST` = `"true"` to allow tracking on localhost

### Umami

- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_UMAMI_HOST` (optional URL)
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` (optional URL)

### Clerk

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_CLERK_JWT_TEMPLATE` (optional)

### i18n

- `NEXT_PUBLIC_SUPPORTED_LOCALES` (CSV, e.g. `"en,fi"`)
- `NEXT_PUBLIC_DEFAULT_LOCALE` (e.g. `"en"`)
- `NEXT_PUBLIC_LOCALE_AUTO_DETECT` (`true`/`false`)

### SEO

- `NEXT_PUBLIC_APP_URL` (canonical base URL)
- `VERCEL_URL` (auto-used if present)

---

## Typical integration patterns

### 1) Cookie consent (provider + banner)

**If you want other code to read consent state (e.g. analytics gates), you must wrap your app in `CookieConsentProvider`.**

```tsx
// app/providers.tsx
"use client";

import type { ReactNode } from "react";
import { CookieConsentProvider, CookieConsentBanner } from "@api-boilerplate-core/widgets";
import { DEFAULT_CONSENT_CONFIG } from "@api-boilerplate-core/legal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider config={DEFAULT_CONSENT_CONFIG}>
      {children}
      <CookieConsentBanner />
    </CookieConsentProvider>
  );
}
```

Then in your root layout:

```tsx
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

> Note: `CookieConsentShell` is a convenience component that renders the banner inside a provider, but it **does not wrap your app’s children**. Use it only if you don’t need consent state elsewhere.

---

### 2) Consent-gated analytics (Umami example)

`UmamiAnalyticsGate` only enables tracking when:

- analytics is enabled, and
- the user granted consent for Umami.

```tsx
// app/providers.tsx
"use client";

import type { ReactNode } from "react";
import { CookieConsentProvider, CookieConsentBanner } from "@api-boilerplate-core/widgets";
import { DEFAULT_CONSENT_CONFIG } from "@api-boilerplate-core/legal";

import { AnalyticsListener } from "@api-boilerplate-core/analytics";
import { createAnalyticsEnv } from "@api-boilerplate-core/analytics/env";

import { UmamiAnalyticsGate } from "@api-boilerplate-core/analytics-umami/gate";
import { createUmamiEnv } from "@api-boilerplate-core/analytics-umami/env";

export function Providers({ children }: { children: ReactNode }) {
  const analyticsEnv = createAnalyticsEnv();
  const umamiEnv = createUmamiEnv();

  return (
    <CookieConsentProvider config={DEFAULT_CONSENT_CONFIG}>
      <UmamiAnalyticsGate
        enabled={analyticsEnv.enabled}
        websiteId={umamiEnv.websiteId}
        host={umamiEnv.host}
        scriptUrl={umamiEnv.scriptUrl}
      >
        <AnalyticsListener />
        {children}
      </UmamiAnalyticsGate>

      <CookieConsentBanner />
    </CookieConsentProvider>
  );
}
```

---

### 3) Clerk auth (middleware adapter)

This repo includes a Clerk adapter package intended for Next.js middleware integration.
Clerk’s official middleware patterns evolve; follow Clerk’s docs for your Clerk/Next version and map it to `@api-boilerplate-core/auth-clerk`. citeturn0search0

---

### 4) SEO metadata

`@api-boilerplate-core/seo` provides `buildPageMetadata()` and `getSiteUrl()` which help produce consistent canonical + hreflang + OpenGraph metadata.

```ts
import { buildPageMetadata } from "@api-boilerplate-core/seo";

export const metadata = buildPageMetadata({
  title: "My page",
  description: "My description",
  path: "/pricing",
  locale: "en",
  index: true,
  siteName: "MyApp",
});
```

---

## Package development conventions

- Prefer small, focused packages with explicit exports.
- Any hook-based React component must be a Client Component: start the file with `"use client";`.
- Keep env parsing centralized (`@api-boilerplate-core/env` + Zod).
- Keep privacy defaults: analytics should be gated by explicit consent.

---

## For coding agents (and humans who like checklists)

### High-signal commands

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm -r lint
```

### Add a new package

1. Create `packages/<name>/package.json` mirroring existing packages (`type: module`, `exports`, `peerDependencies`).
2. Add `src/index.ts` with explicit exports.
3. Ensure lint passes: `pnpm -r lint`
4. Ensure types pass: `pnpm typecheck`

### Common pitfalls

- Importing a hook-based component into a Server Component without a Client wrapper.
- Using non-`NEXT_PUBLIC_` env vars in client code.
- Enabling analytics without consent gating.
