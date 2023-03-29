import React, { useState, useEffect } from "react";

import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
  TextInput
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
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [bio, setBio] = useState("");

  useEffect(() => {
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

  const handleBioChange = (text) => {
    setBio(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar />
      </View>

      <View>
  <Text>{username}</Text>
</View>
<View style={styles.contentContainer}>
  <View style={styles.bioContainer}>
    <TextInput
      style={styles.bio}
      placeholder="Entrez votre bio ici"
      multiline={true}
      numberOfLines={4}
      onChangeText={handleBioChange}
      value={bio}
    />
  </View>
</View>
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
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'stretch'
  },
  bio: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
  
  
});
