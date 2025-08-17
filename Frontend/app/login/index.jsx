import { View, Text, Image, Pressable, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useUser, useOAuth, useAuth, SignedIn } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from "expo-secure-store"; 
import axios from "axios";
import Colors from './../../constants/Colors';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { getToken } = useAuth();  // 👈 useAuth provides getToken()

  // const handleGoogleSignIn = async () => {
  //   console.log("Inside Google Sign---->");
  //   try {
  //     const { createdSessionId, setActive, signIn, signUp } = await startOAuthFlow();
  //     console.log("Created Session Id---->", createdSessionId)
  //     console.log("SignIn---->", signIn)
  //     console.log("SignUp---->", signUp)


  //     if (createdSessionId) {
  //       console.log("Inside if block--->");

  //       // ✅ Set Clerk session
  //       await setActive({ session: createdSessionId });

  //       console.log("After setActive--->");

  //       // ✅ Get Clerk JWT (DON’T use SecureStore for Clerk token)
  //       const clerkToken = await signIn?.getToken({ template: "integration_fallback" })
  //         || await signUp?.getToken({ template: "integration_fallback" });

  //       console.log('ClerkTokenn->>>', clerkToken);

  //       if (!clerkToken) {
  //         throw new Error("Failed to retrieve Clerk token");
  //       }

  //       // ✅ Call your backend to exchange for your JWT
  //       const res = await axios.post("http://localhost:5000/api/user/auth/exchange", {}, {
  //         headers: {
  //           Authorization: `Bearer ${clerkToken}`,
  //         },
  //       });

  //       const { token, user } = res.data;

  //       // ✅ Save backend JWT securely for API calls
  //       await SecureStore.setItemAsync("my_jwt", token);

  //       console.log("Backend JWT:", token);
  //       console.log("User info:", user);

  //       // ✅ Navigate to home
  //       router.replace('(tabs)/home');
  //     }
  //   } catch (err) {
  //     console.error('OAuth error:', err);
  //     Alert.alert('Login Failed', 'Google sign-in failed. Try again.');
  //   }
  // };




const handleGoogleSignIn = async () => {
  try {
    const { createdSessionId, setActive } = await startOAuthFlow();

    if (createdSessionId) {
      // ✅ Activate the Clerk session
      await setActive({ session: createdSessionId });

      // ✅ Get Clerk session token from active session
      // const session = await Clerk.session.getToken({ template: "integration_fallback" });
      // const session = await getToken({ template: "integration_fallback" });
      const session = await getToken();
      console.log("Clerk Session Token ->", session);

      if (!session) throw new Error("Failed to retrieve Clerk session token");

      // ✅ Exchange Clerk token with your backend
      const res = await axios.post("http://localhost:5000/api/user/auth/exchange", {}, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      console.log("Res---->", res);
      console.log("res data---->", res.data);
      const { token, user } = res.data;

      // ✅ Store your backend JWT securely
      await SecureStore.setItemAsync("my_jwt", token);

      console.log("Backend JWT:", token);
      console.log("User info:", user);

      router.replace("(tabs)/home");
    }
  } catch (err) {
    console.error("OAuth error:", err);
    Alert.alert("Login Failed", "Google sign-in failed. Try again.");
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
