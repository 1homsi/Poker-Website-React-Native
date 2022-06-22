import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Logo extends PureComponent {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Text style={styles.title}>GOPOKER</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexGrow: 1,
  },
  title: {
    color: "#fff",
    marginTop: 5,
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
});
