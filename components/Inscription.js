import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { auth } from './firebaseConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Inscription({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const saveUsername = async (userId) => {
    await AsyncStorage.setItem('username', firstName + ' ' + lastName);
    await AsyncStorage.setItem('userId', userId);
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Add user's full name to their profile
        userCredential.user
          .updateProfile({
            displayName: firstName + ' ' + lastName,
          })
          .then(() => {
            saveUsername(userCredential.user.uid); // Ajoutez l'ID de l'utilisateur ici
            console.log('Utilisateur créé avec succès');

            // Ajouter un document pour le nouvel utilisateur dans la collection 'test_users'
            firebase
              .firestore()
              .collection('test_users')
              .doc(userCredential.user.uid)
              .set({
                email: email,
                firstName: firstName,
                lastName: lastName,
                // Ajoutez ici d'autres informations si nécessaire
              })
              .then(() => {
                navigation.navigate('AlaUne', {
                  fullName: firstName + ' ' + lastName,
                });
              })
              .catch((error) => {
                console.log(
                  "Erreur lors de l'ajout de l'utilisateur à la collection test_users :",
                  error
                );
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

    return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('./logo.png')} // Remplacez par le chemin vers l'image du logo Twitch
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
      placeholder="Prénom"
      placeholderTextColor="rgba(255,255,255,0.7)"
      autoCapitalize="words"
      autoCorrect={false}
      value={firstName}
      onChangeText={setFirstName}
    />
    <TextInput
      style={styles.input}
      placeholder="Nom"
      placeholderTextColor="rgba(255,255,255,0.7)"
      autoCapitalize="words"
      autoCorrect={false}
      value={lastName}
      onChangeText={setLastName}
    />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>S'INSCRIRE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6441A4', // nouvelle couleur de fond correspondant à la couleur de Twitch
    justifyContent: 'center', // Centre le contenu verticalement
  },
  logoContainer: {
    position: 'absolute', // Positionne le conteneur du logo absolument
    top: 40, // Ajoute un espacement depuis le haut
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 100,
  },
  formContainer: {
    paddingHorizontal: 30, // Ajoute un rembourrage horizontal pour un meilleur alignement des entrées
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 4, // Ajoute un rayon de bordure pour un champ d'entrée arrondi
  },
  buttonContainer: {
    backgroundColor: '#9146FF', // Couleur violette de Twitch
    paddingVertical: 15,
    borderRadius: 4, // Ajoute un rayon de bordure pour un bouton arrondi
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  errorMessage: {
    color: '#FF0000',
    marginBottom: 20,
  },
});
