import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1a237e',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#b0bec5',
        headerStyle: {
          backgroundColor: '#1a237e',
        },
        headerTintColor: '#ffffff',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shield" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="ultra_secure_chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact_management"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="policy_control_center"
        options={{
          title: 'Policy',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="key" size={size} color={color} />
          ),
        }}
      />    
      
    </Tabs>
  );
}