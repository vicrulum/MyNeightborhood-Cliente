import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import {Input} from '../components/Input'
import {Heading} from '../components/Heading'
import {FilledButton} from '../components/FilledButton'
import {TextButton} from '../components/TextButton'
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({navigation}) {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      if(token){
        setToken(token)
      }
    } catch(e) {
      // error reading value
    }
  }
  useEffect(() => {getData()}, [])
  fetch("https://my-neighborhood.herokuapp.com/api/auth/myself",{
    method: 'GET',
    headers:{
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(data => {
    const name = data.name;
    setName(name);
  })
    return (
      <ScrollView style={styles.defaultBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.title}>{name}</Text>
        <Image style={styles.homeImage} source={require("../assets/vecindario.jpg")}></Image>
      </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding:25
    },
    defaultBackground:{
      backgroundColor:"#fff",
    },
    logo:{
      width:150,
      height:150,
      marginBottom:40
    },
    homeImage:{
      width:"90%",
      height:500,
      margin: 20,
      borderRadius: 8
    },
    title:{
      fontSize:20,
      fontWeight: "bold",
      color:"#03071E"
    }
  });