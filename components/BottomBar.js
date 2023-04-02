import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function BottomBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate("AlaUne")}>
        <Image source={require('./acceuil.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate("LiveScreen")}>
        <Image source={require('./direct.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate("Bestof")}>
        <Image source={require('./video.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoContainer} onPress={() =>  navigation.navigate("FAQScreen")}>
        <Image source={require('./faq.png')} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: '#6441a5',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    
    position: 'absolute', // Ajout de la propriété position
    bottom: 0, // Ajout de la propriété bottom pour placer la vue en bas
    left: 0,
    right: 0,
    zIndex: 1 // Ajout de la propriété zIndex pour placer la vue en haut de la pile
  },

  logo: {
    width: 30,
    height: 30,
  },
});
