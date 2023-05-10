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
  Modal,
  Button,
   
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
  const [loading, setLoading] = useState(true);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [profileImageTopBarUrl, setProfileImageTopBarUrl] = useState("");
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut(); v 
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const loadNom = async () => {
    const storedNom = await AsyncStorage.getItem('nom');
    if (storedNom) {
      setNom(storedNom);
    }
};

const loadPrenom = async () => {
    const storedPrenom = await AsyncStorage.getItem('prenom');
    if (storedPrenom) {
      setPrenom(storedPrenom);
    }
};


const loadEmail = async () => {
    const storedEmail = await AsyncStorage.getItem('email');
    if (storedEmail) {
        setEmail(storedEmail);
    }
};
const saveUserData = async () => {
  try {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref(`users/${userId}`);
    await userRef.update({
      nom,
      prenom,
      email,
    });
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating user data:', error);
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
      setNom(data.nom || "");
      setPrenom(data.prenom || "");
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
    console.log('useEffect called'); // Ajout pour le débogage
    loadProfileImage();
    loadUsername();
    loadNom();
    loadPrenom();
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

    const [isSubscribed, setIsSubscribed] = useState(false);
  
    const handleSubscribe = () => {
      setIsSubscribed(true);
    };
    console.log('rendering with username:', username); // Ajout pour le débogage
  return (
    <View style={styles.container}>
       <TopBar  profileImage={profileImageTopBarUrl}/> 
      <KeyboardAwareScrollView
  contentContainerStyle={styles.keyboardAwareScrollView}
  keyboardShouldPersistTaps="handled"
  keyboardDismissMode="on-drag"
>


<Image source={require('./etoile_premium.png')} style={styles.etoile} />

{isSubscribed && (
        <View style={styles.premiumContainer}>
          <Text style={styles.subscriptionMessage}>Je suis premium !</Text>
          <Image source={require('./couronne_premium.png')} style={styles.couronne} />
        </View>
      )} 
      {!isSubscribed && (
        <View style={styles.premiumContainer}>
          <Text style={styles.subscriptionMessage}>Je suis en{'\n'}non-premium !</Text>
        </View>
      )} 
      <View  zIndex={0}>
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
         </View>
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
          value={nom}
          onChangeText={setNom} // Update value of 'nom' when edited
          editable={isEditing} // Allow editing only when 'isEditing' is true
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={[styles.input, styles.whiteBackground]}
          value={prenom}
          onChangeText={setPrenom} // Update value of 'prenom' when edited
          editable={isEditing} // Allow editing only when 'isEditing' is true
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          style={[styles.input, styles.whiteBackground]}
          value={email}
          onChangeText={setEmail} // Update value of 'email' when edited
          editable={isEditing} // Allow editing only when 'isEditing' is true
        />
      </View>

      </View>
      {/* Add your custom icon */}
      <TouchableOpacity style={styles.customIconContainer} onPress={isEditing ? saveUserData : toggleEditing}>
      <Image source={require("./Editer.png")} style={styles.customIcon} />
    </TouchableOpacity>


    <View style={styles.logoutContainer}>
      <LinearGradient
  colors={['#624F9C', '#714F9B', '#814E9A', '#8B4D99', '#8B4D99', '#8E4D98', '#C24E97', '#E55599', '#F08479', '#FABE4B', '#F3E730']}
  style={styles.logoutButton}
>
  <TouchableOpacity onPress={() => setModalVisible(true)}>
    <Text style={[styles.logoutText,{width:150, height:50, fontSize:20, textAlign:'center',}]}>PASSER EN PREMIUM</Text>
  </TouchableOpacity>
</LinearGradient>
</View>
 

<Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
          <Button   style={{ right:350,}} title="X" onPress={() => setModalVisible(false)} /> 
          <Image source={require("./couronne_premium.png")} style={{width:30,height:30,}} />
            <Text style={{color:'#4B388E',color:'#4B388E', fontWeight: 'bold',}}>Le mode</Text>
            <Text style={styles.modalTitle}>PREMIUM</Text>
           
            <View id="mod" style={{ flexDirection: "row" }}>
  <View id="droite" style={{ flex: 1 }}>



    <Text style={{fontSize:15,color:"#4B388E", fontWeight: 'bold',}}>EN VEDETTE</Text>
    <Image source={require("./vedette_premium.png")} style={{width:140,height:150}}/>
    <Text style={{color:"#4B388E",fontWeight: 'bold',}}>Tu seras mis en avant chaque mois sur l'accueil de l'application !</Text>
  </View>



  <View id="gauche" style={{ flex: 1 }}>
    <Text style={{fontSize:15,color:"#4B388E",fontWeight: 'bold',}}>PROMOTIONS</Text>
    <Image source={require("./promotion_premium.png")} style={{width:140,height:150}}/>
    <Text style={{color:"#4B388E",  textAlign: "justify",fontWeight: 'bold',}}>Promotions des profils sur tout nos réseaux-sociaux ! (Instagram-Tiktok-Twitter)</Text>
  </View>
  </View>
  <View id="bas">
  <Text style={{color:"#4B388E",top:30,fontWeight: 'bold',}}>Pour seulement 2.49€/mois</Text>
  <View style={[styles.logoutContainer,{top:25,},]} >
      <LinearGradient
  colors={['#624F9C', '#714F9B', '#814E9A', '#8B4D99', '#8B4D99', '#8E4D98', '#C24E97', '#E55599', '#F08479', '#FABE4B', '#F3E730']}
  style={styles.logoutButton}>
  <TouchableOpacity >
  {!isSubscribed && (
        <TouchableOpacity onPress={handleSubscribe} >
          <Text style={styles.logoutText}>Abonne toi !</Text>
        </TouchableOpacity>
      )} 

{isSubscribed && (
        <TouchableOpacity onPress={handleSubscribe}>
          <Text style={styles.logoutText}>Se désabonner</Text>
        </TouchableOpacity>
      )}
  </TouchableOpacity>
</LinearGradient>
</View>


</View>


          </View>


        </View>
      </Modal>

      <View style={styles.logoutContainer}>
      <LinearGradient
  colors={['#624F9C', '#714F9B', '#814E9A', '#8B4D99', '#8B4D99', '#8E4D98', '#C24E97', '#E55599', '#F08479', '#FABE4B', '#F3E730']}
  style={styles.logoutButton}>
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
  modal: {
    backgroundColor: 'white',
  borderRadius: 30,
  padding: 20,
  alignItems: 'center',
  elevation: 5,
  width:'90%',

},
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },

  etoile:{
    top:150,
    right:90,
    zIndex: 2,
  },
  subscriptionMessage:{
    top:80,
    right:90,
    color: 'pink',
    fontWeight: 'bold',
    fontSize:17,
    position: 'absolute',
  textAlign: "center",
  marginTop: 10,
  zIndex: 1,
  },
  couronne:{
  width:40,
  height:40,
  top:25,
  },
});
