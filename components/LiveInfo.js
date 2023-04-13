import React from 'react';
import { View, Text } from 'react-native';

const LiveInfo = ({ user }) => {
  return (
    <View>
      <Text>{user.twitchUsername}</Text>
      <Text>{user.isLive ? 'En direct' : 'Hors ligne'}</Text>
    </View>
  );
};

export default LiveInfo;
