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
      const videoIds = ['t4Nq3dz4VTg', 'yLqTBlJ3cSg', 'CmgyUYCibwA', 'Lvh28X0I4Jg']; // Remplacez par les IDs des vidéos YouTube souhaitées
      const apiKey = 'AIzaSyDvjinFVOfL1Dwxlt4UY_9s99gCIuKtyGY'; // Remplacez par votre clé API YouTube
      const promises = videoIds.map(async (id) => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet&fields=items(snippet(thumbnails(default),title,channelTitle,description))`);
        const data = await response.json();
        const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
        return { ...data.items[0].snippet, thumbnailUrl };
      });
      const data = await Promise.all(promises);
      setVideoData(data);
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
        {videoData.map((video, index) => (
          <TouchableOpacity key={index} style={styles.twitchContainer} onPress={() => Linking.openURL(
            index === 0 ? 'https://www.youtube.com/watch?v=t4Nq3dz4VTg' :
            index === 1 ? 'https://www.youtube.com/watch?v=yLqTBlJ3cSg' :
            index === 2 ? 'https://www.youtube.com/watch?v=https://youtu.be/CmgyUYCibwA' :
            index === 3 ? 'https://youtu.be/Lvh28X0I4Jg' :
            'https://www.youtube.com/watch?v=defaultLink'
          )}>
<Image source={{ uri: video.thumbnailUrl }} style={styles.videoImage} />
<View style={styles.rectangle}>

  <Image style={styles.twitchImage} source={{ uri: video.thumbnail }} />
  <View style={styles.twitchTextContainer}>
    <Text numberOfLines={2} style={[styles.twitchTitle, { fontWeight: 'bold' }]}>{video.title}</Text>
    <Text style={styles.twitchChannel}>{video.channelTitle}</Text>
  </View>

  
</View>
          </TouchableOpacity>
        ))}
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
  width: 390,
  height: 100,
  backgroundColor: 'white',
  borderRadius: 30,
  marginTop: 10,
  top:100,
  flexDirection: 'row',
  alignItems: 'center', 
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
  overflow: 'hidden',
},
rectangle: {
  marginTop: 50,
  width: 170,
  height: 50,
  backgroundColor: 'white',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 5,
},
rectangleText: {
  overflow: 'hidden', // Ajouter cette ligne pour cacher le texte qui dépasse
  textAlign: 'center',
},
icon: {
  width: 30,
  height: 30,
},
videoImage: {
  width: 70,
  height: 70,
},

});
