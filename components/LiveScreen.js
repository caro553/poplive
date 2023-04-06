import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomBar from './BottomBar';
import TopBar from './TopBar';
import viewIcon from './Vue.png';



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
    const [streamers, setStreamers] = useState([]);
  const [sortDescending, setSortDescending] = useState(true);



  const loadStreamData = async () => {
    try {
      const data = await AsyncStorage.getItem('streamData');
      if (data) {
        const parsedData = JSON.parse(data);
        const liveData = await getStream(parsedData.user.login);
  
        if (liveData.stream) {
          setStream(liveData);
        } else {
          setStream(null);
          await AsyncStorage.removeItem('streamData');
        }
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
        await AsyncStorage.removeItem('streamData');
    return;
      }
    }
  };
  useEffect(() => {
    loadStreamData();

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
  
      setStreamers(prevStreamers => {
        const newStreamers = [...prevStreamers, data];
        return sortDescending
          ? newStreamers.sort((a, b) => b.stream.viewer_count - a.stream.viewer_count)
          : newStreamers.sort((a, b) => a.stream.viewer_count - b.stream.viewer_count);
      });
    } catch (error) {
      console.error('Error fetching stream data:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des données du flux.');
    }
  };
  
  
  const showDetails = (stream) => {
    navigation.navigate('LiveCompte', { user: stream.user, stream: stream.stream });
  };
  const handleSort = () => {
    setSortDescending(!sortDescending);
    setStreamers(prevStreamers =>
      sortDescending
        ? prevStreamers.sort((a, b) => a.stream.viewer_count - b.stream.viewer_count)
        : prevStreamers.sort((a, b) => b.stream.viewer_count - a.stream.viewer_count),
    );
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#6441A4',
    },
    viewIcon: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
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
    streamInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 30,
      padding: 10,
      marginBottom: 20,
      height: 120, // Ajustez la hauteur

    },
  
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    streamTitleContainer: {
      flex: 1,
      paddingRight: 10,
    },
    streamTitle: {
      marginBottom: 5,
    },
    streamThumbnail: {
      width: 100,
      height: 60,
    },
    streamsContainer: {
      marginTop: 10,
      flex: 1,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      marginTop: 150, // Ajoutez une marge supérieure
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar />
      </View>
      <BottomBar />
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur Twitch"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <Button title="Rechercher" onPress={handleSearch} />
      <ScrollView style={styles.streamersContainer}>
              <Button title="Trier" onPress={handleSort} />

              {streamers.map((stream, index) => (
                          <TouchableHighlight key={index} onPress={() => showDetails(stream)} underlayColor="transparent">
            <View style={styles.streamInfoContainer}>
              <Image
                source={{ uri: stream.user.profile_image_url }}
                style={styles.profileImage}
              />
              <View style={styles.streamTitleContainer}>
                <Text style={styles.streamTitle}>{stream.stream.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={viewIcon} style={styles.viewIcon} />
                  <Text>{stream.stream.viewer_count}</Text>
                </View>
              </View>
              <Image
                source={{ uri: stream.stream.thumbnail_url.replace('{width}', '100').replace('{height}', '60') }}
                style={styles.streamThumbnail}
              />
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
  
      }  

export default App;

