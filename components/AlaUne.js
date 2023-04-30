import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Linking, StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
export default function AlaUne() {
  return (

    <View style={styles.container}>
      
      <View style={styles.topBar}>
        <TopBar />
      </View>
      {/* Contenu de la page */}
      <BottomBar />
      <ScrollView style={styles.scrollView}>

      <View style={styles.iconContainer}>
      <Image source={require('./couronne.png')} style={styles.icon3} />
      <Image source={require('./demonslayer.jpg')} style={styles.icon2} />
      </View>


      <View style={styles.descriptionContainer} zIndex={0}>
        <Text style={styles.descriptionText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dug, Lorem Ipsum is simply dummy 
        text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dug,
        </Text>
      </View>


        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r67zVQK7zE0')}>
          <Image source={require('./icontwitch1.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Wig on Twitch</Text>
            <Text style={styles.twitchDate}>7h de live du lundi 8 au dimanche 14 </Text>
            
            <Text style={styles.twitchChannel}>Chaîne Youtube 2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.twitch.tv')}>
          <Image source={require('./icontwitch2.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Stream en direct sur Twitch</Text>
            <Text style={styles.twitchChannel}>Chaîne Twitch 1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.twitch.tv')}>
          <Image source={require('./icontwitch3.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Stream en direct sur Twitch</Text>
            <Text style={styles.twitchChannel}>Chaîne Twitch 1</Text>
          </View>
        </TouchableOpacity>
        

        {/* Ajoutez autant d'éléments <TouchableOpacity> que vous le souhaitez ici */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6441A4', // nouvelle couleur de fond correspondant à la couleur de Twitch
    position: 'relative',

    zIndex: 0, // Réduire le niveau de z-index

  },
  topBar: {
    backgroundColor: '#5f5f5f',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
  icon2: { //icon demon slayer
    height: 170,
    width:170,
    left: 90,
    top: 100,
    borderRadius: 100,
  },
  icon3:{ //icon couronne
    left:130,
    top:100,
    width:90,
    height:90,
  },
  iconContainer:{
    marginBottom:250,
  },
  descriptionContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  descriptionText: {
    color: 'white',
    textAlign: 'center',
    width: 208,
    height: 97,
    left: 60, 
    bottom:120,
  },
  twitchContainer: {
    width: 390,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 10,
    bottom:100,
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  twitchIcon:{
    width:150,
    height:95,
  },
  twitchDate:{

  },
  twitchTitle:{
    borderRadius: 3,

  },    
});