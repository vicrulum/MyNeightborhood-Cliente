import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TextInput,
  Button,
} from "react-native";

export function Input({ style, ...props }) {
  return <TextInput {...props} style={[styles.input, style]}></TextInput>;
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1a9988",
    marginBottom: 40,
  },
  input: {
    height: 40,
    width: "80%",
    fontSize: 20,
    backgroundColor: "white",
    borderBottomColor: "#6A040F",
    borderBottomWidth: 3,
    margin: 20,
    color: "black",
    padding: 5,
  },
});
