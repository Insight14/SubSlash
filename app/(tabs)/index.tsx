import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Subscription {
  id: string;
  name: string;
  amount: string;
  date: string;
  color: string;
  icon: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const upcomingSubscriptions: Subscription[] = [
    { id: '1', name: 'Amazon Prime', amount: '$7.49', date: 'Jan 12, 2026', color: '#4CAF50', icon: '🟢' },
    { id: '2', name: 'Chegg', amount: '$15.95', date: 'Jan 20, 2026', color: '#FF5722', icon: '🔴' },
    { id: '3', name: 'Hulu', amount: '$11.99', date: 'Jan 30, 2026', color: '#FF5722', icon: '🔴' },
    { id: '4', name: 'Quizlet', amount: '$7.99', date: 'Jan 30, 2026', color: '#4CAF50', icon: '🟢' },
  ];
  const suggestions: Subscription[] = [
    { id: 's1', name: 'Apple Music', amount: '$5.99', date: 'Feb 2, 2026', color: '#FFD54F', icon: '🎵' },
    { id: 's2', name: 'Chegg', amount: '$12.99', date: 'Feb 16, 2026', color: '#FFD54F', icon: '📚' },
  ];

  return (
    <View style={styles.container}>
      {/* Top Blue Bar with icons */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setDrawerOpen(true)}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.topIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
            <Ionicons name="share-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting (centered) */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Good morning, James</Text>
      </View>

      {/* Drawer overlay + panel */}
      {drawerOpen && (
        <>
          <TouchableOpacity style={styles.drawerOverlay} onPress={() => setDrawerOpen(false)} />
          <View style={styles.drawer}>
            <TouchableOpacity style={styles.drawerItem} onPress={() => { setDrawerOpen(false); router.push('/(tabs)/budget'); }}>
              <Text style={styles.drawerItemText}>Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => { setDrawerOpen(false); router.push('/(tabs)'); }}>
              <Text style={styles.drawerItemText}>Usage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => { setDrawerOpen(false); router.push('/(tabs)/chatbot'); }}>
              <Text style={styles.drawerItemText}>Chatbot</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.drawerItem} onPress={() => { setDrawerOpen(false); /* TODO: handle logout */ }}>
              <Text style={styles.drawerItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all &gt;&gt;</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardList}>
            {upcomingSubscriptions.map((sub) => (
              <View key={sub.id} style={styles.subscriptionItem}>
                <View style={styles.subscriptionLeft}>
                  <Text style={styles.subscriptionIcon}>{sub.icon}</Text>
                  <View>
                    <Text style={styles.subscriptionName}>{sub.name}</Text>
                    <Text style={styles.subscriptionDate}>{sub.date}</Text>
                  </View>
                </View>
                {sub.amount !== '' && (
                  <Text style={styles.subscriptionAmount}>{sub.amount}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Suggestions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suggestions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all &gt;&gt;</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardList}>
            {suggestions.map((s) => (
              <View key={s.id} style={styles.subscriptionItem}>
                <View style={styles.subscriptionLeft}>
                  <Text style={styles.subscriptionIcon}>{s.icon}</Text>
                  <View>
                    <Text style={styles.subscriptionName}>{s.name}</Text>
                    <Text style={styles.subscriptionDate}>{s.date}</Text>
                  </View>
                </View>
                {s.amount !== '' && (
                  <Text style={styles.subscriptionAmount}>{s.amount}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/chatbot')}>
          <Ionicons name="chatbubbles-outline" size={28} color="#2c5a7f" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => router.push('/(tabs)')}>
          <View style={styles.navIconCircle}>
            <Ionicons name="home" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/explore')}>
          <Ionicons name="settings-outline" size={28} color="#2c5a7f" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: '#004B87',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
  },
  menuButton: {
    padding: 8,
  },
  topIcons: {
    flexDirection: 'row',
    gap: 14,
  },
  iconButton: {
    padding: 8,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 8,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 200,
    backgroundColor: '#004B87',
    paddingTop: 60,
    paddingHorizontal: 14,
    zIndex: 9,
  },
  drawerItem: {
    paddingVertical: 16,
  },
  drawerItemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  greetingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  section: {
    marginTop: 12,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004B87',
  },
  viewAll: {
    fontSize: 14,
    color: '#D64545',
    fontWeight: '600',
  },
  subscriptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  subscriptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subscriptionIcon: {
    fontSize: 22,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF6E0',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  subscriptionName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  subscriptionDate: {
    fontSize: 12,
    color: '#888',
  },
  subscriptionAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#004B87',
  },
  emptyPending: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  navItem: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    // Active state styling
  },
  navIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2c5a7f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
