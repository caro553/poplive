import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from "./firebaseConfig";
import { auth } from './firebaseConfig.js';

const Abonnement = () => {
  const [isPremium, setIsPremium] = useState(false);

  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (user) {
      const docRef = firebase.firestore().collection('test_users').doc(user.uid);

      docRef.get().then((doc) => {
        if (doc.exists) {
          setIsPremium(doc.data().isPremium);
        } else {
          console.error('No such document!');
        }
      }).catch((error) => {
        console.error('Error getting document:', error);
      });
    }
  }, [user]);

  const handleUpgrade = async () => {
    if (user) {
      const docRef = firebase.firestore().collection('test_users').doc(user.uid);

      try {
        await docRef.update({
          isPremium: true,
        });
        setIsPremium(true);
        console.log('Updating document ID:', user.uid);
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abonnement</Text>
      <Text style={styles.premiumStatus}>{isPremium ? 'Vous êtes Premium!' : 'Vous n\'êtes pas Premium.'}</Text>
      <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
        <Text style={styles.upgradeButtonText}>Passer à Premium</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  premiumStatus: {
    fontSize: 18,
    marginTop: 10,
  },
  upgradeButton: {
    backgroundColor: '#6441A4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default Abonnement;
