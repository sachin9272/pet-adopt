import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function PetList({ pet }) {
  return (
    <View
      style={{
        backgroundColor: Colors.SECONDARY,
        borderRadius: 14,
        marginBottom: 20,
        padding: 12,
        width: cardWidth,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: pet.image }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 10,
          marginBottom: 10,
          backgroundColor: '#ccc',
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 16,
          marginBottom: 4,
          textAlign: 'center',
        }}
      >
        {pet.name}
      </Text>
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
    </View>
  );
}
