import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import {useRouter} from 'expo-router'

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function PetList({ pet }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={()=> router.push({
        pathname:'/pet-details',
        params:pet
      })}
      style={{
        padding:10,
        marginRight:15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,

        // marginBottom: 20,
        // width: cardWidth,
        // alignItems: 'center',
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 4,
        // elevation: 2,
        // height:123
      }}
    >
      <Image
        source={{ uri: pet.image }}
        style={{
          width: 150,
          height: 135,
          objectFit:'cover',
          borderRadius: 10,

          
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 18,
  
        }}
      >
        {pet.name}
      </Text>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
      }}>
        <Text style={{color:Colors.GRAY,
          fontFamily:'outfit'
        }}>
          {pet?.breed}
        </Text>
        <Text style={{fontFamily:'outfit',
          color: Colors.PRIMARY,
          paddingHorizontal: 7,
          borderRadius: 10,
          fontSize: 11,
          backgroundColor: Colors.LIGHT_PRIMARY
        }}>{pet?.age} YRS</Text>
      </View>
      <Text
        style={{
          fontFamily: 'outfit',
          color: Colors.GRAY,
          fontSize: 12,
          textAlign: 'center',
          lineHeight: 16,
        }}
      >
        {pet.description}
      </Text>
    </TouchableOpacity>
  );
}
