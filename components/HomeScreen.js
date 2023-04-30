import React from 'react';
import { View, Text, StyleSheet, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';


export default function HomeScreen({ navigation  }) {
  return (
    <LinearGradient colors={['#624F9C', '#714F9B', '#814E9A', '#8B4D99', '#8B4D99', '#8E4D98', '#C24E97', '#E55599', '#F08479', '#FABE4B', '#F3E730']} style={styles.container}>
      <View style={styles.logoContainer}>
      <Image source={require('./logo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginButton, { marginTop: 20, marginBottom: 10 }]} onPress={() => navigation.navigate('Connexion')}>
          <Text style={styles.buttonText}>SE CONNECTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signupButton, { marginBottom: 20 } ]} onPress={() => navigation.navigate('Inscription')}>
          <Text style={styles.buttonText}>S'INSCRIRE</Text>
        </TouchableOpacity>
    
        <Button
          title="FAQ"
          onPress={() => navigation.navigate('FAQ')}
        />

      </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  logoContainer: {
    marginTop: -150,
    marginBottom: 1,
    alignItems: 'center',
  },
  logo: {
    height: 400,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
    
  },
  signupButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#4B388E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
