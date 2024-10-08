import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addContact, verifyContact } from '../../store/slices/contactSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';


interface Contact {
  name: string;
  trustScore: number;
  verified: boolean;
}

export default function ContactManagementScreen() {
  const contacts = useSelector((state: RootState) => state.contact.contacts);
  const dispatch = useDispatch();

  const handleAddContact = () => {
    dispatch(addContact({ name: 'New Contact', trustScore: 75, verified: false }));
  };

  const handleVerifyContact = (name: string) => {
    dispatch(verifyContact(name));
  };

  const renderContact = (contact: Contact) => (
    <View key={contact.name} style={styles.contactItem}>
      <View>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.trustScore}>Trust Score: {contact.trustScore}%</Text>
      </View>
      <Ionicons
        name={contact.verified ? "checkmark-circle" : "alert-circle"}
        size={24}
        color={contact.verified ? "#4CAF50" : "#FFA000"}
        onPress={() => handleVerifyContact(contact.name)}
      />
    </View>
  );

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Contact Management</Text>

        {contacts.map(renderContact)}

        <Pressable style={styles.button} onPress={handleAddContact}>
          <Text style={styles.buttonText}>Add New Contact</Text>
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
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  contactName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trustScore: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
