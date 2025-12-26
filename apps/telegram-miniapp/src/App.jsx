import React, { useEffect, useState } from 'react';
import { Home, Gift, History, User, ScanLine, Trophy, ChevronRight } from 'lucide-react';
import { TonConnectButton } from '@tonconnect/ui-react';

const scans = [
  { store: 'Indomaret', date: 'Today, 10:23 AM', pts: '+150', icon: '🏪' },
  { store: 'Starbucks', date: 'Yesterday, 4:15 PM', pts: '+320', icon: '☕' },
];

const App = () => {
  const [tab, setTab] = useState('home');
  const [points, setPoints] = useState(2450);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div className="miniapp">
      <header className="miniapp__header">
        <div className="miniapp__brand">
          <div className="miniapp__mark">SR</div>
          <div>
            <div className="miniapp__title">
              SNAP<span className="accent">RED</span>
            </div>
            <div className="muted">Hello, Alex!</div>
          </div>
        </div>
        <div className="miniapp__actions">
          <TonConnectButton className="miniapp__ton" />
          <div className="miniapp__badge">{points.toLocaleString()} pts</div>
        </div>
      </header>

      {tab === 'home' && (
        <main className="miniapp__body">
          <div className="miniapp__hero">
            <div className="hero__content">
              <div className="hero__tag">LEVEL 5</div>
            <div className="hero__value">
              <div className="muted">Snap balance</div>
              <div className="big">{points.toLocaleString()} pts</div>
            </div>
          </div>
          <div className="mascot-chip">
            <div className="glow" />
            <svg viewBox="0 0 160 160" role="img" aria-label="Snapred mascot">
              <defs>
                <linearGradient id="tgGlow" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#ef4444" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.85" />
                </linearGradient>
                <radialGradient id="tgFace" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#fecdd3" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#f87171" stopOpacity="0.75" />
                </radialGradient>
              </defs>
              <circle cx="80" cy="80" r="72" fill="url(#tgGlow)" />
              <circle cx="80" cy="78" r="64" fill="url(#tgFace)" stroke="#fb7185" strokeWidth="6" />
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
        </div>

          <div className="miniapp__actions">
            <button className="miniapp__tile" onClick={() => setTab('rewards')}>
              <Trophy size={18} />
              <div>
                <div className="muted">Redeem</div>
                <div className="tile__title">Rewards</div>
              </div>
            </button>
            <button
              className="miniapp__tile primary"
              onClick={() => {
                setPoints((p) => p + 150);
              }}
            >
              <ScanLine size={18} />
              <div>
                <div className="muted">Scan</div>
                <div className="tile__title">Receipt</div>
              </div>
            </button>
          </div>

          <div className="miniapp__section">
            <div className="section__header">
              <div className="section__title">Recent Scans</div>
              <button className="ghost">
                VIEW ALL <ChevronRight size={14} />
              </button>
            </div>
            <div className="list">
              {scans.map((item, idx) => (
                <div className="list__item" key={idx}>
                  <div className="list__left">
                    <div className="avatar">{item.icon}</div>
                    <div>
                      <div className="list__title">{item.store}</div>
                      <div className="muted tiny">{item.date}</div>
                    </div>
                  </div>
                  <div className="badge">{item.pts}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {tab === 'rewards' && (
        <main className="miniapp__body">
          <div className="section__title">Featured Reward</div>
          <div className="miniapp__hero alt">
            <div className="muted">Limited console</div>
            <div className="big">50,000 pts</div>
            <div className="muted tiny">Tap redeem inside full app</div>
          </div>
        </main>
      )}

      {(tab === 'activity' || tab === 'profile') && (
        <main className="miniapp__body center">
          <User size={48} className="muted" />
          <div className="muted">More coming soon.</div>
        </main>
      )}

      <footer className="miniapp__nav">
        {[{ id: 'home', icon: Home }, { id: 'rewards', icon: Gift }, { id: 'activity', icon: History }, { id: 'profile', icon: User }].map(
          (item) => (
            <button
              key={item.id}
              className={`nav__btn ${tab === item.id ? 'active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <item.icon size={20} />
              <div>{item.id}</div>
            </button>
          )
        )}
      </footer>
    </div>
  );
};

export default App;
