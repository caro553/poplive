import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const LiveScreen = ({ route, navigation }) => {
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const clientId = 'i34nc3xu598asoajw481awags63pnl';
  const clientSecret = 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c';
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [streamThumbnailUrl, setStreamThumbnailUrl] = useState(null);
  const [twitchUsername, setTwitchUsername] = useState('');
  const [oauthToken, setOAuthToken] = useState(null);

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
      setOAuthToken(data.access_token);
      console.log('OAuth token:', data.access_token);
    }

    getOAuthToken(clientId, clientSecret)
      .catch((error) => {
        console.error('Erreur lors de la récupération du jeton OAuth:', error);
      });

  }, []);

  useEffect(() => {
    async function getUsernameAndUserId() {
      try {
        const username = await AsyncStorage.getItem('username');
        const userId = await AsyncStorage.getItem('userId');
    
        if (!username || !userId) {
          throw new Error('Username or userId is not available in AsyncStorage');
        }
    
        return { username, userId };
      } catch (error) {
        console.error('Error while getting username and userId from AsyncStorage:', error);
        throw error;
      }
    }
  
    async function checkIfUserIsLive(username) {
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?user_login=${username}`,
        {
          headers: {
            'Client-ID': clientId,
            Authorization: `Bearer ${oauthToken}`,
          },
        }
      );
    
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations de stream');
      }
    
      const data = await response.json();
    
      if (data.data.length > 0) {
        setIsLive(true);
        setStreamTitle(data.data[0].title);
        setViewerCount(data.data[0].viewer_count);
        setStreamThumbnailUrl(data.data[0].thumbnail_url.replace('{width}', '640').replace('{height}', '360'));
      } else {
        setIsLive(false);
      }
    }
  
    async function fetchUserProfileImage(username) {
      const response = await fetch(
        `https://api.twitch.tv/helix/users?login=${username}`,
        {
          headers: {
            'Client-ID': clientId,
            Authorization: `Bearer ${oauthToken}`,
          },
        }
      );
    
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
    
      const data = await response.json();
    
      if (data.data.length > 0) {
        setUserProfileImage(data.data[0].profile_image_url);
      }
    }
  
    getUsernameAndUserId().then(({ username }) => {
      setTwitchUsername(username);
      console.log("username récupéré depuis AsyncStorage :", username);
  
      if (!oauthToken) {
        return;
      }
  
      checkIfUserIsLive(username)
        .then(() => {
          console.log("checkIfUserIsLive appelé");
        })
        .catch((error) => {
          console.error("Erreur lors de la vérification de l'état du stream:", error);
        });
  
      fetchUserProfileImage(username)
        .then(() => {
          console.log("fetchUserProfileImage appelé");
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'image de profil de l'utilisateur:", error);
        });
    }).catch((error) => {
      console.error("Erreur lors de la récupération du nom d'utilisateur et de l'ID utilisateur :", error);
    });
  }, [oauthToken]);
  
  

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        {userProfileImage !== null && (
          <Image
            source={{ uri: userProfileImage }}
            style={styles.profileImage}
          />
        )}
  
        <View style={styles.streamContainer}>
          <View style={styles.streamInfoContainer}>
            {isLive ? (
              <>
                <Text style={styles.streamTitle}>{streamTitle}</Text>
                <Text style={styles.viewerCount}>Nombre de vues: {viewerCount}</Text>
              </>
            ) : (
              <Text>L'utilisateur n'est pas en direct.</Text>
            )}
          </View>
  
          <View style={styles.streamThumbnailContainer}>
            {streamThumbnailUrl !== null && (
              <Image
                source={{ uri: streamThumbnailUrl }}
                style={styles.streamThumbnail}
              />
            )}
          </View>
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
              streamContainer: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                overflow: 'hidden',
                margin: 10,
              },
              streamInfoContainer: {
                flex: 2,
                padding: 10,
              },
              streamTitle: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 5,
              },
              viewerCount: {
                marginBottom: 5,
              },
              streamThumbnailContainer: {
                flex: 1,
                alignItems: 'flex-end',
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
  