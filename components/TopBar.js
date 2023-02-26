import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import LoginScreen from './LoginScreen';

export default function TopBar() {
  return (
    <View style={styles.container}>
      <TopBar />
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
