import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity, 
  Text,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { AsyncStorage } from 'react-native';


export default function TopBar({ profileImage, username }) {
  const navigation = useNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const loadProfileImage = async () => {
    const url = await AsyncStorage.getItem("profileImageUrl");
    if (url) {
      setProfileImageUrl(url);
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

  useEffect(() => {
    loadProfileImage();
    loadNom();
    loadPrenom();
  }, [])



  const handlePage1 = () => {
    // Ajouter l'action à effectuer lorsqu'on clique sur l'icône de la page 1
  };

  const handlePage2 = () => {
    // Ajouter l'action à effectuer lorsqu'on clique sur l'icône de la page 2
  };

  const handlePage3 = () => {
    // Ajouter l'action à effectuer lorsqu'on clique sur l'icône de la page 3
  };
;
  
  return (
    <View style={styles.container}>
      <View style={styles.burgerContainer}>
        
        <TouchableOpacity onPress={toggleMenu}>
           <Image
            source={{ uri: profileImageUrl }}
            style={[
              styles.logoducomte,
              { borderColor: "#9b59b6", borderWidth: 5, top:0, left:10,width:65, height:65 },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Image source={require("./logo_top_menu.png")} style={styles.logo} />

  
      <Modal
        animationType="fade"
        visible={showMenu}
        transparent={true}
        onRequestClose={toggleMenu}
      >

        <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu}>
          <View style={styles.menuContainer}>
          <Image source={require('./logo.png')} style={styles.logo1} />
          <Image source={require('./couronne_premium.png')} style={styles.couronne} />
          <Image
            source={{ uri: profileImageUrl }}
            style={[
              styles.logoducomte,
              { borderColor: "#9b59b6", borderWidth: 7 },
            ]}
            resizeMode="contain"
          />
<Text style={styles.nomcompte}>{username}</Text>
          <Text style={styles.pseudo} > @pseudoducompte</Text>




          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Compte")}>
          <Ionicons
            name="person"
            size={50}
            color="white"
            style={{left:190,top:45,}}
          />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("Compte")}>
            <Text style={styles.textMenu}> Profil</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("AlaUne")}>
              <Image source={require('./acceuil.png')} style={styles.logomenu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AlaUne")}>
            <Text style={styles.textMenu}> Home </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Bestof")}>
            <Image source={require('./video.png')} style={styles.logomenu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Bestof")}>
            <Text style={styles.textMenu}> Best-of </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("LiveScreen")}>
            <Image source={require('./direct.png')} style={styles.logomenu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("LiveScreen")}>
            <Text style={styles.textMenu}> Live </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("FAQ")}>
            <Image source={require('./faq.png')} style={styles.logomenu} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("FAQ")}>
            <Text style={styles.textMenu}> FAQ </Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#423083",
    height: 80,
    width:'100%',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  burgerContainer: {
    marginRight: 10,
  },
  profileContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2, // Modification
  },

  burgerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    zIndex: 2, // Modification
  },

  menuIcon: {
    marginHorizontal: 10,
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileIcon: {
    marginRight: 8,
  },
  menuContainer: {
    backgroundColor: "#423083",
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:250,
    height:'100%',
    marginRight:170,
  },

  menuItem: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    right:170,
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    top:15,
    height: 150,
    left:110,
    resizeMode: "contain",
  },
  logomenu:{
    height: 60,
    resizeMode: "contain",
    top:50,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  textMenu:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

    left:75,
  },
  logoducomte:{
    width:90,
    height:90,
    borderRadius: 100,
    top:30,
  },
  logo1:{
    width:150,
    height:150,
    left:35,
  },
  nomcompte:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top:35,
  },
  pseudo:{
    top:35,
  },
  couronne:{
    width:35,
    height:35,
    top:25,
    left:25,
  },
});