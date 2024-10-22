// app/verify/[phone].tsx ---> app/screens/generate_secure_id.tsx
// this is the third screen: verify your number screen -- no redux toolkit
// verify your number screen ---> generate your secure id screen

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function PhoneVerificationScreen() {
  const { phone } = useLocalSearchParams();
  const router = useRouter();
  const { proof } = useSelector((state: RootState) => state.security);

  const handleVerify = async () => {
    try {
      // In a real implementation, you might want to re-verify the proof here
      // or perform additional checks

      // For now, we'll just assume the proof is still valid
      router.push('../screens/generate_secure_id');
    } catch (error) {
      console.error('Error during verification:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Verification Successful</Text>
       
        <Text style={styles.description}>
          Your identity has been verified using zero-knowledge proofs.
        </Text>
        <Text style={styles.phoneNumber}>{phone}</Text>
       
        <Pressable style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
  },
  phoneNumber: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 5,
  },
  resendLink: {
    color: '#4FC3F7',
    fontSize: 14,
    fontWeight: 'bold',
  },
});