import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';


export default function HomeScreen({ navigation  }) {
  return (
    <LinearGradient colors={['#9b59b6', '#FFB347', '#F2C94C']} style={styles.container}>
      <View style={styles.logoContainer}>
      <Image source={require('./logo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginButton, { marginTop: 20, marginBottom: 10 }]} onPress={() => navigation.navigate('AlaUne')}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signupButton, { marginBottom: 20 } ]}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
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
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
