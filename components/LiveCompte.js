import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const LiveDeux = ({ route }) => {
  const { user, stream } = route.params;

  const openStream = () => {
    Linking.openURL(`https://www.twitch.tv/${stream.user_name}`);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profile_image_url }} style={styles.image} />
      <Text>{stream.title}</Text>
      <Text>{user.display_name}</Text>
      <Text>{stream.viewer_count} spectateurs</Text>
      <Text>{stream.game_name}</Text>
      <Text>{stream.language}</Text>
      {/* Ajoutez d'autres éléments pour afficher les informations souhaitées */}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    image: {
      width: 100,
      height: 100,
    },
  });

export default LiveDeux;
