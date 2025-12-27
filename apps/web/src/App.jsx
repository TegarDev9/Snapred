import React, { useMemo, useState } from 'react';
import {
  Camera,
  Gift,
  Home,
  User,
  ScanLine,
  X,
  ChevronRight,
  Zap,
  Trophy,
  History,
} from 'lucide-react';
import { TonConnectButton } from '@tonconnect/ui-react';

const MascotIcon = () => (
  <svg
    viewBox="0 0 160 160"
    className="w-[220px] h-[220px] drop-shadow-[0_15px_40px_rgba(239,68,68,0.45)] animate-bounce-slow"
    role="img"
    aria-label="Snapred mascot"
  >
    <defs>
      <linearGradient id="glow" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#f87171" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#ef4444" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.85" />
      </linearGradient>
      <radialGradient id="face" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="70%" stopColor="#fecdd3" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#f87171" stopOpacity="0.75" />
      </radialGradient>
    </defs>
    <circle cx="80" cy="80" r="72" fill="url(#glow)" />
    <circle cx="80" cy="78" r="64" fill="url(#face)" stroke="#fb7185" strokeWidth="6" />
    <rect x="48" y="62" width="64" height="24" rx="12" fill="#0f172a" opacity="0.9" />
    <circle cx="62" cy="74" r="10" fill="#22d3ee" />
    <circle cx="98" cy="74" r="10" fill="#22d3ee" />
    <circle cx="62" cy="74" r="5" fill="#e0f2fe" />
    <circle cx="98" cy="74" r="5" fill="#e0f2fe" />
    <path d="M60 104c12 10 28 10 40 0" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M40 80c0-28 18-48 40-48s40 20 40 48" stroke="#fecaca" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M50 52c6-10 16-16 30-16s24 6 30 16" stroke="#fee2e2" strokeWidth="5" strokeLinecap="round" fill="none" />
  </svg>
);

const MascotSpotlight = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.35),transparent_30%)]" />
    <div className="absolute inset-8 bg-gradient-to-b from-white/5 via-red-500/5 to-black/60 rounded-[36px] blur-3xl" />
    <div className="relative z-10 w-[260px] h-[260px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_20px_60px_rgba(239,68,68,0.45)]">
      <MascotIcon />
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-black/30 blur-2xl rounded-full" />
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showScanner, setShowScanner] = useState(false);
  const [points, setPoints] = useState(2450);
  const [selectedReward, setSelectedReward] = useState(null);

  const activityFeed = useMemo(
    () => [
      {
        title: 'Scan Bonus',
        description: 'Uploaded receipt from Indomaret - verified automatically',
        pts: '+150',
        time: 'Today • 10:30',
        icon: '🧾',
        type: 'scan',
      },
      {
        title: 'Challenge Complete',
        description: 'Finished the weekend grocery quest',
        pts: '+320',
        time: 'Yesterday • 18:45',
        icon: '🏆',
        type: 'quest',
      },
      {
        title: 'Referral',
        description: 'Andre joined Snapred using your link',
        pts: '+600',
        time: 'Yesterday • 12:10',
        icon: '🤝',
        type: 'referral',
      },
      {
        title: 'Reward Redeemed',
        description: 'Movie Ticket code sent to Ton wallet',
        pts: '-1,200',
        time: 'Dec 21 • 14:20',
        icon: '🎟️',
        type: 'redeem',
      },
    ],
    [],
  );

  const badges = useMemo(
    () => [
      { label: 'Early Bird', desc: 'Scanned before 9AM', color: 'from-amber-400 to-orange-500' },
      { label: 'Streak 14d', desc: 'Two-week consecutive scans', color: 'from-red-500 to-pink-500' },
      { label: 'Connector', desc: 'Invited 5 friends', color: 'from-blue-500 to-cyan-400' },
    ],
    [],
  );

  const rewardCatalog = useMemo(
    () => [
      {
        name: 'Coffee Voucher',
        cost: '500 PTS',
        img: 'https://images.unsplash.com/photo-1517256673644-36ad113cd472?auto=format&fit=crop&q=80&w=500',
        category: 'Lifestyle',
        stock: 'Limited left: 48',
        detail:
          'Exchange your points for a premium coffee at participating cafes. Valid for 30 days after redemption with instant digital delivery.',
      },
      {
        name: 'Movie Ticket',
        cost: '1,200 PTS',
        img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=500',
        category: 'Entertainment',
        stock: 'In stock',
        detail: 'Single admission to any 2D screening nationwide. Redeem for a QR code ticket directly from your wallet.',
      },
      {
        name: 'Sneakers Raffle',
        cost: '200 PTS',
        img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=500',
        category: 'Drops',
        stock: 'Closes in 2d 4h',
        detail: 'Join the weekly sneaker raffle. Every entry increases your odds and winners are announced every Monday.',
      },
      {
        name: 'Burger Deal',
        cost: '850 PTS',
        img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500',
        category: 'Food',
        stock: 'Low stock',
        detail: 'Enjoy a gourmet burger combo at partner outlets. Includes fries and drink. Digital voucher delivered instantly.',
      },
      {
        name: 'Cloud Storage 6mo',
        cost: '3,400 PTS',
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500',
        category: 'Digital',
        stock: 'Popular choice',
        detail: 'Upgrade your cloud storage with a six-month premium subscription. Code can be applied to existing accounts.',
      },
      {
        name: 'Fitness Class',
        cost: '2,000 PTS',
        img: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=500',
        category: 'Wellness',
        stock: '16 spots left',
        detail: 'Join a HIIT or yoga session at participating studios. Redeem now and book your preferred schedule instantly.',
      },
    ],
    [],
  );

  const Navigation = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-3xl h-20 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-full flex items-center justify-between px-6 z-50 shadow-2xl shadow-red-900/10">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-red-500 scale-110' : 'text-zinc-500 hover:text-white'}`}
      >
        <Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2} />
        <span className="text-[10px] font-bold">HOME</span>
      </button>

      <button
        onClick={() => setActiveTab('rewards')}
        className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'rewards' ? 'text-red-500 scale-110' : 'text-zinc-500 hover:text-white'}`}
      >
        <Gift size={24} strokeWidth={activeTab === 'rewards' ? 3 : 2} />
        <span className="text-[10px] font-bold">REWARDS</span>
      </button>

      <div className="relative -top-8">
        <button
          onClick={() => setShowScanner(true)}
          className="w-16 h-16 bg-gradient-to-tr from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-600/40 border-4 border-black transform transition-transform active:scale-95 hover:scale-105"
        >
          <ScanLine size={32} className="text-white" />
        </button>
      </div>

      <button
        onClick={() => setActiveTab('activity')}
        className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'activity' ? 'text-red-500 scale-110' : 'text-zinc-500 hover:text-white'}`}
      >
        <History size={24} strokeWidth={activeTab === 'activity' ? 3 : 2} />
        <span className="text-[10px] font-bold">ACTIVITY</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'profile' ? 'text-red-500 scale-110' : 'text-zinc-500 hover:text-white'}`}
      >
        <User size={24} strokeWidth={activeTab === 'profile' ? 3 : 2} />
        <span className="text-[10px] font-bold">PROFILE</span>
      </button>
    </div>
  );

  const HomeTab = () => (
    <div className="pt-6 pb-32 px-4 space-y-6 animate-fade-in lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center font-black text-white italic shadow-lg shadow-red-800/50">
            SR
          </div>
          <div>
            <h1 className="text-white font-black text-xl leading-none">
              SNAP<span className="text-red-500">RED</span>
            </h1>
            <p className="text-zinc-400 text-xs font-medium">Hello, Alex • Keep your streak alive!</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TonConnectButton className="!bg-white !text-black !px-3 !py-2 !rounded-full !text-xs" />
          <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white relative">
            <Zap size={20} className="fill-white" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
          </button>
        </div>
      </div>

      <div className="relative w-full h-64 bg-gradient-to-br from-zinc-900/70 via-zinc-900/20 to-zinc-900/70 rounded-3xl overflow-hidden border border-zinc-800 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(248,113,113,0.25),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
            LEVEL 5
          </span>
          <span className="px-3 py-1 bg-red-600/20 text-red-200 border border-red-500/30 rounded-full text-[11px] font-bold flex items-center gap-2 animate-pulse">
            <Zap size={14} className="text-red-300" />
            Loyalist
          </span>
        </div>
        <MascotSpotlight />
        <div className="absolute bottom-5 left-0 right-0 text-center z-20">
          <p className="text-zinc-300 text-xs uppercase tracking-widest mb-1">Current Balance</p>
          <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
            {points.toLocaleString()} <span className="text-red-500 text-2xl">PTS</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[{
          title: 'Rewards',
          subtitle: 'Browse catalog',
          icon: <Trophy size={20} />,
          action: () => setActiveTab('rewards'),
          tone: 'bg-white text-black hover:bg-zinc-200',
          tag: 'HOT'
        }, {
          title: 'Scan Receipt',
          subtitle: 'Earn instant points',
          icon: <Camera size={20} />,
          action: () => setShowScanner(true),
          tone: 'bg-gradient-to-br from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400',
          tag: 'NEW'
        }, {
          title: 'Activities',
          subtitle: 'Track progress',
          icon: <History size={20} />,
          action: () => setActiveTab('activity'),
          tone: 'bg-zinc-900 text-white border border-zinc-800 hover:border-red-500/40',
          tag: 'LIVE'
        }].map((card, i) => (
          <button
            key={i}
            onClick={card.action}
            className={`${card.tone} transition-colors p-5 rounded-3xl flex flex-col justify-between h-32 group relative overflow-hidden text-left`}
          >
            <div className="absolute right-[-12px] top-[-12px] opacity-10">
              <ScanLine size={90} />
            </div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <span className="text-[10px] font-black tracking-[0.2em]">{card.tag}</span>
            </div>
            <div className="z-10">
              <p className="text-xs font-bold opacity-70">{card.subtitle}</p>
              <p className="font-bold text-xl">{card.title}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-white font-bold text-lg">Recent Scans</h3>
            <button className="text-red-500 text-xs font-bold flex items-center">
              VIEW ALL <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { store: 'Indomaret', date: 'Today, 10:23 AM', pts: '+150', icon: '🏪' },
              { store: 'Starbucks', date: 'Yesterday, 4:15 PM', pts: '+320', icon: '☕' },
              { store: 'Uniqlo', date: '24 Dec, 1:00 PM', pts: '+850', icon: '👕' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-2xl">{item.icon}</div>
                  <div>
                    <h4 className="text-white font-bold">{item.store}</h4>
                    <p className="text-zinc-500 text-xs">{item.date}</p>
                  </div>
                </div>
                <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full text-sm">{item.pts}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-bold">Daily Quests</h4>
            <span className="text-[10px] text-red-400 font-bold">REFRESH IN 02:12:33</span>
          </div>
          {[{
            title: 'Scan 2 receipts',
            reward: '+250 pts',
            progress: '1/2',
            filled: '50%'
          }, {
            title: 'Invite a friend',
            reward: '+500 pts',
            progress: '0/1',
            filled: '0%'
          }, {
            title: 'Redeem any item',
            reward: '+150 pts',
            progress: '0/1',
            filled: '0%'
          }].map((quest, i) => (
            <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-sm text-white font-semibold">
                <span>{quest.title}</span>
                <span className="text-red-400">{quest.reward}</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-orange-400" style={{ width: quest.filled }} />
              </div>
              <p className="text-[11px] text-zinc-500">Progress: {quest.progress}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RewardsTab = () => (
    <div className="pt-6 pb-32 px-4 space-y-6 animate-fade-in lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] text-red-400 font-bold">REWARD CENTER</p>
          <h1 className="text-3xl font-black text-white">Claim something special</h1>
          <p className="text-zinc-400 text-sm">Browse curated items, drops, and quests built for Snapred explorers.</p>
        </div>
        <div className="flex gap-3 text-xs font-bold">
          <span className="px-3 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-white">Balance: {points.toLocaleString()} pts</span>
          <span className="px-3 py-2 rounded-full bg-red-600/20 border border-red-500/30 text-red-200">Member tier: Loyalist</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 relative w-full h-80 rounded-3xl overflow-hidden group border border-zinc-800">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Gaming Console"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white text-black text-[11px] font-black px-3 py-1 rounded-full">LIMITED</span>
            <span className="bg-red-500/70 text-white text-[11px] font-black px-3 py-1 rounded-full">NEW BATCH</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-2xl font-bold text-white mb-2">Limited Edition Console</h2>
            <p className="text-zinc-200 text-sm mb-4">Redeem before the drop closes. Includes two wireless controllers and a digital game bundle.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
                50,000 PTS
                <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-full">20 left</span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-zinc-200 transition" onClick={() => setSelectedReward(rewardCatalog[0])}>
                  Details
                </button>
                <button className="px-4 py-2 bg-black/50 border border-white/10 text-white rounded-full text-sm font-bold hover:border-red-400 transition">
                  Save for later
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-4 h-fit">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-bold">Trending Filters</h4>
            <span className="text-[11px] text-zinc-500">Updated just now</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {['All', 'Lifestyle', 'Drops', 'Food', 'Digital', 'Wellness'].map((filter) => (
              <button
                key={filter}
                className={`px-3 py-2 rounded-full border text-white ${filter === 'All' ? 'bg-red-600 border-red-500' : 'bg-black/40 border-zinc-800 hover:border-red-500/50'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/5 space-y-1">
            <p className="text-xs text-zinc-400">Weekly highlight</p>
            <p className="text-white font-semibold">Redeem 3 food items to unlock a surprise gift.</p>
            <button className="text-red-400 text-xs font-bold mt-2">Track progress →</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewardCatalog.map((item, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-3 hover:border-red-500/50 transition"
          >
            <div className="h-36 w-full rounded-xl overflow-hidden bg-zinc-800">
              <img src={item.img} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" alt={item.name} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-sm truncate">{item.name}</h3>
                <p className="text-zinc-500 text-xs mt-1">{item.category}</p>
              </div>
              <span className="text-[11px] text-red-300 bg-red-500/10 px-2 py-1 rounded-full border border-red-500/30">{item.stock}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-red-500 font-black text-sm">{item.cost}</p>
              <div className="flex gap-2">
                <button onClick={() => setSelectedReward(item)} className="px-3 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-zinc-200 transition">
                  Detail
                </button>
                <button className="px-3 py-2 bg-black/50 border border-white/10 text-white rounded-lg text-xs font-bold hover:border-red-400 transition">
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 rounded-3xl bg-gradient-to-br from-red-600/20 to-orange-500/10 border border-red-500/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-red-200 font-semibold">QUEST</p>
              <h4 className="text-white font-bold text-lg">Weekend Discovery</h4>
            </div>
            <span className="px-3 py-1 text-[11px] bg-black/40 border border-white/10 rounded-full text-white">Ends in 12h</span>
          </div>
          <p className="text-zinc-100 text-sm mb-4">Complete two new brand scans to receive a bonus spin and exclusive merch raffle entry.</p>
          <div className="flex items-center gap-2 text-sm text-white font-semibold">
            <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-red-500 to-orange-400" />
            </div>
            <span>2/3</span>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-bold">Partner drops</h4>
            <button className="text-red-400 text-xs font-bold">See calendar</button>
          </div>
          <div className="space-y-3 text-sm text-white">
            {[['Jan 04', 'Collab sneaker drop with limited slots'], ['Jan 12', 'Mystery loot box revealed'], ['Jan 18', 'Local cafe vouchers restocked']].map((drop) => (
              <div key={drop[0]} className="flex items-center justify-between bg-black/40 border border-white/5 rounded-2xl px-4 py-3">
                <div>
                  <p className="text-[12px] text-zinc-400">{drop[0]}</p>
                  <p className="font-semibold">{drop[1]}</p>
                </div>
                <ChevronRight size={18} className="text-zinc-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ActivityTab = () => (
    <div className="pt-6 pb-32 px-4 space-y-6 animate-fade-in lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] text-red-400 font-bold">ACTIVITY</p>
          <h1 className="text-3xl font-black text-white">Every point you earned</h1>
          <p className="text-zinc-400 text-sm">Track scans, quests, and redemptions in one place.</p>
        </div>
        <button onClick={() => setShowScanner(true)} className="px-3 py-2 bg-red-600 text-white rounded-full text-xs font-bold hover:bg-red-500 transition">
          Scan now
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ label: 'Weekly points', value: '+1,220', detail: 'From 7 actions' }, { label: 'Receipts verified', value: '12', detail: '98% success rate' }, { label: 'Redeemed', value: '3', detail: 'Last 14 days' }].map((card, i) => (
          <div key={card.label} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-1">
            <p className="text-xs text-zinc-500">{card.label}</p>
            <h3 className="text-white font-black text-xl">{card.value}</h3>
            <p className="text-[11px] text-zinc-500">{card.detail}</p>
            {i === 1 && <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-1 rounded-full w-fit">Auto verification on</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-bold">Recent timeline</h4>
            <button className="text-xs text-red-400 font-bold">Export →</button>
          </div>
          <div className="space-y-3">
            {activityFeed.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 rounded-2xl bg-black/30 border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-white font-semibold">{item.title}</h5>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.pts.startsWith('+') ? 'text-green-400 bg-green-500/10' : 'text-red-300 bg-red-500/10'}`}>{item.pts}</span>
                  </div>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                  <p className="text-[11px] text-zinc-600 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-bold">Weekly breakdown</h4>
            <span className="text-[11px] text-zinc-500">PTs earned</span>
          </div>
          <div className="flex gap-2 items-end h-40">
            {[80, 120, 70, 140, 90, 110, 160].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-red-500 to-orange-400" style={{ height: `${value / 2}px` }} />
                <span className="text-[10px] text-zinc-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-sm text-white space-y-1">
            <p className="font-semibold">Keep your streak</p>
            <p className="text-zinc-400 text-xs">Scan at least once daily to maintain your 14-day streak bonus.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="pt-6 pb-32 px-4 space-y-6 animate-fade-in lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-red-600/30 via-red-500/20 to-black border border-red-500/40 rounded-3xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">🧑🏻‍🚀</div>
              <div>
                <h2 className="text-white font-black text-xl">Alex Nugraha</h2>
                <p className="text-zinc-200 text-sm">Member since Aug 2024</p>
              </div>
              <span className="ml-auto px-3 py-1 text-[11px] rounded-full bg-black/40 border border-white/10 text-white">Loyalist</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{ label: 'Points', value: points.toLocaleString() }, { label: 'Scans', value: '124' }, { label: 'Rewards', value: '18' }].map((stat) => (
                <div key={stat.label} className="p-3 rounded-2xl bg-black/40 border border-white/5">
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                  <p className="text-[11px] text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-bold">Badges</h4>
              <button className="text-xs text-red-400 font-bold">View all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {badges.map((badge) => (
                <div key={badge.label} className="p-3 rounded-2xl bg-gradient-to-br from-black via-black to-black border border-white/5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-black font-black mb-2`}>★</div>
                  <p className="text-white font-semibold text-sm">{badge.label}</p>
                  <p className="text-[11px] text-zinc-500">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-3">
            <h4 className="text-white font-bold">Preferences</h4>
            {[{ label: 'Email updates', desc: 'Weekly digest and promos' }, { label: 'Auto-claim streak', desc: 'Use points to protect streaks' }, { label: 'Push notifications', desc: 'New drops and receipts status' }].map((pref) => (
              <div key={pref.label} className="flex items-start gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-lg">🔔</div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{pref.label}</p>
                  <p className="text-[11px] text-zinc-500">{pref.desc}</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-green-500/20 border border-green-500/40 relative">
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-green-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-3">
            <h4 className="text-white font-bold">Referral</h4>
            <p className="text-zinc-400 text-sm">Share your link to earn 600 pts for every friend who completes their first scan.</p>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-white text-xs font-mono">snap.red/alex</span>
              <button className="px-3 py-2 text-xs bg-white text-black rounded-lg font-bold">Copy</button>
            </div>
            <button className="w-full py-2 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-500 transition">Invite now</button>
          </div>
        </div>
      </div>
    </div>
  );

  const RewardDetail = () => (
    <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-4 backdrop-blur-lg">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl shadow-red-900/30">
        <div className="relative h-56">
          <img src={selectedReward?.img} alt={selectedReward?.name} className="w-full h-full object-cover" />
          <button onClick={() => setSelectedReward(null)} className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-red-400 font-bold">DETAIL</p>
              <h3 className="text-white font-black text-2xl">{selectedReward?.name}</h3>
              <p className="text-zinc-500 text-sm">Category • {selectedReward?.category}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/30 text-xs font-bold">{selectedReward?.cost}</span>
          </div>
          <p className="text-zinc-200 text-sm leading-relaxed">{selectedReward?.detail}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="px-2 py-1 rounded-full bg-black/40 border border-white/5 text-white">Stock: {selectedReward?.stock}</span>
              <span className="px-2 py-1 rounded-full bg-black/40 border border-white/5 text-white">Delivery: Instant</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-sm" onClick={() => setSelectedReward(null)}>
                Close
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-500 transition">
                Redeem now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ScannerOverlay = () => (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      <div className="relative flex-1 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000"
            className="w-full h-full object-cover blur-sm"
            alt="Receipt"
          />
        </div>

        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <button
            onClick={() => setShowScanner(false)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
          >
            <X size={20} />
          </button>
          <span className="text-white font-bold bg-black/40 px-4 py-1 rounded-full backdrop-blur-md text-sm">SCAN RECEIPT</span>
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
            <Zap size={20} />
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-96 relative border-2 border-transparent">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500 rounded-br-xl" />

            <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-scan" />
          </div>
        </div>

        <div className="absolute bottom-32 left-0 right-0 text-center">
          <p className="text-white/80 font-medium text-sm bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
            Align receipt within the frame
          </p>
        </div>
      </div>

      <div className="h-28 bg-black flex items-center justify-center gap-10 px-6">
        <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white">
          <img
            src="https://cdn-icons-png.flaticon.com/512/104/104678.png"
            className="w-6 h-6 invert opacity-50"
            alt="Gallery"
          />
        </button>

        <button
          onClick={() => {
            setPoints((p) => p + 150);
            setShowScanner(false);
          }}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center relative group"
        >
          <div className="w-16 h-16 bg-red-600 rounded-full group-active:scale-90 transition-transform" />
        </button>

        <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-xs">AUTO</button>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen font-sans overflow-hidden selection:bg-red-500 selection:text-white">
      <style>
        {`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.02); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}
      </style>

      <div className="max-w-6xl mx-auto h-screen relative bg-zinc-950 overflow-y-auto scrollbar-hide shadow-2xl shadow-zinc-900 rounded-[28px] border border-zinc-900/70">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'rewards' && <RewardsTab />}
        {activeTab === 'activity' && <ActivityTab />}
        {activeTab === 'profile' && <ProfileTab />}

        <Navigation />

        {showScanner && <ScannerOverlay />}
        {selectedReward && <RewardDetail />}
      </div>
    </div>
  );
};

export default App;
