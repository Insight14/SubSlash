import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchUserSubscriptions, SubscriptionData } from '../lib/api';

interface Subscription {
  id: string;
  name: string;
  amount: string;
  date: string;
  color: string;
  icon: string;
}

export default function DashboardScreen() {
  const [userData, setUserData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [upcomingSubscriptions, setUpcomingSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      const data = await fetchUserSubscriptions('user_001');
      setUserData(data);
      
      if (data) {
        // Transform backend data to match UI format
        const transformed = data.subscriptions.map((sub, index) => ({
          id: String(index + 1),
          name: sub.name,
          amount: `$${sub.paymentAmount.toFixed(2)}`,
          date: new Date(sub.expiryDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          color: sub.status === 'Active' ? '#4CAF50' : '#FF5722',
          icon: sub.status === 'Active' ? '🟢' : '🔴',
        }));
        setUpcomingSubscriptions(transformed);
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with decorative background */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBackground}>
          <View style={styles.blueSection} />
          <View style={styles.redSlash} />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good morning, {userData?.cardHolderName || 'User'}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#004B87" />
            <Text style={styles.loadingText}>Loading your subscriptions...</Text>
          </View>
        ) : upcomingSubscriptions.length > 0 ? (
          <>
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
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No subscriptions found</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <View style={styles.navIconCircle}>
            <Text style={styles.navIconHome}>🏠</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
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
    backgroundColor: '#004B87',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888',
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
  emptyContainer: {
    paddingVertical: 60,
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
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    // Active state styling
  },
  navIcon: {
    fontSize: 28,
  },
  navIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#004B87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconHome: {
    fontSize: 28,
  },
});
