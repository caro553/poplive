import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const LiveScreen = ({ route, navigation }) => {
  
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const clientId = 'i34nc3xu598asoajw481awags63pnl';
  const clientSecret = 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c';
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [streamThumbnailUrl, setStreamThumbnailUrl] = useState(null);
  const twitchUsername = route.params?.twitchUsername || '';
  const [oauthToken, setOAuthToken] = useState(null);

  useEffect(() => {
    if (!twitchUsername || !oauthToken) {
      return;
    }
  
    console.log('useEffect for checking if user is live called');
  
    async function checkIfUserIsLive(username) {
      // ... Le reste du code de la fonction checkIfUserIsLive ...
    }
  
    async function fetchUserProfileImage(username) {
      // ... Le reste du code de la fonction fetchUserProfileImage ...
    }
  
    checkIfUserIsLive(twitchUsername)
      .then(() => {
        console.log('checkIfUserIsLive called');
      })
      .catch((error) => {
        console.error('Erreur lors de la vérification de l\'état du stream:', error);
      });

    fetchUserProfileImage(twitchUsername)
      .then(() => {
        console.log('fetchUserProfileImage called');
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de l\'image de profil de l\'utilisateur:', error);
      });
  }, [twitchUsername, oauthToken]);

  useEffect(() => {
    console.log('useEffect called');
    async function getOAuthToken(clientId, clientSecret) {
      const response = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=user:read:email`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du jeton OAuth');
      }

      const data = await response.json();
      return data.access_token;
    }

    getOAuthToken(clientId, clientSecret)
      .then((token) => {
        setOAuthToken(token);
        console.log('OAuth token:', token);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du jeton OAuth:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
{userProfileImage !== null && (
  <Image
    source={{ uri: userProfileImage }}
    style={styles.profileImage}
  />
)}

{streamThumbnailUrl !== null && (
  <Image
    source={{ uri: streamThumbnailUrl }}
    style={styles.streamThumbnail}
  />
)}

        <View style={styles.streamInfoContainer}>
          {isLive ? (
            <>
              <Text style={styles.streamTitle}>{streamTitle}</Text>
              <Text style={styles.viewerCount}>Nombre de vues: {viewerCount}</Text>
              <Image
                source={{ uri: streamThumbnailUrl }}
                style={styles.streamThumbnail}
              />
            </>
          ) : (
            <Text>L'utilisateur n'est pas en direct.</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Connexion')}
      >
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
          }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    streamInfoContainer: {
      flex: 1,
      paddingRight: 10,
    },
    streamTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    viewerCount: {
      marginBottom: 5,
    },
    streamThumbnail: {
      width: 100,
      height: 60,
    },
    logoutButton: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    logoutButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  export default LiveScreen;
  