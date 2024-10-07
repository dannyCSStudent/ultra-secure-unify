import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function PhoneVerificationScreen() {
  const [verificationCode, setVerificationCode] = useState('');
  const { phone } = useLocalSearchParams();
  const router = useRouter();

  const handleVerify = () => {
    // Here you would typically verify the code with your backend
    // For now, we'll just simulate a successful verification
    console.log('Verification code:', verificationCode);
    // Navigate to the next screen (e.g., dashboard or profile setup)
    router.push('../screens/generate_secure_id');
  };

  const handleResendCode = () => {
    // Here you would typically resend the verification code
    console.log('Resending verification code');
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Verify Your Number</Text>
        
        <Text style={styles.description}>
          Enter the 6-digit code sent to
        </Text>
        <Text style={styles.phoneNumber}>{phone}</Text>
        
        <TextInput
          style={styles.input}
          placeholder="______"
          placeholderTextColor="#a0a0a0"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="number-pad"
          maxLength={6}
        />
        
        <Pressable style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          <Pressable onPress={handleResendCode}>
            <Text style={styles.resendLink}>Resend Code</Text>
          </Pressable>
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