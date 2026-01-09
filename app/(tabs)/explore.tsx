import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { fetchUserSubscriptions, SubscriptionData } from '../../lib/api';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [userData, setUserData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      const data = await fetchUserSubscriptions('user_001');
      setUserData(data);
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
      </View>

      {/* Settings Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2c5a7f" />
            <Text style={styles.loadingText}>Loading your information...</Text>
          </View>
        ) : userData ? (
          <>
            {/* Payment Method Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              
              <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardLabel}>Card</Text>
                </View>
                <Text style={styles.cardNumber}>{userData.cardNumber}</Text>
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardSmallLabel}>Card Holder</Text>
                    <Text style={styles.cardSmallValue}>{userData.cardHolderName}</Text>
                  </View>
                  <View style={styles.cardRightColumn}>
                    <Text style={styles.cardSmallLabel}>Expires</Text>
                    <Text style={styles.cardSmallValue}>{userData.expiryDate}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Account Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{userData.cardHolderName}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Total Subscriptions</Text>
                <Text style={styles.infoValue}>{userData.subscriptions.length}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Monthly Spending</Text>
                <Text style={styles.infoValue}>
                  ${userData.subscriptions
                    .reduce((sum, sub) => sum + sub.paymentAmount, 0)
                    .toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Preferences Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              
              <View style={styles.settingItem}>
                <View>
                  <Text style={styles.settingLabel}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>Get alerts for subscription changes</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#ddd', true: '#2c5a7f' }}
                  thumbColor="#fff"
                />
              </View>

              <View style={styles.settingItem}>
                <View>
                  <Text style={styles.settingLabel}>Budget Alerts</Text>
                  <Text style={styles.settingDescription}>Notify when spending exceeds limit</Text>
                </View>
                <Switch
                  value={budgetAlerts}
                  onValueChange={setBudgetAlerts}
                  trackColor={{ false: '#ddd', true: '#2c5a7f' }}
                  thumbColor="#fff"
                />
              </View>
            </View>

            {/* Support Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              
              <TouchableOpacity style={styles.settingItemWithArrow}>
                <View>
                  <Text style={styles.settingLabel}>Help Center</Text>
                  <Text style={styles.settingDescription}>Browse FAQs and guides</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItemWithArrow}>
                <View>
                  <Text style={styles.settingLabel}>Contact Support</Text>
                  <Text style={styles.settingDescription}>Reach out to our team</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Sign Out Button */}
            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.signOutButton}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Unable to load your information</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/chatbot')}>
          <Ionicons name="chatbubbles-outline" size={28} color="#2c5a7f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)')}>
          <Ionicons name="home-outline" size={28} color="#2c5a7f" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <View style={styles.navIconCircle}>
            <Ionicons name="settings" size={24} color="#fff" />
          </View>
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
    height: 140,
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'relative',
    height: 140,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorText: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c5a7f',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardContainer: {
    backgroundColor: '#2c5a7f',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardSmallLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    marginBottom: 4,
  },
  cardSmallValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cardRightColumn: {
    alignItems: 'flex-end',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c5a7f',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItemWithArrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#888',
  },
  buttonSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  signOutButton: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#D64545',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
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
    // Active styling
  },
  navIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2c5a7f',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

