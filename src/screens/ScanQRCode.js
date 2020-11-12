import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal, ToastAndroid,Switch, TouchableOpacity, Alert, Linking, Button } from 'react-native';
import {Input} from '../components/Input'
import {Heading} from '../components/Heading'
import {FilledButton} from '../components/FilledButton'
import {TextButton} from '../components/TextButton'
import { ScrollView } from "react-native-gesture-handler";
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ScanQRScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [qrImage, setQRImage] = useState(""); 
  const [userID, setUserID] = useState(""); 
  const [token, setToken] = useState('');
  const [toast, setToast] = useState("");
  const showToast = () => {
    ToastAndroid.show(toast, ToastAndroid.SHORT);
  };

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
  useEffect(() => {GetId()}, [])



  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetch(data,{
        method: 'GET',
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.enabled){
           Alert.alert('Acceso Permitido','El código QR escaneado pertenece al usuario ' + data.user.name); 
        }
        else{
            Alert.alert('Acceso Denegado','El código QR escaneado no pertenece a ningun usuario o no se encuentra habilitado.'); 
        }
        
      });
    }
  

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    return (
        <View
            style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && <Button title={'Pulsar para escanear'} onPress={() => setScanned(false)} />}

        </View>
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