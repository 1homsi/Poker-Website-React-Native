import {
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  Dimensions,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-web";

const width = Dimensions.get("window").width;
export default class IntroScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.TitleContainer}>
          <Text style={styles.Title}>GOPOKER</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Play now</Text>
        </TouchableOpacity>

        <View style={styles.Box}>
          <Text style={styles.BoxText}>ONLINE CASINO</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#000",
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
    backgroundColor: "#990f02",
    borderRadius: 15,
    width: width >= 400 ? "25%" : "50%",
    height: width >= 400 ? "10%" : "12%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: width >= 400 ? "10%" : "5%",
    paddingBottom: "0.5%",
  },
  buttonText: {
    color: "white",
    fontSize: width >= 400 ? 20 : 50,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  Box: {
    marginVertical: width <= 400 ? "10%" : "2%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "1%",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "gold",
  },
  BoxText: {
    color: "gold",
    fontSize: width >= 400 ? 20 : 30,
    fontWeight: "bold",
  },
  TitleContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
  },
  Title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
});
