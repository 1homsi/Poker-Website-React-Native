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
import { Icon } from "react-native-elements";

export default class AccountSettings extends Component {
  LogOut = () => {
    if (this.props.userData.in_game == "") {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.props.navigation.navigate("HomePage");
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
        <View style={styles.head}>
        <Image
          source={{ uri: user.photoURL }}
          style={styles.image}
        />
        <Text style={styles.title}>{user.displayName}</Text>
        </View>
        
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
            <Text style={styles.textStyle}>Reset Password</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("ChangeUsername")}
          >
            <Text style={styles.textStyle}>Change Username</Text>
          </TouchableOpacity> */}

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
            style={styles.logoutButton}
            onPress={() => this.LogOut()}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: 700,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  head: {
    flexDirection: "column",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 10,
    width: "18%",
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textalign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  logoutButton: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 10,
    width: "15%",
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textalign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  logoutText: {
    color: "#990f02",
    fontWeight: 700,
    textAlign: "center",
    textTransform: "uppercase"
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  icon: {
    left: 20,
    top: 20,
    position: "absolute",
  }
});
