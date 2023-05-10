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
      const videoIds = ['OYThhaHdJKo', 'kGee1PRy-so', 'wvDAyt1h6rM', 'jWraTbrf_kY','6UCMmsoa1eI','YoZ1aehyZ3I']; // Remplacez par les IDs des vidéos YouTube souhaitées
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
      <View style={styles.titleContainer}>
  <Text style={styles.titleText}>
    Vidéos youtube de nos streamers
  </Text>
  <Image source={require('./bar.png')} style={{bottom:5,left:90,width:250,}} />
  <View style={styles.titleLine} />
</View>
        <ScrollView style={styles.scrollView}>
  {videoData.map((video, index) => (
  <TouchableOpacity key={index} style={styles.twitchContainer} onPress={() => Linking.openURL(
    index === 0 ? `https://youtu.be/OYThhaHdJKo` :
    index === 1 ? `https://youtu.be/kGee1PRy-so` :
    index === 2 ? `https://youtu.be/wvDAyt1h6rM` :
    index === 3 ? `https://youtu.be/jWraTbrf_kY` :
    index === 4 ? `https://youtu.be/6UCMmsoa1eI` :
    index === 5 ? `https://youtu.be/YoZ1aehyZ3I` :
    'https://www.youtube.com/watch?v=defaultLink'
  )}>
  
      <Image source={{ uri: video.thumbnailUrl }} style={styles.videoImage} />
      <View style={styles.rectangle}>
        <Image style={styles.twitchImage} source={{ uri: video.thumbnail }} />
        <View style={styles.twitchTextContainer}>
          <Text style={styles.name}>{video.channelTitle}</Text>
          <Text numberOfLines={2} style={[styles.twitchTitle, { fontWeight: 'bold' }]}>{video.title}</Text>
          <Text style={styles.twitchDate}>30 avril 2023</Text>
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
    backgroundColor: '#6441A4',
  },
  topBar: {
    height: 50,
    backgroundColor: '#5f5f5f',
  },

twitchContainer: {
  marginTop:90,
  width: '90%',
  height: '15%',
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

 
rectangle: { //interieur des recs blancs
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
  width: 160,
  height: 99,
  borderRadius: 20,
},

titleText: {
  marginTop:40,
  textTransform: 'uppercase',
  color:'white',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: "center",
  marginBottom:10,
},
name:{
  borderRadius: 3,
  fontSize: 13,
  textAlign: "center",
  bottom:30,
  fontWeight: "bold",

},
twitchDate:{
  borderRadius: 3,
  fontSize: 13,
  textAlign: "center",
  fontWeight: "bold",
},
});
