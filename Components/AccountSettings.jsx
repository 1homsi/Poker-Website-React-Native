import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import firebase from "firebase";

export default class AccountSettings extends Component {
  LogOut = () => {
    if (this.props.userData.in_game == "") {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // this.props.navigation.navigate("HomePage");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert(
        "Cannot Logout",
        "You are currently in a game! Please leave this game, to Logout."
      );
    }
  };

  render() {
    var user = firebase.auth().currentUser;
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={{ uri: user.photoURL }}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
            marginTop: 30,
            borderRadius: 100,
          }}
        />
        <Text style={styles.title}>Username: {user.displayName}</Text>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.textStyle}>Password Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("ChangeUsername")}
          >
            <Text style={styles.textStyle}>Change Username</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("ChangeEmail")}
          >
            <Text style={styles.textStyle}>Change Email</Text>
          </TouchableOpacity>
          {/* 
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("ChangeAvatar")}
          >
            <Text style={styles.textStyle}>Change Avatar</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("DeleteAccount")}
          >
            <Text style={styles.textStyle}>Delete Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonContainer]}
            onPress={() => this.props.navigation.navigate("AccountStats")}
          >
            <Text style={styles.textStyle}>Account Stats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("FriendsList")}
          >
            <Text style={styles.textStyle}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.LogOut()}
          >
            <Text style={styles.textStyle}>LogOut</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonContainer, { marginBottom: 30, width: "40%" }]}
            onPress={() => this.props.navigation.navigate("HomePage")}
          >
            <Text style={styles.textStyle}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    flexDirection: "row",
    width: "85%",
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    backgroundColor: "#D70040",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "50%",
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textalign: "center",
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginBottom: 20,
    color: "#FFF",
    paddingHorizontal: 20,
    paddingEnd: 10,
    borderRadius: 15,
    width: "100%",
  },
});
