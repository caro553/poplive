import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import viewIcon from './Vue.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LiveInfo from './LiveInfo';
import StreamerList from './StreamerList';


const { width } = Dimensions.get('window');

const LiveScreen = ({ route, navigation }) => {
  const [twitchUsername, setTwitchUsername] = useState('');
  const [users, setUsers] = useState([]);

  const [userProfileImage, setUserProfileImage] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const [streamThumbnailUrl, setStreamThumbnailUrl] = useState('');
  const clientId = 'i34nc3xu598asoajw481awags63pnl';
  const clientSecret = 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c';


  const uniqueUsers = users.filter((user, index, self) =>
  index === self.findIndex((u) => u.userId === user.userId)
);


  useEffect(() => {
    const fetchUsers = async () => {
      const usersJSON = await AsyncStorage.getItem('users');
      let users = usersJSON ? JSON.parse(usersJSON) : [];
      setUsers(users);
    };
  
    fetchUsers();
  }, []);
  

  useEffect(() => {
    const fetchStreamData = async () => {
      const updatedUsers = await Promise.all(
        users.map(async (user) => {
          const streamData = await getStreamData(user.twitchUsername);
          return { ...user, ...streamData };
        })
      );
  
      setUsers(updatedUsers);
    };
  
    fetchStreamData();
  }, []);
  
  useEffect(() => {
    if (route.params?.twitchUsername) {
      setTwitchUsername(route.params.twitchUsername);
    }
  }, [route.params?.twitchUsername]);
  useEffect(() => {
    if (route.params?.addUser) {
      route.params.addUser(route.params.userId, route.params.twitchUsername);
    }
  }, [route.params]);
  
  
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
  async function getStreamData(username) {
    try {
      const isLive = await checkIfUserIsLive(username);
      const userProfileImage = isLive ? await fetchUserProfileImage(username) : null;
  
      return {
        isLive,
        userProfileImage,
      };
    } catch (error) {
      console.error(`Erreur lors de la récupération des données pour ${username}`);
      return {
        isLive: false,
        userProfileImage: null,
      };
    }
  }
  

  const checkIfUserIsLive = async (username) => {
    const oauthToken = await getOAuthToken(clientId, clientSecret);
  
    const fetchOptions = {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${oauthToken}`,
      },
    };
  
    const streamData = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${username}`,
      fetchOptions
    );
  
    if (!streamData.ok) {
      console.error(`Erreur lors de la récupération des données de stream de l'utilisateur ${username}`);
      return;
    }
  
    const data = await streamData.json();
    setIsLive(data.data.length > 0);
  
    if (data.data.length > 0) {
      setStreamTitle(data.data[0].title);
      setViewerCount(data.data[0].viewer_count);
      const formattedThumbnailUrl = data.data[0].thumbnail_url
        .replace('{width}', '320')
        .replace('{height}', '180');
      setStreamThumbnailUrl(formattedThumbnailUrl);
      console.log("Stream thumbnail URL:", formattedThumbnailUrl);

    }
  };
  

  const fetchUserProfileImage = async (username) => {
    const oauthToken = await getOAuthToken(clientId, clientSecret);

    const fetchOptions = {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${oauthToken}`,
      },
    };

    const userData = await fetch(
      `https://api.twitch.tv/helix/users?login=${username}`,
      fetchOptions
    );

    if (!userData.ok) {
      console.error(`Erreur lors de la récupération des données de l'utilisateur ${username}`);
      return;
    }

    const data = await userData.json();
    setUserProfileImage(data.data[0].profile_image_url);
  };

  async function fetchData(username) {
    if (!username) {
      return;
    }

    await checkIfUserIsLive(username);

  if (!username || !isLive) {
    return;
  }
  await fetchUserProfileImage(username);
}

useEffect(() => {
  users.forEach((user) => fetchData(user.twitchUsername));
}, [users]);

  useEffect(() => {
    fetchData();
  }, [twitchUsername]);

  useEffect(() => {
    fetchData();
  }, [twitchUsername, isLive]);
  

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('username');
    navigation.navigate('Connexion');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar />
      </View>
      {users
  .filter((user) => user.isLive)
  .map((user) => (
    <LiveInfo user={user} key={`user-${user.userId}`} />
  ))}

      <View style={styles.liveInfoContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.profileImageContainer}>
          {userProfileImage ? (
  <Image
    source={{ uri: userProfileImage }}
    style={styles.profileImage}
  />
) : (
  <Text style={styles.loadingText}>Chargement...</Text>
)}
          </View>
          <View style={styles.streamInfoContainer}>
            <Text style={styles.usernameText}>{twitchUsername}</Text>
            {isLive ? (
              <>
              <View style={styles.streamTitleContainer}>
                <Text style={styles.streamTitle} numberOfLines={2} ellipsizeMode="tail">{streamTitle}</Text>
                </View>

                <View style={styles.viewerCountContainer}>
                  <Image source={viewIcon} style={styles.viewIcon} />
                  <Text style={styles.viewerCount}>{viewerCount}</Text>
                </View>
              </>
            ) : (
              <Text>L'utilisateur n'est pas en direct.</Text>
            )}
          </View>
        </View>
        {isLive && (
          <View style={styles.streamThumbnailContainer}>
            <Image
              source={{ uri: streamThumbnailUrl }}
              style={styles.streamThumbnail}
            />
          </View>
        )}
      </View>







      <StreamerList />
      <View style={styles.bottomBar}>
        <BottomBar />
      </View>
    </View>
  );
  
            };
            const styles = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: '#6441A4',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 50,
                paddingBottom: 20,
              },
              streamThumbnailContainer: {
                width: 100,
                height: 60,
                justifyContent: 'center',
                marginRight: 50, // Ajoutez cette ligne pour décaler la miniature vers la gauche
              },
              streamThumbnail: {
                width: 90, // Modifiez la largeur pour mieux s'adapter au rectangle
                height: 50, // Modifiez la hauteur pour mieux s'adapter au rectangle
                resizeMode: 'contain', // Changez 'cover' en 'contain'
              },
           
              liveInfoContainer: {
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 20,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                height: 100,
                overflow: 'hidden',
              },
              innerContainer: {
                flexDirection: 'row',
                alignItems: 'center',
              },
              streamTitleContainer: {
                maxWidth: '70%', // ajustez cette valeur pour limiter la largeur du texte du titre
                marginRight: 10,
              },
              profileImageContainer: {
                marginRight: 20,
              },
              profileImage: {
                width: 50,
                height: 50,
                borderRadius: 25,
              },
              streamInfoContainer: {
                flex: 'auto',
                marginRight: 10,
                alignSelf: 'center',
                flexDirection: 'column',
                maxWidth: '60%', // Modifiez cette valeur pour élargir la description
              },
              usernameText: {
                fontSize: 20,
                marginBottom: 8,
                maxWidth: '100%',
                flexWrap: 'wrap',
              },
              streamTitle: {
                fontSize: 12,
                fontWeight: 'bold',
                marginBottom: 5,
                flexWrap: 'wrap',
                flexShrink: 1,
              },
              viewerCount: {
                fontSize: 14,
              },
              loadingText: {
                color: '#000',
                fontSize: 16,
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
              bottomBar: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              },
              topBar: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              },
              viewIcon: {
                width: 20, // Changez la largeur
                height: 20, // Changez la hauteur
              },
               viewerCount: {
    fontSize: 14, // Modifiez cette valeur si nécessaire pour correspondre à la taille de l'icône
  },
  viewerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // Ajoute une marge en haut
  },
            });
            
  export default LiveScreen;
  