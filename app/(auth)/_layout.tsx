import { Redirect, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useSession } from '../ctx';
import { ThemedText as Text } from '@/components/ThemedText';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme()
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />      
      </Stack>
    </ThemeProvider>
  )
}