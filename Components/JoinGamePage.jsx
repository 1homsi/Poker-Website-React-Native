import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Switch,
} from "react-native";
import firebase from "firebase";
import { joinGame } from "./Utils/JoinGame";
import { Icon } from "react-native-elements";

export default class JoinGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gameList: [],
      sortBy: "size",
      reverse: false,
      upDown: ["Descending", "Ascending"],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/games/list/")
      .orderByChild("size")
      .endAt(3)
      .on("value", (snapshot) => {
        var data = [];
        snapshot.forEach((child) => {
          data.push({
            key: child.key,
            buyIn: child.val().buyIn,
            size: child.val().size,
          });
        });
        this.SortData(data);
      });
  }

  componentWillUnmount() {
    firebase.database().ref("/games/list/").off();
  }

  SortData(data) {
    var sort = this.state.sortBy;
    if (this.state.reverse) {
      data.sort(function (a, b) {
        return a[sort] - b[sort];
      });
    } else {
      data.sort(function (a, b) {
        return b[sort] - a[sort];
      });
    }
    var data2 = data.filter((game) => game.buyIn <= this.props.userData.chips);

    this.setState({ gameList: data2 });
  }

  newSortData(sort) {
    this.setState({ sortBy: sort }, () => this.SortData(this.state.gameList));
  }

  ReverseData = () => {
    this.setState({
      reverse: !this.state.reverse,
      gameList: this.state.gameList.reverse(),
    });
  };

  render() {
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
        <View style={styles.balance}>
          <TouchableOpacity
            style={[styles.buttonContainer, { marginBottom: 0 }]}
            disabled={true}
          >
            <Text style={styles.sortTextStyle}>
              Your Balance: {this.props.userData.chips}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => this.newSortData("size")}
          >
            <Text style={styles.sortTextStyle}>Size</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => this.newSortData("buyIn")}
          >
            <Text style={styles.sortTextStyle}>Buy In</Text>
          </TouchableOpacity>

          <View style={styles.switchContainer}>
            <Text style={[styles.sortTextStyle, { marginRight: 5 }]}>
              {" "}
              {this.state.upDown[Number(this.state.reverse)]}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#474747" }}
              thumbColor={this.state.reverse ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.ReverseData}
              value={this.state.reverse}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignSelf: "center",
            justifyContent: "center",
            paddingBottom: 10,
            width: "100%",
          }}
        >
          <FlatList
            horizontal={false}
            numColumns={2}
            data={this.state.gameList}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              return (
                <View style={styles.gameDisplay}>
                  <Text style={[styles.textStyle, { fontSize: 20 }]}>
                    {item.key.slice(
                      item.key.indexOf("_") + 1,
                      item.key.indexOf("-")
                    )}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.textStyle}>Size: {item.size}</Text>
                    <Text style={styles.textStyle}> Buy In: {item.buyIn}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() =>
                      joinGame(
                        item.key,
                        this.props.userData.chips,
                        this.props.navigation
                      )
                    }
                  >
                    <Text style={styles.textStyle}>Join Game</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  gameDisplay: {
    backgroundColor: "#990f02",
    borderRadius: 15,
    width: "45%",
    padding: 15,
    marginHorizontal: "6%",
  },
  joinButton: {
    backgroundColor: "#000000",
    borderRadius: 20,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 20,
    width: "100%",
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
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    width: "90%",
    marginBottom: 20,
    backgroundColor: "#990f02",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderRadius: 25
  },
  sortButton: {
    backgroundColor: "#990f02",

  },
  sortTextStyle: {
    color: "white",
    fontWeight: 700,
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#990f02",
    padding: 10,
    borderRadius: 20,
  },
  registerButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: 700,
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginBottom: 20,
    color: "#FFF",
    paddingHorizontal: 20,
    paddingEnd: 10,
    borderRadius: 20,
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
  balance: {
    marginTop: 20,
    padding: 20,
  },
  icon: {
    left: 20,
    top: 20,
    position: "absolute",
  }
});
