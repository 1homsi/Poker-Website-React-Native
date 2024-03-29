import React, { Component, useState } from "react";
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
import Logo from "./Utils/Logo";
import firebase from "firebase";
import { Icon } from "react-native-elements";
import { CreateUserauth } from "../firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      time: "",
    };
  }

  async SignUp() {
    if (this.state.username.trim().length < 1) {
      Alert.alert("No Name Entered", "Please enter a valid name for yourself.");
      return;
    }
    CreateUserauth.createUserWithEmailAndPassword(
      `${this.state.username.trim()}@pokergo.com`,
      this.state.password.trim()
    )
      .then((userCredential) => {
        var user = userCredential.user;
        if (user) {
          this.InitializeUserInDB(
            user,
            this.state.username.trim() + "#" + user.uid
          );
          user
            .updateProfile({
              displayName: this.state.username.trim(),
              photoURL:
                "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1200,h_423/https://maydaytrust.org.uk/wp-content/uploads/2019/01/Poker-Chips-1200x423.jpg",
            })
            .then(() => {
              CreateUserauth.signOut();
              this.props.navigation.navigate("HomePage");
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      });
  }

  async InitializeUserInDB(user, username) {
    firebase
      .database()
      .ref("users/" + user.uid + "/data")
      .set({
        daily_login: new Date().getDay(),
        chips: 0,
        username: username,
        email: `${this.state.username.trim()}@pokergo.com`,
        friends: [""],
        games: 0,
        wins: 0,
        chips_lost: 0,
        chips_won: 0,
        in_game: "",
        newAlert: false,
        isDealer: false,
        photoURL:
          "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1200,h_423/https://maydaytrust.org.uk/wp-content/uploads/2019/01/Poker-Chips-1200x423.jpg",
      });

    firebase
      .database()
      .ref("users/" + user.uid + "/request")
      .set({
        friend_request: [""],
        friend_request_alert: false,
        friend_confirmed: [""],
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Logo />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.navigate("HomePage")}
        >
          <Icon name="arrow-back" type="ionicons" color="white" size={30} />
        </TouchableOpacity>
        <TextInput
          placeholder="Username"
          placeholderTextColor="rgba(255, 255, 255, 0.75)"
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="username"
          maxLength={16}
          keyboardType="email-address"
          style={styles.input}
          onChangeText={(text) =>
            this.setState({
              username: text
                .replace(/\s+/g, " ")
                .replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ""),
            })
          }
          value={this.state.username}
        />

        {/* <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.75)"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        /> */}

        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.75)"
          returnKeyType="go"
          secureTextEntry
          autoCompleteType="password"
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.SignUp()}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    width: "100%",
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "30%",
    marginBottom: 20,
  },
  registerButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
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
  },
  icon: {
    left: 20,
    top: 20,
    position: "absolute",
  },
});
