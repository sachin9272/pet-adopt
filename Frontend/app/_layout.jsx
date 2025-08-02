import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {ClerkProvider} from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if(!publishableKey){
  throw new Error(
    'Missing Publishable Key.'
  )
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'outfit':require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('../assets/fonts/Outfit-Bold.ttf')
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        {/* <Stack.Screen name="+not-found" /> */}
        <Stack.Screen name="index"/>
        <Stack.Screen name="login/index" 
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}
