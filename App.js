import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import SettingsScreen from "./components/SettingsScreen";
import AlaUne from "./components/AlaUne";
import LiveScreen from "./components/LiveScreen";
import Compte from "./components/Compte";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import LiveCompte from "./components/LiveCompte";
import Abonnement from "./components/Abonnement";
import FAQScreen from "./components/FAQScreen";
import ProfilStreamer from "./components/ProfilStreamer";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AlaUne" component={AlaUne} />
        <Stack.Screen name="LiveScreen" component={LiveScreen} />
        <Stack.Screen name="Compte" component={Compte} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="LiveCompte" component={LiveCompte} />
        <Stack.Screen name="Abonnement" component={Abonnement} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="ProfilStreamer" component={ProfilStreamer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
