import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import Colors from '../../constants/Colors';

const categories = [
  {
    id: '1',
    name: 'Dogs',
    icon: 'https://cdn-icons-png.flaticon.com/128/616/616408.png',
  },
  {
    id: '2',
    name: 'Cats',
    icon: 'https://cdn-icons-png.flaticon.com/128/616/616430.png',
  },
  {
    id: '3',
    name: 'Rabbits',
    icon: 'https://cdn-icons-png.flaticon.com/512/4185/4185015.png',
  },
  {
    id: '4',
    name: 'Birds',
    icon: 'https://cdn-icons-png.flaticon.com/512/2832/2832126.png',
  },
];

export default function Category({ onCategorySelect, selectedCategory }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 20,
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        Categories
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
      >
        {categories.map((item) => (
          <View key={item.id}>
            <Pressable
              onPress={() => onCategorySelect(item.name)}
              style={{
                backgroundColor: selectedCategory === item.name ? Colors.PRIMARY : Colors.SECONDARY,
                borderRadius: 12,
                marginRight: 12,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
              }}
            >
              <Image
                source={{ uri: item.icon }}
                style={{ width: 40, height: 40, marginBottom: 6 }}
              />
            </Pressable>
            <Text
              style={{
                fontFamily: 'outfit',
                textAlign: 'center',
              }}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}