const BASE_URL = process.env.NEXT_PUBLIC_FRAME_BASE_URL || 'https://snapred-farcaster.vercel.app';
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://snapred-web.vercel.app';
const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/your_snapred_mini_app';

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
    'fc:frame:button:3:target': `${WEB_URL}/#scanner`,
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
          </div>
          <img src="/frame-card.svg" alt="Snapred frame card" width={220} height={120} style={{ borderRadius: 16 }} />
        </div>

        <div className="grid">
          <div className="card">
            <h3>Deep links configured</h3>
            <p className="small">Buttons target the Vercel-hosted web app, Telegram Mini App, and TON connect screen. Override via environment variables.</p>
          </div>
          <div className="card">
            <h3>Instant deploy</h3>
            <p className="small">Point a Vercel project to <code>apps/farcaster-frame</code> with build command <code>npm run build</code> and output <code>.next</code>.</p>
          </div>
          <div className="card">
            <h3>Frame metadata</h3>
            <p className="small">Meta tags advertise the frame image and four buttons without needing a serverful backend.</p>
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
