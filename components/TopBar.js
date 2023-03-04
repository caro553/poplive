import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TopBar() {
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
            <Ionicons name="person" size={24} color="white" style={styles.profileIcon} />
      {showMenu && (
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={handlePage1}>
            <Ionicons name="ios-home" size={24} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Page 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePage2}>
            <Ionicons name="ios-rocket" size={24} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Page 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePage3}>
            <Ionicons name="ios-settings" size={24} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Page 3</Text>
          </TouchableOpacity>
        </View>
      )}
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
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  menuIcon: {
    marginLeft: 16,
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileIcon: {
    marginLeft: 16,
  },
  menuContainer: {
    position: 'absolute',
    top: 64,
    left: 0,
    backgroundColor: 'white',
    padding: 16,
    elevation: 5,
    flex: 1,
    width: '100%',
    bottom: 0,
  },
  logo: {
    flex: 1,
    height: 110,
    resizeMode: 'contain'
  },
  
});