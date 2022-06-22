import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default class IntroScreen extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>IntroScreen</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("HomePage")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
