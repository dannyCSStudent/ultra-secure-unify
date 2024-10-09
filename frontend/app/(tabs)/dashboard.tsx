// app/(tabs)/dashboard.tsx ---> select from tabs
// this is the sixth screen: security dashboard screen
// securty dashboard screen ---> 

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

export default function SecurityDashboardScreen() {
  const [torEnabled, setTorEnabled] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);


  const handleRunSecurityCheck = () => {
    // Implement security check logic here
    console.log('Running security check...');
   
  };
  
  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Security Dashboard</Text>
        <Text style={styles.welcomeText}>Welcome, {user?.username || 'User'}!</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Threat Monitor</Text>
          <View style={styles.cardContent}>
            <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
            <Text style={styles.cardText}>All Systems Secure</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Encryption Status</Text>
          <View style={styles.cardContent}>
            <Ionicons name="lock-closed" size={24} color="#4CAF50" />
            <Text style={styles.cardText}>Quantum-Resistant Active</Text>
          </View>
        </View>
        
        <View style={styles.buttonRow}>
          <Pressable 
            style={[styles.button, torEnabled && styles.buttonActive]} 
            onPress={() => setTorEnabled(!torEnabled)}
          >
            <Text style={styles.buttonText}>{torEnabled ? 'Disable' : 'Enable'} Tor</Text>
          </Pressable>
          <Pressable 
            style={styles.button}
            onPress={() => router.push('/steganography')}
          >
            <Text style={styles.buttonText}>Steganography</Text>
          </Pressable>
        </View>
        
        <Pressable style={styles.listItem} onPress={() => router.push('/security-audit-log')}>
          <Text style={styles.listItemText}>Security Audit Log</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </Pressable>
        
        <Pressable style={styles.listItem} onPress={() => router.push('/policy_control_center')}>
          <Text style={styles.listItemText}>Privacy Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </Pressable>
        
        <Pressable style={styles.runCheckButton} onPress={handleRunSecurityCheck}>
          <Text style={styles.runCheckButtonText}>Run Security Check</Text>
        </Pressable>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '48%',
  },
  buttonActive: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  listItemText: {
    color: '#ffffff',
    fontSize: 16,
  },
  runCheckButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 10,
  },
  runCheckButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});