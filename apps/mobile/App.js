import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
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
  const manifestUrl = 'https://snapred-web.vercel.app/tonconnect-manifest.json';
  const connector = useMemo(() => new TonConnect({ manifestUrl }), [manifestUrl]);

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
          <TouchableOpacity style={[styles.iconBtn, styles.connectBtn]} onPress={handleTonConnect}>
            <Text style={styles.connectText}>Connect TON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="flash" size={18} color="#fff" />
            <View style={styles.iconDot} />
          </TouchableOpacity>
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
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionCard, styles.lightCard]} onPress={() => setTab('rewards')}>
            <Feather name="award" size={20} color="#0f172a" />
            <Text style={styles.actionLabel}>Redeem</Text>
            <Text style={styles.actionTitle}>Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, styles.redCard]} onPress={() => setPoints(points + 150)}>
            <Feather name="camera" size={20} color="#fff" />
            <Text style={[styles.actionLabel, styles.redLabel]}>Camera</Text>
            <Text style={[styles.actionTitle, styles.whiteText]}>Scan Receipt</Text>
          </TouchableOpacity>
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
  },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelChip: { backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12, fontWeight: '700', fontSize: 12 },
  balanceBody: { paddingVertical: 16 },
  balanceLabel: { color: '#94a3b8', fontSize: 13, marginBottom: 4 },
  balanceValue: { color: '#fff', fontWeight: '900', fontSize: 28 },
  actionsRow: { flexDirection: 'row', gap: 12 },
  actionCard: { flex: 1, padding: 14, borderRadius: 18, gap: 8 },
  lightCard: { backgroundColor: '#e5e7eb' },
  redCard: { backgroundColor: '#ef4444' },
  actionLabel: { fontSize: 12, fontWeight: '700', color: '#475569' },
  actionTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  redLabel: { color: '#fee2e2' },
  whiteText: { color: '#fff' },
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
});
