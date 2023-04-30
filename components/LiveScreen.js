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
import firebase from "./firebaseConfig";

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
  const [users, setUsers] = useState({});

  useEffect(() => {
    const usersRef = firebase.firestore().collection('test_users');
  
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const loadedUsers = {};
      querySnapshot.forEach((doc) => {
        loadedUsers[doc.id] = doc.data();
      });
      setUsers(loadedUsers);
    });
  
    return () => unsubscribe();
  }, []);
  

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
    
        // Vérifiez si l'utilisateur existe déjà dans la liste des utilisateurs
        if (!users.hasOwnProperty(username)) {
          // Ajoutez l'utilisateur à Firestore s'il n'existe pas déjà
          const userRef = firebase.firestore().collection('test_users').doc(userId);
          await userRef.set({ userId, username });
        }
        
    
        return { username, userId };
      } catch (error) {
        console.error('Error while getting username and userId from AsyncStorage:', error);
        throw error;
      }
    }
    
    async function storeLiveStreamInfo(userId, streamData) {
      try {
        const userRef = firebase.firestore().collection('test_users').doc(userId);
    
        // Ajouter des informations supplémentaires
        const additionalData = {
          profileImage: userProfileImage,
          streamTitle: streamTitle,
          viewerCount: viewerCount,
          streamThumbnailUrl: streamThumbnailUrl,
        };
    
        await userRef.set({ ...streamData, ...additionalData }, { merge: true });
      } catch (error) {
        console.error('Error storing stream information to Firestore:', error);
      }
    }
    
    
  
    
    async function checkIfUserIsLive(username, userId) {
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
        setStreamThumbnailUrl(
          data.data[0].thumbnail_url.replace('{width}', '640').replace('{height}', '360'),
        );
      
        // Stocker les informations de stream dans Firestore
        const streamData = {
          isLive: true,
          streamTitle: data.data[0].title,
          viewerCount: data.data[0].viewer_count,
          streamThumbnailUrl: data.data[0].thumbnail_url.replace('{width}', '640').replace('{height}', '360'),
        };
        storeLiveStreamInfo(userId, streamData);
      
      } else {
        setIsLive(false);
        // Remove stream information from AsyncStorage
        await AsyncStorage.removeItem(`${username}:isLive`);
        await AsyncStorage.removeItem(`${username}:streamTitle`);
        await AsyncStorage.removeItem(`${username}:viewerCount`);
        await AsyncStorage.removeItem(`${username}:streamThumbnailUrl`);
      }
      
    }
    async function updateUser(username, updatedInfo) {
      const usersJson = await AsyncStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : {};
    
      users[username] = {
        ...users[username],
        ...updatedInfo,
      };
    
      await AsyncStorage.setItem('users', JSON.stringify(users));
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
        throw new Error("Erreur lors de la récupération des informations de l'utilisateur");
      }
    
      const data = await response.json();
    
      if (data.data.length > 0) {
        setUserProfileImage(data.data[0].profile_image_url);
    
     
      } else {
        // Remove profile image URL from AsyncStorage
        await AsyncStorage.removeItem(`${username}:profileImage`);
      }
    }
    // Ajoutez la fonction loadAllUsers après fetchUserProfileImage
async function loadAllUsers() {
  const usersJson = await AsyncStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : {};
}
    
    
getUsernameAndUserId().then(({ username, userId }) => {
  setTwitchUsername(username);
  console.log("username récupéré depuis AsyncStorage :", username);

  if (!oauthToken) {
    return;
  }

  checkIfUserIsLive(username, userId)
      
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
  

  // REVOIR LE USERNAME QUI EST PAS BON 
  
  return (
    <View style={styles.container}>
      {Object.entries(users).map(([username, userInfo]) => (
        <View key={username} style={styles.userContainer}>
          <Text style={styles.username}>{username}</Text> 
          {userInfo.profileImage && (
            <Image
              source={{ uri: userInfo.profileImage }}
              style={styles.profileImage}
            />
          )}
          {userInfo.isLive && (
            <>
              <Text style={styles.streamTitle}>{userInfo.streamTitle}</Text>
              <Text style={styles.viewerCount}>
                Nombre de vues: {userInfo.viewerCount}
              </Text>
              {userInfo.streamThumbnailUrl && (
                <Image
                  source={{ uri: userInfo.streamThumbnailUrl }}
                  style={styles.streamThumbnail}
                />
              )}
            </>
          )}
        </View>
      ))}
     
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
              streamerRectangle: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                padding: 15,
                margin: 10,
              },
              username: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
              },
              profileImage: {
                width: 50,
                height: 50,
                borderRadius: 25,
                marginBottom: 10,
              },
              streamTitle: {
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 5,
              },
              viewerCount: {
                marginBottom: 5,
              },
              streamThumbnail: {
                width: 100,
                height: 60,
                marginBottom: 10,
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
  