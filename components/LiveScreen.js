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

const { width } = Dimensions.get('window');

const LiveScreen = ({ route, navigation }) => {
  const [twitchUsername, setTwitchUsername] = useState('');

  const [userProfileImage, setUserProfileImage] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const [streamThumbnailUrl, setStreamThumbnailUrl] = useState('');
  const clientId = 'i34nc3xu598asoajw481awags63pnl';
  const clientSecret = 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c';

  useEffect(() => {
    if (route.params?.twitchUsername) {
      setTwitchUsername(route.params.twitchUsername);
    }
  }, [route.params?.twitchUsername]);

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
      setStreamThumbnailUrl(data.data[0].thumbnail_url);
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

  async function fetchData() {
    if (!twitchUsername) {
      return;
    }

    await checkIfUserIsLive(twitchUsername);

    if (!twitchUsername || !isLive) {
      return;
    }

    await fetchUserProfileImage(twitchUsername);
  }

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
      <View style={styles.liveInfoContainer}>
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
              <Text style={styles.streamTitle}>{streamTitle}</Text>
              <Text style={styles.viewerCount}>
                Nombre de vues: {viewerCount}
              </Text>
            </>
          ) : (
            <Text>L'utilisateur n'est pas en direct.</Text>
          )}
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
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
              },
              streamThumbnail: {
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              },
              liveInfoContainer: {
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 20,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%', // Limit the width to 80% of the screen
                justifyContent: 'space-between', // Distribute children horizontally with space in between
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
                flex: 1,
              },
              usernameText: {
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 5,
              },
              streamTitle: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 5,
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
            });
            
  export default LiveScreen;
  