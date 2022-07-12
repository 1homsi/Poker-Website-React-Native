//@refresh reset
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  LogBox,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";

import firebase from "firebase";
//import 'firebase/firestore'

//No more error about v
//LogBox.ignoreLogs(['Setting a timer for a long period of time'])
//LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
var db = firebase.firestore();
//const chatRef = db.collection('chat')// + this.props.matchName

export default function Chat(matchInfo) {
  const [modalVisible, setModalVisible] = useState(false);
  const chatRef = db.collection(
    "gameChats/" + matchInfo.matchType + "/" + matchInfo.matchName
  ); // + this.props.matchName
  var user = firebase.auth().currentUser;
  var userName = user.displayName;
  var userid = user.uid;

  const [userInChat] = useState({
    _id: userid,
    name: userName,
    avatar: user.photoURL,
  });
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    const unsubscribe = chatRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function handleSend(messages) {
    setNewMessages(newMessages + 1);
    const writes = messages.map((m) => chatRef.add(m));
    await Promise.all(writes);
  }

  return (
    <View>
      <Modal
        supportedOrientations={["landscape", "portrait"]}
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        style={{
          margin: 0,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.head}>
              <TouchableWithoutFeedback
                style={{ maxHeight: 100, height: 100 }}
                onPress={() => {
                  Keyboard.dismiss();
                }}
              >
                <Text style={styles.title}>Chat Room</Text>
              </TouchableWithoutFeedback>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  setModalVisible(false);

                  setNewMessages(messages.length);
                }}
              >
                <Icon name="x" type="feather" color="black" size={30} />
              </TouchableOpacity>
            </View>

            <GiftedChat
              messages={messages}
              renderUsernameOnMessage={true}
              user={userInChat}
              onSend={handleSend}
              placeholder={"Type..."}
              isKeyboardInternallyHandled={false}
              maxInputLength={100}
              renderBubble={(props) => {
                return (
                  <Bubble
                    {...props}
                    textStyle={{
                      right: {
                        color: "black",
                      },
                      left: {
                        color: "black",
                      },
                    }}
                    wrapperStyle={{
                      left: {
                        backgroundColor: "red",
                      },
                      right: {
                        backgroundColor: "yellow",
                      },
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
      </Modal>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor:
              messages.length - newMessages == 0 ? "#990f02" : "#5e0901",
          },
        ]}
        onPress={() => {
          setModalVisible(true);
          setNewMessages(messages.length);
        }}
      >
        {messages.length - newMessages == 0 ? (
          <Text style={styles.textStyle}>CHAT</Text>
        ) : (
          <Text style={styles.textStyle}>
            CHAT {messages.length - newMessages}
          </Text>
        )}
      </Pressable>
    </View>
  );
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
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#990f02",
    marginTop: 20,
    width: "10%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  modalText: {
    marginBottom: 35,
    marginLeft: -50,
    marginRight: -50,
    textAlign: "left",
    fontSize: 20,
  },
  textStyle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  exitTextStyle: {
    color: "#FFFFFF",
    fontWeight: 700,
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    // marginBottom: 10,
    textAlign: "center",
    marginLeft: 20,
    marginTop: 20,
  },
  icon: {
    right: 20,
    top: 20,
    position: "absolute",
  },
});
