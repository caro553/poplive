import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import firebase, { addComment } from "./firebaseConfig";
import { db } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { firestore } = firebase;

export default function Informations({ route }) {
  const { image, description, rectangleIndex } = route.params;
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");

  useEffect(() => {
    const subscriber = firestore()
      .collection("comments")
      .doc(`rectangle${rectangleIndex}`)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const comments = querySnapshot.docs.map((documentSnapshot) => {
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
      const profileImageTopBarUrl = await AsyncStorage.getItem(
        "profileImageUrl"
      );
      const username = await AsyncStorage.getItem("username"); // Récupérer le pseudo
      const commentData = {
        comment: currentComment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        profileImageUrl: profileImageTopBarUrl,
        username, // Ajouter le pseudo ici
        likes: 0, // Ajouter ce champ
      };
      await db
        .collection("comments")
        .doc(`rectangle${rectangleIndex}`)
        .collection("comments")
        .add(commentData);
      setCurrentComment("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire: ", error);
    }
  };
  const handleCommentDelete = async (commentId) => {
    try {
      await db
        .collection("comments")
        .doc(`rectangle${rectangleIndex}`)
        .collection("comments")
        .doc(commentId)
        .delete();

      console.log("Commentaire supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire: ", error);
    }
  };
  const handleLike = async (commentId) => {
    try {
      const commentRef = db
        .collection("comments")
        .doc(`rectangle${rectangleIndex}`)
        .collection("comments")
        .doc(commentId);

      // Incrémente le champ "likes"
      await commentRef.update({
        likes: firebase.firestore.FieldValue.increment(1),
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du commentaire: ", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
        <Image source={image} style={styles.image} />
        <Text style={{ color: 'white' }}>{description}</Text>
        <ScrollView style={styles.commentScrollView}>
          {comments.map((comment, index) => (
            <View style={styles.commentContainer} key={index}>
              
              <Image
                source={{ uri: comment.profileImageUrl }}
                style={styles.profileImage}
              />
              
              <View style={styles.commentBox}>
                <Text style={styles.username}>{comment.username}</Text>
                <Text>{comment.comment}</Text>
                <View style={styles.likesContainer}>
                  <TouchableOpacity onPress={() => handleLike(comment.key)}>
                    <Image
                      source={require("./like.png")}
                      style={styles.likeIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.likesCount}>{comment.likes}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <TextInput
          style={[styles.input, { marginTop: 20 }]} // Ajouter la propriété marginTop ici
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6441A4", // nouvelle couleur de fond correspondant à la couleur de Twitch
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
    borderRadius: 40,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 50, // Ajoutez cette ligne
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  username: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  likeIcon: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  commentBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 1, // Réduisez cette valeur pour diminuer l'épaisseur des commentaires
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Cette ligne va arrondir l'image
  },
  commentScrollView: {
    width: "80%",
    flex: 1,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  likesCount: {
    marginLeft: 5,
  },
});
