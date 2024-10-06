// app/phone-number-entry.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function PhoneNumberEntryScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSendVerificationCode = () => {
    // Here you would typically send the verification code to the phone number
    // For now, we'll just navigate to the next screen
    
    router.push(`/verify/${encodeURIComponent(phoneNumber)}`);
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Enter Your Phone Number</Text>
        
        <TextInput
          style={styles.input}
          placeholder="+1 (___) ___-____"
          placeholderTextColor="#a0a0a0"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        
        <Text style={styles.description}>
          We'll send a verification code to this number
        </Text>
        
        <Pressable style={styles.button} onPress={handleSendVerificationCode}>
          <Text style={styles.buttonText}>Send Verification Code</Text>
        </Pressable>

        <Text style={styles.footer}>
          Your number is only used for verification{'\n'}and will not be stored or shared
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