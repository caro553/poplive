import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const TWITCH_CLIENT_ID = 'i34nc3xu598asoajw481awags63pnl';
const TWITCH_CLIENT_SECRET = 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c';
const API_BASE_URL = 'https://api.twitch.tv/helix';
const Stack = createStackNavigator();

let token;

async function getToken() {
  if (!token) {
    const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=i34nc3xu598asoajw481awags63pnl&client_secret=cbm6qiv3n5hizeqxbz7kdimrvyzr4c&grant_type=client_credentials`);
    console.log('getToken URL:', `https://id.twitch.tv/oauth2/token?client_id=i34nc3xu598asoajw481awags63pnl&client_secret=cbm6qiv3n5hizeqxbz7kdimrvyzr4c&grant_type=client_credentials`);

    token = response.data.access_token;
  }
  return token;
}
const LiveCompte = ({ route, navigation }) => {
  // ... implement the LiveDeux component here ...
};
async function apiRequest(endpoint) {
  try {
    const accessToken = await getToken();
    console.log('Access token:', accessToken); // Ajouter cette ligne
    console.log('Request endpoint:', endpoint); // Ajouter cette ligne
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}
const saveStreamData = async (data) => {
  try {
    await AsyncStorage.setItem('streamData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving stream data:', error);
  }
};

async function getStream(username) {
  const userData = await apiRequest(`/users?login=${username}`);
  const userId = userData.data[0].id;
  const streamData = await apiRequest(`/streams?user_id=${userId}`);
  return {
    user: userData.data[0],
    stream: streamData.data[0],
  };
}

const StreamViewer = ({ channelId }) => {
  console.log('Rendering StreamViewer with channelId:', channelId); // Add this line
  const embedUrl = `https://player.twitch.tv/?channel=${channelId}&parent=127.0.0.1`;


  return (
    <WebView
      source={{ uri: embedUrl }}
      style={{ width: '100%', height: 300 }}
      allowsInlineMediaPlayback
    />
  );
};

const App = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [stream, setStream] = useState(null);
  const [checkInterval, setCheckInterval] = useState(0);



  const loadStreamData = async () => {
    try {
      const data = await AsyncStorage.getItem('streamData');
      if (data) {
        setStream(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading stream data:', error);
    }
  };
  

  const checkStreamStatus = async () => {
    if (stream && stream.stream) {
      const data = await getStream(stream.user.login);
      if (!data.stream) {
        Alert.alert('Flux terminé', 'Le flux en direct est maintenant terminé.');
        setStream(null);
        clearInterval(checkInterval);
        setCheckInterval(null);
      }
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('streamData');
        if (data) {
          setStream(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error loading stream data:', error);
      }
    })();
  }, []);
  


  const handleSearch = async () => {
    if (!username) {
      console.error('Username is empty');
      Alert.alert('Erreur', 'Veuillez entrer un nom d\'utilisateur Twitch.');
      return;
    }
  
    try {
      
      const data = await getStream(username);
      console.log('User and stream data:', data);
  
      if (!data.stream) {
        Alert.alert('Aucun flux en direct', 'Aucun flux en direct n\'a été trouvé pour cet utilisateur.');
        setStream(null); // Clear the previous stream data if any
        return;
      }
  
      setStream(data);
      saveStreamData(data); // Ajoutez cette ligne
    } catch (error) {
      console.error('Error fetching stream data:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des données du flux.');
    }
  };
  const showDetails = () => {
    navigation.navigate('LiveCompte', { user: stream.user, stream: stream.stream });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur Twitch"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <Button title="Rechercher" onPress={handleSearch} />
      {stream && (
        <View>
          <Text>{stream.user.display_name}</Text>
          <Image
            source={{ uri: stream.user.profile_image_url }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{stream.user.description}</Text>
          {stream.stream && (
            <>
              <Text>{stream.stream.title}</Text>
              <TouchableOpacity onPress={showDetails}>
                <Text style={{ color: 'blue' }}>Afficher les détails</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
  
};

export default App;

