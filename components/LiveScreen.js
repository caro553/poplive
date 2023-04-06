import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import * as Linking from 'expo-linking';


import TopBar from './TopBar';
import BottomBar from './BottomBar';

const clientId = 'i34nc3xu598asoajw481awags63pnl';
const twitchClientSecret = 'ti2x3lczbx4x8o611jeiqnydfqk4j1';
const ngrokBaseUrl = 'https://d9aa-91-167-34-139.eu.ngrok.io';
const redirectUri = ngrokBaseUrl + '/--/twitch-auth';

console.log('Redirect URI:', redirectUri);




export default function Live() {
  const [liveStreams, setLiveStreams] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  
  const loginWithTwitch = async () => {
    try {
      const authUrl = new URL('https://id.twitch.tv/oauth2/authorize');
authUrl.searchParams.append('client_id', clientId);
authUrl.searchParams.append('redirect_uri', redirectUri);
authUrl.searchParams.append('response_type', 'token');
authUrl.searchParams.append('scope', 'user:read:email user:read:broadcast');

      
      const result = await AuthSession.startAsync({
        authUrl: authUrl.toString(),
      });
  
      if (result.type === 'success') {
        const { access_token } = result.params;
        setAccessToken(access_token);
      } else {
        console.error('Authentication failed:', result);
      }
    } catch (error) {
      console.error('Error logging in with Twitch:', error);
    }
  };
  
  

  const getLiveStreams = async () => {
    if (!accessToken) {
      return;
    }

    try {
      const headers = {
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`,
      };
      const response = await axios.get('https://api.twitch.tv/helix/streams', { headers });

      if (response.data && response.data.data) {
        setLiveStreams(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching live streams:', error);
    }
  };

  useEffect(() => {
    getLiveStreams();
  }, [accessToken]);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View style={styles.topBar}>
        <TopBar />
      </View>
  
      {/* Contenu principal */}
      <View style={[styles.content, { flex: 1 }]}>
        {/* Bouton de connexion Twitch */}
        {!accessToken && (
          <TouchableOpacity onPress={loginWithTwitch} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Connect with Twitch</Text>
          </TouchableOpacity>
        )}
  
        {/* Affichez le live de l'utilisateur connecté à votre application Twitch */}
        {liveStreams.map((stream, index) => (
  <View key={index} style={styles.rectangleContainer}>
    <View style={styles.rectangle}>
      <WebView
        source={{ uri: `https://player.twitch.tv/?channel=${stream.user_login}&parent=${encodeURIComponent(redirectUri)}` }}
        style={{ flex: 1 }}
      />
    </View>
    <View style={styles.rectangle}>
      {/* Ici, vous pouvez afficher d'autres informations sur le stream en direct, comme le titre, le nom de la chaîne, etc. */}
      <Text>{stream.title}</Text>
      <Text>{stream.user_name}</Text>
    </View>
  </View>
))}
      </View>
  
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
    flex: 1,
    width: '100%',
    height: '100%',
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
  height: 35,
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
  content: {
    flex: 1,
  },
});
