import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Linking, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

export default function Compte() {
  const [profileImageUrl, setProfileImageUrl] = useState(''); // initialiser l'URL de l'image de profil à une chaîne vide
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.cancelled) {
      // Do something with the selected image
      setProfileImageUrl(result.uri);
    }
  };

  const removeImage = () => {
    setProfileImageUrl('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar />
      </View>

      {/* Ajouter l'image ici */}
      {profileImageUrl ? (
        <TouchableOpacity onPress={selectImage}>
          <Image source={{ uri: profileImageUrl }} style={styles.logo} />
          <TouchableOpacity onPress={removeImage} style={styles.removeIcon}>
            <AntDesign name="closecircle" size={24} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={selectImage}>
          <Image source={require('./Photo.png')} style={styles.logo} />
        </TouchableOpacity>
      )}

      {/* Contenu de la page */}
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6441A4', // nouvelle couleur de fond correspondant à la couleur de Twitch
    position: 'relative',
    zIndex: 0, // Réduire le niveau de z-index
  },
  topBar: {
    backgroundColor: '#5f5f5f',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 125,
    top : -150,
  },
  removeIcon: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  }
});
