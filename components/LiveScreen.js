import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "./firebaseConfig";
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

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
  const [isLoading, setIsLoading] = useState(true);
  const [searchedUsername, setSearchedUsername] = useState('');
  const navigation = useNavigation();
  const [streamers, setStreamers] = useState([]);


  async function checkIfUserIsLive(twitch_username) {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${twitch_username}`,
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
      const userProfile = await fetchTwitchUserProfile(twitch_username); // Ajout de cette ligne pour récupérer les informations de profil
      return {
        isLive: true,
        streamTitle: data.data[0].title,
        viewerCount: data.data[0].viewer_count,
        profileImage: userProfile.profile_image_url, // Ajout de cette ligne pour inclure l'image de profil
        streamThumbnailUrl: data.data[0].thumbnail_url.replace('{width}', '300').replace('{height}', '200'), // Ajout de cette ligne pour inclure l'URL de la vignette
      };
    } else {
      return { isLive: false };
    }
  }
  async function storeLiveStreamInfo(userId, streamData) {
    const userRef = firebase.firestore().collection("test_users").doc(userId);
    await userRef.update({
      isLive: streamData.isLive,
      username: streamData.username,
      streamTitle: streamData.streamTitle,
      viewerCount: streamData.viewerCount || 0, // Ajoutez une valeur par défaut si viewerCount est undefined
      profileImage: streamData.profileImage,
      streamThumbnailUrl: streamData.streamThumbnailUrl,
    });
  }
  
  
  async function addNewStreamer(username) {
    // Vérifiez si l'utilisateur existe déjà dans la liste des utilisateurs
    const existingUser = Object.values(users).find(
      (user) => user.twitch_username === username
    );
  
    if (!existingUser) {
      // Générer un nouvel identifiant utilisateur
      const userId = firebase.firestore().collection("test_users").doc().id;
  
      // Ajoutez l'utilisateur à Firestore s'il n'existe pas déjà
      const userRef = firebase.firestore().collection("test_users").doc(userId);
      await userRef.set({ userId, twitch_username: username });
    }
  
    const liveInfo = await checkIfUserIsLive(username);
  
    if (liveInfo.isLive) {
      const streamData = {
        isLive: liveInfo.isLive,
        username: username, // Ajoutez cette ligne
        streamTitle: liveInfo.streamTitle,
        viewerCount: liveInfo.viewer_count,
        profileImage: liveInfo.profileImage, // Ajoutez cette ligne
        streamThumbnailUrl: liveInfo.streamThumbnailUrl, // Ajoutez cette ligne
      };
  
      await storeLiveStreamInfo(existingUser ? existingUser.userId : userId, streamData);
      // Ajoutez les données du streamer à la liste des streamers
      setStreamers((prevStreamers) => [...prevStreamers, { userId: existingUser ? existingUser.userId : userId, ...streamData }]);
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
const fetchStreamers = async () => {
  try {
    const streamersData = await firebase.firestore().collection('streamers').get();
    const streamersList = streamersData.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    setStreamers(streamersList);
  } catch (error) {
    console.error('Erreur lors de la récupération des streamers depuis Firebase:', error);
  }
};

async function fetchTwitchUserProfile(username) {
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
  return data.data.length > 0 ? data.data[0] : null;
}
async function addNewStreamer(username) {
  // Vérifiez si l'utilisateur existe déjà dans la liste des utilisateurs
  const existingUser = Object.values(users).find(
    (user) => user.twitch_username === username
  );

  if (!existingUser) {
    // Générer un nouvel identifiant utilisateur
    const userId = firebase.firestore().collection("test_users").doc().id;

    // Ajoutez l'utilisateur à Firestore s'il n'existe pas déjà
    const userRef = firebase.firestore().collection("test_users").doc(userId);
    await userRef.set({ userId, twitch_username: username });
  }

  const liveInfo = await checkIfUserIsLive(username);

  if (liveInfo.isLive) {
    const streamData = {
      isLive: liveInfo.isLive,
      username: username, // Ajoutez cette ligne
      streamTitle: liveInfo.streamTitle,
      viewerCount: liveInfo.viewer_count,
      profileImage: liveInfo.profileImage, // Ajoutez cette ligne
      streamThumbnailUrl: liveInfo.streamThumbnailUrl, // Ajoutez cette ligne
    };

    await storeLiveStreamInfo(existingUser ? existingUser.userId : userId, streamData);
    // Ajoutez les données du streamer à la liste des streamers
    setStreamers((prevStreamers) => [...prevStreamers, { userId: existingUser ? existingUser.userId : userId, ...streamData }]);
  }
}
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("test_users")
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
        const twitch_username = await AsyncStorage.getItem('twitch_username');
    
        if (!username || !userId || !twitch_username) {
          throw new Error('Username, userId, or twitch_username is not available in AsyncStorage');
        }
    
        // Vérifiez si l'utilisateur existe déjà dans la liste des utilisateurs
        if (!users.hasOwnProperty(username)) {
          // Ajoutez l'utilisateur à Firestore s'il n'existe pas déjà
          const userRef = firebase.firestore().collection('test_users').doc(userId);
          await userRef.set({ userId, username, twitch_username });
        }
    
        return { username, userId, twitch_username };
      } catch (error) {
        console.error('Error while getting username and userId from AsyncStorage:', error);
        throw error;
      }
    }
    
    
    
    
 
       async function addNewStreamer(username) {
      // Vérifiez si l'utilisateur existe déjà dans la liste des utilisateurs
      const existingUser = Object.values(users).find(
        (user) => user.twitch_username === username
      );
    
      if (!existingUser) {
        // Générer un nouvel identifiant utilisateur
        const userId = firebase.firestore().collection("test_users").doc().id;
    
        // Ajoutez l'utilisateur à Firestore s'il n'existe pas déjà
        const userRef = firebase.firestore().collection("test_users").doc(userId);
        await userRef.set({ userId, twitch_username: username });
      }
    
      const liveInfo = await checkIfUserIsLive(username);
    
      if (liveInfo.isLive) {
        const streamData = {
          isLive: liveInfo.isLive,
          username: username, // Ajoutez cette ligne
          streamTitle: liveInfo.streamTitle,
          viewerCount: liveInfo.viewer_count,
          profileImage: liveInfo.profileImage, // Ajoutez cette ligne
          streamThumbnailUrl: liveInfo.streamThumbnailUrl, // Ajoutez cette ligne
        };
    
        await storeLiveStreamInfo(existingUser ? existingUser.userId : userId, streamData);
        // Ajoutez les données du streamer à la liste des streamers
        setStreamers((prevStreamers) => [...prevStreamers, { userId: existingUser ? existingUser.userId : userId, ...streamData }]);
      }
    }     
    
        async function addNewStreamer(username) {
      // Vérifiez si l'utilisateur existe déjà dans la liste des utilisateurs
      const existingUser = Object.values(users).find(
        (user) => user.twitch_username === username
      );
    
      if (!existingUser) {
        // Générer un nouvel identifiant utilisateur
        const userId = firebase.firestore().collection("test_users").doc().id;
    
        // Ajoutez l'utilisateur à Firestore s'il n'existe pas déjà
        const userRef = firebase.firestore().collection("test_users").doc(userId);
        await userRef.set({ userId, twitch_username: username });
      }
    
      const liveInfo = await checkIfUserIsLive(username);
    
      if (liveInfo.isLive) {
        const streamData = {
          isLive: liveInfo.isLive,
          username: username, // Ajoutez cette ligne
          streamTitle: liveInfo.streamTitle,
          viewerCount: liveInfo.viewer_count,
          profileImage: liveInfo.profileImage, // Ajoutez cette ligne
          streamThumbnailUrl: liveInfo.streamThumbnailUrl, // Ajoutez cette ligne
        };
    
        await storeLiveStreamInfo(existingUser ? existingUser.userId : userId, streamData);
        // Ajoutez les données du streamer à la liste des streamers
        setStreamers((prevStreamers) => [...prevStreamers, { userId: existingUser ? existingUser.userId : userId, ...streamData }]);
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
    
 
    
  
    async function loadAllUsers() {
      const usersJson = await AsyncStorage.getItem('users');
      return usersJson ? JSON.parse(usersJson) : {};
    }
    


    getUsernameAndUserId()
    .then(({ username, userId, twitch_username }) => {
      setTwitchUsername(twitch_username);
      console.log("twitch_username récupéré depuis AsyncStorage :", twitch_username);
  
      if (!oauthToken || !username) { // Ajout d'une vérification pour s'assurer que username est défini
        return;
      }
      
      checkIfUserIsLive(twitch_username, userId)
      .then((liveInfo) => {
        console.log("checkIfUserIsLive appelé");
      
        if (liveInfo.isLive) {
          const streamData = {
            isLive: liveInfo.isLive,
            username: username,
            profileImage: liveInfo.profileImage,
            streamThumbnailUrl: liveInfo.streamThumbnailUrl.replace('{width}', '320').replace('{height}', '180'),
            streamTitle: liveInfo.streamTitle,
            viewerCount: liveInfo.viewer_count || 0, // Attribuer une valeur par défaut si viewer_count est undefined
          };
          return storeLiveStreamInfo(userId, streamData);
        } else {
          const offlineData = {
            isLive: liveInfo.isLive,
            profileImage: liveInfo.profileImage,
          };
          return storeLiveStreamInfo(userId, offlineData);
        }   
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification de l'état du stream:", error);
      });
      
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du nom d'utilisateur et de l'ID utilisateur :", error);
    });
  }, [oauthToken]);
  
  

useEffect(() => {
  if (isLive) {
    const intervalId = setInterval(() => {
      Object.entries(users).forEach(async ([_, userInfo]) => {
        if (userInfo.isLive) {
          const streamData = await checkIfUserIsLive(userInfo.twitch_username);

          if (streamData) {
            const userRef = firebase
              .firestore()
              .collection('test_users')
              .doc(userInfo.userId);
            await userRef.update({
              streamTitle: streamData.title,
              viewerCount: streamData.viewer_count,
            });
          }
        }
      });
    }, 10000);
    return () => clearInterval(intervalId);
  }
}, [isLive, users, oauthToken]);

useEffect(() => {
  const getUsername = async () => {
    const username = await AsyncStorage.getItem('twitch_username');
    if (username) {
      addNewStreamer(username);
    }
  };
  getUsername();
}, []);


return (
  <View style={styles.container}>
    <View style={styles.topBar}>
      <TopBar />
    </View>
    <ScrollView style={{marginTop: 50, marginBottom: 50}}>
      {Object.entries(users)
        .filter(([_, userInfo]) => userInfo.isLive)
        .map(([username, userInfo]) => (
          <TouchableOpacity
            key={username}
            onPress={() => navigation.navigate("ProfilStreamer", { 
              streamerUsername: userInfo.twitch_username, 
              streamerData: userInfo,
              streamerDescription: userInfo.description 
            })}
          >
            <View style={styles.streamerRectangle}>
              {userInfo.profileImage && (
                <Image
                  source={{ uri: userInfo.profileImage }}
                  style={styles.profileImage}
                />
              )}
              <View style={styles.middleContent}>
              <Text style={styles.username}>{userInfo.twitch_username}</Text>
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
    <View style={styles.bottomBar}>
      <BottomBar />
    </View>
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
  scrollView: {
    flex: 1,
    marginTop: 5, // Ajustez cette marge selon vos préférences
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
  