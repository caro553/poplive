import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import de TopBar et BottomBar depuis un autre fichier
import TopBar from './TopBar';
import BottomBar from './BottomBar';

export default function Live() {
  return (
    <View style={styles.container}>
      {/* Ajout de la topbar */}
      <View style={styles.topBar}>
        <TopBar />
      </View>
      
      <View style={styles.content}>
        <Text>This is the Live Screen</Text>
      </View>
      
      {/* Ajout de la bottombar */}
      <View style={styles.bottomBar}>
        <BottomBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6441A4', // couleur de fond
  },
  topBar: {
    height: 50,
    backgroundColor: '#5f5f5f', // couleur de la topbar
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    height: 50,
    backgroundColor: '#5f5f5f', // couleur de la bottombar
  },
});
