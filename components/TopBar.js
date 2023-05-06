import React, { useState } from "react";
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

export default function TopBar({ profileImage }) {
  const navigation = useNavigation();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handlePage1 = () => {
    // Ajouter l'action à effectuer lorsqu'on clique sur l'icône de la page 1
  };

  const handlePage2 = () => {
    // Ajouter l'action à effectuer lorsqu'on clique sur l'icône de la page 2
  };

  const handlePage3 = () => {
    // Ajouter l'action à effectuer lorsqu'on clique sur l'icône de la page 3
  };

  return (
    <View style={styles.container}>
      <View style={styles.burgerContainer}>
      <TouchableOpacity onPress={toggleMenu}>
    <Ionicons
      name="person"
      size={50}
      color="white"
      style={styles.profileIcon}
    />
  </TouchableOpacity>
  <View style={styles.logoContainer}>
    <Image source={require("./logo_top_menu.png")} />
  </View>
  </View>
      <Modal
  animationType="fade"
  visible={showMenu}
  transparent={true}
  onRequestClose={toggleMenu}
>
  <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu}>
    <View style={styles.menuContainer}>
      <Image source={require('./logo.png')} style={styles.logo1} />
      <Image source={require('./couronne.png')} style={styles.couronne} />
      {profileImage ? (
  <Image source={{ uri: profileImage }} style={styles.logoducomte} />
) : (
  <Ionicons 
    name="person"
    size={50}
    color="grey"
    style={styles.logoducomte}
  />
)}

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Compte")}>
  
            </TouchableOpacity>
            <Text style={styles.textMenu} > Compte</Text>


            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Compte")}>
              <Image source={require('./acceuil.png')} style={styles.logomenu} />
              <Text style={styles.textMenu}> Profil</Text>
            </TouchableOpacity>




            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Abonnement")}>
              <Image source={require('./acceuil.png')} style={styles.logomenu} />
            </TouchableOpacity>
            <Text style={styles.textMenu}> Premium </Text>



            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("LiveScreen")}>
              <Image source={require('./direct.png')} style={styles.logomenu} />
            </TouchableOpacity>
            <Text style={styles.textMenu}> Favoris </Text>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("LiveScreen")}>
              <Image source={require('./comment.png')} style={styles.logomenu} />
            </TouchableOpacity>
            <Text style={styles.textMenu}> Commentaire </Text>


            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("LiveScreen")}>
              <Image source={require('./direct.png')} style={styles.logomenu} />
            </TouchableOpacity>
            <Text style={styles.textMenu}> Live </Text>



            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Bestof")}>
              <Image source={require('./video.png')} style={styles.logomenu} />
            </TouchableOpacity>    
            <Text style={styles.textMenu}> Best-Of </Text>




            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FAQ')}>
              <Image source={require('./faq.png')} style={styles.logo} />
            </TouchableOpacity>
              <Text style={styles.textMenu}> FAQ </Text>




            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("AlaUne")}>
              <Image source={require('./acceuil.png')} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.textMenu}> A la une </Text>



          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  profileIcon: {
    top:20,
  },
  logoContainer: {
    flex: 1,
    bottom:50,
    left: 125,

  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#423083",
    height: 78,
    width:"100%",
  
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
    backgroundColor: "#483D8B",
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
    height: 90,
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
    left:30,
  },
});