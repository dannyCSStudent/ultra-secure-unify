import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleMute, toggleVideo, verifyCall } from '../../store/slices/callSlice';

export default function VerificationVideoCallScreen() {
 const router = useRouter();
  const dispatch = useDispatch();
  const { isMuted, isVideoOn, isVerified } = useSelector((state: RootState) => state.call);

  return (
    <LinearGradient
      colors={['#1a237e', '#283593', '#3949ab']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Verification Video Call</Text>
      </View>
      <View style={styles.mainVideoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/240x180' }}
          style={styles.mainVideo}
        />
        <Text style={styles.mainVideoText}>Alice</Text>
      </View>
      <View style={styles.smallVideoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/110x110' }}
          style={styles.smallVideo}
        />
        <Text style={styles.smallVideoText}>You</Text>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controlBox}>
          <Text style={styles.controlTitle}>QR Verification</Text>
          <Pressable onPress={verifyCall}>
            <Ionicons name="qr-code" size={24} color="#ffffff" />
          </Pressable>
        </View>
        <View style={styles.controlBox}>
          <Text style={styles.controlTitle}>Encryption Strength</Text>
          <Text style={styles.controlSubtitle}>Quantum-Resistant</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.circleButton} onPress={toggleMute}>
          <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color="#ffffff" />
        </Pressable>
        <Pressable style={styles.circleButton} onPress={toggleVideo}>
          <Ionicons name={isVideoOn ? "videocam" : "videocam-off"} size={24} color="#ffffff" />
        </Pressable>
        <Pressable style={[styles.circleButton, styles.endCallButton]} onPress={() => router.back()}>
          <Ionicons name="call" size={24} color="#ffffff" />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Ionicons name="lock-closed" size={24} color="#4CAF50" />
        <Text style={styles.footerText}>Quantum Resistant</Text>
        {isVerified && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
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
  mainVideoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainVideo: {
    width: 240,
    height: 180,
    borderRadius: 10,
  },
  mainVideoText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 18,
  },
  smallVideoContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
    alignItems: 'center',
  },
  smallVideo: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  smallVideoText: {
    color: '#ffffff',
    marginTop: 5,
    fontSize: 14,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  controlBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '45%',
  },
  controlTitle: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 5,
  },
  controlSubtitle: {
    color: '#ffffff',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  circleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: '#ff6b6b',
    transform: [{ rotate: '135deg' }],
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