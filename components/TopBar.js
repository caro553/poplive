import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native";

export default function TopBar() {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const scrollY = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 64],
                  outputRange: [0, -64],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.burgerContainer}>
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <Ionicons
              name="menu"
              size={24}
              color="white"
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>
        <Image source={require("./logo.png")} style={styles.logo} />
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.logoContainer}
            onPress={() => navigation.navigate("Compte")}
          >
            <Ionicons
              name="person"
              size={24}
              color="white"
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* ... Le contenu de votre application */}
      </Animated.ScrollView>
      <Modal
        visible={showMenu}
        onRequestClose={() => setShowMenu(false)}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View style={styles.menuOverlay}>
            <SafeAreaView style={styles.menuContainer}>
              {/* Ajoutez les éléments de votre menu ici */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Page1")}
              >
                <Ionicons
                  name="ios-home"
                  size={24}
                  color="black"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuItemText}>Page 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Page2")}
              >
                <Ionicons
                  name="ios-star"
                  size={24}
                  color="black"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuItemText}>Page 2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Page3")}
              >
                <Ionicons
                  name="ios-settings"
                  size={24}
                  color="black"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuItemText}>Page 3</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6441a5",
    height: 64,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  burgerContainer: {
    marginRight: 10,
  },
  profileContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    marginRight: -80,
    color: "#ADADB8",
  },
  profileIcon: {
    marginRight: 8,
  },
  logo: {
    height: 100,
    resizeMode: "contain",
  },
  scrollView: {
    flex: 1,
    marginTop: 64,
  },
  safeArea: {
    flex: 1,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    backgroundColor: "#18181B",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "40%",
    zIndex: 2,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  menuItemText: {
    marginLeft: -100,
    fontSize: -100,
    fontWeight: "bold",
    color: "#ADADB8",
  },
  logo: {
    height: 100,
    resizeMode: "contain",
  },

});
