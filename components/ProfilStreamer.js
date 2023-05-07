import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import Controls from 'react-native-video-controls';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Linking } from 'react-native';

const ProfilStreamer = ({ route }) => {
  console.log('Route params:', route.params);
  const { username, profileImage } = route.params.userInfo;
  console.log('Received user data in ProfilStreamer:', {
    username,
    profileImage,
  });
   const [userDescription, setUserDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const clientId = 'i34nc3xu598asoajw481awags63pnl';
  const clientSecret = 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c';
  const [gameInfo, setGameInfo] = useState(null);
  const [streamerId, setStreamerId] = useState(null);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [gameCategory, setGameCategory] = useState(null);
  const [gameCategoryImage, setGameCategoryImage] = useState(null);
  const [streamUrl, setStreamUrl] = useState(null);



  async function fetchStreamUrl(streamerId, oauthToken) {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_id=${streamerId}`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${oauthToken}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations sur le flux');
    }
  
    const data = await response.json();
    console.log('fetchStreamUrl data:', data);
  
    if (data.data.length > 0 && data.data[0].type === 'live') {
      setStreamUrl(`https://usher.ttvnw.net/api/channel/hls/${username}.m3u8?token=${data.data[0].token}&sig=${data.data[0].sig}`);
    } else {
      setStreamUrl(null);
    }
  }
  
  useEffect(() => {
    async function fetchStreamData() {
      if (streamerId) {
        console.log('fetchStreamUrl is called');
        const oauthToken = await getOAuthToken(clientId, clientSecret);
        await fetchStreamUrl(streamerId, oauthToken);
      }
    }
    fetchStreamData();
  }, [streamerId]);
  async function fetchUserDescription(twitchUsername, oauthToken) {
    const response = await fetch(
      `https://api.twitch.tv/helix/users?login=${twitchUsername}`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${oauthToken}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des informations de l'utilisateur");
    }
  
    const data = await response.json();
    console.log('fetchUserDescription data:', data);
  
    if (data.data.length > 0 && data.data[0].description) {
      setUserDescription(data.data[0].description);
      setStreamerId(data.data[0].id); // Ajoutez cette ligne
    } else {
      setUserDescription('La description n\'est pas disponible');
    }
    setIsLoading(false);
  }
  

  async function getOAuthToken(clientId, clientSecret) {
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du jeton OAuth');
    }

    const data = await response.json();
    console.log('getOAuthToken data:', data);
    return data.access_token;
  }
  async function fetchCurrentGame(streamerId, oauthToken) {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_id=${streamerId}`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${oauthToken}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des informations sur le jeu en cours");
    }
    setCurrentGameId(data.data[0].game_id);
    setGameId(data.data[0].game_id); // stockez également l'ID de la catégorie
    
    const data = await response.json();
    console.log("fetchCurrentGame data:", data);
  
    if (data.data.length > 0 && data.data[0].game_id) {
      setCurrentGameId(data.data[0].game_id);
      console.log("Current game ID:", data.data[0].game_id);
    } else {
      setCurrentGameId(null);
    }
  }
  
  async function fetchGameInfo(gameId, oauthToken) {
    const response = await fetch(
      `https://api.twitch.tv/helix/games?id=${gameId}`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${oauthToken}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des informations sur le jeu");
    }
  
    const data = await response.json();
    console.log("fetchGameInfo data:", data);
  
    if (data.data.length > 0) {
      setUserDescription(data.data[0]); // Modifiez cette ligne pour stocker toutes les informations du streamer
    } else {
      setUserDescription({
        description: "La description n'est pas disponible",
      });
    }
    
  }
  async function fetchGameCategory(gameId, oauthToken) {
    const response = await fetch(
      `https://api.twitch.tv/helix/games?id=${gameId}`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${oauthToken}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des informations sur la catégorie");
    }
  
    const data = await response.json();
    console.log("fetchGameCategory data:", data);
  
    if (data.data.length > 0) {
      setGameCategory(data.data[0].name); // stockez le nom de la catégorie
      console.log("Game category:", data.data[0].name);
      const imageUrlTemplate = data.data[0].box_art_url;
      const imageUrl = imageUrlTemplate.replace('{width}', '100').replace('{height}', '100');
      setGameCategoryImage(imageUrl); // stockez l'image de la catégorie avec l'URL réelle
      console.log("Game category image URL:", imageUrl);      
    } else {
      setGameCategory(null);
      setGameCategoryImage(null);
    }
  }
  
  
 useEffect(() => {
  async function fetchData() {
    try {
      const oauthToken = await getOAuthToken(clientId, clientSecret);
      await fetchUserDescription(username, oauthToken);
    } catch (error) {
      console.error("Erreur lors de la récupération de la description de l'utilisateur:", error);
    }
  }
  fetchData();
}, [username]);

  
  // Ajoutez ces deux useEffect après le premier useEffect
useEffect(() => {
  async function fetchGameData() {
    if (streamerId) {
      console.log("fetchCurrentGame is called");
      const oauthToken = await getOAuthToken(clientId, clientSecret);
      await fetchCurrentGame(streamerId, oauthToken);
    }
  }
  fetchGameData();
}, [streamerId]);

useEffect(() => {
  async function fetchGameDetails() {
    if (currentGameId) {
      console.log("currentGameId:", currentGameId);
      console.log("fetchGameInfo is called");
      const oauthToken = await getOAuthToken(clientId, clientSecret);
      await fetchGameInfo(currentGameId, oauthToken);
      await fetchGameCategory(currentGameId, oauthToken); // récupérez les informations sur la catégorie
    }
  }
  fetchGameDetails();
}, [currentGameId]);




  
  
  

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chargement...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
        <TopBar />
      </View>
      {/* Contenu de la page */}
      <BottomBar />
      <Text style={styles.title}></Text>
      {profileImage && (
        <>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
          {console.log('Profile image URL:', profileImage)}
        </>
      )}
  
     
  
  
      {/* Ajoutez la WebView pour afficher le live Twitch du streamer */}
      <View style={styles.twitchStreamContainer}>
  <WebView
    style={styles.twitchStream}
    source={{ uri: `https://player.twitch.tv/?channel=${username}&parent=yourapp.com` }}
    allowsInlineMediaPlayback
    startInLoadingState
    referrerPolicy="no-referrer-when-downgrade"
  />
</View>

<Text style={styles.description}>
        {userDescription}
      </Text>
      <TouchableOpacity style={styles.liveButton} onPress={() => Linking.openURL(`https://www.twitch.tv/${username}`)}>
  <Text style={styles.liveButtonText}>Pop sur le live</Text>
</TouchableOpacity>

      {/* Affichez l'image de la catégorie et le nom de la catégorie */}
      {gameCategoryImage && (
        <>
          <Image
            source={{ uri: gameCategoryImage }}
            style={styles.categoryImage}
          />
          {console.log("Displaying game category image URL:", gameCategoryImage)}
        </>
      )}
      {gameCategory && (
        <Text style={styles.gameCategory}>{gameCategory}</Text>
      )}
  
      {/* Utilisez les informations du streamerData pour afficher le contenu du profil */}
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6441A4', // nouvelle couleur de fond correspondant à la couleur de Twitch
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
    top: 230
  },
  
  description: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 160,
  },
  
  gameImage: {
    width: 142.5,
    height: 190,
    marginBottom: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },  
  categoryContainer: {
    backgroundColor: '#FF2E63',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginRight: 5,
  },
  categoryText: {
    color: 'black',
    fontSize: 12,
  },
  gameCategory: {
    fontSize: 10,
    color: 'black',
    fontStyle: 'italic',
    marginRight: 10,
  },
  twitchStream: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  twitchStreamContainer: {
    width: '100%',
    height: 300,
    top: -80
  },
  streamBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
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
  liveButton: {
    alignSelf: 'flex-end', // Align the icon to the right
    position: 'absolute', // Position the icon absolutely
    bottom: 90, // Increase the bottom value to match the "Déconnexion" button's position
    right: 20,
    backgroundColor: "#FFB347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10, // Add border radius to make it rounded
  },
  liveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProfilStreamer;
