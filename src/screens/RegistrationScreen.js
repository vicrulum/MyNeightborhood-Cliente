import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Input} from '../components/Input'
import {Heading} from '../components/Heading'
import {FilledButton} from '../components/FilledButton'
import {TextButton} from '../components/TextButton'
import { ScrollView } from "react-native-gesture-handler";

export default function RegistrarionScreen({navigation}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const submitData = () => {
    fetch("https://my-neighborhood.herokuapp.com/api/auth/signup", {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        username,
        email,
        name,
        password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
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
        <Text style={styles.text}>¡Crea una cuenta!</Text>
        <Input
          placeholder={"Usuario"}
          value={username}
          onChangeText={(text) => setUsername(text)}
        ></Input>
        <Input
          placeholder={"Correo electrónico"}
          keyboardType={"email-address"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></Input>
                <Input
          placeholder={"Nombre completo"}
          value={name}
          onChangeText={(text) => setName(text)}
        ></Input>
          <Input
          placeholder={"Contraseña"}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></Input>

                <FilledButton
          title={"Registrarse"}
          onPress={() => {
            submitData();
            navigation.navigate("Login");
          }}
        ></FilledButton>
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