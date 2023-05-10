import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import { Dimensions } from "react-native";  
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import { auth } from "./firebaseConfig";

const gradientColors = ["purple", "yellow"];
const screenWidth = Dimensions.get("window").width;
function renderBorder(colors) {
  const numSegments = colors.length - 1;
  const segmentWidth = screenWidth / numSegments;
  return colors.map((color, index) => (
    <View
      key={index}
      style={[
        styles.borderSegment,
        { backgroundColor: color, width: segmentWidth },
      ]}
    />
  ));
}

export default function AlaUne({ navigation }) { // Ajoutez { navigation } ici
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar />
      </View>
      {/* Contenu de la page */}
      <BottomBar />

      <ScrollView style={styles.scrollView}>
        <View style={styles.ProfilUne} zIndex={0}>
          <Image source={require("./couronne.png")} style={styles.couronne} />
          <Image
            source={require("./demonslayer.jpg")}
            style={[styles.logoducomte, styles.imageWithBorder]}
          />
          <View style={styles.starContainer}>
            <View style={styles.starShape}>
              <Text style={styles.starText}>
                Découvrez le streamer à la une !
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.descriptionContainer} zIndex={0}>
          <Text style={styles.descriptionText}>
            Daksu est un jeune streamer passionné des jeux Fromsoftare et de
            l’univers Pokémon !! Découvrez le monde de Daksu !
          </Text>
          {renderBorder(gradientColors)}
        </View>

        <Text style={styles.scrollText}>En ce moment sur Twitch :</Text>
        <TouchableOpacity
  style={styles.twitchContainer}
  onPress={() => 
    navigation.navigate('PageAccueil', { image: require('./Rectangle2.png') })
  }
>
  <Image
    source={require("./Rectangle2.png")}
    style={styles.twitchIcon}
  />
  <View style={styles.twitchTextContainer}>
    <Title text="Wig on twitch" />
    <Description text="7h de live du lundi au dimanche 14 " />
    <View style={styles.iconsContainer}>
      <Image source={require('./comment.png')} style={styles.icon} />
      <Image source={require('./like.png')} style={styles.icon} />
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity
  style={styles.twitchContainer}
  onPress={() => 
    navigation.navigate('PageAccueil', { image: require('./Rectangle2.png') })
  }
>
  <Image
    source={require("./Rectangle2.png")}
    style={styles.twitchIcon}
  />
  <View style={styles.twitchTextContainer}>
    <Title text="Wig on twitch" />
    <Description text="7h de live du lundi au dimanche 14 " />
    <View style={styles.iconsContainer}>
      <Image source={require('./comment.png')} style={styles.icon} />
      <Image source={require('./like.png')} style={styles.icon} />
    </View>
  </View>
</TouchableOpacity>
<TouchableOpacity
  style={styles.twitchContainer}
  onPress={() => 
    navigation.navigate('PageAccueil', { image: require('./rectangle.png') })
  }
>
  <Image
    source={require("./rectangle.png")}
    style={styles.twitchIcon}
  />
  <View style={styles.twitchTextContainer}>
    <Title text="Wig on twitch" />
    <Description text="7h de live du lundi au dimanche 14 " />
    <View style={styles.iconsContainer}>
      <Image source={require('./comment.png')} style={styles.icon} />
      <Image source={require('./like.png')} style={styles.icon} />
    </View>
  </View>
</TouchableOpacity>
<TouchableOpacity
  style={styles.twitchContainer}
  onPress={() => 
    navigation.navigate('PageAccueil', { image: require('./rectangle.png') })
  }
>
  <Image
    source={require("./rectangle.png")}
    style={styles.twitchIcon}
  />
  <View style={styles.twitchTextContainer}>
    <Title text="Wig on twitch" />
    <Description text="7h de live du lundi au dimanche 14 " />
    <View style={styles.iconsContainer}>
      <Image source={require('./comment.png')} style={styles.icon} />
      <Image source={require('./like.png')} style={styles.icon} />
    </View>
  </View>
</TouchableOpacity>
<TouchableOpacity
  style={styles.twitchContainer}
  onPress={() => 
    navigation.navigate('PageAccueil', { image: require('./rectangle.png') })
  }
>
  <Image
    source={require("./rectangle.png")}
    style={styles.twitchIcon}
  />
  <View style={styles.twitchTextContainer}>
    <Title text="Wig on twitch" />
    <Description text="7h de live du lundi au dimanche 14 " />
    <View style={styles.iconsContainer}>
      <Image source={require('./comment.png')} style={styles.icon} />
      <Image source={require('./like.png')} style={styles.icon} />
    </View>
  </View>
</TouchableOpacity>
        {/* Ajoutez autant d'éléments <TouchableOpacity> que vous le souhaitez ici */}
      </ScrollView>
      <BottomBar/>
    </View>
  );
}
function Title({ text }) {
  return <Text style={styles.title}>{text}</Text>;
}

function Description({ text }) {
  return <Text style={styles.description}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6441A4", // nouvelle couleur de fond correspondant à la couleur de Twitch
    position: "relative",

    zIndex: 0, // Réduire le niveau de z-index
  },
  scrollView: {
    overflow: "hidden",
  },
  topBar: {
    backgroundColor: "#5f5f5f",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  videoContainer: {
    width: "80%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100, // Ajout de la marge supérieure
  },
  ProfilUne: {
    // position: "relative",
    // PaddingHorizontal: 20,
    alignItems: "center",
  },

  video: {
    width: "100%",
    aspectRatio: 2,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 30,

    borderRadius: 10,
    marginHorizontal: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  couronne: {
    width: 40,
    height: 40,
    top: 80,
    left: 0,
    zIndex: 1,
  },
  logoducomte: {
    width: 100,
    height: 100,
    borderRadius: 100,
    top: 30,
    marginVertical: 40,
  },
  starContainer: {
    position: "absolute",
    top: 80,
    right: 80,
  },
  starShape: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    // transform: [{ rotateZ: "-30deg" }],
  },
  starText: {
    color: "#6441A4",
    textAlign: "center",
    marginTop: 10,
  },
  imageWithBorder: {
    borderWidth: 5, // Épaisseur du contour
    borderColor: "yellow", // Couleur du contour
  },
  descriptionContainer: {
    marginTop: 10,
    width: screenWidth,
    paddingHorizontal: 60,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
  descriptionText: {
    color: "#6441A4",
    textAlign: "center",
    fontSize: 10,
    fontWeight: 700,
  },
  borderSegment: {
    height: 5,
    position: "absolute",
    bottom: 0,
  },
  scrollText: {
    color: "white",
    fontWeight: 500,
    fontSize: 17,
    marginTop: 20,
    marginBottom: -10,
    marginLeft: 30,
  },

  twitchContainer: {
    width: "90%",
    marginHorizontal: "5%",
    height: 90,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  twitchIcon: {
    borderRadius: 20,
    height: 86,
    marginLeft: 2,
  }, // Added the missing closing curly brace
    title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
