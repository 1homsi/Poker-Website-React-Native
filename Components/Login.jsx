import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import firebase from "firebase";
import { Icon } from "react-native-elements";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
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
        `${this.state.email.trim()}@pokergo.com`,
        this.state.password.trim()
      )
      .then(() => {
        this.props.navigation.navigate("Intro");
      })
      .catch((error) => {
        //TODO: add actual error messages
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.navigate("Intro")}
        >
          <Icon name="arrow-back" type="ionicons" color="white" size={30} />
        </TouchableOpacity>
        <View style={styles.Box}>
          <TextInput
            placeholder="Username"
            returnKeyType="next"
            autoCapitalize="none"
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

          {/* <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setTimeout(() => {
                  this.props.navigation.navigate("ForgotPassword");
                }, 10);
              }}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.Login()}
          >
            <Text style={styles.registerButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
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
    width: "60%",
  },
  Box: {
    width: "40%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
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
    backgroundColor: "#990f02",
    borderRadius: 15,
    width: width >= 400 ? "25%" : "50%",
    height: width >= 400 ? "10%" : "12%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: width >= 400 ? "7%" : "3%",
    paddingHorizontal: width >= 400 ? "20%" : "10%",
    paddingVertical: width >= 400 ? "5%" : "2%",
  },
  forgotPassword: {
    color: "#FFF",
    marginBottom: 10,
    opacity: 0.7,
  },
  registerButtonText: {
    color: "white",
    fontSize: width >= 400 ? 20 : 15,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  icon: {
    left: 20,
    top: 20,
    position: "absolute",
  },
});
