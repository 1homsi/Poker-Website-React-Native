import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default class Balance extends Component {
  render() {
    return (
      <View style={styles.cornerView}>
        <TouchableOpacity style={styles.button} disabled={true}>
          <Text style={styles.textStyle}>Balance: {this.props.chips}</Text>
          <Icon
            iconStyle={{
              marginLeft: 10,
            }}
            name="credit-card"
            type="font-awesome"
            color="#000"
            size={20}
          />
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
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
