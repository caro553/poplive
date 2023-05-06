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
  
    if (!userDoc.exists) {
      // Redirect the user to the Signup page
      navigation.navigate('Inscription');
      return {};
    }
  
    const userData = userDoc.data();
  
    if (!userData || !userData.username) {
      console.error('UserData or username is undefined');
      console.log('Valeur de userData:', userData);
      return {};
    }
  
    const isPremium = userData.isPremium || false;
  
    await AsyncStorage.setItem('userId', user.uid);
    await AsyncStorage.setItem('username', userData.username);
    await AsyncStorage.setItem('isPremium', isPremium ? 'true' : 'false');
  
    console.log('Retour depuis getUsernameAndUserId :', {
      userId: user.uid,
      username: userData.username,
      isPremium: isPremium,
    });
    setIsPremium(isPremium);
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
              const isPremium = await AsyncStorage.getItem('isPremium') === 'true';
              await AsyncStorage.setItem('userId', userId);
              await AsyncStorage.setItem('username', username);
              await AsyncStorage.setItem('twitch_username', twitchUsername);
              await AsyncStorage.setItem('isPremium', isPremium ? 'true' : 'false');
              await addStreamer(userId, username, twitchUsername);
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
      console.log("Nom d'utilisateur Twitch pour la requête API :", twitchUsername);
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
          const { userId, username, isUserPremium } = await getUsernameAndUserId();
          setIsPremium(isUserPremium);
          // navigation.navigate("AlaUne", { userId, username });
        } catch (error) {
          console.log("Erreur lors de la récupération de l'utilisateur :", error);
        }
      }
    });
  
    return unsubscribe;
  }, [navigation]);
  
  
  
  const saveUsername = async (userId, username) => {
    await AsyncStorage.setItem('userId', userId);
    await AsyncStorage.setItem('username', username);
  };
  

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
          console.error('Username or userId is undefined');
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
        {isPremium ? (
         <TextInput
         style={styles.input}
         placeholder="Nom d'utilisateur Twitch"
         placeholderTextColor="rgba(255,255,255,0.7)"
         autoCapitalize="none"
         autoCorrect={false}
         value={twitchUsername}
         onChangeText={setTwitchUsername}
         editable={isPremium} // Ajoutez cette ligne pour rendre le champ modifiable uniquement pour les utilisateurs premium
       />
       
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur Twitch"
              placeholderTextColor="rgba(255,255,255,0.7)"
              autoCapitalize="none"
              autoCorrect={false}
              value={twitchUsername}
              onChangeText={setTwitchUsername}
            />
            <Text style={styles.errorMessage}>
              Vous devez être premium pour ajouter votre nom d'utilisateur Twitch.
            </Text>
          </View>
        )}
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

