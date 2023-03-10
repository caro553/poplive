import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Linking, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// import de TopBar et BottomBar depuis un autre fichier
import TopBar from './TopBar';
import BottomBar from './BottomBar';

export default function Bestof() {
  return (
    <View style={styles.container}>
      {/* Ajout de la topbar */}
      <View style={styles.topBar}>
        <TopBar />
      </View>
    

      <View style={styles.descriptionContainer} zIndex={0}>
        <Text style={styles.descriptionText}>
        Best-OF
        </Text>
      </View>


<ScrollView style={styles.scrollView}>
<TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r67zVQK7zE0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Deuxième vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r67zVQK7zE0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Deuxième vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r67zVQK7zE0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Deuxième vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r67zVQK7zE0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Deuxième vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r67zVQK7zE0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Deuxième vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r67zVQK7zE0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Deuxième vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r67zVQK7zE0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Deuxième vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 2</Text>
          </View>
        </TouchableOpacity>

        {/* Ajoutez autant d'éléments <TouchableOpacity> que vous le souhaitez ici */}
      </ScrollView>
      
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
  videoContainer: {
    width: '80%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Ajout de la marge supérieure
  },
  
  video: {
    width: '100%',
    aspectRatio: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 30,
   
    borderRadius: 10,
    marginHorizontal: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  descriptionContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  descriptionText: {
    color: 'white',
    textAlign: 'center',
  },
twitchContainer: {
  width: '90%',
  height: 100,
  backgroundColor: 'white',
  borderRadius: 30,
  marginTop: 30,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center', // Ajouter cette ligne pour centrer horizontalement
},
profileContainer: {
  width: 50,
  height: 50,
  backgroundColor: 'white',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
},
profileIcon: {
  width: 30,
  height: 30,
},
rectangleContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},
rectangle: {
  marginTop: 50, // Ajout de la marge supérieure
  width: 170,
  height: 50,
  backgroundColor: 'white',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 5,
},
icon: {
  width: 30,
  height: 30,
},
});
