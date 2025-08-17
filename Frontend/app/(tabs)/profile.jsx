// import { View, Text } from 'react-native'
// import React from 'react'

// export default function profile() {
//   return (
//     <View>
//       <Text>profile</Text>
//     </View>
//   )
// }


import { useAuth } from "@clerk/clerk-expo";
import { Pressable, Text } from "react-native";
export default function profile() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(); // ✅ clears Clerk session
      console.log("Signed out successfully");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <Pressable onPress={handleLogout} style={{marginTop:50, backgroundColor:'red', textAlign:'center'}}>
      <Text>Logout</Text>
    </Pressable>
  );
}
