import { StyleSheet, Text, View, Button, ImageBackground, Touchable } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-web";

export default class IntroScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.Container}>
        <ImageBackground
          source={require("../assets/Images/BG3.jpg")}
          style={styles.background}
        >

          <View style={styles.TitleContainer}>
            <Text style={styles.Title}>
              GOPOKER
            </Text>
          </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("HomePage")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Play now</Text>
        </TouchableOpacity>

        <View style={styles.Box}>
          <Text style={styles.BoxText}>
            ONLINE CASINO
          </Text>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 10,
    width: "30%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  buttonText: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  Box: {
    marginVertical: "10%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: '1%',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "gold",
  },
  BoxText: {
    color: "gold",
    fontSize: 50,
    fontWeight: "bold",
  },
  TitleContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: '1%',
  },
  Title: {
    color: "white",
    fontSize: 100,
    fontWeight: "bold",
  },
});
