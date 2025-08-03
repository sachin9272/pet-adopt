import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import Category from './Category';
import PetList from './PetList';
import Colors from '../../constants/Colors';

const pets = [
  { id: '1', name: 'Max', category: 'Dogs', image: 'https://cdn-icons-png.flaticon.com/128/616/616408.png', description: 'Friendly Golden Retriever' },
  { id: '2', name: 'Bella', category: 'Dogs', image: 'https://cdn-icons-png.flaticon.com/128/616/616408.png', description: 'Loyal Labrador' },
  { id: '3', name: 'Whiskers', category: 'Cats', image: 'https://cdn-icons-png.flaticon.com/128/616/616430.png', description: 'Playful Tabby' },
  { id: '4', name: 'Mittens', category: 'Cats', image: 'https://cdn-icons-png.flaticon.com/128/616/616430.png', description: 'Cuddly Persian' },
  { id: '5', name: 'Bunny', category: 'Rabbits', image: 'https://cdn-icons-png.flaticon.com/512/4185/4185015.png', description: 'Fluffy Lop' },
  { id: '6', name: 'Tweety', category: 'Birds', image: 'https://cdn-icons-png.flaticon.com/512/2832/2832126.png', description: 'Chirpy Canary' },
];

export default function PetListByCategory() {
  const [selectedCategory, setSelectedCategory] = useState('Dogs');

  const [fontsLoaded] = useFonts({
    'outfit': require('../../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../../assets/fonts/Outfit-Medium.ttf'),
  });

  const filteredPets = pets.filter((pet) => pet.category === selectedCategory);

  useEffect(() => {
    console.log('Selected category:', selectedCategory);
  }, [selectedCategory]);

  if (!fontsLoaded) return <Text>Loading fonts...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Category
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 20,
          marginTop: 20,
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        {selectedCategory} Pets
      </Text>

      <FlatList
        data={filteredPets}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => <PetList pet={item} />}
        ListEmptyComponent={
          <Text
            style={{
              fontFamily: 'outfit',
              textAlign: 'center',
              marginTop: 20,
              color: Colors.GRAY,
            }}
          >
            No pets found in this category.
          </Text>
        }
      />
    </View>
  );
}
