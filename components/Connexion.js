import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import firebase from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Connexion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twitchUsername, setTwitchUsername] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const getUsernameAndUserId = async () => {
    const user = firebase.auth().currentUser;
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const userDoc = await firebase
      .firestore()
      .collection('test_users')
      .doc(user.uid)
      .get();
  
    const userData = userDoc.data();
    console.log('Données récupérées depuis Firestore :', userData); // Ajoutez ce log
  
    // Vérifiez si les valeurs de username et userId sont définies
    if (userData && userData.username && user.uid) {
      console.log('UserData exist and username and uid exist');
    } else if (userData && !userData.username && user.uid) {
      userData.username = 'Utilisateur inconnu';
      console.warn('Le champ "username" est manquant dans les données Firestore');
  
      const isPremium = userData.isPremium; // Ajoute cette ligne
  
      await AsyncStorage.setItem('userId', user.uid);
      await AsyncStorage.setItem('username', userData.username);
      await AsyncStorage.setItem('isPremium', isPremium ? 'true' : 'false');
      setIsPremium(isPremium);
  
      console.log('Retour depuis getUsernameAndUserId :', {
        userId: user.uid,
        username: userData.username,
        isPremium: isPremium,
      });
      return { userId: user.uid, username: userData.username };
    } else {
      console.error('UserData, username or userId is undefined');
      console.log('Valeur de userData:', userData); // Ajoutez ce log
      console.log('Valeur de username:', userData ? userData.username : 'undefined'); // Ajoutez ce log
      console.log('Valeur de userId:', user.uid); // Ajoutez ce log
      return {};
    }
  
  
  
    console.log('Retour depuis getUsernameAndUserId :', {
      userId: user.uid,
      username: userData.username,
      isPremium: userData.isPremium,
    });
    return { userId: user.uid, username: userData.username };
  };
  
  
  const showTwitchUsernamePrompt = (userId, username) => {
    Alert.prompt(
      "Nom d'utilisateur Twitch",
      'Veuillez entrer votre nom d\'utilisateur Twitch:',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (twitchUsername) => {
            if (twitchUsername) {
              setTwitchUsername(twitchUsername);
              await AsyncStorage.setItem('userId', userId);
              await AsyncStorage.setItem('username', username);
              await AsyncStorage.setItem('twitch_username', twitchUsername);
              await AsyncStorage.setItem('isPremium', isPremium ? 'true' : 'false'); // utiliser isPremium
              await addStreamer(userId, username, twitchUsername);
                            
              // Ajouter les informations du streamer dans Firebase
              try {
                const response = await fetch(`https://api.twitch.tv/helix/users?login=${twitchUsername}`, {
                  headers: {
                    'Client-ID': 'i34nc3xu598asoajw481awags63pnl',
                    'Authorization': 'Bearer ' + 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c',
                  },
                });
                const result = await response.json();
                console.log('Résultat de la requête Twitch API:', result);
                const userData = result.data[0];
                await firebase.firestore().collection('streamers').doc(userId).set({
                  userId,
                  username,
                  isLive: false,
                  profileImage: userData.profile_image_url,
                  streamThumbnailUrl: '',
                  streamTitle: '',
                  viewerCount: 0,
                });
                
              } catch (error) {
                console.error("Erreur lors de l'ajout du streamer dans Firebase :", error);
              }
  
              navigation.navigate('AlaUne', { userId, username });
            } else {
              setErrorMessage("Veuillez entrer votre nom d'utilisateur Twitch");
            }
          },
        },
        
      ],
      'plain-text',
    );
  };

  
  const addStreamer = async (userId, username, twitchUsername) => {
    try {
      const response = await fetch(`https://api.twitch.tv/helix/users?login=${twitchUsername}`, {
        headers: {
          'Client-ID': 'i34nc3xu598asoajw481awags63pnl',
          'Authorization': 'Bearer ' + 'cbm6qiv3n5hizeqxbz7kdimrvyzr4c',
        },
      });
      const result = await response.json();
      console.log('Résultat de la requête Twitch API:', result);
      const userData = result.data[0];
      await firebase.firestore().collection('streamers').doc(userId).set({
        userId,
        username,
        isLive: false,
        profileImage: userData.profile_image_url,
        streamThumbnailUrl: '',
        streamTitle: '',
        viewerCount: 0,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du streamer dans Firebase :", error);
    }
  };
  

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const { userId, username } = await getUsernameAndUserId();
          if (userId && username) { // Ajoutez cette vérification
            if (isPremium) {
              showTwitchUsernamePrompt(userId, username);
            } else {
              navigation.navigate('AlaUne', { userId, username });
            }
          }
        } catch (error) {
          console.log("Erreur lors de la récupération de l'utilisateur :", error);
        }
      }
    });
  
    return unsubscribe;
  }, [navigation]);
  
  

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Connexion réussie');
      const { userId, username } = await getUsernameAndUserId();
      const isUserPremium = await AsyncStorage.getItem('isPremium') === 'true';
      const twitchUsername = await AsyncStorage.getItem('twitch_username');
      console.log('Nom d\'utilisateur Twitch stocké:', twitchUsername);

      if (userId && username) { // Ajoutez cette vérification
        if (isUserPremium) {
          showTwitchUsernamePrompt(userId, username);
        } else {
          console.log('Valeurs envoyées à LiveScreen:', { userId, username, twitchUsername });
          navigation.navigate('LiveScreen', { userId, username, twitchUsername });
        }
      } else {
        console.error('Username or userId is undefined');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };
  

  
  
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('./logo.png')} // Replace with the path to the Twitch logo image
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>CONNEXION</Text>
        </TouchableOpacity>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

// ... rest of the code (styles and export)

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#6441A4',
  justifyContent: 'center',
},
logoContainer: {
  position: 'absolute',
  top: 40,
  left: 0,
  right: 0,
  alignItems: 'center',
},
logo: {
  width: 150,
  height: 100,
},
formContainer: {
  paddingHorizontal: 30,
},
input: {
  height: 40,
  backgroundColor: 'rgba(255,255,255,0.1)',
  marginBottom: 20,
  color: '#FFF',
  paddingHorizontal: 10,
  borderRadius: 4,
},
buttonContainer: {
  backgroundColor: '#9146FF',
  paddingVertical: 15,
  borderRadius: 4,
},
buttonText: {
  textAlign: 'center',
  color: '#FFFFFF',
  fontWeight: '700',
},
errorMessage: {
  color: 'red',
  marginTop: 10,
  textAlign: 'center',
},
});

export default Connexion;

