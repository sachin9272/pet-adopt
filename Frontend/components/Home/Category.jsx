// import { View, Text, Pressable, Image } from 'react-native';
// import Colors from '../../constants/Colors';

// const categories = [
//   {
//     id: '1',
//     name: 'Dogs',
//     icon: 'https://cdn-icons-png.flaticon.com/128/616/616408.png',
//   },
//   {
//     id: '2',
//     name: 'Cats',
//     icon: 'https://cdn-icons-png.flaticon.com/128/616/616430.png',
//   },
//   {
//     id: '3',
//     name: 'Rabbits',
//     icon: 'https://cdn-icons-png.flaticon.com/128/4185/4185015.png',
//   },
//   {
//     id: '4',
//     name: 'Birds',
//     icon: 'https://cdn-icons-png.flaticon.com/128/2832/2832126.png',
//   },
// ];

// export default function Category({ onCategorySelect, selectedCategory }) {
//   return (
//     <View style={{ marginTop: 20 }}>
//       <Text
//         style={{
//           fontFamily: 'outfit-medium',
//           fontSize: 20,
//           marginBottom: 10,
//           paddingHorizontal: 20,
//           // backgroundColor: 'blue',
//           height:30
//         }}
//       >
//         Categories
//       </Text>

//       <View
//         style={{
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//           justifyContent: 'space-between',
//           paddingHorizontal: 20,
//         }}
//       >
//         {categories.map((item) => (
//           <View key={item.id} style={{ alignItems: 'center', marginBottom: 180 }}>
//             <Pressable
//               onPress={() => onCategorySelect(item.name)}
//               style={{
//                 backgroundColor:
//                   selectedCategory === item.name ? Colors.PRIMARY : Colors.SECONDARY,
//                 borderRadius: 12,
//                 padding: 10,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: 80,
//                 height: 80,
//               }}
//             >
//               <Image
//                 source={{ uri: item.icon }}
//                 style={{ width: 40, height: 40 }}
//                 resizeMode="contain"
//               />
//             </Pressable>
//             <Text
//               style={{
//                 fontFamily: 'outfit',
//                 textAlign: 'center',
//                 marginTop: 6,
//               }}
//             >
//               {item.name}
//             </Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";

const categoryList = [
  {
    id: "1",
    name: "Dogs",
    icon: "https://cdn-icons-png.flaticon.com/128/616/616408.png",
  },
  {
    id: "2",
    name: "Cats",
    icon: "https://cdn-icons-png.flaticon.com/128/616/616430.png",
  },
  {
    id: "3",
    name: "Rabbits",
    icon: "https://cdn-icons-png.flaticon.com/128/4185/4185015.png",
  },
  {
    id: "4",
    name: "Birds",
    icon: "https://cdn-icons-png.flaticon.com/128/2832/2832126.png",
  },
];

export default function Category({category}) {
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              category=(item.name)
            }}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.container,
                selectedCategory == item.name &&
                  styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item?.icon }}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit",
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});
