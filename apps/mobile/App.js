import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { TonConnect } from '@tonconnect/sdk';

const recentScans = [
  { id: '1', store: 'Indomaret', date: 'Today, 10:23 AM', pts: '+150', emoji: '🏪' },
  { id: '2', store: 'Starbucks', date: 'Yesterday, 4:15 PM', pts: '+320', emoji: '☕' },
  { id: '3', store: 'Uniqlo', date: '24 Dec, 1:00 PM', pts: '+850', emoji: '👕' },
];

export default function App() {
  const [tab, setTab] = useState('home');
  const [points, setPoints] = useState(2450);
  const [showScanner, setShowScanner] = useState(false);
  const [scanStatus, setScanStatus] = useState('idle');
  const [lastScan, setLastScan] = useState(null);
  const manifestUrl = 'https://snapred-web.vercel.app/tonconnect-manifest.json';
  const connector = useMemo(() => new TonConnect({ manifestUrl }), [manifestUrl]);
  const mascotBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotBounce, { toValue: -6, duration: 1200, useNativeDriver: true }),
        Animated.timing(mascotBounce, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [mascotBounce]);

  const handleTonConnect = async () => {
    try {
      const wallets = await connector.getWallets();
      const targetWallet = wallets.find((wallet) => wallet.appName?.toLowerCase().includes('tonkeeper')) || wallets[0];
      if (targetWallet) {
        const link = await connector.connect({
          universalLink: targetWallet.universalLink,
          bridgeUrl: targetWallet.bridgeUrl,
        });
        if (link) {
          await Linking.openURL(link);
        }
      }
    } catch (error) {
      console.warn('TON connect failed', error);
    }
  };

  const renderScan = ({ item }) => (
    <View style={styles.scanCard}>
      <View style={styles.scanLeft}>
        <View style={styles.scanEmoji}><Text style={styles.scanEmojiText}>{item.emoji}</Text></View>
        <View>
          <Text style={styles.scanTitle}>{item.store}</Text>
          <Text style={styles.scanMeta}>{item.date}</Text>
        </View>
      </View>
      <Text style={styles.scanPts}>{item.pts}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.brandWrap}>
            <View style={styles.brandMark}><Text style={styles.brandMarkText}>SR</Text></View>
            <View>
              <Text style={styles.brandTitle}>SNAP<Text style={styles.brandAccent}>RED</Text></Text>
              <Text style={styles.brandSubtitle}>Hello, Alex!</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={[styles.chip, scanStatus === 'processing' ? styles.chipAmber : styles.chipGreen]}>
              <Feather name="camera" size={14} color={scanStatus === 'processing' ? '#f59e0b' : '#22c55e'} />
              <Text style={[styles.chipText, scanStatus === 'processing' ? styles.chipAmberText : styles.chipGreenText]}>
                {scanStatus === 'processing' ? 'Memproses' : 'Siap scan'}
              </Text>
            </View>
            <TouchableOpacity style={[styles.iconBtn, styles.connectBtn]} onPress={handleTonConnect}>
              <Text style={styles.connectText}>Connect TON</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="flash" size={18} color="#fff" />
              <View style={styles.iconDot} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.levelChip}>LEVEL 5</Text>
            <Feather name="zap" size={18} color="#f87171" />
          </View>
          <View style={styles.balanceBody}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceValue}>{points.toLocaleString()} PTS</Text>
          </View>
          <Animated.View
            style={[
              styles.mascotBubble,
              { transform: [{ translateY: mascotBounce }, { scale: mascotBounce.interpolate({ inputRange: [-6, 0], outputRange: [1.02, 1] }) }] },
            ]}
          >
            <View style={styles.mascotOrb}>
              <View style={styles.mascotGlow} />
              <View style={styles.mascotFace}>
                <Ionicons name="planet" size={30} color="#0f172a" />
                <Text style={styles.mascotText}>SR</Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionCard, styles.lightCard]} onPress={() => setTab('rewards')}>
            <Feather name="award" size={20} color="#0f172a" />
            <Text style={styles.actionLabel}>Redeem</Text>
            <Text style={styles.actionTitle}>Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, styles.redCard]}
            onPress={() => {
              setShowScanner(true);
            }}
          >
            <Feather name="camera" size={20} color="#fff" />
            <Text style={[styles.actionLabel, styles.redLabel]}>Camera</Text>
            <Text style={[styles.actionTitle, styles.whiteText]}>Scan Receipt</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lastScanCard}>
          <View>
            <Text style={styles.sectionLabel}>Terakhir scan</Text>
            <Text style={styles.lastScanTitle}>{lastScan?.store || 'Belum ada struk'}</Text>
            <Text style={styles.sectionCaption}>{lastScan?.time || 'Buka scanner untuk mulai'}</Text>
          </View>
          <View style={[styles.lastScanBadge, scanStatus === 'processing' ? styles.badgeAmber : styles.badgeGreen]}>
            <Text style={styles.lastScanBadgeText}>
              {scanStatus === 'processing' ? 'Memproses' : lastScan ? `+${lastScan.points} pts` : 'Siap'}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>
        <FlatList data={recentScans} renderItem={renderScan} keyExtractor={(item) => item.id} scrollEnabled={false} />
      </View>

      <View style={styles.navbar}>
        {[
          { id: 'home', icon: 'home' },
          { id: 'rewards', icon: 'gift' },
          { id: 'activity', icon: 'clock' },
          { id: 'profile', icon: 'user' },
        ].map((item) => (
          <TouchableOpacity key={item.id} onPress={() => setTab(item.id)} style={styles.navItem}>
            <Feather
              name={item.icon}
              size={22}
              color={tab === item.id ? '#ef4444' : '#94a3b8'}
              style={{ marginBottom: 4 }}
            />
            <Text style={[styles.navLabel, tab === item.id && styles.navLabelActive]}>{item.id.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showScanner && (
        <View style={styles.scannerOverlay}>
          <View style={styles.scannerCard}>
            <View style={styles.scannerHeader}>
              <TouchableOpacity
                style={styles.scannerIconBtn}
                onPress={() => {
                  setShowScanner(false);
                  setScanStatus('idle');
                }}
              >
                <Feather name="x" size={18} color="#e2e8f0" />
              </TouchableOpacity>
              <View style={[styles.chip, scanStatus === 'processing' ? styles.chipAmber : styles.chipGreen]}>
                <Feather name="camera" size={14} color={scanStatus === 'processing' ? '#f59e0b' : '#22c55e'} />
                <Text style={[styles.chipText, scanStatus === 'processing' ? styles.chipAmberText : styles.chipGreenText]}>
                  {scanStatus === 'processing' ? 'Memproses' : 'Siap memindai'}
                </Text>
              </View>
              <TouchableOpacity style={styles.scannerIconBtn}>
                <Feather name="zap" size={18} color="#e2e8f0" />
              </TouchableOpacity>
            </View>

            <View style={styles.scannerViewport}>
              <View style={styles.scannerFrame} />
              <Text style={styles.scannerStatus}>
                {scanStatus === 'processing' ? 'Memproses struk...' : 'Arahkan kamera ke struk belanja'}
              </Text>
            </View>

            <View style={styles.scannerActions}>
              <TouchableOpacity style={styles.scannerGhost}><Text style={styles.scannerGhostText}>Galeri</Text></TouchableOpacity>
              <TouchableOpacity
                style={styles.scanCta}
                onPress={() => {
                  setScanStatus('processing');
                  setTimeout(() => {
                    setPoints((p) => p + 150);
                    setLastScan({
                      store: 'Hypermart',
                      points: 150,
                      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                    });
                    setScanStatus('success');
                    setTimeout(() => {
                      setShowScanner(false);
                      setScanStatus('idle');
                    }, 600);
                  }, 900);
                }}
              >
                <Text style={styles.scanCtaText}>Scan Struk</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scannerGhost}><Text style={styles.scannerGhostText}>Auto</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0f',
    padding: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandWrap: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  brandMark: { width: 44, height: 44, backgroundColor: '#ef4444', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  brandMarkText: { color: '#fff', fontWeight: '900', fontStyle: 'italic' },
  brandTitle: { color: '#fff', fontWeight: '800', fontSize: 18 },
  brandAccent: { color: '#f87171' },
  brandSubtitle: { color: '#94a3b8', fontSize: 12 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#0b1220', borderWidth: 1, borderColor: '#1f2937', alignItems: 'center', justifyContent: 'center' },
  iconDot: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444', borderWidth: 2, borderColor: '#0b0b0f' },
  connectBtn: { paddingHorizontal: 14, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', marginRight: 8 },
  connectText: { color: '#0b1220', fontWeight: '800', fontSize: 12 },
  balanceCard: {
    backgroundColor: '#101828',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    position: 'relative',
  },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelChip: { backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12, fontWeight: '700', fontSize: 12 },
  balanceBody: { paddingVertical: 16 },
  balanceLabel: { color: '#94a3b8', fontSize: 13, marginBottom: 4 },
  balanceValue: { color: '#fff', fontWeight: '900', fontSize: 28 },
  mascotBubble: {
    position: 'absolute',
    right: 12,
    top: 28,
    backgroundColor: 'rgba(239,68,68,0.12)',
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.35)',
    shadowColor: '#ef4444',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  mascotOrb: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mascotGlow: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: 999,
    backgroundColor: 'rgba(248,113,113,0.25)',
    opacity: 0.8,
  },
  mascotFace: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fecdd3',
  },
  mascotText: { fontWeight: '900', color: '#0f172a', fontSize: 12, marginTop: 4 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#0f172a',
  },
  chipText: { fontWeight: '800', fontSize: 12 },
  chipGreen: { backgroundColor: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.3)' },
  chipAmber: { backgroundColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.3)' },
  chipGreenText: { color: '#22c55e' },
  chipAmberText: { color: '#f59e0b' },
  actionsRow: { flexDirection: 'row', gap: 12 },
  actionCard: { flex: 1, padding: 14, borderRadius: 18, gap: 8 },
  lightCard: { backgroundColor: '#e5e7eb' },
  redCard: { backgroundColor: '#ef4444' },
  actionLabel: { fontSize: 12, fontWeight: '700', color: '#475569' },
  actionTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  redLabel: { color: '#fee2e2' },
  whiteText: { color: '#fff' },
  lastScanCard: {
    marginTop: 8,
    backgroundColor: '#0b1220',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: { color: '#94a3b8', fontSize: 12, marginBottom: 2 },
  lastScanTitle: { color: '#e2e8f0', fontWeight: '800', fontSize: 16 },
  sectionCaption: { color: '#94a3b8', fontSize: 12 },
  lastScanBadge: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#0f172a',
  },
  lastScanBadgeText: { fontWeight: '800', color: '#e2e8f0', fontSize: 12, textTransform: 'uppercase' },
  badgeGreen: { backgroundColor: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.3)' },
  badgeAmber: { backgroundColor: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.3)' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  sectionTitle: { color: '#fff', fontWeight: '800', fontSize: 16 },
  viewAll: { color: '#f87171', fontWeight: '700', fontSize: 12 },
  scanCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  scanLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scanEmoji: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center' },
  scanEmojiText: { fontSize: 20 },
  scanTitle: { color: '#fff', fontWeight: '800' },
  scanMeta: { color: '#94a3b8', fontSize: 12 },
  scanPts: { color: '#22c55e', fontWeight: '800' },
  navbar: {
    height: 72,
    backgroundColor: '#0b0f1a',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navLabel: { color: '#94a3b8', fontWeight: '800', fontSize: 11 },
  navLabelActive: { color: '#ef4444' },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scannerCard: {
    width: '100%',
    backgroundColor: '#0b0c11',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 16,
    gap: 14,
  },
  scannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scannerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  scannerViewport: {
    height: 260,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.35)',
    backgroundColor: 'rgba(239,68,68,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    width: 200,
    height: 200,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'rgba(239,68,68,0.9)',
  },
  scannerStatus: {
    position: 'absolute',
    bottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(15,23,42,0.9)',
    borderWidth: 1,
    borderColor: '#1f2937',
    color: '#e2e8f0',
    fontWeight: '700',
  },
  scannerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  scannerGhost: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#0f172a',
  },
  scannerGhostText: { color: '#e2e8f0', fontWeight: '800' },
  scanCta: {
    flex: 1.2,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ef4444',
  },
  scanCtaText: { color: '#fff', fontWeight: '900', letterSpacing: 0.2 },
});
