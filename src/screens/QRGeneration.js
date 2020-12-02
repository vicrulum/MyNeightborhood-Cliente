import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal, ToastAndroid,Switch, TouchableOpacity, Alert, Linking, Button } from 'react-native';
import {Input} from '../components/Input'
import {Heading} from '../components/Heading'
import {FilledButton} from '../components/FilledButton'
import {TextButton} from '../components/TextButton'
import { ScrollView } from "react-native-gesture-handler";
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';



export default function QRGeneration({navigation}) {
  const [firstModal, setFirstModal] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrImage, setQRImage] = useState(""); 
  const [userID, setUserID] = useState(""); 
  const [token, setToken] = useState('');
  const [toast, setToast] = useState("");
  const showToast = () => {
    ToastAndroid.show(toast, ToastAndroid.SHORT);
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if(isEnabled){
      DisableQR();
    }
    else{
      EnableQR();
    }
  }

  const GetId = async () => {
    try {
      const id = await AsyncStorage.getItem('@id')
      const token = await AsyncStorage.getItem('@token')
      if(id){
        setUserID(id);
        setToken(token)
      }
    } catch(e) {
      // error reading value
    }
  }
  useEffect(() => {GetId();}, [])

  const ShowQR = () =>{
    fetch("https://my-neighborhood.herokuapp.com/api/qr/" + userID,{
      method: 'GET',
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => res.json())
    .then(data => {
      setQRImage(data.image);
      console.log(data);
    });
  }

  const GenerateQR = () =>{
        fetch("https://my-neighborhood.herokuapp.com/api/qr/" + userID,{
      method: 'POST',
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
  }

  const EnableQR = () =>{
    fetch("https://my-neighborhood.herokuapp.com/api/qr/enable/" + userID,{
    method: 'PUT',
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
  }

  const DisableQR = () =>{
    fetch("https://my-neighborhood.herokuapp.com/api/qr/disable/" + userID,{
    method: 'PUT',
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
  }

  let qrShared = qrImage.split(",")[1]
  let base64Logo = qrImage;
    return (
      <ScrollView style={styles.defaultBackground}>
      <View style={styles.container}>
 
      <FilledButton
          title={"Ver código QR"}
          onPress={() => {
            ShowQR();
            setModalVisible(!modalVisible)}}
        ></FilledButton>
        <FilledButton
          title={"Regenerar QR"}
          onPress={() => {
            GenerateQR();
            setToast("¡Nuevo codigo QR generado!");
            showToast();}}
        ></FilledButton>

        {/* <QRCodeScanner
          containerStyle={{backgroundColor:"#FFF"}}
          onRead={this.isScaned}
          reactivate={true}
          permissionDialogMessage="Need Permission To Access Camera"
          reactivateTimeout={10}
          showMarker={true}
          markerStyle={{borderColor:"#FFF",borderRadius:10}}
          bottomContent={
            <TouchableOpacity>
              <Text style={{fontSize:21,}}>Scan QR</Text>
            </TouchableOpacity>
          }
          /> */}
            <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={firstModal}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
          {/* Contenido del popup */}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontSize:20, marginTop:10, marginBottom:20}}>¡Vaya! Nos percatamos que eres nuevo por aqui. ¿Quieres generar un nuevo código QR?</Text>
            <Image style={{width:100, height:100}} source={require("../assets/question.png")}></Image>
            <FilledButton 
              title={"¡Claro!"}
              onPress={() => {
                GenerateQR();
                setFirstModal(!firstModal);
              }}
            ></FilledButton>
            </View>
          </View>
        </Modal>
      </View>


          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
          {/* Contenido del popup */}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Switch
            trackColor={{ false: "#767577", true: "#FFBA08" }}
            thumbColor={isEnabled ? "#E85D04" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.6 }], position: "absolute", top:25, right:30}}
            />
            <View style={{marginTop:40}}></View>
            <QRCode
              size={300}
              value="http://google.com"
              logo={{uri: base64Logo}}
              logoSize={300}
              logoBackgroundColor='transparent'
              />
            <FilledButton 
            title={"Compartir"}
            onPress={
              async () => {
                try {
                  let filename = 'share.png'; // or some other way to generate filename
                  let filepath = `${FileSystem.documentDirectory}/${filename}`;
                  await FileSystem.writeAsStringAsync(filepath, qrShared, { encoding: 'base64'});
                  await Sharing.shareAsync(filepath, { mimeType: 'image/png' })
                  console.log(qrShared)
                } catch(e) {
                  alert(e.message);
                }
             }
            }
            ></FilledButton>
          <FilledButton 
            title={"Regresar"}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          ></FilledButton>
            </View>
          </View>
        </Modal>
      </View>
     </View>
      </ScrollView>
    );
  }

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding:25
    },
    defaultBackground:{
      backgroundColor:"#fff",
    },
    qr:{
      width:300,
      height:300,
      marginBottom:40
    },
    text:{
      fontSize:20,
      fontWeight: "bold",
    },
    centeredView: {
      flex: 1,
      justifyContent: "flex-start",
      marginTop: 60
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5},
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
  });