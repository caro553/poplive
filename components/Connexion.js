import React, { useState, useEffect } from 'react';
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
import { Alert } from 'react-native';

const Connexion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twitchUsername, setTwitchUsername] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const getUsernameAndUserId = async () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("User not found");
    }

    const userDoc = await firebase
      .firestore()
      .collection("test_users")
      .doc(user.uid)
      .get();

    const userData = userDoc.data();
    await AsyncStorage.setItem("userId", user.uid);
    await AsyncStorage.setItem("username", userData.username);
    await AsyncStorage.setItem("isPremium", userData.isPremium ? "true" : "false");
    setIsPremium(userData.isPremium);

    console.log("Retour depuis getUsernameAndUserId :", {
      userId: user.uid,
      username: userData.username,
      isPremium: userData.isPremium,
    });
    return { userId: user.uid, username: userData.username };
  };
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const { userId, username } = await getUsernameAndUserId();
          navigation.navigate("AlaUne", { userId, username });
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
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Connexion réussie");
  
      // Vérifier si l'utilisateur est premium
      const userDoc = await firebase.firestore().collection("test_users").doc(userCredential.user.uid).get();
      const userData = userDoc.data();
      const isPremium = userData?.isPremium || false;
  
      // Vérifier si un nom d'utilisateur Twitch a été saisi sans être premium
      if (!isPremium && twitchUsername.trim().length > 0) {
        Alert.alert('Erreur', 'Vous devez être premium pour ajouter votre nom d\'utilisateur Twitch.');
        return;
      }
  
      if (isPremium && !twitchUsername) {
        // Afficher un message d'erreur si l'utilisateur est premium mais n'a pas ajouté de nom d'utilisateur Twitch
        Alert.alert('Erreur', 'Veuillez ajouter votre nom d\'utilisateur Twitch.');
        return;
      }
  
      getUsernameAndUserId()
        .then((result) => {
          console.log(
            `userId et username récupérés depuis Firestore : ${result.userId} ${result.username}`
          );
          navigation.navigate("AlaUne", {
            userId: result.userId,
            username: result.username,
          });
        })
        .catch((error) => {
          console.log("Erreur lors de la récupération de l'userId et du username :", error);
        });
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
