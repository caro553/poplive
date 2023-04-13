import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Cette fonction vérifie si un streamer est en ligne
// Remplacez cette implémentation par une requête à l'API de la plateforme de streaming
async function isStreamerOnline(streamer) {
  // Vérifiez si le streamer est en ligne et retournez un booléen
  return true; // ou false
}

function StreamerList() {
  const [streamers, setStreamers] = useState([]);

  useEffect(() => {
    const checkStreamersStatus = async () => {
      // Obtenez la liste initiale des streamers (à partir de votre API ou de votre état)
      const initialStreamers = []; // Remplacez par la liste réelle des streamers

      // Vérifiez l'état de chaque streamer et ajoutez-le à la liste s'il est en ligne
      const onlineStreamers = [];
      for (const streamer of initialStreamers) {
        if (await isStreamerOnline(streamer)) {
          onlineStreamers.push(streamer);
        }
      }

      setStreamers(onlineStreamers);
    };

    checkStreamersStatus();

    // Vérifiez périodiquement l'état des streamers (par exemple, toutes les minutes)
    const intervalId = setInterval(checkStreamersStatus, 60000);

    return () => clearInterval(intervalId); // Nettoyez l'intervalle lorsque le composant est démonté
  }, []);

  return (
    <View>
      {streamers.map((streamer, index) => (
        <View key={index}>
          <Text>{streamer.name}</Text>
        </View>
      ))}
    </View>
  );
}

export default StreamerList;
