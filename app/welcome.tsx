import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoText}>sub</Text>
          </View>
          <View style={styles.redSlash} />
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.taglineContainer}
        onPress={() => router.push('/signup')}
        activeOpacity={0.8}
      >
        <Text style={styles.tagline}>"What's in your subscription?"</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoBox: {
    width: 150,
    height: 150,
    position: 'relative',
  },
  logoBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#004B87',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
  },
  redSlash: {
    position: 'absolute',
    width: 50,
    height: 180,
    backgroundColor: '#D64545',
    transform: [{ rotate: '25deg' }],
    top: -15,
    right: -5,
  },
  taglineContainer: {
    marginTop: 20,
  },
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});
