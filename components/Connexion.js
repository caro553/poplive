import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import firebase from "./firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./logo.png')} // Replace with the path to the Twitch logo image
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.Text}>Email</Text>
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
          <Text style={styles.Text2}>Mot de passe</Text>
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
              <Text style={styles.Text3}>Nom d'utilisateur Twitch</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur Twitch"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCapitalize="none"
                autoCorrect={false}
                value={twitchUsername}
                onChangeText={setTwitchUsername}
              />
            </View>
          )}
          <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>CONNEXION</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );  
};
const styles = StyleSheet.create({
  Text: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 16,
    bottom:50,
    left:160,
  },
  Text2: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 16,
    bottom:50,
    left:130,
  },
  Text3: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 16,
    bottom:50,
    left:90,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6441a5',
    paddingHorizontal: 20,
    fontFamily: 'Calibri, Arial, sans-serif', 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6441a5',
  },
  logo: {
    width: 350,
    height: 400,
    bottom:40,
    resizeMode: 'contain',
  },

  input: {
    width:322,
    height: 52,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 40,
    borderRadius: 25,
    fontSize: 16,
    bottom:45,
    left:20,
  },
  errorMessage: {
    color: '#fff',
    textAlign: 'center',
    bottom:60,
    fontSize: 16,
  },

  buttonText:{
    color: '#4B388E',
    fontSize: 18,
    fontWeight: 'bold',
    left:50,
    top:12,
  },

  signupButton: {
    color: '#4B388E',
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 16,
    left:80,
    bottom:30,
  },
});

export default Connexion;
