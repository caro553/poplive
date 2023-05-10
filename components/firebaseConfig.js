import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCCSiKrrvo0pWnQI_pIkxeD3DnZPBQxF6o",
  authDomain: "poplive-4d383.firebaseapp.com",
  databaseURL:
    "https://poplive-4d383-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "poplive-4d383",
  storageBucket: "poplive-4d383.appspot.com",
  messagingSenderId: "1089658083084",
  appId: "1:1089658083084:web:f69a589b54339f982cdb29",
  measurementId: "G-3CQKX2YSZR",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Si Firebase est déjà initialisé, utilisez cette application
}

// Ajoutez cette partie pour vous connecter anonymement
firebase.auth().signInAnonymously()
  .catch((error) => {
    console.error('Error signing in anonymously:', error);
  });
  

const auth = firebase.auth();
const db = firebase.firestore();

export const addComment = async ({ comment, rectangleIndex }) => {
  await firestore()
    .collection('comments')
    .doc(`rectangle${rectangleIndex}`)
    .collection('comments')
    .add({
      comment,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
};
// Ajoutez la fonction updateUserToPremium ici
export const updateUserToPremium = async (userId) => {
  try {
    await firebase.firestore().collection('test_users').doc(userId).update({
      isPremium: true,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur en premium:', error);
  }
};
const storeLiveStreamInfo = async (userId, streamData) => {
  try {
    await firestore()
      .collection('liveStreams')
      .doc(userId)
      .set(streamData);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des informations de stream en direct:', error);
  }
};

export { auth };

export { db };

export default firebase;
