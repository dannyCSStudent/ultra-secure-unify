// app/_layout.tsx
import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';

const useProtectedRoute = () => {
  const segments = useSegments();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';
    
    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace('/(tabs)/chat');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [isAuthenticated, segments]);

  return { isAuthenticated, setIsAuthenticated };
};

export default function RootLayout() {
  const { isAuthenticated, setIsAuthenticated } = useProtectedRoute();

  return <Slot />;
}