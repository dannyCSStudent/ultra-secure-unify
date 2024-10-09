// app/screens/master_password.tsx ---> app/(tabs)/dashboard.tsx
// this is the fifth screen: set your master password screen
// set your master password screen ---> securty dashboard screen

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setMasterPassword, toggleBiometricLogin } from '../../store/slices/securitySlice';

export default function MasterPasswordSetupScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enableBiometric } = useSelector((state: RootState) => state.security);

  const handleSetPassword = () => {
    if (password === confirmPassword && password.length >= 8) {
      dispatch(setMasterPassword(password));
      router.push('/(tabs)/dashboard');
    } else {
      // Show an error message (you might want to add state for this and render it)
      console.log('Passwords do not match or are too short');
    }
  };

 
  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Set Your Master Password</Text>
        
        <Text style={styles.description}>
          Create a strong, unique password{'\n'}to secure your account
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#a0a0a0"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#a0a0a0" />
          </Pressable>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#a0a0a0"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        
        <Pressable style={styles.button} onPress={handleSetPassword}>
          <Text style={styles.buttonText}>Set Password</Text>
        </Pressable>

        <View style={styles.biometricContainer}>
          <Text style={styles.biometricText}>Enable Biometric Login</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={enableBiometric ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => {
              dispatch(toggleBiometricLogin(value))}
            }
            value={enableBiometric}
          />

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
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  biometricContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
  },
  biometricText: {
    color: '#ffffff',
    fontSize: 16,
  },
});