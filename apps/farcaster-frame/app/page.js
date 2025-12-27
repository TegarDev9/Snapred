const BASE_URL = process.env.NEXT_PUBLIC_FRAME_BASE_URL || 'https://snapred-farcaster.vercel.app';
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://snapred-web.vercel.app';
const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/your_snapred_mini_app';
const SCAN_TARGET = `${WEB_URL}/#scanner`;

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Snapred Farcaster Frame',
  description: 'Farcaster-ready entry into the Snapred web, Telegram, and TON flows.',
  openGraph: {
    title: 'Snapred Farcaster Frame',
    description: 'Jump into the Snapred universe, redeem points, and connect TON from Farcaster.',
    images: [`${BASE_URL}/frame-card.svg`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${BASE_URL}/frame-card.svg`,
    'fc:frame:button:1': 'Open Web',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': WEB_URL,
    'fc:frame:button:2': 'Telegram Mini App',
    'fc:frame:button:2:action': 'link',
    'fc:frame:button:2:target': TELEGRAM_URL,
    'fc:frame:button:3': 'Scan Receipt',
    'fc:frame:button:3:action': 'link',
    'fc:frame:button:3:target': SCAN_TARGET,
    'fc:frame:button:4': 'Connect TON',
    'fc:frame:button:4:action': 'link',
    'fc:frame:button:4:target': `${WEB_URL}/#ton-connect`,
  },
};

export default function Page() {
  return (
    <main>
      <div className="frame-card">
        <div className="header">
          <div>
            <div className="badge">FARCASTER FRAME</div>
            <h1>Snapred for Farcaster</h1>
            <p className="small">Shareable frame that links directly to the web, Telegram Mini App, and TON Connect entrypoints.</p>
            <div className="pill-row">
              <span className="pill green">Navbar online</span>
              <span className="pill amber">Scanner ready</span>
              <span className="pill">Points synced</span>
            </div>
          </div>
          <div className="mascot-stack">
            <div className="mascot-orb">
              <div className="mascot-glow" />
              <svg viewBox="0 0 160 160" role="img" aria-label="Snapred mascot" className="mascot-svg">
                <defs>
                  <linearGradient id="frameGlow" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#ef4444" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.85" />
                  </linearGradient>
                  <radialGradient id="frameFace" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#fecdd3" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#f87171" stopOpacity="0.75" />
                  </radialGradient>
                </defs>
                <circle cx="80" cy="80" r="72" fill="url(#frameGlow)" />
                <circle cx="80" cy="78" r="64" fill="url(#frameFace)" stroke="#fb7185" strokeWidth="6" />
                <rect x="48" y="62" width="64" height="24" rx="12" fill="#0f172a" opacity="0.9" />
                <circle cx="62" cy="74" r="10" fill="#22d3ee" />
                <circle cx="98" cy="74" r="10" fill="#22d3ee" />
                <circle cx="62" cy="74" r="5" fill="#e0f2fe" />
                <circle cx="98" cy="74" r="5" fill="#e0f2fe" />
                <path d="M60 104c12 10 28 10 40 0" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M40 80c0-28 18-48 40-48s40 20 40 48" stroke="#fecaca" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M50 52c6-10 16-16 30-16s24 6 30 16" stroke="#fee2e2" strokeWidth="5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <p className="small">Mascot now travels with every experience.</p>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <h3>Deep links configured</h3>
            <p className="small">Buttons target the Vercel-hosted web app, Telegram Mini App, and TON connect screen. Override via environment variables.</p>
            <a className="cta" href={SCAN_TARGET}>
              Open scanner nav
            </a>
          </div>
          <div className="card">
            <h3>Instant deploy</h3>
            <p className="small">Point a Vercel project to <code>apps/farcaster-frame</code> with build command <code>npm run build</code> and output <code>.next</code>.</p>
          </div>
          <div className="card">
            <h3>Mascot-ready metadata</h3>
            <p className="small">The frame image, links, and mascot art stay in sync across Farcaster, web, Telegram, and mobile screens.</p>
          </div>
          <div className="card">
            <h3>Navbar + scanner parity</h3>
            <p className="small">Mini app, mobile, and web now share the same scanner CTA and top-level nav status so users never lose context.</p>
            <div className="pill-row">
              <span className="pill green">Web</span>
              <span className="pill green">Telegram</span>
              <span className="pill green">Mobile</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <span>Base URL: {BASE_URL}</span>
          <span>Web: {WEB_URL}</span>
          <span>Telegram: {TELEGRAM_URL}</span>
        </div>
      </div>
    </main>
  );
}
