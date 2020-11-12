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

export function FilledButton({ title, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAA307",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    marginTop:30
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
