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

export default function Category({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              onCategoryChange(item.name); // ✅ Call parent callback
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
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
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
