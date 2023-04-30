import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,  ScrollView, KeyboardAvoidingView,
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
    const userEmail = await AsyncStorage.getItem('email');
  
    const user = firebase.auth().currentUser;
    const addUser = (userId, twitchUsername) => {
      // Vérifie si l'utilisateur existe déjà dans la liste d'utilisateurs
      const userExists = users.some((user) => user.userId === userId);
    
      // Si l'utilisateur n'existe pas, ajoutez-le à la liste
      if (!userExists) {
        setUsers((prevUsers) => [...prevUsers, { userId, twitchUsername }]);
      }
    };
    
    // Vérifie si l'adresse e-mail de l'utilisateur actuellement connecté correspond à celle stockée dans AsyncStorage
    if (!username || !userId || user.email !== userEmail) {
      const userDoc = await firebase
        .firestore()
        .collection('test_users')
        .doc(user.uid)
        .get();
  
      const userData = userDoc.data();
      await AsyncStorage.setItem('userId', user.uid);
      await AsyncStorage.setItem('username', userData.twitchUsername);
      await AsyncStorage.setItem('email', user.email); // Ajoutez cette ligne
  
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
      .then(async () => {
        console.log("Connexion réussie");
        const { userId, username } = await getUsernameAndUserId();
        console.log('userId et username après connexion :', userId, username);
  
        // Récupérez la liste des utilisateurs de AsyncStorage
        const usersJSON = await AsyncStorage.getItem('users');
        let users = usersJSON ? JSON.parse(usersJSON) : [];
  
        // Ajoutez le nouvel utilisateur à la liste des utilisateurs
        users.push({ userId, twitchUsername: username });
  
        // Stockez la liste mise à jour des utilisateurs dans AsyncStorage
        await AsyncStorage.setItem('users', JSON.stringify(users));
  
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

    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
       <View style={styles.logoContainer}>
        <Image source={require('./logo.png')} style={styles.logo} />
        </View>
      <StatusBar barStyle="light-content" />
     
      <View style={styles.formContainer}>
      <Text style={[styles.Text, {marginLeft:135, }]}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre adresse e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
         <Text style={[styles.Text, {marginLeft:110, }]}>Mot de passe</Text>
        <TextInput
        
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
         <Text style={[styles.Text, {marginLeft:135, }]}>Pseudo</Text>
      <TextInput
  style={styles.input}
  placeholder="Entrez votre pseudo"
  autoCapitalize="none"
  autoCorrect={false}
  value={twitchUsername}
  onChangeText={setTwitchUsername}
/>
        <TouchableOpacity style={[styles.signupButton, { marginTop: 20, marginBottom: 10,marginLeft:35, }]} onPress={handleSignup}> 
          <Text style={styles.buttonText}>INSCRIPTION</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={[styles.signupButton, { marginBottom: 20 } ]} onPress={handleLogin}>
          <Text style={styles.buttonText}>CONNEXION</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>

  );
};
const styles = StyleSheet.create({
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
    width: 620,
    height: 445,
    resizeMode: 'contain',
  },

  Text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft:100,
  },

  input: {
    width:322,
    height: 52,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 25,
    fontSize: 16,
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

  buttonText:{
    color: '#4B388E',
    fontWeight: 'bold',
    fontSize: 16,
  },


  signupButton: {
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
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Connexion;
 