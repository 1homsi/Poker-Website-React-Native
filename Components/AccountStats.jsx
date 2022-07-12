import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Logo from "./Utils/Logo";
import firebase from "firebase";
import { Icon } from "react-native-elements";

export default class AccountStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userPhoto: null,
      ready: false,
    };
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    var temp = { ...this.props.userData };
    temp.username = user.displayName;
    temp["losses"] = temp.games - temp.wins;
    temp["winRatio"] = ((temp.wins / temp.games) * 100).toFixed(2);
    this.setState({
      userPhoto: user.photoURL,
      user: temp,
      ready: true,
    });
  }

  render() {
    if (this.state.ready) {
      return (
        <SafeAreaView style={styles.container}>
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
          <View style={styles.bubble}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={{ uri: this.state.userPhoto }}
                style={styles.avatarImage}
              />
            </View>

            <Text style={styles.title}>
              {" "}
              {this.state.user.username}'s Stats
            </Text>
            <View style={styles.textContainer}>
              <Text style={styles.Stats}>Wins: {this.state.user.wins}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Stats}>Losses: {this.state.user.losses}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Stats}>
                Win/Loss Ratio: {this.state.user.winRatio}%
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Stats}>
                Games Played: {this.state.user.games}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Stats}>
                Current Chips: {this.state.user.chips}{" "}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Stats}>
                Life Time Earnings: {this.state.user.chips_won}{" "}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.Stats}>
                Life Time Losses: {this.state.user.chips_lost}{" "}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#FB6342" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  Stats: {
    //backgroundColor: "#7befb2",
    elevation: 2,
    color: "white",
    fontWeight: 700,
    textAlign: "center",
  },
  textContainer: {
    /* margin: 10,
        padding: 10,
        borderRadius: 20,        backgroundColor: "#7befb2", */
    backgroundColor: "#249c5c",
    margin: 10,
    padding: 10,
    borderRadius: 15,
    overflow: "hidden",
    width: "30%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  bubble: {
    backgroundColor: "#990f02",
    padding: 20,
    borderRadius: 20,
    width: "50%",
    marginBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
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
    width: "80%",
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "900",
  },
  icon: {
    left: 20,
    top: 20,
    position: "absolute",
  }
});
