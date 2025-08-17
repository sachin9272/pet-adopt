import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        gap:10,
        alignItems:'center'
      }}>

        {/* Replace with owner image */}
        <Image
          source={{ uri: pet?.image }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        />
        <View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
            }}
          >
            {/* Replace with owner name */}
            {pet?.name}
          </Text>
          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            Pet Owner
          </Text>
        </View>
      </View>
      <FontAwesome name="send" size={24} color={Colors.PRIMARY}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
    justifyContent:'space-between'
  },
});
