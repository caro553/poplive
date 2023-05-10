import React, { useState, useEffect } from 'react';
import { 
  Image, 
  View, 
  TextInput, 
  StyleSheet, 
  Button, 
  Text, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import firebase, { addComment } from "./firebaseConfig";
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { firestore } = firebase;

export default function PageAccueil({ route }) {
    const { image, rectangleIndex } = route.params;
    const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");

  useEffect(() => {
    const subscriber = firestore()
      .collection('comments')
      .doc(`rectangle${rectangleIndex}`)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const comments = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
        });
        setComments(comments);
      });
  
    return () => subscriber();
  }, [rectangleIndex]); 
  const handleCommentSubmit = async () => {
    try {
      const profileImageTopBarUrl = await AsyncStorage.getItem("profileImageUrl");
      const commentData = {
          comment: currentComment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          profileImageUrl: profileImageTopBarUrl,
      };
      await db.collection('comments').doc(`rectangle${rectangleIndex}`).collection('comments').add(commentData);
      setCurrentComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire: ', error);
    }
  };
  



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        {comments.map((comment, index) => (
  <View style={styles.commentBox} key={index}>
    <Image source={{uri: comment.profileImageUrl}} style={styles.profileImage} />
    <Text>{comment.comment}</Text>
  </View>
))}
        <TextInput 
          style={styles.input} 
          placeholder="Ecrivez votre commentaire ici..."
          multiline
          value={currentComment}
          onChangeText={setCurrentComment}
        />
<Button title="Envoyer" onPress={handleCommentSubmit} />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50, // adjust this value as needed
  },
  image: {
    width: 300, // adjust this value as needed
    height: 300, // adjust this value as needed
    marginBottom: 20, // adjust this value as needed
  },
  commentBox: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    height: 40, // adjust this value as needed
    width: '80%', // adjust this value as needed
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
