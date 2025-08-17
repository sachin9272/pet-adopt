import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{display:'flex', flexDirection:'row'}}>
        <PetSubInfoCard icon={'https://cdn-icons-png.flaticon.com/512/2370/2370271.png'} title={'Age'} value={pet?.age+" Years"}/>

        <PetSubInfoCard icon={'https://cdn-icons-png.flaticon.com/512/7225/7225241.png'} title={'Breed'} value={pet?.breed}/>
      </View>

      <View style={{display:'flex', flexDirection:'row'}}>
        <PetSubInfoCard icon={'https://cdn-icons-png.flaticon.com/512/1019/1019174.png'} title={'Sex'} value={pet?.sex}/>

        <PetSubInfoCard icon={'https://cdn-icons-png.flaticon.com/512/847/847523.png'} title={'Weight'} value={pet?.weight+' kg'}/>
      </View>
    </View>
  );
}
