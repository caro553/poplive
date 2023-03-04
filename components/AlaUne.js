import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Linking, StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';
import TopBar from './TopBar';

export default function AlaUne() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar />
      </View>

      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://player.twitch.tv/?video=v1748916709&autoplay=false' }}
          style={styles.video}
        />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('./like.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('./comment.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor pharetra ipsum in bibendum.
          Pellentesque sed augue non eros congue tincidunt. Nullam bibendum faucibus nulla eu rhoncus.
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

        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.twitch.tv')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Stream en direct sur Twitch</Text>
            <Text style={styles.twitchChannel}>Chaîne Twitch 1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=ZXsQAXx_ao0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Première vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=ZXsQAXx_ao0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Première vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=ZXsQAXx_ao0')}>
          <Image source={require('./rectangle.png')} style={styles.twitchIcon} />
          <View style={styles.twitchTextContainer}>
            <Text style={styles.twitchTitle}>Première vidéo sur Youtube</Text>
            <Text style={styles.twitchChannel}>Chaîne Youtube 1</Text>
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
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
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
    width: '100%',
    height: 110,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  }, // Added the missing closing curly brace
});