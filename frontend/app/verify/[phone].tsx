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
  const { proof, publicSignals } = useSelector((state: RootState) => state.security);

  const handleVerify = async () => {
    try {
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phone,
          proof: proof,
          public_signals: publicSignals,
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      // On success, continue to secure ID screen
      router.push('../screens/generate_secure_id');
    } catch (error) {
      console.error('Error during verification:', error);
    }
  };

  return (
    <LinearGradient colors={['#1a237e', '#283593', '#3949ab']} style={styles.container}>
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
});
