import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export function TextButton({ title, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
  },
  text: {
    color: "#370617",
    fontWeight: "bold",
    fontSize: 14,
  },
});
