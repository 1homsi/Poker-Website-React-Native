import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import firebase from "firebase";
import { Icon } from "react-native-elements";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameList: [],
      ready: false,
      lbStatistic: "chips",
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/users/")
      .orderByChild("data/" + this.state.lbStatistic)
      .limitToFirst(50)
      .on("value", (snapshot) => {
        var data = [];
        snapshot.forEach((child) => {
          data.push({
            key: child.val().data.username,
            chips: child.val().data.chips,
            chips_won: child.val().data.chips_won,
            chips_lost: child.val().data.chips_lost,
            wins: child.val().data.wins,
            photoURL: child.val().data.photoURL,
          });
        });
        data.reverse();
        this.setState({ gameList: data, ready: true });
      });
  }
  componentDidUpdate() {
    firebase
      .database()
      .ref("/users/")
      .orderByChild("data/" + this.state.lbStatistic)
      .limitToFirst(50)
      .on("value", (snapshot) => {
        var data = [];
        snapshot.forEach((child) => {
          data.push({
            key: child.val().data.username,
            chips: child.val().data.chips,
            chips_won: child.val().data.chips_won,
            chips_lost: child.val().data.chips_lost,
            wins: child.val().data.wins,
          });
        });
        data.reverse();
        this.state.gameList = data;
        this.state.ready = true;
      });
  }

  componentWillUnmount() {
    firebase.database().ref("/users/").off();
  }

  render() {
    if (this.state.ready) {
      return (
        <KeyboardAvoidingView style={styles.container}>
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
          <View style={styles.statButtonsContainer}>
            <TouchableOpacity
              style={styles.statButton}
              onPress={() => this.setState({ lbStatistic: "chips" })}
            >
              <Text style={styles.statButtonText}>Total Chips</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statButton}
              onPress={() => this.setState({ lbStatistic: "wins" })}
            >
              <Text style={styles.statButtonText}>Total Wins</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statButton}
              onPress={() => this.setState({ lbStatistic: "chips_won" })}
            >
              <Text style={styles.statButtonText}>Total Chips Won</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statButton}
              onPress={() => this.setState({ lbStatistic: "chips_lost" })}
            >
              <Text style={styles.statButtonText}>Total Chips Lost</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              justifyContent: "center",
              paddingBottom: 10,
              width: "75%",
            }}
          >
            <FlatList
              style={{ width: "70%"}}
              data={this.state.gameList}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View style={styles.gameDisplay}>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Image
                        source={{ uri: item.photoURL }}
                        style={styles.avatarImage}
                      />
                    </View>
                    <Text style={[styles.textStyle, { fontSize: 25 }]}>
                      {item.key.slice(0, item.key.indexOf("#"))}
                    </Text>

                    <View
                      style={[{ flexDirection: "row", justifyContent: "space-evenly", },]}>
                      <Text style={[styles.textStyle, { fontSize: 15 }]}>Chips: {item.chips}</Text>
                      <Text style={[styles.textStyle, { fontSize: 15 }]}>Wins: {item.wins}</Text>
                    </View>

                    <View
                      style={[{ flexDirection: "row", justifyContent: "space-evenly",},]}>
                      <Text style={[styles.textStyle, { fontSize: 15 }]}>
                        Chips Won: {item.chips_won}
                      </Text>
                      <Text style={[styles.textStyle, { fontSize: 15 }]}>
                        Chips Lost: {item.chips_lost}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>

        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View style={[styles.readyContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#FB6342" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 10,
    color: "white",
    fontWeight: 700,
    textAlign: "center",
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  readyContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gameDisplay: {
    backgroundColor: "#990f02",
    borderRadius: 40,
    width: "100%",
    paddingTop: 20,
    paddingBottom:20,
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: "#000000",
    borderRadius: 15,
    width: "95%",
    paddingTop: 5,
    marginLeft: 5,
  },
  buttonContainer: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "40%",
    marginBottom: 20,
  },
  registerButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "900",
  },
  statButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  statButton: {
    backgroundColor: "#990f02",
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 10,
    width: "10%",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5, 
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
  statButtonsContainer: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 30,
    marginBottom: 15,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginBottom: 5,
    justifyContent: "center",
  },
  icon: {
    left: 20,
    top: 20,
    position: "absolute",
  }
});
