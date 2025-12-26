# Snapred

Multi-surface Snapred demo experiences:

- **apps/web** – Vite + React + Tailwind single-page rewards experience with the 3D mascot canvas, scanner overlay, and TON Connect wallet entry.
- **apps/mobile** – Expo/React Native screen that mirrors the rewards and scan flows for native devices and deep-links to TON wallets.
- **apps/telegram-miniapp** – Telegram-friendly React mini app layout with quick actions plus TON Connect button.
- **apps/farcaster-frame** – Next.js Farcaster frame that links to the web, Telegram Mini App, and TON Connect entrypoints.

## Getting started

Each app is isolated inside `apps/` so you can install and run what you need:

```bash
# Install dependencies for a target app
cd apps/web && npm install
npm run dev
```

Use the same approach for `apps/mobile` (Expo CLI) and `apps/telegram-miniapp` (Vite).

For the Farcaster frame, configure optional env vars before running:

```bash
NEXT_PUBLIC_FRAME_BASE_URL=https://your-frame-domain.vercel.app \
NEXT_PUBLIC_WEB_URL=https://snapred-web.vercel.app \
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/your_snapred_mini_app \
  npm run dev
```
from `apps/farcaster-frame`.

## TON Connect

- Web and Telegram mini app use [`@tonconnect/ui-react`](https://github.com/ton-connect/sdk) with manifests hosted at `/tonconnect-manifest.json` inside each app's `public/` directory.
- The mobile app deep-links to the first available TON wallet (prefers Tonkeeper) using `@tonconnect/sdk` and the same manifest URL.

## Deploying to Vercel

Each target can be deployed as its own Vercel project:

1. Create a new Vercel project with `apps/web` as the root. Build command `npm run build`, output directory `dist`.
2. Repeat for `apps/telegram-miniapp` with the same build/output settings.
3. The TON Connect manifest is served at `/tonconnect-manifest.json` after deploy—keep the manifest `url` fields in `public/tonconnect-manifest.json` in sync with your Vercel domains.
4. For the Farcaster frame, set the project root to `apps/farcaster-frame`, build command `npm run build`, output `.next`. Provide `NEXT_PUBLIC_FRAME_BASE_URL`, `NEXT_PUBLIC_WEB_URL`, and `NEXT_PUBLIC_TELEGRAM_URL` in the Vercel dashboard so the frame buttons point to the right deployments.
