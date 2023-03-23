import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import firebase from "../firebase";

function UserProfileScreen({ userId }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      const userSnapshot = await firebase
        .firestore()
        .collection("users_test")
        .doc("MFkXpuSmSxT19o3LrudA")
        .get();
      const userData = userSnapshot.data();
      setUserName(userData.name);
    };
    getUserDetails();
  }, ["MFkXpuSmSxT19o3LrudA"]);

  return (
    <View>
      <Text>{userName}</Text>
    </View>
  );
}

export default UserProfileScreen;
