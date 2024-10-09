import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; 
import { toggleDeadManSwitch } from '../../store/slices/emergencySlice'; // Redux slice action

export default function EmergencyActionsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Get state from Redux
  const deadManSwitch = useSelector((state: RootState) => state.emergency.deadManSwitch);
  const emergencyContacts = useSelector((state: RootState) => state.emergency.contacts);

  const handleToggleDeadManSwitch = () => {
    dispatch(toggleDeadManSwitch());
  };

  const handleAccountLockdown = () => {
    console.log('Immediate Account Lockdown');
    // Add actual logic for account lockdown if needed
  };

  const handleActivateDuress = () => {
    console.log('Activate Duress Password');
    // Add actual logic for duress password activation if needed
  };

  const handleEditEmergencyContacts = () => {
    router.push('/edit-emergency-contacts');
    // Navigate to the edit contacts page
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Emergency Actions</Text>
        
        <Pressable
          style={[styles.button, styles.lockdownButton]}
          onPress={handleAccountLockdown}
        >
          <Text style={styles.buttonText}>Immediate Account Lockdown</Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.duressButton]}
          onPress={handleActivateDuress}
        >
          <Text style={styles.buttonText}>Activate Duress Password</Text>
        </Pressable>
        
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Enable Dead Man's Switch</Text>
          <Switch
            value={deadManSwitch}
            onValueChange={handleToggleDeadManSwitch}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={deadManSwitch ? "#f4f3f4" : "#f4f3f4"}
          />
        </View>
        
        <View style={styles.emergencyContactsContainer}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          {emergencyContacts.map((contact, index) => (
            <Text key={index} style={styles.contactText}>
              {contact.name}: {contact.phone}
            </Text>
          ))}
        </View>
        
        <Pressable
          style={styles.button}
          onPress={handleEditEmergencyContacts}
        >
          <Text style={styles.buttonText}>Edit Emergency Contacts</Text>
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
  button: {
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lockdownButton: {
    backgroundColor: '#ff6b6b',
  },
  duressButton: {
    backgroundColor: '#feca57',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  switchText: {
    color: '#ffffff',
    fontSize: 16,
  },
  emergencyContactsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 5,
  },
});
