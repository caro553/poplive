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
    await AsyncStorage.setItem('userId', user.uid);
    await AsyncStorage.setItem('username', userData.username);
    await AsyncStorage.setItem('isPremium', userData.isPremium ? 'true' : 'false');
    setIsPremium(userData.isPremium);
  
    console.log('Retour depuis getUsernameAndUserId :', {
      userId: user.uid,
      username: userData.username,
      isPremium: userData.isPremium,
    });
    
    return {
      userId: user.uid,
      username: userData.username,
      isPremium: userData.isPremium,
    };
  };
  

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const { userId, username } = await getUsernameAndUserId();
          navigation.navigate('AlaUne', { userId, username });
        } catch (error) {
          console.log('Erreur lors de la récupération de l\'utilisateur :', error);
        }
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Connexion réussie');
      const { userId, username, isPremium } = await getUsernameAndUserId();
  
      if (isPremium) {
        Alert.prompt(
          'Nom d\'utilisateur Twitch',
          'Veuillez entrer votre nom d\'utilisateur Twitch:',
          [
            {
              text: 'Annuler',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: (twitchUsername) => {
                if (twitchUsername) {
                  setTwitchUsername(twitchUsername);
                  navigation.navigate('AlaUne', { userId, username });
                } else {
                  setErrorMessage("Veuillez entrer votre nom d'utilisateur Twitch");
                }
              },
            },
          ],
          'plain-text',
        );
      } else {
        navigation.navigate('AlaUne', { userId, username });
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
        {isPremium && (
          <TextInput
            style={styles.input}
            placeholder="Nom d'utilisateur Twitch"
            placeholderTextColor="rgba(255,255,255,0.7)"
            autoCapitalize="none"
            autoCorrect={false}
            value={twitchUsername}
            onChangeText={setTwitchUsername}
          />
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

