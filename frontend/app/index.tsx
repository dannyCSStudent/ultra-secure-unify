// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/otp');
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to UltraSecureUnify</Text>
        <Text style={styles.subtitle}>Ultra-secure communication</Text>
        <Text style={styles.subtitle}>for the privacy-conscious</Text>
        
        <Text style={styles.icon}>🔒</Text>
        
        <Pressable style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>

        <View style={styles.legalContainer}>
          <Text style={styles.legalText}>By continuing, you agree to our</Text>
          <Link href="/terms-of-service" style={styles.legalLink}>
            Terms of Service
          </Link>
          <Text style={styles.legalText}>and</Text>
          <Link href="/privacy-policy" style={styles.legalLink}>
            Privacy Policy
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  icon: {
    fontSize: 72,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  legalContainer: {
    alignItems: 'center',
  },
  legalText: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 5,
  },
  legalLink: {
    color: '#4FC3F7',
    fontSize: 14,
    marginBottom: 5,
  },
});