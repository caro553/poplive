import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
            <Text>Inscription</Text>
            <Text>Email :</Text>
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
            <Text>Mot de passe :</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text>Pseudo :</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre pseudo"
                value={pseudo}
                onChangeText={setPseudo}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Button title="S'inscrire" onPress={handleSignUp} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
