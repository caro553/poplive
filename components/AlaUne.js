import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AlaUne() {
  return (
    <View style={styles.container}>
      <Ionicons name="menu" size={24} color="white" style={styles.menuIcon} />
      <Text style={styles.title}>Mon application</Text>
      <Ionicons name="person" size={24} color="white" style={styles.profileIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'purple',
    height: 64,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileIcon: {
    marginLeft: 16,
  },
});
