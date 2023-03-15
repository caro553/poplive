import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Modal  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TopBar() {
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
        <Ionicons name="menu" size={24} color="white" style={styles.menuIcon} />
      </TouchableOpacity>
    </View>
    <Image source={require('./logo.png')} style={styles.logo} />
    <View style={styles.profileContainer}>
    <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate("Compte")}>
          <Ionicons name="person" size={24} color="white" style={styles.profileIcon} />
        </TouchableOpacity>

    </View>
    <Modal
      animationType="fade"
      visible={showMenu}
      transparent={true}
      onRequestClose={toggleMenu}
    >
      <TouchableOpacity style={styles.menuOverlay} onPress={toggleMenu}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={handlePage1} style={styles.menuItem}>
            <Ionicons name="ios-home" size={24} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Page 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePage2} style={styles.menuItem}>
            <Ionicons name="ios-rocket" size={24} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Page 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePage3} style={styles.menuItem}>
            <Ionicons name="ios-settings" size={24} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Page 3</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6441a5',
    height: 64,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  burgerContainer: {
    marginRight: 10,
  },
  profileContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // Modification
  },
  
  burgerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    zIndex: 2, // Modification
  },
  
  menuIcon: {
    marginHorizontal: 10,
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileIcon: {
    marginRight: 8,
  },
  menuContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  
  
  
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
},
logo: {
  height: 100,
  resizeMode: 'contain'
},
menuOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
menuText: {
  fontSize: 16,
},
});  
