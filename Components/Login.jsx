import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Touchable,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import firebase from "firebase";
import Logo from "./Utils/Logo";
import { ImageBackground } from "react-native-web";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  Login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.email.trim(),
        this.state.password.trim()
      )
      .then(() => {
        this.props.navigation.navigate("HomePage");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert("ERROR", errorMessage);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>

        <ImageBackground
          source={require("../assets/Images/BG3.jpg")}
          style={styles.background}
          blurRadius={7}
        >

          <View style={styles.Box}>

        <TextInput
          placeholder="Email"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          placeholder="Password"
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
          autoCompleteType="password"
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setTimeout(() => {
              this.props.navigation.navigate("ForgotPassword");
            }, 10);
          }}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.Login()}
        >
          <Text style={styles.registerButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("HomePage")}
        >
          <Text style={styles.forgotPassword}>Go Back</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  input: {
    height: "15%",
    backgroundColor: "#e4e2e1",
    marginBottom: 17,
    color: "#000",
    paddingHorizontal: 20,
    paddingEnd: 10,
    borderRadius: 10,
    width: "70%",
  },
  Box: {
    width: "50%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "gold",
  },
  forgotPassword: {
    color: "#FFF",
    fontSize: 11,
    marginBottom: 20,
    opacity: 0.9,
  },
  buttonContainer: {
    backgroundColor: "red",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "25%",
    marginBottom: 20,
  },
  forgotPassword: {
    color: "#FFF",
    marginBottom: 10,
    opacity: 0.7,
  },
  registerButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
