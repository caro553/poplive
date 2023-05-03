import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfilStreamer = ({ route }) => {
  const { streamerUsername, streamerData } = route.params;

  return (
    <View style={styles.container}>
      {streamerData.profileImage && (
        <Image
          source={{ uri: streamerData.profileImage }}
          style={styles.profileImage}
        />
      )}
      {/* Utilisez les informations du streamerData pour afficher le contenu du profil */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default ProfilStreamer;
