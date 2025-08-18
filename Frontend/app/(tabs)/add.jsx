import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform, Modal, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const add = () => {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('Dogs');
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState('Unknown');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async (source) => {
    setModalVisible(false);
    let result;
    if (source === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else if (source === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera permissions to take a photo!');
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const authenticateAndSave = async () => {
    const authToken = 'your-auth-token-here'; // Replace with actual token or auth logic
    if (!authToken) {
      Alert.alert('Authentication Failed', 'Please log in to save the pet.');
      return;
    }

    const petData = {
      name: petName,
      breed,
      age,
      category,
      gender,
      address,
      about,
      image: image,
    };

    try {
      const response = await fetch('https://your-backend-api.com/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(petData),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Pet saved successfully!');
        setPetName('');
        setBreed('');
        setAge('');
        setCategory('Dogs');
        setGender('Unknown');
        setAddress('');
        setAbout('');
        setImage(null);
      } else {
        Alert.alert('Error', result.message || 'Failed to save pet.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving the pet.');
    }
  };

  const categories = ['Dogs', 'Fish', 'Cats', 'Birds'];
  const genders = ['Male', 'Female', 'Unknown'];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imageBox} />
        ) : (
          <View style={styles.imageBox}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons name="pets" size={100} color="#666" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Pet Name"
          value={petName}
          onChangeText={setPetName}
        />
        <TextInput
          style={styles.input}
          placeholder="Breed"
          value={breed}
          onChangeText={setBreed}
        />
        <TextInput
          style={styles.input}
          placeholder="Age (e.g., 2 YRS)"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Category:</Text>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {categories.map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            {genders.map(gen => (
              <Picker.Item key={gen} label={gen} value={gen} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="About"
          value={about}
          onChangeText={setAbout}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.saveButton} onPress={authenticateAndSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Image Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Image</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => pickImage('gallery')}>
              <MaterialIcons name="photo-library" size={24} color="#fff" />
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => pickImage('camera')}>
              <MaterialIcons name="camera-alt" size={24} color="#fff" />
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageBox: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    overflow: 'hidden',
    borderStyle: 'dashed',
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#ffd700',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    flexDirection: 'row',
    backgroundColor: '#ffd700',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});

export default add;