// app/_layout.tsx
import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments, Stack, Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const useProtectedRoute = () => {
  const segments = useSegments();
  const router = useRouter();

  // login = true : logout = false
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';
    const isRootRoute = segments.length === null;
    
    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace('/(tabs)/ultra_secure_chat');
    } else if (isAuthenticated && isRootRoute) {
      // Redirect away from the root route to the dashboard.
      router.replace('/(tabs)/dashboard');
    }
  }, [isAuthenticated, segments]);

  return { isAuthenticated, setIsAuthenticated };
};

export default function RootLayout() {
  const { isAuthenticated, setIsAuthenticated } = useProtectedRoute();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="otp"
        options={{ headerTitle: 'Enter Your Phone Number', headerBackVisible: false }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: 'Verify Your Phone Number',
          headerShown: true,
          headerBackTitle: 'Edit number',
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}