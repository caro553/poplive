import React, { useState } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Video } from 'react-native';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image, LinearGradient} from 'react-native';

const FAQScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <View style={{height:1500,backgroundColor: '#6441a5',}}>
       <TopBar /> 
      <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
    <View style={styles.topBar}>
   
    <View style={styles.videoContainer}>
  <Video source={require('./faqvideo.mp4')}
         style={styles.video}
         muted={true}
         resizeMode='cover'
         repeat={true}
         controls={true} />
</View>




    <View style={styles.nouscontacter}>
      <Button title=" "/>
      <Image source={require('./boutoncontacter.png')} style={styles.imgcontacter} />
    </View>


      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Est-ce que l'application respecte la RGPD ?" 
            onPress={() => setModalVisible(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Y-a-t'il d'autres contenus pour aider les streamers ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>


      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Est-ce que l'application respecte la RGPD ?" 
            onPress={() => setModalVisible(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Est-ce que l'application respecte la RGPD ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Et si j'ai un problème ?" 
            onPress={() => setModalVisible(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Est-ce que l'application respecte la RGPD ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      </View>
  
    </View>

  </ScrollView>


  </View>
  );
};


const styles = StyleSheet.create({
  nouscontacter: {
    height: 50,
    width: 200,
    top: 160,
    left: 70,
  },
  imgcontacter:{
    height: 50,
    width: 250,
    borderRadius: 8, 
  },
  icon: {
    width: 30,
    height: 30,
    left: 340,
    bottom:30,
  },
  icon2: {
    width: 278,
    height: 153,
    top: 100,
    left: 60,
    alignItems: 'center',
    justifyContent:'center',
    position:'absolute',
  },
    modal: {
      backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    },

    
    button: {
      width: '60%',
      borderRadius: 20,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 50,
      left: '20%'
    },
    buttonImage: {
      width: 30,
      height: 30,
      marginRight: 10,
    },

    container: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#6441a5',
      height: '100%',
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
    button: {
      width: '60%',
      borderRadius: 20,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    buttonImage: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    avantmodal:{
      top:220,
      width: 380,
      height:40, 
      borderRadius: 100, 
      backgroundColor: 'white',
      marginBottom: 10,
    },
  });


export default FAQScreen;