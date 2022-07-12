import React, { Component } from "react";
import {
  Image,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "firebase";
import { Icon } from "react-native-elements";

export default class HelpButton extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  removeNewAlert() {
    var user = firebase.auth().currentUser;
    var updates = {};
    updates["/users/" + user.uid + "/data/newAlert"] = false;
    firebase.database().ref().update(updates);
  }

  removeAlerts(num) {
    var alerts = this.props.userData.alerts;
    if (num === "all") {
      alerts = null;
    } else {
      alerts.splice(num, 1);
    }

    var user = firebase.auth().currentUser;
    var updates = {};
    updates["/users/" + user.uid + "/data/alerts"] = alerts;
    firebase.database().ref().update(updates);
  }

  render() {
    const { modalVisible } = this.state;

    var alerts = 0;
    if (this.props.userData.alerts != null) {
      alerts = this.props.userData.alerts.length;
    }
    return (
      <View style={styles.NotificationView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.buttonTextView}>
            <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                this.setModalVisible(!modalVisible), this.removeNewAlert();
              }}
                >
              <Icon 
                name="x" 
                type="feather" 
                color="black" 
                size={30} 
              />
            </TouchableOpacity>
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: -20,
                  fontSize: 30,
                  marginBottom: 25,
                }}
              >
                Notifications
              </Text>

              <FlatList
                style={{ width: "100%" }}
                data={this.props.userData.alerts}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "90%",
                        backgroundColor: "#cccccc",
                        padding: 20,
                        paddingEnd: 20,
                        marginLeft: 20,
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text style={[styles.textStyle, {textAlign: "left"}]}>{item}</Text>

                      <View style={{ paddingLeft: 5 }}>
                        <TouchableOpacity
                          style={{
                            top: 5, 
                            backgroundColor: "#990f02", 
                            borderRadius: 30, 
                            padding: 2, 
                            marginLeft: 4,
                          }}
                          onPress={() => this.removeAlerts(index)}
                        >
                          <Icon 
                            name="x" 
                            type="feather" 
                            color="white" 
                            size={20} 
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
              <View
                styles={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.NotificationClearButton}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                    this.removeAlerts("all");
                    this.removeNewAlert();
                  }}
                >
                  <Text style={styles.NotificationButtonText}>Clear All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View>
          <TouchableOpacity
            style={[
              styles.NotificationButton,
              this.props.userData.newAlert
                ? { backgroundColor: "#5e0901" }
                : { backgroundColor: "#990f02" },
            ]}
            onPress={() => this.setModalVisible(!modalVisible)}
            disabled={this.props.userData.alerts == null}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/notification-alert.png")} //https://uxwing.com/notification-alert-icon/
            />
            <Text style={styles.NotificationtextStyle}>{alerts}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonTextView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "auto",
    maxHeight: 500,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#990f02",
  },
  textStyle: {
    color: "black",
    fontWeight: 700,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 35,
    marginLeft: -50,
    marginRight: -50,
    textAlign: "left",
    fontSize: 20,
  },
  NotificationView: {
    justifyContent: "flex-end",
  },
  NotificationButton: {
    flexDirection: "row",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  NotificationtextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    left: 5,
  },
  NotificationClearButton: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: "#990f02",
  },
  NotificationButtonText: {
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    textTransform: "uppercase",
  },
  icon: {
    right: 20,
    top: 20,
    position: "absolute",
  },
});
