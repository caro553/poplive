import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image,TouchableOpacity, ScrollView,KeyboardAvoidingView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { auth } from './firebaseConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

      <ScrollView style={styles.scrollView}>
            <LinearGradient colors={['#624F9C', '#714F9B', '#814E9A', '#8B4D99', '#8B4D99', '#8E4D98', '#C24E97', '#E55599', '#F08479', '#FABE4B', '#F3E730']} style={styles.container}>
        <View style={styles.logoContainer}>
        <Image source={require('./logo.png')} style={styles.logo} />
        </View>
            <Text style={styles.Text}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre adresse e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false} // assurez-vous que cette propriété est définie sur false
            />
            <Text style={styles.Text}>Mot de passe</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={styles.Text}>Pseudo</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre pseudo"
                value={pseudo}
                onChangeText={setPseudo}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.roundButton} onPress={handleSignUp}>
  <Text style={styles.buttonText}>S'INSCRIRE</Text>
</TouchableOpacity>

</LinearGradient>
</ScrollView>
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
        backgroundColor: '#6441a5',
        paddingHorizontal: 20,
      },
      logoContainer: {
        marginBottom: 30,
      },
      logo: {
        width: 620,
        height: 445,
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

      Text: {
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
      buttonText:{
        color: '#4B388E',
        fontWeight: 'bold',
        fontSize: 16,
      },
});

