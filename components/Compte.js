import React, { useState, useEffect } from "react";

import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
  TextInput,
  handleNomChange
} from "react-native";
import { WebView } from "react-native-webview";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import firebase from "./firebaseConfig";

const db = firebase.firestore();

export default function Compte() {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [bio, setBio] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setProfileImageUrl(savedImage);
      }
    })();
  }, []);
  const handleBioChange = (newBio) => {
    setBio(newBio);
    AsyncStorage.setItem('bio', newBio); // sauvegarder la bio dans le stockage local
  };
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }
  
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      await AsyncStorage.setItem("profileImageUrl", result.uri);
      setProfileImageUrl(result.uri);
    }
  };
  const getSavedBio = async () => {
    try {
      const savedBio = await AsyncStorage.getItem('bio');
      if (savedBio !== null) {
        setBio(savedBio);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getSavedBio();
  }, []);
  const loadProfileImage = async () => {
    const url = await AsyncStorage.getItem("profileImageUrl");
    if (url) {
      setProfileImageUrl(url);
    }
  };

  const loadUsername = async () => {
    const name = await AsyncStorage.getItem('username');
        if (name) {
      setUsername(name);
    }
  };

  useEffect(() => {
    loadProfileImage();
    loadUsername(); // Appel de la fonction loadUsername ici
  }, []);

  const removeImage = async () => {
    await AsyncStorage.removeItem("profileImage");
    setProfileImageUrl("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = firebase.firestore().collection("test_users");
      const snapshot = await collectionRef.get();
      const data = snapshot.docs.map((doc) => doc.data());
      setData(data);
    };
    fetchData();
  }, []);

  
  return (
    <View style={styles.container}>
       <View style={styles.topBar}>
        <TopBar />
      </View>
       {profileImageUrl ? (
        <TouchableOpacity onPress={selectImage}>
          <Image
            source={{ uri: profileImageUrl }}
            style={[
              styles.logo,
              styles.profileImage,
              { borderColor: "#9b59b6", borderWidth: 10 }
            ]}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={removeImage} style={styles.removeIcon}>
            <AntDesign name="closecircle" size={24} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={selectImage}>
          <Image source={require("./Photo.png")} style={styles.logo} />
        </TouchableOpacity>
      )}
      <View style={styles.usernameContainer}>
        <Text style={{ fontSize: 30, color: "white" }}>{username}</Text>
      </View>
  
     
  
      <View style={styles.contentContainer}>
        <View style={styles.bioContainer}>
          <AutoGrowingTextInput
            style={styles.bio}
            placeholder="Entrez votre bio ici"
            onChangeText={handleBioChange}
            value={bio}
            autoGrow={true}
            maxHeight={200} // Hauteur maximale du conteneur
            textAlignVertical="top" // Alignement du texte en haut
          />
        </View>
      </View>
  
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nom :</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom ici"
          onChangeText={handleNomChange}
          value={nom}
        />
      </View>
  
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Prénom :</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre prénom ici"
        />
      </View>
  
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre email ici"
        />
      </View>
  
     
  
      {/* Contenu de la page */}
      <BottomBar />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6441A4", // nouvelle couleur de fond correspondant à la couleur de Twitch
    position: "relative",
    zIndex: 0, // Réduire le niveau de z-index
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  topBar: {
    backgroundColor: "#5f5f5f",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 125,
    borderColor: "#9b59b6",
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: -150, // déplacer la vue vers le haut

  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: "#FFB347",
    borderWidth: 5,
  },
  
  removeIcon: {
    position: "absolute",
    top: -50,
    right: -5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bioContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 40,
    alignSelf: 'stretch',
    height: 100 // Hauteur fixe du conteneur
  },
  
  bio: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10 // Padding du texte
  }
});
