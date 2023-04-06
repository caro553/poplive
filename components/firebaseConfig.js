import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCCSiKrrvo0pWnQI_pIkxeD3DnZPBQxF6o",
  authDomain: "poplive-4d383.firebaseapp.com",
  databaseURL:
    "https://poplive-4d383-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "poplive-4d383",
  storageBucket: "poplive-4d383.appspot.com",
  messagingSenderId: "1089658083084",
  appId: "1:1089658083084:web:f69a589b54339f982cdb29",
  measurementId: "G-3CQKX2YSZR",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
