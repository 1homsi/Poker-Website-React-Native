import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Touchable,
  Alert,
} from "react-native";
import Logo from "../Utils/Logo";
import firebase from "firebase";

export default class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  async Delete() {
    var user = firebase.auth().currentUser;
    var updates = {};

    updates["/users/" + user.uid + "/data"] = null;
    updates["/users/" + user.uid + "/request"] = null;

    user
      .delete()
      .then(() => {
        firebase.database().ref().update(updates);
        Alert.alert("Account Delete");
        this.props.navigation.navigate("HomePage");
      })
      .catch(function (error) {
        Alert.alert(
          "Reauthenticate",
          "Please Log out, then Login again! To delete your account."
        );
      });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Logo />
        <Text style={styles.textStyle}>
          Are you sure you want to Delete your account?
        </Text>

        <TouchableOpacity
          style={styles.yesButtonContainer}
          onPress={() => this.Delete()}
        >
          <Text style={styles.ButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.noButtonContainer}
          onPress={() => this.props.navigation.navigate("AccountSettings")}
        >
          <Text style={styles.ButtonText}>No</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  noButtonContainer: {
    backgroundColor: "#53BF9D",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
  },
  yesButtonContainer: {
    backgroundColor: "#c80c0d",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
  },
  ButtonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
});
