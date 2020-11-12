import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import HomeScreen from './HomeScreen';
import QRGeneration from './QRGeneration';
import ScanQRScreen from './ScanQRCode';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import UserAdministration from './AdminUsers';
import AdminRegistration from './AdminRegist';
import AdminVisitsHistory from './VisitsHistory';
import EmailVerification from './EmailVerification';

import{
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from "react-native-paper";

const HomeStack = createStackNavigator();
const QRCodeStack = createStackNavigator();
const AdminUser = createStackNavigator();
const AdminRegist = createStackNavigator();
const AdminRegHistory = createStackNavigator();
const EmailVerif = createStackNavigator();
const Stack = createStackNavigator();
const MainDrawer = createDrawerNavigator();
const ScanQR = createStackNavigator();

function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator screenOptions={{ 
        headerStyle:{
        backgroundColor:"#DC2F02",
        },
        headerTintColor:"#fff",
        headerTitleStyle:{
          fontWeight:"bold"
        }
      }}>
      <HomeStack.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Icon.Button name= "ios-menu" size={35} 
            backgroundColor="#DC2F02" onPress={()=>{navigation.openDrawer()}}/>
          )
        }}
      />
    </HomeStack.Navigator>
  );
}

function QRStackScreen({navigation}) {
  return (
    <QRCodeStack.Navigator screenOptions={{ 
      headerStyle:{
      backgroundColor:"#DC2F02",
      },
      headerTintColor:"#fff",
      headerTitleStyle:{
        fontWeight:"bold"
      }
    }}>
      <QRCodeStack.Screen
        name="Generar código QR"
        component={QRGeneration}
        options={{
          headerLeft: () => (
            <Icon.Button name= "ios-menu" size={35} 
            backgroundColor="#DC2F02" onPress={()=>{navigation.openDrawer()}}/>
          )
        }}
      />
    </QRCodeStack.Navigator>
  );
}

function ScanQRStack({navigation}) {
  return (
    <ScanQR.Navigator screenOptions={{ 
      headerStyle:{
      backgroundColor:"#DC2F02",
      },
      headerTintColor:"#fff",
      headerTitleStyle:{
        fontWeight:"bold"
      }
    }}>
      <ScanQR.Screen
        name="Escanear código QR"
        component={ScanQRScreen}
        options={{
          headerLeft: () => (
            <Icon.Button name= "ios-menu" size={35} 
            backgroundColor="#DC2F02" onPress={()=>{navigation.openDrawer()}}/>
          )
        }}
      />
    </ScanQR.Navigator>
  );
}

function AdminUsersStack({navigation}) {
  return (
    <AdminUser.Navigator screenOptions={{ 
      headerStyle:{
      backgroundColor:"#DC2F02",
      },
      headerTintColor:"#fff",
      headerTitleStyle:{
        fontWeight:"bold"
      }
    }}>
      <AdminUser.Screen
        name="Administrar Usuarios"
        component={UserAdministration}
        options={{
          headerLeft: () => (
            <Icon.Button name= "ios-menu" size={35} 
            backgroundColor="#DC2F02" onPress={()=>{navigation.openDrawer()}}/>
          )
        }}
      />
    </AdminUser.Navigator>
  );
}

function AdminRegistStack({navigation}) {
  return (
    <AdminRegist.Navigator screenOptions={{ 
      headerStyle:{
      backgroundColor:"#DC2F02",
      },
      headerTintColor:"#fff",
      headerTitleStyle:{
        fontWeight:"bold"
      }
    }}>
      <AdminRegist.Screen
        name="Administrar registros"
        component={AdminRegistration}
        options={{
          headerLeft: () => (
            <Icon.Button name= "ios-menu" size={35} 
            backgroundColor="#DC2F02" onPress={()=>{navigation.openDrawer()}}/>
          )
        }}
      />
    </AdminRegist.Navigator>
  );
}

function AdminVisitsStack({navigation}) {
  return (
    <AdminRegHistory.Navigator screenOptions={{ 
      headerStyle:{
      backgroundColor:"#DC2F02",
      },
      headerTintColor:"#fff",
      headerTitleStyle:{
        fontWeight:"bold"
      }
    }}>
      <AdminRegHistory.Screen
        name="Historial de visitas"
        component={AdminVisitsHistory}
        options={{
          headerLeft: () => (
            <Icon.Button name= "ios-menu" size={35} 
            backgroundColor="#DC2F02" onPress={()=>{navigation.openDrawer()}}/>
          )
        }}
      />
    </AdminRegHistory.Navigator>
  );
}
function VerifyEmail({navigation}) {
  const [token, setToken] = useState('')
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
  fetch("https://my-neighborhood.herokuapp.com/api/auth/verification",{
    method: 'GET',
    headers:{
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  return (
    <EmailVerif.Navigator screenOptions={{ 
      headerStyle:{
      backgroundColor:"#DC2F02",
      },
      headerTintColor:"#fff",
      headerTitleStyle:{
        fontWeight:"bold"
      }
    }}>
      <EmailVerif.Screen
        name="Historial de visitas"
        component={EmailVerification}
        options={{
          headerLeft: () => (
            <Icon.Button name= "ios-menu" size={35} 
            backgroundColor="#DC2F02" onPress={()=>{navigation.openDrawer()}}/>
          )
        }}
      />
    </EmailVerif.Navigator>
  );
}

export default function AuthStack() {
  
  return (
      <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name= "Login" component={LoginScreen}/>
          <Stack.Screen name= "Register" component={RegistrationScreen}/>
          <Stack.Screen name= "HomeA" component={AdminStack}/>
          <Stack.Screen name= "HomeU" component={UserStack}/>
          <Stack.Screen name= "HomeG" component={GuardStack}/>
      </Stack.Navigator>
  );
}
export function AdminStack() {
    return (
        <MainDrawer.Navigator drawerContentOptions={
          {
            activeTintColor:"#DC2F02",
            inactiveTintColor:"#03071E",

          }
        } screenOptions={{ gestureEnabled:false}}>
            <MainDrawer.Screen name= "Inicio" component={HomeStackScreen}/>
            <MainDrawer.Screen name= "Generar QR" component={QRStackScreen}/>
            <MainDrawer.Screen name= "Administrar Usuarios" component={AdminUsersStack}/>
            <MainDrawer.Screen name= "Administrar Registros" component={AdminRegistStack}/>
            <MainDrawer.Screen name= "Historial de visitas" component={AdminVisitsStack}/>
            <MainDrawer.Screen name= "Verificar E-mail" component={VerifyEmail}/>
            <MainDrawer.Screen name= "Cerrar Sesion" component={AuthStack}/>
        </MainDrawer.Navigator>
    );
  }

export function UserStack() {
  return (
      <MainDrawer.Navigator drawerContentOptions={
        {
          activeTintColor:"#DC2F02",
          inactiveTintColor:"#03071E",

        }
      } screenOptions={{ gestureEnabled:false}}>
          <MainDrawer.Screen name= "Inicio" component={HomeStackScreen}/>
          <MainDrawer.Screen name= "Generar QR" component={QRStackScreen}/>
          <MainDrawer.Screen name= "Historial de visitas" component={AdminVisitsStack}/>
          <MainDrawer.Screen name= "Verificar E-mail" component={VerifyEmail}/>
          <MainDrawer.Screen name= "Cerrar Sesion" component={AuthStack}/>
      </MainDrawer.Navigator>
  );
}

export function GuardStack() {
  return (
      <MainDrawer.Navigator drawerContentOptions={
        {
          activeTintColor:"#DC2F02",
          inactiveTintColor:"#03071E",

        }
      } screenOptions={{ gestureEnabled:false}}>
          <MainDrawer.Screen name= "Inicio" component={HomeStackScreen}/>
          <MainDrawer.Screen name= "Escanear QR" component={ScanQRStack}/>
          <MainDrawer.Screen name= "Historial de visitas" component={AdminVisitsStack}/>
          <MainDrawer.Screen name= "Verificar E-mail" component={VerifyEmail}/>
          <MainDrawer.Screen name= "Cerrar Sesion" component={AuthStack}/>
      </MainDrawer.Navigator>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});