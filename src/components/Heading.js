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

export function Heading({ children, style, ...props }) {
  return (
    <Text {...props} style={[styles.appName, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#E85D04",
    marginBottom: 20,
    marginTop:30,
  },
});
