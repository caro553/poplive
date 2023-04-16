import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { auth } from './firebaseConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Inscription({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Add user's pseudo to their profile
                userCredential.user.updateProfile({
                    displayName: pseudo,
                })
                    .then(() => {
                        console.log('Utilisateur créé avec succès');
                        saveUsername();
                        navigation.navigate('AlaUne');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error.message);
              });
    }
    
    const saveUsername = async () => {
        await AsyncStorage.setItem('username', pseudo);
    };
  
    return (
        <View style={styles.container}>
                  <View style={styles.logoContainer}>
      <Image source={require('./logo.png')} style={styles.logo} />
      </View>

          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 40 }}>Inscription</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre adresse e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Entrez votre pseudo"
            value={pseudo}
            onChangeText={setPseudo}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#999"
          />
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      );
}      

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6441a5',
      paddingHorizontal: 20,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 15,
      borderRadius: 25,
    },
    errorMessage: {
      color: '#fff',
      textAlign: 'center',
      marginBottom: 20,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#7f00ff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
