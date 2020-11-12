import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Input} from '../components/Input'
import {Heading} from '../components/Heading'
import {FilledButton} from '../components/FilledButton'
import {TextButton} from '../components/TextButton'
import { ScrollView } from "react-native-gesture-handler";


export default function AdminVisitsHistory({navigation}) {
    return (
      <ScrollView style={styles.defaultBackground}>
      <View style={styles.container}>
          <Heading>Historial de visitas</Heading>

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
    }
  });