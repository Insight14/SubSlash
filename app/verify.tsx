import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { supabase } from '../lib/supabase';

export default function VerifyScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const opacity = useRef(new Animated.Value(0)).current;

  const [code, setCode] = useState(['', '', '', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [opacity]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleCodeChange = (text: string, index: number) => {
    // Allow letters and numbers
    const cleanText = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    if (cleanText.length <= 1) {
      const newCode = [...code];
      newCode[index] = cleanText;
      setCode(newCode);

      // Auto-focus next input
      if (cleanText && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (cleanText.length === 8) {
      // Handle paste of full code
      const newCode = cleanText.split('');
      setCode(newCode);
      inputRefs.current[7]?.focus();
    }
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 8) {
      Alert.alert('Error', 'Please enter the complete 8-character code');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Email not found. Please go back and try again.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: fullCode,
      type: 'signup',
    });

    setLoading(false);

    if (error) {
      Alert.alert('Verification Failed', error.message);
      return;
    }

    // Successfully verified - navigate to main app
    router.replace('/(tabs)');
  };

  const handleResendCode = async () => {
    if (!email || resendCooldown > 0) return;

    setResendLoading(true);

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    setResendLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    setResendCooldown(60);
    Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
  };

  return (
    <Animated.View style={{ flex: 1, opacity }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Verify Your{'\n'}Email</Text>
            <Text style={styles.subtitle}>
              We sent an 8-character code to{'\n'}
              <Text style={styles.emailText}>{email}</Text>
            </Text>
          </View>

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeInput,
                  digit && styles.codeInputFilled,
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoCapitalize="characters"
                maxLength={index === 0 ? 8 : 1}
                selectTextOnFocus
                editable={!loading}
              />
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.verifyButton, loading && styles.buttonDisabled]}
            onPress={handleVerify}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive a code? </Text>
            <TouchableOpacity 
              onPress={handleResendCode}
              disabled={resendLoading || resendCooldown > 0}
            >
              {resendLoading ? (
                <ActivityIndicator size="small" color="#004B87" />
              ) : (
                <Text style={[
                  styles.resendLink,
                  resendCooldown > 0 && styles.resendLinkDisabled
                ]}>
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Back to Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004B87',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  emailText: {
    color: '#004B87',
    fontWeight: '600',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  codeInput: {
    width: 40,
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
  codeInputFilled: {
    backgroundColor: '#E8F4FD',
    borderWidth: 2,
    borderColor: '#004B87',
  },
  verifyButton: {
    backgroundColor: '#D64545',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  resendText: {
    fontSize: 14,
    color: '#888',
  },
  resendLink: {
    fontSize: 14,
    color: '#004B87',
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: '#888',
  },
  backButton: {
    marginTop: 32,
  },
  backButtonText: {
    fontSize: 14,
    color: '#888',
  },
});

