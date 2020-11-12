import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal, TouchableHighlight, Alert, FlatList,ToastAndroid} from 'react-native';
import {Input} from '../components/Input'
import {Heading} from '../components/Heading'
import {FilledButton} from '../components/FilledButton'
import {TextButton} from '../components/TextButton'
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

export default function UserAdministration({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [toast, setToast] = useState("");

  const showToast = () => {
    ToastAndroid.show(toast, ToastAndroid.SHORT);
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      if(token){
        setToken(token)
      }
    } catch(e) {
      // error reading value
    }
  }
  useEffect(() => {getToken()}, [])
  const  updateRole =  () => {
    fetch("https://my-neighborhood.herokuapp.com/api/users/" + userId, {
        method: "PUT",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({role})
       })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setToast("¡Usuario actualizado!")
        })
        .catch((error) => {
            console.error(error);
        });
    };
  const  deleteUser =  () => {
    fetch("https://my-neighborhood.herokuapp.com/api/users/" + userId, {
        method: "DELETE",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: 'Bearer ' + token,
        },})
        .then((res) => res.json())
        .then((data) => {
            setToast("¡Usuario eliminado!")
        })
        .catch((error) => {
            console.error(error);
        });
    };
  fetch("https://my-neighborhood.herokuapp.com/api/users",{
    method: 'GET',
    headers:{
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(data => {
    setUsers(data)
  })    
    return (
      <View style={styles.container}>
          <Heading>Usuarios</Heading>
          {/* <Icon name="deleteuser" color="#DC2F02" size={35} style={styles.adduser} onPress={()=>{setModalVisible(!modalVisible);}}/> */}
          <FlatList
            data={users}
            renderItem={({item}) => <Text style={styles.item} onPress={()=>{setModalVisible(!modalVisible);
            setSelectedUser(item.name);
            setRole(item.role);
            setUserId(item.id)}}>{item.name}{"\n Rol: "}{item.role}</Text>}
          />
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
          <Text dat style={styles.text}>{selectedUser}</Text>
          <Picker 
              selectedValue={role}
              style={{height: 50, width: 200, marginTop: 15}}
              onValueChange={(itemValue, itemIndex) =>
                setRole(itemValue)
              }>
              <Picker.Item label="Residente" value="residente" />
              <Picker.Item label="Administrador" value="administrador" />
              <Picker.Item label="Guardia" value="guardia" />
          </Picker>
          <FilledButton style={styles.buttonUpdate}
          title={"Actualizar rol"}
          onPress={() => {
            updateRole();
            setModalVisible(!modalVisible);
            showToast();
          }}
        ></FilledButton>
        <FilledButton style={styles.buttonDelete}
          title={"Eliminar"}
          onPress={() => {
            deleteUser();
            setModalVisible(!modalVisible);
            showToast();
          }}
        ></FilledButton>
        <FilledButton 
          title={"Cancelar"}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        ></FilledButton>
          </View>
        </View>
      </Modal>
    </View>
      
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding:25,
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
    adduser:{
      position:"absolute",
      top:30,
      right:30
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 70,
      borderRadius:8,
      margin:5,
      borderColor:"#f48c06",
      borderWidth:3
    },
    buttonDelete: {
      backgroundColor: "red",
      width: "70%",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 8,
      marginTop:30
    },
    buttonUpdate: {
      backgroundColor: "green",
      width: "70%",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 8,
      marginTop:30
    },
  });