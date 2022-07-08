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
import { Icon } from "react-native-elements";

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
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.navigate("AccountSettings")}>
          <Icon
            name="arrow-back"
            type="ionicons"
            color="white"
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          Are you sure you want to delete your account?
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
          <Text style={styles.noButtonText}>No</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 20,
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    fontSize: 20,
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  noButtonContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "30%",
    marginBottom: 20,
  },
  yesButtonContainer: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "30%",
    marginBottom: 20,
  },
  ButtonText: {
    fontWeight: 700,
    textAlign: "center",
    color: "#FFF",
    textTransform: "uppercase"
  },
  noButtonText: {
    fontWeight: 700,
    textAlign: "center",
    color: "#990f02",
    textTransform: "uppercase"
  },
  icon: {
    left: 20,
    top: 20,
    position: "absolute",
  }
});
