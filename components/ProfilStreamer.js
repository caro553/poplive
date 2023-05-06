import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfilStreamer = ({ route }) => {
  const { streamerUsername, streamerData, streamerDescription } = route.params;
  const [userDescription, setUserDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const clientId = 'i34nc3xu598asoajw481awags63pnl';
  const clientSecret = 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c';
  const [gameInfo, setGameInfo] = useState(null);
  const [streamerId, setStreamerId] = useState(null);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [gameCategory, setGameCategory] = useState(null);



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
      setGameInfo(data.data[0]);
      console.log("Game info:", data.data[0]);
  console.log("Game box art URL:", data.data[0].box_art_url);
    } else {
      setGameInfo(null);
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
    } else {
      setGameCategory(null);
    }
  }
  
 useEffect(() => {
  async function fetchData() {
    try {
      const oauthToken = await getOAuthToken(clientId, clientSecret);
      await fetchUserDescription(streamerUsername, oauthToken);
    } catch (error) {
      console.error("Erreur lors de la récupération de la description de l'utilisateur:", error);
    }
  }
  fetchData();
}, [streamerUsername]);

  
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
      <Text style={styles.title}>Profil du streamer: {streamerUsername}</Text>
      {streamerData.profileImage && (
        <Image
          source={{ uri: streamerData.profileImage }}
          style={styles.profileImage}
        />
      )}
      {gameCategory && (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryText}>{gameCategory}</Text>
  </View>
)}

      {gameInfo && gameInfo.box_art_url && (
        <View>
          <Text style={styles.gameTitle}>Jeu en cours:</Text>
          {console.log("Rendering game box art with URL:", gameInfo.box_art_url.replace('{width}', '285').replace('{height}', '380'))}
          <Image
  source={{
    uri: `${gameInfo.box_art_url.replace('{width}', '285').replace('{height}', '380')}`,
  }}
  style={styles.gameImage}
/>

        </View>
      )}
      <Text style={styles.description}>{streamerDescription}</Text>
      <Text>Concernant {streamerUsername} :</Text>
      <Text style={styles.description}>{streamerDescription}</Text>
      {/* Utilisez les informations du streamerData pour afficher le contenu du profil */}
    </View>
  );

  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#6441A4', // nouvelle couleur de fond correspondant à la couleur de Twitch
  },
  gameImage: {
    width: 142.5,
    height: 190,
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
    color: 'white',
    fontSize: 12,
  },
  
});

export default ProfilStreamer;
