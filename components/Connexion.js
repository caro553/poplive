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
  
  
  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Utilisateur enregistré avec succès!');
  
        // Ajouter un document pour le nouvel utilisateur dans la collection 'test_users'
        firebase
          .firestore()
          .collection('test_users')
          .doc(userCredential.user.uid)
          .set({
            twitchUsername: twitchUsername,
            email: email, // Ajouter l'adresse e-mail au document
            // Ajoutez ici d'autres informations si nécessaire
          })
          .then(async () => { // Ajoutez le mot-clé async ici
            // Enregistrez l'ID de l'utilisateur et le pseudo dans AsyncStorage
            await AsyncStorage.setItem('userId', userCredential.user.uid);
            await AsyncStorage.setItem('username', twitchUsername);
            console.log('userId et username sauvegardés dans AsyncStorage :', userCredential.user.uid, twitchUsername); // Ajoutez cette ligne

          });
      })
      .catch((error) => {
        console.log(error.message);
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

            navigation.navigate("LiveScreen", {
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
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
          <Text style={styles.buttonText}>INSCRIPTION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  formContainer: {},
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});

export default Connexion;
