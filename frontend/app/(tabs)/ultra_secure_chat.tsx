import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addMessage } from '../../store/slices/chatSlice';
import { v4 as uuidv4 } from 'uuid'; // For unique message IDs

export default function UltraSecureChatScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Access the messages from the Redux store
  const messages = useSelector((state: RootState) => state.chat.messages);
  const activeChat = useSelector((state: RootState) => state.chat.activeChat); // If needed
  const [inputText, setInputText] = useState('');

  // Dispatch action to add a new message
  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: uuidv4(),  // Generating a unique ID
        senderId: 'you',  // This could be dynamic based on the current user
        content: inputText.trim(),
        timestamp: Date.now(),
      };
      dispatch(addMessage(newMessage));
      setInputText('');
    }
  };

  const renderMessage = ({ item }: { item: { id: string, senderId: string, content: string } }) => (
    <View style={[styles.messageBubble, item.senderId === 'you' ? styles.yourMessage : styles.theirMessage]}>
      <Text style={styles.messageText}>{item.content}</Text>
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
          <Pressable onPress={() => router.push('../screens/secure_phone_call')}>
            <Ionicons name="call" size={24} color="#ffffff" />
          </Pressable>
          <Pressable onPress={() => router.push('../screens/verification_video_call')} style={styles.videoIcon}>
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
