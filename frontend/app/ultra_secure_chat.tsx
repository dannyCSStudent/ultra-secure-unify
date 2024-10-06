import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  sender: string;
  text: string;
}

export default function UltraSecureChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Alice', text: "Hey, how's it going?" },
    { id: '2', sender: 'You', text: "Good, thanks!" },
    { id: '3', sender: 'Alice', text: "Shall we video call?" },
  ]);
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Date.now().toString(), sender: 'You', text: inputText.trim() }]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === 'You' ? styles.yourMessage : styles.theirMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Ultra-Secure Chat</Text>
      </View>
      <View style={styles.contactBar}>
        <Text style={styles.contactName}>Alice (Online)</Text>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => router.push('/secure_phone_call')}>
            <Ionicons name="call" size={24} color="#ffffff" />
          </Pressable>
          <Pressable onPress={() => router.push('/verification_video_call')} style={styles.videoIcon}>
            <Ionicons name="videocam" size={24} color="#ffffff" />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#a0a0a0"
        />
        <Pressable onPress={() => console.log('Attachment')}>
          <Ionicons name="attach" size={24} color="#ffffff" />
        </Pressable>
        <Pressable onPress={() => console.log('Voice message')} style={styles.micIcon}>
          <Ionicons name="mic" size={24} color="#ffffff" />
        </Pressable>
        <Pressable onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#ffffff" />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Ionicons name="lock-closed" size={24} color="#4CAF50" />
        <Text style={styles.footerText}>Quantum Resistant</Text>
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
  },
  contactName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  videoIcon: {
    marginLeft: 15,
  },
  messageList: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  yourMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  messageText: {
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#000000',
  },
  micIcon: {
    marginLeft: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  footerText: {
    color: '#ffffff',
    marginHorizontal: 10,
  },
});