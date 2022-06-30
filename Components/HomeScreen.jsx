import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
} from "react-native";
import Logo from "./Utils/Logo";
import Balance from "./Utils/Balance";
import Notification from "./Utils/Notification";
import { Icon } from "react-native-elements";

const windowWidth = Dimensions.get("window").width;

export default class HomeScreen extends Component {
  SignedIn = () => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/Images/BG3.jpg")}
          style={styles.SignedOutImageContainer}
        >
          <View style={styles.InnerContainer}>
            <View style={styles.topRow}>
              {this.AccountSettings()}
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginTop: 26 }}>
                  <Balance chips={this.props.userData.chips} />
                </View>
                <Notification userData={this.props.userData} />
                <TouchableOpacity
                  style={{
                    backgroundColor: "#D70040",
                    padding: 10,
                    borderRadius: 15,
                    marginLeft: 5,
                    marginTop: 26,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("Leaderboard");
                  }}
                >
                  <Icon
                    name="trophy"
                    type="font-awesome"
                    color="white"
                    size={20}
                  />
                </TouchableOpacity>
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
                    <Text style={styles.textStyle}>Play Now</Text>
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
                    this.props.navigation.navigate("GameController"); // 'GameSetting'
                  }}
                >
                  <Text style={styles.textStyle}>Continue Game</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  SignedOut = () => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/Images/BG2.png")}
          resizeMode="cover"
          style={styles.SignedOutImageContainer}
        >
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
              : alert(
                  "Disabled",
                  "Cannot change Account Settings while in a game."
                );
          }}
        >
          <Text style={styles.textStyle}>My Profile</Text>
        </TouchableOpacity>
      </View>
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
  container: {
    flex: 1,
  },
  SignedOutImageContainer: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  InnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  textStyle: {
    alignItems: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: windowWidth < 400 ? 19 : 16,
    textAlign: "center",
  },
  centerButtons: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 80,
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
  AccountSettingsButtonView: {
    marginTop: 20,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: "#990f02",
  },
  SignedView: {
    width: "60%",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 350,
  },
});
