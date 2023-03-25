import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import SettingsScreen from "./components/SettingsScreen";
import AlaUne from "./components/AlaUne";
import LiveScreen from "./components/LiveScreen";
import Bestof from "./components/Bestof";
import Compte from "./components/Compte";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";

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
        <Stack.Screen name="Inscription" component={Inscription} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
