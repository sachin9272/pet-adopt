import { View, Text, Image, Pressable, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useUser, useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import Colors from './../../constants/Colors';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace('(tabs)/home'); 
      }
    } catch (err) {
      console.error('OAuth error:', err);
      Alert.alert('Login Failed', 'Google sign-in failed. Try again.');
    }
  };

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image
        source={require('./../../assets/images/dog.jpg')}
        style={{
          width: '100%',
          height: 500,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      />
      <View style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 18,
            textAlign: 'center',
            color: Colors.GRAY,
          }}
        >
          Let's adopt the pet which you like and make their life happy again
        </Text>

        <Pressable
          onPress={handleGoogleSignIn}
          style={{
            padding: 14,
            marginTop: 20,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 20,
              textAlign: 'center',
              color: Colors.WHITE,
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
