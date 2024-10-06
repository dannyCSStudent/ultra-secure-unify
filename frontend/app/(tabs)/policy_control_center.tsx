import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyControlCenterScreen() {
  const [privacyShield, setPrivacyShield] = useState(true);
  const router = useRouter();

  const togglePrivacyShield = () => setPrivacyShield(!privacyShield);

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy Control Center</Text>
        
        <Pressable style={styles.listItem} onPress={() => router.push('/contact-permissions')}>
          <Text style={styles.listItemText}>Contact Permissions</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </Pressable>
        
        <Pressable style={styles.listItem} onPress={() => router.push('/group-permissions')}>
          <Text style={styles.listItemText}>Group Permissions</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </Pressable>
        
        <Pressable style={styles.listItem} onPress={() => router.push('/blockchain-audit-log')}>
          <Text style={styles.listItemText}>Blockchain Audit Log</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </Pressable>
        
        <Pressable style={styles.listItem} onPress={() => router.push('/secure-data-export')}>
          <Text style={styles.listItemText}>Secure Data Export</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </Pressable>
        
        <Pressable style={styles.listItem} onPress={() => router.push('/account-deletion')}>
          <Text style={styles.listItemText}>Account Deletion</Text>
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </Pressable>
        
        <Pressable style={styles.emergencyButton} onPress={() => router.push('/emergency-lockdown')}>
          <Text style={styles.emergencyButtonText}>Emergency Lockdown</Text>
        </Pressable>
        
        <View style={styles.footer}>
          <Ionicons name="shield-checkmark" size={24} color={privacyShield ? "#4CAF50" : "#ffffff"} />
          <Text style={styles.footerText}>Privacy Shield:</Text>
          <Switch
            value={privacyShield}
            onValueChange={togglePrivacyShield}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={privacyShield ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
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
  emergencyButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  emergencyButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#ffffff',
    marginHorizontal: 10,
    fontSize: 16,
  },
});