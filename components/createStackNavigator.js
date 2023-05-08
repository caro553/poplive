import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AlaUne from './AlaUne';
import LiveScreen from './LiveScreen';
import Bestof from './Bestof';
import Compte from './Compte';
import Connexion from './Connexion';
import FAQScreen from './FAQScreen';
import ProfilStreamer from './ProfilStreamer';

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
        <Stack.Screen name="Bestof" component={Bestof} />
        <Stack.Screen name="Compte" component={Compte} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="ProfilStreamer" component={ProfilStreamer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
