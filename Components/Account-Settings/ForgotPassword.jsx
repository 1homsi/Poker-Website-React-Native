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

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  ForgotPassRequest() {
    var auth = firebase.auth();
    auth
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        Alert.alert("Email sent to", this.state.email);
        this.props.navigation.navigate("Login");
      })
      .catch(function (error) {
        Alert.alert("Error:", error.message);
      });
  }
  render() {
    return (
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <Logo />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.navigate("HomePage")}>
          <Icon
            name="arrow-back"
            type="ionicons"
            color="white"
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.textPassword}>Enter your email to reset your password.</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.75)"
          autoCompleteType="email"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          ref={(input) => (this.emailInput = input)}
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.ForgotPassRequest()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginBottom: 20,
    color: "#FFF",
    paddingHorizontal: 20,
    paddingEnd: 10,
    borderRadius: 15,
    width: "30%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  buttonContainer: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "30%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  sendButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
  },
  textPassword: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginTop: "-30%",
    color: "#FFF",
    marginBottom: "2%"
  },
  icon: {
    left: 20,
    top: 20,
    position: "absolute",
  }
});
