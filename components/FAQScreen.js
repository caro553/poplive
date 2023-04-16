import React, { useState } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image} from 'react-native';

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
      <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
    <View style={styles.topBar}>
    <TopBar />

    <Image source={require('./faq_img.png')} style={styles.icon2} />


    <View style={styles.nouscontacter}>
      <Button title="Nous contacter"

    ></Button>

</View>

      <View style={styles.buttonContainer}>
        <View style={{width: '95%', top:240,height:50, borderRadius: 100, backgroundColor: 'white'}}>
          <Button 
            title="Quel est le but de cette application ?" 
            onPress={() => setModalVisible(true)}
            color="black"
          />
              <Image source={require('./triangle.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Quel est le but de cette application ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      
      
      




            
      <View style={styles.buttonContainer}>
        <View style={{width: '95%', top:260,height:50, borderRadius: 100, backgroundColor: 'white'}}>
          <Button 
            title="Quel est le but de cette application ?" 
            onPress={() => setModalVisible(true)}
            color="black"
          />
              <Image source={require('./triangle.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Quel est le but de cette application ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      

            
      <View style={styles.buttonContainer}>
        <View style={{width: '95%', top:280,height:50, borderRadius: 100, backgroundColor: 'white'}}>
          <Button 
            title="Quel est le but de cette application ?" 
            onPress={() => setModalVisible(true)}
            color="black"
          />
              <Image source={require('./triangle.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Quel est le but de cette application ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>




      <View style={styles.buttonContainer}>
        <View style={{width: '95%', top:300,height:50, borderRadius: 100, backgroundColor: 'white'}}>
          <Button 
            title="Quel est le but de cette application ?" 
            onPress={() => setModalVisible(true)}
            color="black"
          />
              <Image source={require('./triangle.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Quel est le but de cette application ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      
      </View>



    </View>
    <View  style={{top:500,}}>
    <BottomBar></BottomBar>
    </View>
  </ScrollView>
  </View>
  );
};


const styles = StyleSheet.create({
  nouscontacter: {
    /* Ajouter une hauteur et une largeur pour l'élément */
    height: 50,
    width: 200,
    top:220,
    left: 100,
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
   
  });


export default FAQScreen;
 