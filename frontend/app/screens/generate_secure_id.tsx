import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function GenerateSecureIDScreen() {
  const [isGenerating, setIsGenerating] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate the secure ID generation process
    const timer = setTimeout(() => {
      setIsGenerating(false);
      // Navigate to the next screen (e.g., master password setup)
      router.push('../screens/master_password_setup');
    }, 5000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Generate Your Secure ID</Text>
        
        <View style={styles.generatingBox}>
          <Text style={styles.generatingText}>
            Generating your unique{'\n'}cryptographic identity
          </Text>
          {isGenerating ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
          )}
        </View>
        
        <Text style={styles.description}>
          This may take a few moments...
        </Text>
        
        <View style={styles.sensorBox}>
          <View style={styles.iconRow}>
            <Ionicons name="camera-outline" size={24} color="#ffffff" />
            <Ionicons name="mic-outline" size={24} color="#ffffff" />
            <Ionicons name="thermometer-outline" size={24} color="#ffffff" />
          </View>
          <Text style={styles.sensorText}>
            Using device sensors for{'\n'}enhanced randomness
          </Text>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  generatingBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  generatingText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  sensorBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  sensorText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
});