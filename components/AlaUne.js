import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import TopBar from './TopBar';

export default function AlaUne() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar />
      </View>

      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://player.twitch.tv/?video=v1748916709&autoplay=false' }}
          style={styles.video}
        />
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.actionButton}>
          <Text style={styles.likeIcon}>Like</Text>
        </View>
        <View style={styles.actionButton}>
          <Text style={styles.commentIcon}>Comment</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6441A4', // nouvelle couleur de fond correspondant à la couleur de Twitch
  },
  topBar: {
    backgroundColor: '#5f5f5f',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '80%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  likeIcon: {
    fontWeight: 'bold',
  },
  commentIcon: {
    fontWeight: 'bold',
  },
});
