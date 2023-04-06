import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import firebase from "./firebaseConfig";

const db = firebase.firestore();

export default function Compte() {
  const [profileImageUrl, setProfileImageUrl] = useState(""); // initialiser l'URL de l'image de profil à une chaîne vide
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà sélectionné une image auparavant
    (async () => {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setProfileImageUrl(savedImage);
      }
    })();
  }, []);

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
      // Sauvegarder l'URL de l'image sélectionnée avec AsyncStorage
      await AsyncStorage.setItem("profileImageUrl", result.uri);
      setProfileImageUrl(result.uri);
    }
  };

  const loadProfileImage = async () => {
    const url = await AsyncStorage.getItem("profileImageUrl");
    if (url) {
      setProfileImageUrl(url);
    }
  };

  const loadUsername = async () => {
    const name = await AsyncStorage.getItem("username");
    if (name) {
      setUsername(name);
    }
  };

  // Appeler loadProfileImage et loadUsername lors de l'ouverture de l'application
  // Appeler loadProfileImage lors de l'ouverture de l'application
  useEffect(() => {
    loadProfileImage();
    loadUsername();
  }, []);

  const removeImage = async () => {
    // Supprimer l'URL de l'image du stockage local
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
        <Text style={styles.username}>{username}</Text>
        <TopBar />
      </View>

      {/* Afficher l'image sélectionnée ou l'image par défaut */}
      {profileImageUrl ? (
        <TouchableOpacity onPress={selectImage}>
          <Image
            source={{ uri: profileImageUrl }}
            style={[
              styles.logo,
              styles.profileImage,
              { borderColor: "#9b59b6", borderWidth: 10 },
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

      {data.map((item, index) => (
        <Text key={index}>{item.nom}</Text>
      ))}

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
    marginTop: -280,
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
    top: -150,
    right: -5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bioContainer: {
    backgroundColor: "white",
    paddingHorizontal: 100,
    paddingVertical: 50,
    borderRadius: 10,
    marginBottom: -50,
  },

  bio: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
