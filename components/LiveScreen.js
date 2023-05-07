import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "./firebaseConfig";
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { useNavigation } from '@react-navigation/native'; // Ajoutez cette ligne en haut

const { width } = Dimensions.get('window');

const LiveScreen = ({ route }) => {
  console.log('LiveScreen component mounted');
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
  const navigation = useNavigation();
  const [gameCategory, setGameCategory] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('test_users')
      .onSnapshot((querySnapshot) => {
        const usersData = {};
        querySnapshot.forEach((doc) => {
          usersData[doc.id] = doc.data();
        });
        setUsers(usersData);
      });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  
  

  useEffect(() => {
    console.log('useEffect called');
    async function fetchGameCategory(gameId) {
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
        throw new Error("Erreur lors de la récupération de la catégorie du jeu");
      }
    
      const data = await response.json();
    
      if (data.data.length > 0) {
        return data.data[0].name;
      } else {
        throw new Error("Erreur lors de la récupération de la catégorie du jeu");
      }
    }
    
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
          profileImage: userProfileImage || null, // Utiliser null si userProfileImage n'est pas défini
          streamTitle: streamTitle,
          viewerCount: viewerCount,
          streamThumbnailUrl: streamThumbnailUrl,
        };
    
        await userRef.set({ ...streamData, ...additionalData }, { merge: true });
      } catch (error) {
        console.error('Error storing stream information to Firestore:', error);
      }
    }
    
    
    async function updateUserIsLive(userId, isLive) {
      try {
        const userRef = firebase.firestore().collection('test_users').doc(userId);
        await userRef.update({ isLive });
      } catch (error) {
        console.error('Error updating user isLive status:', error);
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
    
        // Mettre à jour l'état isLive de l'utilisateur dans Firestore
        updateUserIsLive(userId, true);
      } else {
        setIsLive(false);
    
        // Mettre à jour l'état isLive de l'utilisateur dans Firestore
        updateUserIsLive(userId, false);
    
        // Remove stream information from Firestore
        const userRef = firebase.firestore().collection('test_users').doc(userId);
        await userRef.update({
          isLive: false,
          streamTitle: firebase.firestore.FieldValue.delete(),
          viewerCount: firebase.firestore.FieldValue.delete(),
          streamThumbnailUrl: firebase.firestore.FieldValue.delete(),
        });
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
    
    
getUsernameAndUserId().then(async ({ username, userId }) => {
  setTwitchUsername(username);
  console.log("username récupéré depuis AsyncStorage :", username);

  if (!oauthToken) {
    return;
  }

  await fetchUserProfileImage(username) // Ajoutez 'await' ici
    .then(() => {
      console.log("fetchUserProfileImage appelé");
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'image de profil de l'utilisateur:", error);
    });

  checkIfUserIsLive(username, userId)
    .then(() => {
      console.log("checkIfUserIsLive appelé");
    })
    .catch((error) => {
      console.error("Erreur lors de la vérification de l'état du stream:", error);
    });
}).catch((error) => {
  console.error("Erreur lors de la récupération du nom d'utilisateur et de l'ID utilisateur :", error);
});

  }, [oauthToken]);
  
  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
        <TopBar />
      </View>
      {/* Contenu de la page */}
      <BottomBar />
      <ScrollView>
      {Object.entries(users)
  .filter(([_, userInfo]) => userInfo.isLive)
  .map(([_, userInfo]) => (
    <TouchableOpacity
    key={userInfo.username}
    onPress={() => {
      console.log('Navigating to ProfilStreamer with user data:', {
        userInfo,
      });
  
      navigation.navigate('ProfilStreamer', { userInfo });
    }}
  >   
     <View style={styles.streamerRectangle}>
        {userInfo.profileImage && (
          <Image
            source={{ uri: userInfo.profileImage }}
            style={styles.profileImage}
          />
        )}
        <View style={styles.middleContent}>
          <Text style={styles.username}>{userInfo.username}</Text>
          {userInfo.isLive ? (
            <>
              <Text style={styles.streamTitle}>{userInfo.streamTitle}</Text>
              <Text style={styles.viewerCount}>
                Nombre de vues: {userInfo.viewerCount}
              </Text>
            </>
          ) : (
            <Text>L'utilisateur n'est pas en direct.</Text>
          )}
        </View>
        {userInfo.isLive && userInfo.streamThumbnailUrl && (
          <Image
            source={{ uri: userInfo.streamThumbnailUrl }}
            style={styles.streamThumbnail}
          />
        )}
      </View>
    </TouchableOpacity>
  ))}

      </ScrollView>

    </View>
  );
  

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6441A4', // nouvelle couleur de fond correspondant à la couleur de Twitch
  },
  streamerRectangle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: width * 0.9,
    height: 100,
    backgroundColor: 'white', // L'arrière-plan du rectangle est maintenant tout blanc
  },
  
  leftContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContent: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  rightContent: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  streamTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  viewerCount: {
    fontSize: 10,
    marginBottom: 3,
  },
  streamThumbnail: {
    width: 80,
    height: 45,
    marginLeft: 10,
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
});
  
  export default LiveScreen;
  