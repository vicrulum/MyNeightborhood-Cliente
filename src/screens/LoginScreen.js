import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Input} from '../components/Input'
import {Heading} from '../components/Heading'
import {FilledButton} from '../components/FilledButton'
import {TextButton} from '../components/TextButton'
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Validated = async () => {
    try {
      const role = await AsyncStorage.getItem('@role')
      if(role==="administrador"){
        navigation.navigate("HomeA");
     }
     else if(role==="residente"){
       navigation.navigate("HomeU")
     }
     else{
       navigation.navigate("HomeG")
     }
    } catch(e) {
      // error reading value
    }
  }

  const SignIn = () => {
  fetch("https://my-neighborhood.herokuapp.com/api/auth/signin", {
      method: "POST",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      username,
      password,
      }),
  })
      .then((res) => res.json())
      .then((data) => {
        if(data.token)
        {
          const storeRole = async () => {
            try {
              await AsyncStorage.setItem('@role', data.role)
              await AsyncStorage.setItem('@id',data.id)
            } catch (e) {
              // saving error
            }
          }
          const storeData = async () => {
            try {
              await AsyncStorage.setItem('@token', data.token)
            } catch (e) {
              // saving error
            }
          }
          storeData();
          storeRole();
          Validated();
        }
          console.log(data);
      })
      .catch((error) => {
          console.error(error);
      });
  };
    return (
      <ScrollView style={styles.defaultBackground}>
      <View style={styles.container}>
        <Heading>My Neighborhood</Heading>
        <Image style={styles.logo} source={require("../assets/pueblo.png")}></Image>
        <Text style={styles.text}>Iniciar sesión</Text>
        <Input
          placeholder={"Usuario"}
          value={username}
          onChangeText={(text) => setUsername(text)}
        ></Input>
          <Input
          placeholder={"Contraseña"}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></Input>
                <FilledButton
          title={"Entrar na"}
          onPress={() => {
            SignIn();
          }}
        ></FilledButton>
        <TextButton
          title={"No tengo una cuenta"}
          onPress={() => {
            navigation.navigate("Register");
          }}
        ></TextButton>
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
    logo:{
      width:150,
      height:150,
      marginBottom:40
    },
    text:{
      fontSize:20,
      fontWeight: "bold",
    }
  });