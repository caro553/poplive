import React, { useState } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image, LinearGradient} from 'react-native';

const FAQScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [modalVisible6, setModalVisible6] = useState(false);
  const [modalVisible7, setModalVisible7] = useState(false);
  const [modalVisible8, setModalVisible8] = useState(false);
  const [modalVisible9, setModalVisible9] = useState(false);
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
   




    <View style={styles.nouscontacter}>
      <Button title=" "/>
      <Image source={require('./boutoncontacter.png')} style={styles.imgcontacter} />
    </View>


      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Qu'est-ce que PopLive ?" 
            onPress={() => setModalVisible(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Qu'est-ce que PopLive ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>


      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Quelle est la différence entre le premium et le non-premium ?" 
            onPress={() => setModalVisible2(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible2} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Quelle est la différence entre le premium et le non-premium ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible2(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Est-ce que je risque un ban Twitch si j'utilise l'application ?" 
            onPress={() => setModalVisible3(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible3} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Est-ce que je risque un ban Twitch si j'utilise l'application ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible3(false)} />
          </View>
        </View>
      </Modal>




      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Y-a-t'il des offres étudiantes ?" 
            onPress={() => setModalVisible4(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible4} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Y-a-t'il des offres étudiantes ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible4(false)} />
          </View>
        </View>
      </Modal>



      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Quels sont les avantages de l'application en tant que viewer ?" 
            onPress={() => setModalVisible5(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible5} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Quels sont les avantages de l'application en tant que viewer ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible5(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Le mode premium me boostera-t-il que sur l'application ?" 
            onPress={() => setModalVisible6(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible6} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Le mode premium me boostera-t-il que sur l'application ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible6(false)} />
          </View>
        </View>
      </Modal>


      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Y-a-t'il d'autres contenus pour aider les streamers ?" 
            onPress={() => setModalVisible7(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible7} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Y-a-t'il d'autres contenus pour aider les streamers ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible7(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Est-ce que l'application respecte la RGPD ?" 
            onPress={() => setModalVisible8(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible8} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Est-ce que l'application respecte la RGPD ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible8(false)} />
          </View>
        </View>
      </Modal>



      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}>
          <Button 
            title="Et si j'ai un problème ?" 
            onPress={() => setModalVisible9(true)}
            color="black"
          />
               <Image source={require('./polygone.png')} style={styles.icon} />
        </View>

      </View>
  
      <Modal visible={modalVisible9} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Et si j'ai un problème ?</Text>
            <Text style={styles.modalText}>Cette application est conçue pour fournir aux utilisateurs les dernières nouvelles et mises à jour dans le monde du stream et d'améliorer leur référencements.</Text>
            <Button title="Fermer" onPress={() => setModalVisible9(false)} />
          </View>
        </View>
      </Modal>

      </View>
  
    </View>
    <View style={{top:225}}>
        <BottomBar />
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