import React from 'react';
import { Image, View } from 'react-native';

export default function PageAccueil({ route }) {
  const { image } = route.params;

  return (
    <View>
      <Image source={image} />
      {/* ... */}
    </View>
  );
}
