import React from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';

const sliderImages = [
  {
    id: '1',
    uri: 'https://st4.depositphotos.com/5482996/20434/i/450/depositphotos_204344926-stock-photo-little-red-kitten-yellow-background.jpg',
  },
  {
    id: '2',
    uri: 'https://www.shutterstock.com/image-photo/happy-puppy-dog-smiling-on-600nw-1799966587.jpg',
  },
  {
    id: '3',
    uri: 'https://media.istockphoto.com/id/1434305860/photo/front-view-of-cute-baby-rabbit-standing-on-blue-background.jpg?s=612x612&w=0&k=20&c=1Rd_siPtDPowJuw7Q7PTnV1ISrULQSO7E7M4DylYdbw=',
  },
];

const { width } = Dimensions.get('window');

export default function HomeSlider() {
  return (
    <FlatList
      data={sliderImages}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 15 }}
      renderItem={({ item }) => (
        <View style={{ width, alignItems: 'center' }}>
          <Image
            source={{ uri: item.uri }}
            style={{
              width: width * 0.95,
              height: 180,
              borderRadius: 15,
              backgroundColor: '#ccc',
            }}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
}
