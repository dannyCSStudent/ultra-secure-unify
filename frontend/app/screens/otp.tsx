// app/screens/otp.tsx ---> app/verify/[phone].tsx
// this is the second screen: enter your phone number screen  
// enter your phone number screen ---> verify your phone number screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { setPhoneNumber, setProof } from '../../store/slices/securitySlice';
import { generateProof, serializeProof } from '../zkpUtils';

export default function PhoneNumberEntryScreen() {
  const [phoneNumber, setPhoneNumberLocal] = useState('');
  const [password, setPassword] = useState(''); // New state for password
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSendVerificationCode = async () => {
    try {
      // Generate ZKP
      const { proof, publicSignals } = await generateProof(phoneNumber, password);
      const serializedProof = serializeProof(proof);

      dispatch(setPhoneNumber(phoneNumber));
      dispatch(setProof(serializedProof));

      const response = await fetch('http://127.0.0.1:8080/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone_number: phoneNumber,
          proof: serializedProof,
          public_signals: publicSignals
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      // Store the authentication token securely
      // For example, you might use a secure storage solution like react-native-keychain

      router.push(`/verify/${encodeURIComponent(phoneNumber)}`);
    } catch (error) {
      console.error('Error during authentication:', error);
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
        <Text style={styles.title}>Enter Your Phone Number and Password</Text>
       
        <TextInput
          style={styles.input}
          placeholder="+1 (___) ___-____"
          placeholderTextColor="#a0a0a0"
          value={phoneNumber}
          onChangeText={setPhoneNumberLocal}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#a0a0a0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
       
        <Text style={styles.description}>
          We'll use this information to securely authenticate you
        </Text>
       
        <Pressable style={styles.button} onPress={handleSendVerificationCode}>
          <Text style={styles.buttonText}>Authenticate</Text>
        </Pressable>

        <Text style={styles.footer}>
          Your information is securely processed and not stored
        </Text>
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
  input: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  description: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
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
  footer: {
    color: '#e0e0e0',
    fontSize: 14,
    textAlign: 'center',
  },
});