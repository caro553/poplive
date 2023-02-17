import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';


export default function App() {
  return (
<LinearGradient colors={['#9b59b6', '#FFB347', '#F2C94C']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Mon Application</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton}>
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
    marginTop: 50,
    marginBottom: 30,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonContainer: {
    width: '80%',
  },
  loginButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});