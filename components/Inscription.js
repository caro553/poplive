import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Image,
    Button,
    ScrollView,
  } from 'react-native';
  import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { auth } from './firebaseConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function Inscription({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const saveUsername = async (userId) => {
        await AsyncStorage.setItem('username', pseudo);
        await AsyncStorage.setItem('userId', userId);
    };
    

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Add user's pseudo to their profile
                userCredential.user.updateProfile({
                    displayName: pseudo,
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
                                twitchUsername: pseudo,
                                // Ajoutez ici d'autres informations si nécessaire
                            })
                            .then(() => {
                                saveUsername();
                                navigation.navigate('AlaUne', { // Modifiez cette ligne
                                    twitchUsername: pseudo,
                                });
                            })
                            .catch((error) => {
                                console.log("Erreur lors de l'ajout de l'utilisateur à la collection test_users :", error);
                            });
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
    
  
    return (
      <LinearGradient colors={['#624F9C', '#714F9B', '#814E9A', '#8B4D99', '#8B4D99', '#8E4D98', '#C24E97', '#E55599', '#F08479', '#FABE4B', '#F3E730']} style={styles.container}>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('./logo.png')} // Remplacez par le chemin vers l'image du logo Twitch
        />
      </View> 
      
      <Text style={styles.Text1}>Email</Text>
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

<Text style={styles.Text2}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

<Text style={styles.Text3}>Pseudo</Text>
        <TextInput
          style={styles.input}
          placeholder="Pseudo"
          placeholderTextColor="rgba(255,255,255,0.7)"
          autoCapitalize="none"
          autoCorrect={false}
          value={pseudo}
          onChangeText={setPseudo}
        />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonsignup}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>S'INSCRIRE</Text>
        </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 20,
      },
      logoContainer: {
        marginBottom: 30,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
      logoContainer: {
        marginBottom: 30,
      },
      logo: {
        width: 600,
        height: 400,
        bottom:40,
        resizeMode: 'contain',
      },
      title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
        
      errorMessage: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
      },

      Text1: {
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 16,
        bottom:60,
      },
      Text2: {
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 16,
        bottom:60,
        left:130,
      },
      Text3: {
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 16,
        bottom:60,
        left:150,
      },
      title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      input: {
        bottom:50,
        width: 350,
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 20,
      },
      errorMessage: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
      },
      buttonContainer: {
        marginTop: 30,
        width: '80%',
        alignItems: 'center',
      },
      roundButton: {
        color: '#4B388E',
        width: 250,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 16,
      },
      buttonsignup:{
        backgroundColor: '#FFF',
        borderRadius: 50,
        height: 50,
        left:80,
        width: 200,
        bottom:50,
      },
      buttonText:{
        color: '#4B388E',
        fontSize: 18,
        fontWeight: 'bold',
        left:50,
        top:12,
      },
});