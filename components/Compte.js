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
  const [nom, setnom] = useState(async () => await AsyncStorage.getItem('nom') || "");
  const [prenom, setprenom] = useState(async () => await AsyncStorage.getItem('prenom') || "");
  const [email, setEmail] = useState(async () => await AsyncStorage.getItem('email') || "");
  const [loading, setLoading] = useState(true);

  const [profileImageTopBarUrl, setProfileImageTopBarUrl] = useState("");

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const loadNom = async () => {
    const storedNom = await AsyncStorage.getItem('nom');
    if (storedNom) {
        setnom(storedNom);
    }
};

const loadPrenom = async () => {
    const storedPrenom = await AsyncStorage.getItem('prenom');
    if (storedPrenom) {
        setprenom(storedPrenom);
    }
};


const loadEmail = async () => {
    const storedEmail = await AsyncStorage.getItem('email');
    if (storedEmail) {
        setEmail(storedEmail);
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
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const userEmail = user.email;
  setEmail(userEmail);

  const userRef = firebase.database().ref(`users/${userId}`);

  const handleData = (snapshot) => {
    const data = snapshot.val();

    if (data) {
      setnom(data.nom || "");
      setprenom(data.prenom || "");
      setEmail(data.email || "");
    }

    setLoading(false);
  };

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
    loadUsername();
    loadNom();
    loadPrenom();
    loadEmail();
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
      <TopBar profileImage={profileImageTopBarUrl} />
      </View>
      <KeyboardAwareScrollView
  contentContainerStyle={styles.keyboardAwareScrollView}
  keyboardShouldPersistTaps="handled"
  keyboardDismissMode="on-drag"
>
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
        editable={false}
    />
</View>

<View style={styles.fieldContainer}>
    <TextInput
        style={[styles.input, styles.whiteBackground]}
        value={`Prénom: ${prenom}`}
        editable={false}
    />
</View>


<View style={styles.fieldContainer}>
  <TextInput
    style={[styles.input, styles.whiteBackground]}
    value={`Email: ${email}`}
    editable={false}
  />
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
      </KeyboardAwareScrollView>


      <BottomBar />
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
    backgroundColor: 'white',
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderRadius: 20,
    alignSelf: 'stretch',
    height: 100,
    marginTop: 30, // Increase the marginTop value
    marginHorizontal: 20,
  },
  bio: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10 // Padding du texte
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20, // Add margin to left and right
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15, // Increase borderRadius to make the rectangles more rounded
    padding: 5,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  logoutContainer: {
    alignSelf: "flex-start", // Change from 'absolute' to 'flex-start'
    marginVertical: 20, // Add some margin at the top and bottom
    marginLeft: 20,
  },
  logoutButton: {
    backgroundColor: "#FFB347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10, // Add border radius to make it rounded
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
  usernameContainer: {
    alignSelf: "center", // Ajoutez cette ligne pour centrer le nom d'utilisateur
  },
  
  keyboardAvoidingViewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingTop: 70,
  },
  keyboardAwareScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -90, // Ajoutez une marge en haut correspondant à la hauteur de la topBar
  },
  customIconContainer: {
    alignSelf: 'flex-end', // Align the icon to the right
    position: 'absolute', // Position the icon absolutely
    bottom: 90, // Increase the bottom value to match the "Déconnexion" button's position
    right: 20,
  },
  customIcon: {
    width: 50, // Increase the width
    height: 50, // Increase the height
  },
});
