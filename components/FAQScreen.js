import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FAQScreen = () => {
return (
    <ScrollView style={styles.scrollView}>
<View style={styles.container}>
<Text style={styles.title}>Foire Aux Questions</Text>
<View style={styles.questionContainer}>
<Text style={styles.question}>Quel est le but de cette application?</Text>







<Text style={styles.answer}>
Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.
</Text>
</View>
<View style={styles.questionContainer}>
<Text style={styles.question}>A quelle fréquence l'application est-elle mise à jour?</Text>
<Text style={styles.answer}>
L'application est mise à jour régulièrement, avec de nouveaux contenus ajoutés plusieurs fois par jour.
</Text>
</View>
<View style={styles.questionContainer}>
<Text style={styles.question}>
Puis-je personnaliser l'application pour ne voir que les streams qui m'intéressent?
</Text>
<Text style={styles.answer}>
a voir
</Text>
</View>
<View style={styles.questionContainer}>
<Text style={styles.question}>L'application est-elle gratuite ?</Text>
<Text style={styles.answer}>
Oui, l'application est entièrement gratuite à télécharger et à utiliser. Cependant du contenue premium est disponible pour améliorer le référencements de certains streameur.
</Text>
</View>
<View style={styles.questionContainer}>
<Text style={styles.question}>Est-ce immorale d'utiliser cette application pour me construire une plateforme ?</Text>
<Text style={styles.answer}>
 Non, l'application permet seulement aux streamers victime de la sévérité de l'algorithmes d'avoir une visibilité et la chance de se faire connaître grâce a leurs contenues. 
 Sur Twitch, les algorithmes ont un impact important sur la visibilité des streamers. Malheureusement, certains streamers sont moins mis en avant que d'autres en raison de l'injustice des algorithmes 
 de recommandation et de la concurrence sur la plateforme. Les algorithmes de Twitch sont conçus pour recommander des streamers en fonction de leur popularité, de leur engagement et de la pertinence 
 de leur contenu pour les utilisateurs. Les streamers qui ont moins de followers ou qui ont des horaires de diffusion moins réguliers peuvent donc être moins visibles sur la plateforme. De plus, la 
 concurrence est féroce sur Twitch, avec des milliers de streamers en ligne en même temps, ce qui rend difficile la visibilité pour les streamers moins connus. Cette situation peut être frustrante 
 pour les streamers qui travaillent dur pour créer du contenu de qualité, mais qui ont du mal à atteindre une audience plus large.
</Text>
</View>
<View style={styles.questionContainer}>
<Text style={styles.question}>Est-ce légale d'utiliser cette application ?</Text>
<Text style={styles.answer}>
 Oui, totalement, cette application permet seulement d'avoir un meilleur référencement et plus de visibilité, ce n'est en aucun cas une application de boosting où de faux spectateurs. Les utilisateurs de cette
 application sont tous humains. 
</Text>


</View>
<View style={styles.questionContainer}>
<Text style={styles.question}>Que m'offre l'option premium ?</Text>
<Text style={styles.answer}>
 a voir. 
</Text>
</View>

</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6C63FF', // violet
      paddingHorizontal: 30,
      paddingTop: 50,
      paddingBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: '#fff', // blanc
    },
    questionContainer: {
      marginBottom: 30,
    },
    question: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#fff', // blanc
    },
    answer: {
      fontSize: 18,
      lineHeight: 28,
      color: '#fff', // blanc
    },
  });

export default FAQScreen;