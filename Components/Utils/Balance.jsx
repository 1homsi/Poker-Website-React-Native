import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Balance extends Component {
  render() {
    return (
      <View style={styles.cornerView}>
        <TouchableOpacity style={styles.button} disabled={true}>
          <Text style={styles.textStyle}>
            Balance: {this.props.chips + " Chips"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cornerView: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    paddingRight: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
