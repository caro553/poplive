import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AlaUne from './AlaUne';
import LiveScreen from './LiveScreen';
import bestof from './bestof';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AlaUne" component={AlaUne} />
        <Stack.Screen name="LiveScreen" component={LiveScreen} />
        <Stack.Screen name="bestof" component={bestof} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
