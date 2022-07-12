import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  usernameboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import firebase from "firebase";
import { Icon } from "react-native-elements";

export default class Dealer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      FoundUser: false,
      UserData: null,
      ready: false,
      newChips: 0,
      searchEmail: "",
    };
  }

  componentDidMount() {
    this.setState({ ready: true });
  }

  componentWillUnmount() {
    firebase.database().ref("/users/").off();
  }

  handleUpdate = () => {
    if (
      this.state.newChips > 0 &&
      this.state.newChips != this.state.UserData?.chips
    ) {
      firebase
        .database()
        .ref("/users")
        .child(this.state.userId)
        .child("data")
        .update({
          chips: this.state.newChips,
        });
    } else {
      alert("Please enter a valid number");
    }
  };

  FindUser = () => {
    var searchEmail = this.state.searchEmail.trim();
    this.setState({ searchEmail: "" });

    firebase
      .database()
      .ref("/users")
      .orderByChild("/data/email")
      .equalTo(searchEmail)
      .limitToFirst(1)
      .once("value", (snapshot) => {
        if (snapshot.val() == null) {
          alert("A user was not found with email entered");
          this.setState({ foundUser: false });
          return;
        }

        var id = Object.keys(snapshot.val())[0];
        var UserData = snapshot.val()[id].data;
        this.setState({
          userId: id,
          UserData,
        });
      });
  };

  render() {
    if (this.state.ready) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.props.navigation.navigate("HomePage")}
          >
            <Icon name="arrow-back" type="ionicons" color="white" size={30} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Text style={styles.title}>Search Email</Text>
            <View style={styles.search}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.75)"
              autoCompleteType="email"
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => this.setState({ searchEmail: text })}
              value={this.state.searchEmail}
            />
            <TouchableOpacity onPress={() => this.FindUser()} style={styles.buttonContainer}>
              <Text onPress={this.FindUser} style={styles.buttonText}>Find User</Text>
            </TouchableOpacity>
            </View>
          </View>
          {this.state.UserData ? (
            <>
              <View
                style={{
                  width: "60%",
                  justifyContent: "center",
                  alignUserDatas: "center",
                  alignSelf: "center",
                }}
              >
                <View style={styles.gameDisplay}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Image
                      source={{ uri: this.state?.UserData.photoURL }}
                      style={styles.avatarImage}
                    />
                  </View>
                  <Text style={[styles.textStyle, { fontSize: 25 }]}>
                    {this.state.UserData?.username.slice(
                      0,
                      this.state.UserData?.username.indexOf("#")
                    )}
                  </Text>

                  <View
                    style={[
                      {
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      },
                    ]}
                  >
                    <Text style={[styles.textStyle, { fontSize: 15 }]}>
                      Chips: {this.state?.UserData.chips}
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      style={{
                        height: 40,
                        borderColor: "white",
                        borderWidth: 2,
                        margin: 10,
                        padding: 5,
                        color: "white",
                      }}
                      placeholder="Enter new Chips amount"
                      onChangeText={(text) => {
                        this.setState({
                          newChips: text,
                        });
                      }}
                      value={
                        this.state.newChips > 0
                          ? this.state.newChips
                          : this.state.UserData?.chips
                      }
                    />
                    <TouchableOpacity onPress={() => this.handleUpdate()}>
                      <Text>Update Chips</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
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
    alignUserDatas: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  title: {
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    fontSize: 30,
    marginTop: "-20%",
    marginBottom: "5%"
  },
  readyContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignUserDatas: "center",
    justifyContent: "center",
  },
  gameDisplay: {
    backgroundColor: "#990f02",
    borderRadius: 40,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    backgroundColor: "#990f02",
    paddingVertical: 20,
    padding: 20,
    borderRadius: 15,
    width: "30%",
    marginBottom: 20,
    alignSelf: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: 700,
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
    alignSelf: "center",
    width: "30%",
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
  },
});
