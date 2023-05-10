import React, { useState, useEffect } from 'react';
import { 
  Image, 
  View, 
  TextInput, 
  StyleSheet, 
  Button, 
  Text, 
  TouchableWithoutFeedback, 
  Keyboard,
  ScrollView
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
      const username = await AsyncStorage.getItem('username'); // Récupérer le pseudo
      const commentData = {
          comment: currentComment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          profileImageUrl: profileImageTopBarUrl,
          username, // Ajouter le pseudo ici
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
        <ScrollView style={styles.commentScrollView}>
  {comments.map((comment, index) => (
    <View style={styles.commentBox} key={index}>
      <Image source={{uri: comment.profileImageUrl}} style={styles.profileImage} />
      <Text>{comment.username}: {comment.comment}</Text>
    </View>
  ))}
</ScrollView>


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
      justifyContent: 'center',
    },
    image: {
      width: 300,
      height: 300,
      marginBottom: 20,
    },
    commentBox: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    input: {
      height: 40,
      width: '80%',
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
    commentScrollView: {
      width: '80%',
      flex: 1,
    },
  });
  