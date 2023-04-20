import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import firebase from "./firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Connexion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twitchUsername, setTwitchUsername] = useState('');


  const getUsernameAndUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const username = await AsyncStorage.getItem('username');
    console.log('userId et username récupérés depuis AsyncStorage :', userId, username); // Ajoutez cette ligne

    if (!username || !userId) {
      const user = firebase.auth().currentUser;
      const userDoc = await firebase
        .firestore()
        .collection('test_users')
        .doc(user.uid)
        .get();
  
      const userData = userDoc.data();
      await AsyncStorage.setItem('userId', user.uid);
      await AsyncStorage.setItem('username', userData.twitchUsername);
  
      return { userId: user.uid, username: userData.twitchUsername };
      
    }
  
    return { userId, username };
  };
  
  
  const handleLoginOrSignup = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        console.log("Connexion réussie");
        const { userId, username } = await getUsernameAndUserId();
        console.log('userId et username après connexion :', userId, username);

        navigation.navigate("LiveScreen", {
          userId: userId,
          twitchUsername: username,
        });
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          handleSignup();
        } else {
          console.log(error.message);
        }
      });
  };
  
  
  const handleLogin = () => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async () => { // Ajoutez le mot-clé async ici
            console.log("Connexion réussie");
            const { userId, username } = await getUsernameAndUserId(); // Récupérez l'ID de l'utilisateur et le pseudo
            console.log('userId et username après connexion :', userId, username); // Ajoutez cette ligne

            navigation.navigate("AlaUne", {
                userId: userId,
                twitchUsername: username,
            });
        })
        .catch((error) => {
            console.log(error.message);
        });
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
          value={password}
          onChangeText={setPassword}
        />
      <TextInput
  style={styles.input}
  placeholder="Nom d'utilisateur Twitch"
  placeholderTextColor="rgba(255,255,255,0.7)"
  autoCapitalize="none"
  autoCorrect={false}
  value={twitchUsername}
  onChangeText={setTwitchUsername}
/>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>CONNEXION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6441A4', // nouvelle couleur de fond correspondant à la couleur de Twitch
    justifyContent: 'center', // Center the content vertically
  },
  logoContainer: {
    position: 'absolute', // Position the logo container absolutely
    top: 40, // Add some spacing from the top
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 100,
  },
  formContainer: {
    paddingHorizontal: 30, // Add horizontal padding for better input alignment
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 4, // Add border radius for a rounded input field
  },
  buttonContainer: {
    backgroundColor: '#9146FF', // Twitch's purple color
    paddingVertical: 15,
    borderRadius: 4, // Add border radius for a rounded button
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default Connexion;
