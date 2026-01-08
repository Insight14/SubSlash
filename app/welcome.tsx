import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // auto-start fade-out after short delay
    timeoutRef.current = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        router.replace('/signup');
      });
    }, 800) as unknown as number;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current as any);
    };
  }, [opacity, router]);

  const handleSkip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current as any);
      timeoutRef.current = null;
    }
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => router.replace('/signup'));
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}> 
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
        onPress={handleSkip}
        activeOpacity={0.8}
      >
        <Text style={styles.tagline}>"What's in your subscription?"</Text>
      </TouchableOpacity>
    </Animated.View>
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
