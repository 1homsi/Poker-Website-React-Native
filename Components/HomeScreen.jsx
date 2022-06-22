import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
} from "react-native";
import firebase from "firebase";
import Logo from "./Utils/Logo";
import Balance from "./Utils/Balance";
import Notification from "./Utils/Notification";

const windowWidth = Dimensions.get("window").width;

export default class HomeScreen extends Component {
  LogOut = () => {
    if (this.props.userData.in_game == "") {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Signed Out");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert(
        "Cannot Logout",
        "You are currently in a game! Please leave this game, to Logout."
      );
    }
  };

  SignedIn = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topRow}>
          {this.AccountSettings()}
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginTop: 26 }}>
              <Balance chips={this.props.userData.chips} />
            </View>
            <Notification userData={this.props.userData} />
          </View>
        </View>
        <Logo />

        <View style={styles.SignedView}>
          {this.props.userData.in_game == "" ? (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.centerButtons}
                onPress={() => {
                  this.props.navigation.navigate("JoinGamePage");
                }}
              >
                <Text style={styles.textStyle}>Join Game</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.centerButtons}
                onPress={() => {
                  this.props.navigation.navigate("CreateGame");
                }}
              >
                <Text style={styles.textStyle}>Create Game</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.centerButtons, { backgroundColor: "#c80c0d" }]}
              onPress={() => {
                this.props.navigation.navigate("GameController"); ///// 'GameSetting'
              }}
            >
              <Text style={styles.textStyle}>Continue Game</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.centerButtons}
            onPress={() => {
              this.props.navigation.navigate("Leaderboard");
            }}
          >
            <Text style={styles.textStyle}>Leaderboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.centerButtons}
            onPress={() => this.LogOut()}
          >
            <Text style={styles.textStyle}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          {this.AccountStatistics()}

          {this.FriendsButton()}
        </View>
      </SafeAreaView>
    );
  };

  SignedOut = () => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/Images/BG1.jpg")}
          resizeMode="cover"
          style={styles.SignedOutImageContainer}
        >
          <Logo />

          <View style={[styles.SignedView, { flex: 0.33 }]}>
            <TouchableOpacity
              style={styles.centerButtons}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text style={styles.textStyle}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.centerButtons}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.textStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  AccountSettings = () => {
    var disabled = false;
    if (this.props.userData.in_game == "") {
      disabled = true;
    }
    return (
      <View style={styles.AccountSettingsButtonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            disabled
              ? this.props.navigation.navigate("AccountSettings")
              : Alert.alert(
                  "Disabled",
                  "Cannot change Account Settings while in a game."
                );
          }}
        >
          <Text style={styles.textStyle}>Account Settings</Text>
        </TouchableOpacity>
      </View>
    );
  };

  AccountStatistics = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("AccountStats")}
        >
          <Text style={styles.textStyle}>Account Stats</Text>
        </TouchableOpacity>
      </View>
    );
  };

  FriendsButton = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate("FriendsList")}
      >
        <Text style={styles.textStyle}>Friends</Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.props.LoggedIn) {
      return this.SignedIn();
    } else {
      return this.SignedOut();
    }
  }
}
const styles = StyleSheet.create({
  SignedOutcontainer: {
    flex: 1,
  },
  SignedOutImageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    alignItems: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: windowWidth < 400 ? 17 : 14,
    textAlign: "center",
  },
  centerButtons: {
    backgroundColor: "#53BF9D",
    paddingVertical: 20,
    padding: 50,
    borderRadius: 15,
    width: windowWidth < 400 ? 220 : 270,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 22,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 20,
    marginBottom: 40,
  },
  AccountSettingsButtonView: {
    marginTop: 20,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: "#53BF9D",
  },
  SignedView: {
    width: "60%",
    alignItems: "center",
    alignContent: "center",
  },
});
