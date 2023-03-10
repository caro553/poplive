import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Linking, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// import de TopBar et BottomBar depuis un autre fichier
import TopBar from './TopBar';
import BottomBar from './BottomBar';

export default function Bestof() {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    async function fetchVideoData() {
      const videoId = 't4Nq3dz4VTg'; // Remplacez par l'ID de la vidéo YouTube souhaitée
      const apiKey = 'AIzaSyDvjinFVOfL1Dwxlt4UY_9s99gCIuKtyGY'; // Remplacez par votre clé API YouTube
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=t4Nq3dz4VTg&key=AIzaSyDvjinFVOfL1Dwxlt4UY_9s99gCIuKtyGY&part=snippet&fields=items(snippet(thumbnails(default),title,channelTitle,description))`);
      const data = await response.json();
      const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
      setVideoData({ ...data.items[0].snippet, thumbnailUrl });
    }
    fetchVideoData();
  }, []);

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
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=t4Nq3dz4VTg')}>
        <Image source={{ uri: videoData.thumbnailUrl }} style={styles.videoImage} />
          <View style={styles.twitchTextContainer}>
            {videoData && (
              <>
                <Text style={[styles.twitchTitle, {fontWeight: 'bold'}]}>{videoData.title}</Text>
                <Text style={styles.twitchChannel}>{videoData.channelTitle}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=t4Nq3dz4VTg')}>
        <Image source={{ uri: videoData.thumbnailUrl }} style={styles.videoImage} />
          <View style={styles.twitchTextContainer}>
            {videoData && (
              <>
                <Text style={[styles.twitchTitle, {fontWeight: 'bold'}]}>{videoData.title}</Text>
                <Text style={styles.twitchChannel}>{videoData.channelTitle}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=t4Nq3dz4VTg')}>
        <Image source={{ uri: videoData.thumbnailUrl }} style={styles.videoImage} />
          <View style={styles.twitchTextContainer}>
            {videoData && (
              <>
                <Text style={[styles.twitchTitle, {fontWeight: 'bold'}]}>{videoData.title}</Text>
                <Text style={styles.twitchChannel}>{videoData.channelTitle}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=t4Nq3dz4VTg')}>
        <Image source={{ uri: videoData.thumbnailUrl }} style={styles.videoImage} />
          <View style={styles.twitchTextContainer}>
            {videoData && (
              <>
                <Text style={[styles.twitchTitle, {fontWeight: 'bold'}]}>{videoData.title}</Text>
                <Text style={styles.twitchChannel}>{videoData.channelTitle}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twitchContainer} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=t4Nq3dz4VTg')}>
        <Image source={{ uri: videoData.thumbnailUrl }} style={styles.videoImage} />
          <View style={styles.twitchTextContainer}>
            {videoData && (
              <>
                <Text style={[styles.twitchTitle, {fontWeight: 'bold'}]}>{videoData.title}</Text>
                <Text style={styles.twitchChannel}>{videoData.channelTitle}</Text>
              </>
            )}
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
  height: '40%',
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
