import { View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Category from './Category';
import PetList from './PetList';

const pets = [
  { id: '1', name: 'Max', age:2, address:'Lucknow, India', category: 'Dogs', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1RlrbxJfEqwRJACDSVzfUmCqSdrP8QUkYA&s', description: 'Friendly Golden Retriever' },
  { id: '2', name: 'Bella', age:1, address:'Lucknow, India', category: 'Dogs', image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg', description: 'Loyal Labrador' },
  { id: '3', name: 'Whiskers', age:2, address:'Lucknow, India', category: 'Cats', image: 'https://cdn-icons-png.flaticon.com/128/616/616430.png', description: 'Playful Tabby' },
  { id: '4', name: 'Mittens', age:9, address:'Lucknow, India', category: 'Cats', image: 'https://cdn-icons-png.flaticon.com/128/616/616430.png', description: 'Cuddly Persian' },
  { id: '5', name: 'Bunny', age:5, address:'Lucknow, India', category: 'Rabbits', image: 'https://cdn-icons-png.flaticon.com/512/4185/4185015.png', description: 'Fluffy Lop' },
  { id: '6', name: 'Tweety', age:4, address:'Lucknow, India', category: 'Birds', image: 'https://cdn-icons-png.flaticon.com/512/2832/2832126.png', description: 'Chirpy Canary' },
];

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);

  const GetPetList = (category) => {
    console.log("Selected category:", category);
    if (category === 'All') {
      setPetList(pets);
    } else {
      const filteredPets = pets.filter((pet) => pet.category === category);
      setPetList(filteredPets);
    }
  };

  useEffect(() => {
    GetPetList('Dogs');
  }, []);

  return (
    <View>
      <Category onCategoryChange={GetPetList} />  
      <FlatList
        data={petList}
        style={{ marginTop: 10 }}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PetList pet={item} />}
      />
    </View>
  );
}

