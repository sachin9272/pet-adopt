import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    // Optional: show a loading spinner while Clerk is initializing
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={isSignedIn ? "/(tabs)/home" : "/login"} />;
}
