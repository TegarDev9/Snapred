import React, { useEffect, useRef, useState } from 'react';
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

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

const MascotCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = THREE_CDN;
    script.async = true;
    script.onload = () => initThreeJS();
    document.body.appendChild(script);

    let scene;
    let camera;
    let renderer;
    let mascotGroup;
    let animationId;

    const initThreeJS = () => {
      if (!mountRef.current || !window.THREE) return;
      const THREE = window.THREE;

      scene = new THREE.Scene();
      scene.background = null;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      const redLight = new THREE.PointLight(0xff0000, 2, 10);
      redLight.position.set(-2, 2, 2);
      scene.add(redLight);

      mascotGroup = new THREE.Group();

      const bodyGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0x550000,
        emissiveIntensity: 0.2,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      mascotGroup.add(body);

      const eyeGeo = new THREE.SphereGeometry(0.35, 32, 32);
      const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });

      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.4, 0.3, 0.9);
      mascotGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(0.4, 0.3, 0.9);
      mascotGroup.add(rightEye);

      const pupilGeo = new THREE.SphereGeometry(0.15, 32, 32);
      const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

      const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
      leftPupil.position.set(-0.4, 0.35, 1.18);
      mascotGroup.add(leftPupil);

      const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
      rightPupil.position.set(0.4, 0.35, 1.18);
      mascotGroup.add(rightPupil);

      const earGeo = new THREE.ConeGeometry(0.2, 0.6, 32);
      const earMat = new THREE.MeshStandardMaterial({ color: 0xcc0000 });

      const leftEar = new THREE.Mesh(earGeo, earMat);
      leftEar.position.set(-0.8, 1, 0);
      leftEar.rotation.z = 0.5;
      mascotGroup.add(leftEar);

      const rightEar = new THREE.Mesh(earGeo, earMat);
      rightEar.position.set(0.8, 1, 0);
      rightEar.rotation.z = -0.5;
      mascotGroup.add(rightEar);

      scene.add(mascotGroup);

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        if (mascotGroup) {
          const time = Date.now() * 0.002;
          mascotGroup.position.y = Math.sin(time) * 0.2;
          mascotGroup.rotation.y = Math.sin(time * 0.5) * 0.2;
        }

        renderer.render(scene, camera);
      };
      animate();
    };

    const handleResize = () => {
      if (mountRef.current && camera && renderer) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      if (animationId) cancelAnimationFrame(animationId);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showScanner, setShowScanner] = useState(false);
  const [points, setPoints] = useState(2450);

  const Navigation = () => (
    <div className="fixed bottom-6 left-4 right-4 h-20 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-full flex items-center justify-between px-6 z-50 shadow-2xl shadow-red-900/10">
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
    <div className="pt-4 pb-32 px-4 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-white italic">SR</div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">
              SNAP<span className="text-red-500">RED</span>
            </h1>
            <p className="text-zinc-500 text-xs font-medium">Hello, Alex!</p>
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

      <div className="relative w-full h-64 bg-zinc-900/50 rounded-3xl overflow-hidden border border-zinc-800 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none" />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
            LEVEL 5
          </span>
        </div>
        <MascotCanvas />
        <div className="absolute bottom-4 left-0 right-0 text-center z-20">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Current Balance</p>
          <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
            {points.toLocaleString()} <span className="text-red-500 text-2xl">PTS</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('rewards')}
          className="bg-white hover:bg-zinc-200 transition-colors p-5 rounded-3xl flex flex-col justify-between h-32 group"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Trophy size={20} className="text-black" />
          </div>
          <div className="text-left">
            <p className="text-zinc-500 text-xs font-bold">REDEEM</p>
            <p className="text-black font-bold text-xl">Rewards</p>
          </div>
        </button>
        <button className="bg-red-600 hover:bg-red-500 transition-colors p-5 rounded-3xl flex flex-col justify-between h-32 group relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] opacity-20">
            <ScanLine size={100} className="text-white" />
          </div>
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform z-10">
            <Camera size={20} className="text-white" />
          </div>
          <div className="text-left z-10">
            <p className="text-red-200 text-xs font-bold">CAMERA</p>
            <p className="text-white font-bold text-xl">Scan Receipt</p>
          </div>
        </button>
      </div>

      <div>
        <div className="flex justify-between items-end mb-4">
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
    </div>
  );

  const RewardsTab = () => (
    <div className="pt-4 pb-32 px-4 space-y-6 animate-fade-in">
      <h1 className="text-3xl font-black text-white mb-2">
        REWARDS<span className="text-red-500">.</span>
      </h1>

      <div className="relative w-full h-80 rounded-3xl overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt="Gaming Console"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">HOT ITEM</div>
          <h2 className="text-2xl font-bold text-white mb-1">Limited Edition Console</h2>
          <div className="flex justify-between items-center mt-3">
            <span className="text-yellow-400 font-bold text-xl">50,000 PTS</span>
            <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-zinc-200 transition">Details</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          {
            name: 'Coffee Voucher',
            cost: '500 PTS',
            img: 'https://images.unsplash.com/photo-1517256673644-36ad113cd472?auto=format&fit=crop&q=80&w=500',
          },
          {
            name: 'Movie Ticket',
            cost: '1,200 PTS',
            img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=500',
          },
          {
            name: 'Sneakers Raffle',
            cost: '200 PTS',
            img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=500',
          },
          {
            name: 'Burger Deal',
            cost: '850 PTS',
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500',
          },
        ].map((item, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex flex-col gap-3">
            <div className="h-32 w-full rounded-xl overflow-hidden bg-zinc-800">
              <img src={item.img} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt={item.name} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm truncate">{item.name}</h3>
              <p className="text-red-500 font-bold text-xs mt-1">{item.cost}</p>
            </div>
            <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white text-xs font-bold transition-colors">Redeem</button>
          </div>
        ))}
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
      `}
      </style>

      <div className="max-w-md mx-auto h-screen relative bg-zinc-950 overflow-y-auto scrollbar-hide shadow-2xl shadow-zinc-900">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'rewards' && <RewardsTab />}
        {(activeTab === 'activity' || activeTab === 'profile') && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-600 space-y-4">
            <User size={64} className="opacity-20" />
            <p className="font-bold">Profile & Activity Coming Soon</p>
            <button onClick={() => setActiveTab('home')} className="text-red-500 font-bold text-sm">
              Go Home
            </button>
          </div>
        )}

        <Navigation />

        {showScanner && <ScannerOverlay />}
      </div>
    </div>
  );
};

export default App;
