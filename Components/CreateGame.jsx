import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import Logo from "./Utils/Logo";
import firebase from "firebase";
import { Icon } from "react-native-elements";

export default class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      buyIn: 50,
    };
  }

  createGame(type) {
    var user = firebase.auth().currentUser;
    const username = user.displayName;
    const buyIn = Number(this.state.buyIn);

    if (this.props.userData.chips - buyIn < 0) {
      alert(
        "Insufficent balance",
        "Your Buy-In is higher than your current balance, please lower Buy-In to proceed"
      );
      return false;
    } else if (!this.props.userData.in_game === "") {
      alert(
        "Already in a game",
        "Please leave the game you currently are in, to create a game"
      );
      return false;
    } else if (this.state.name === "") {
      alert(
        "Match must have a name",
        "Please enter a valid name for the match"
      );
      return false;
    }
    this.props.userData.chips -= buyIn;
    var d = new Date();
    var matchName = type + "_" + this.state.name.trim() + "-" + d.getTime();
    var updates = {};
    updates["/users/" + user.uid + "/data/in_game"] = matchName;
    updates["/users/" + user.uid + "/data/chips"] = this.props.userData.chips;

    firebase
      .database()
      .ref("games/" + type + "/" + matchName)
      .set({
        balance: [buyIn],
        blindAmount: buyIn * 0.1,
        smallBlindLoc: 0,
        board: [""],
        buyIn: buyIn,
        chipsWon: [0],
        chipsLost: [0],
        chipsIn: [0],
        deck: [""],
        move: [""],
        newPlayer: 0,
        turn: 0,
        player_cards: [{ rank: 0, cards: [""] }],
        playerTurn: 0,
        players: [username],
        playerAvatar: [user.photoURL],
        pot: 0,
        raisedVal: 0,
        ready: [false],
        round: [0],
        roundWinner: -1,
        roundWinnerRank: -1,
        size: 1,
        wins: [0],
      });

    if (type === "public") {
      firebase
        .database()
        .ref("games/list/" + matchName)
        .set({
          size: 1,
          buyIn: buyIn,
        });
    }

    firebase.database().ref().update(updates);
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingContainer}
        >
          <Text style={styles.textStyle}>Create Game</Text>

          <TextInput
            placeholder="Lobby Name"
            maxLength={20}
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) =>
              this.setState({
                name: text
                  .replace(/\s+/g, " ")
                  .replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ""),
              })
            }
            value={this.state.name}
          />
        </KeyboardAvoidingView>
        <Text style={styles.textStyle}> Buy-In {this.state.buyIn} </Text>

        <Slider
          style={{ width: 350, height: 30, marginBottom: 20 }}
          minimumValue={50}
          maximumValue={this.props.userData.chips}
          step={50}
          thumbTintColor={"#990f02"}
          onValueChange={(buyIn) => {
            this.setState({ buyIn });
          }}
          value={this.state.buyIn}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            if (this.createGame("public")) {
              this.props.navigation.navigate("GameController");
            }
          }}
        >
          <Text style={styles.registerButtonText}>Create Public Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            if (this.createGame("private")) {
              this.props.navigation.navigate("GameController");
            }
          }}
        >
          <Text style={styles.registerButtonText}>Create Private Game</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 10,
    fontSize: 20,
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    textTransform: "uppercase"
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAvoidingContainer: {
    paddingHorizontal: 20,
    width: "40%",
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "25%",
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
  registerButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: 700,
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
    width: "80%",
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
