import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";

export default class Logo extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/TempLogo.png")}
        />
        <Text style={styles.title}> GOPOKER </Text>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
});
