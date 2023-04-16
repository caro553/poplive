import React, { useState, useEffect,useRef } from "react";

import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
  TextInput,
   
} from "react-native";
import { WebView } from "react-native-webview";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import firebase from "./firebaseConfig";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const db = firebase.firestore();

export default function Compte() {
  const navigation = useNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [bio, setBio] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setEmail] = useState("");
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
const nomRef = useRef(null);
  const handleNomChange = () => {
    console.log('handleNomChange called');
    nomRef.current.focus(); // Donnez le focus sur le champ "Nom"
  };
  const firebaseConfig = {
    // ...
  };
  
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    console.log("User ID:", userId);
    const userRef = firebase.database().ref(`users/${userId}`);
    console.log("Data from Firebase:", data);

    const handleData = (snapshot) => {
      const data = snapshot.val();
      console.log("Data from Firebase:", data);
    
      if (data) {
        setNom(data.nom || "");
        setPrenom(data.prenom || "");
      } else {
        setnom("");
        setprenom("");
      }
    };
    const saveUserData = async (nom, prenom) => {
      try {
        const userId = firebase.auth().currentUser.uid;
        await firebase.database().ref(`users/${userId}`).set({
          nom,
          prenom,
        });
        console.log('User data saved successfully');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };
                                                                                                                                                                                                                                                                                 
    
    (async () => {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setProfileImageUrl(savedImage);
      }
    })();
    userRef.on('value', handleData);

    return () => {
      userRef.off('value', handleData);
    };
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
            resizeMode="contain" />
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
        <View style={[styles.bioContainer, { marginBottom: 40 }]}>
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
        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.input, styles.whiteBackground]}
            value={`Nom: ${nom}`}
            editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.input, styles.whiteBackground]}
            value={`Prénom: ${prenom}`}
            editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.input, styles.whiteBackground]}
            value="Email: Entrez votre email ici" />
        </View>
      </View>
      {/* Add your custom icon */}
      <TouchableOpacity style={styles.customIconContainer}>
        <Image source={require("./Editer.png")} style={styles.customIcon} />
      </TouchableOpacity>
      <View style={styles.logoutContainer}>
        <LinearGradient
          colors={['#624F9C', '#714F9B', '#814E9A', '#8B4D99', '#8B4D99', '#8E4D98', '#C24E97', '#E55599', '#F08479', '#FABE4B', '#F3E730']}
          style={styles.logoutButton}
        >
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

     {/* Contenu de la page */}
     <KeyboardAwareScrollView>
      <BottomBar />
    </KeyboardAwareScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Ajoutez cette ligne
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6441A4",
  },
  topBar: {
    backgroundColor: "#5f5f5f",
    // position: "absolute", // Supprimez cette ligne
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
    alignSelf: "center",
    marginTop: 30, // Add marginTop to increase spacing
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
    top: 90,
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
