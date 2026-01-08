import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
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
  const upcomingSubscriptions: Subscription[] = [
    { id: '1', name: 'Amazon Prime', amount: '$7.49', date: 'Jan 12, 2026', color: '#4CAF50', icon: '🟢' },
    { id: '2', name: 'Chegg', amount: '$15.95', date: 'Jan 20, 2026', color: '#FF5722', icon: '🔴' },
    { id: '3', name: 'Hulu', amount: '$11.99', date: 'Jan 30, 2026', color: '#FF5722', icon: '🔴' },
    { id: '4', name: 'Quizlet', amount: '$7.99', date: 'Jan 30, 2026', color: '#4CAF50', icon: '🟢' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with decorative background */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBackground}>
          <View style={styles.blueSection} />
          <View style={styles.redSlash} />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good morning, User</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upcoming Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all &gt;&gt;</Text>
            </TouchableOpacity>
          </View>

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

        {/* Pending Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending</Text>
          <View style={styles.emptyPending}>
            <Text style={styles.emptyText}>No pending subscriptions</Text>
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
  headerContainer: {
    height: 180,
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'relative',
    height: 120,
  },
  blueSection: {
    backgroundColor: '#2c5a7f',
    height: '100%',
    width: '100%',
  },
  redSlash: {
    position: 'absolute',
    width: 150,
    height: 200,
    backgroundColor: '#D64545',
    transform: [{ rotate: '25deg' }],
    top: -50,
    right: -30,
  },
  greetingContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: -40,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#888',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#888',
  },
  subscriptionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  subscriptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subscriptionIcon: {
    fontSize: 24,
  },
  subscriptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subscriptionDate: {
    fontSize: 14,
    color: '#888',
  },
  subscriptionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  emptyPending: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
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
