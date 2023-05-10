import React, { useState } from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Video } from 'expo-av';
import Controls from 'react-native-video-controls';
import { View, Text, StyleSheet, ScrollView, Button, Modal, Image, LinearGradient, Linking, TouchableOpacity,} from 'react-native';
import video from './faqvideo.mp4';

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

  const videoRef = React.useRef(null);
  const[status,setStatus] = React.useState({});
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
            <View id="video">
            <Video
  ref={videoRef}
  source={video}
  style={{ width: "90%", height: 193, borderRadius: 17, left:20, top:10}}
  useNativeControls
  resizeMode="contain"
  shouldPlay/>


            </View>



    <View style={styles.nouscontacter}>
  <TouchableOpacity onPress={() => Linking.openURL('mailto:service.poplive@gmail.com')}>
    <Image source={require('./boutoncontacter.png')} style={styles.imgcontacter} />
  </TouchableOpacity>
</View>


      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal}  onPress={() => setModalVisible(true)}>
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
            <Text style={styles.modalText}>Pop Live est une application qui permet d’améliorer l’expérience de cette plateforme et d’agrandir cette communauté. Le premier intérêt de cette application est donc de réunir les événements en cours et à venir sur Twitch (horaires, noms de l’organisateur, thèmes de l’événement, etc.) via un fil d’actualité où l’on peut discuter. Le deuxième intérêt est ainsi de pouvoir aider les streamers débutants à se développer et donc d’obtenir une communauté solide sur la plateforme.</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>


      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal} onPress={() => setModalVisible2(true)}>
          <Button 
            title="Quelle est la différence entre le premium..." 
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
            <Text style={styles.modalText}>La différence entre l’offre premium et le non-premium est le nombre de jours mis en avant par semaine. Les non-premium sont mis en avant 1 jour par semaine alors que les premiums 3 jours par semaine.</Text>
            <Button title="Fermer" onPress={() => setModalVisible2(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal} onPress={() => setModalVisible3(true)}>
          <Button 
            title="Est-ce que je risque un ban Twitch si..." 
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
            <Text style={styles.modalText}>Vous ne risquez pas de ban Twitch si vous utilisez cette application car cette dernière est complémentaire à Twitch et n’a pas pour objectif de concurrencer cette plateforme de streaming.</Text>
            <Button title="Fermer" onPress={() => setModalVisible3(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal} onPress={() => setModalVisible5(true)}>
          <Button 
            title="Quels sont les avantages de l'application..." 
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
            <Text style={styles.modalText}>Les avantages de l’application en tant que viewer sont : {"\n"}
-    Rassembler et hiérarchiser les événements à venir sur Twitch ;{"\n"}
-    Découverte de nouvelle personne par le biais de la fonctionnalité de la mise en avant d’un petit streamer.</Text>
            <Button title="Fermer" onPress={() => setModalVisible5(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal} onPress={() => setModalVisible6(true)}>
          <Button 
            title="Le mode premium me boostera-t-il que..." 
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
            <Text style={styles.modalText}>Oui, le mode premium aura un effet de tremplin en terme de visibilité sur votre contenu sur Twitch.</Text>
            <Button title="Fermer" onPress={() => setModalVisible6(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
      <View style={styles.avantmodal} onPress={() => setModalVisible8(true)}>
          <Button 
            title="Est-ce que l'application respecte la RGPD..." 
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
            <Text style={styles.modalText}>Par contrainte juridique, nous sommes obligés de respect la RGPD pour créer notre application.</Text>
            <Button title="Fermer" onPress={() => setModalVisible8(false)} />
          </View>
        </View>
      </Modal>
      </View>
  
    </View>
    <View style={{top:165,}}>
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
    top: 25,
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
      textAlign: 'justify',
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
      width: 380,
      height:40, 
      borderRadius: 100, 
      backgroundColor: 'white',
      marginBottom: 10,
    },
    buttonContainer:{
      top:90,
    },
    videoStyle:{
      top:150,
    },
  });


export default FAQScreen;