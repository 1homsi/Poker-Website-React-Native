import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
  BackHandler,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Chat from "./Chat"; //Importing the chat Modal screen
import CardDealing from "./cardDealing"; //Cards are dealt from here
import { CardImageUtil as CardImages } from "./CardImages"; //Importing the card images
//Ps: jalal this is the cards array i was talking about that contains all the cards you wanted to seprate

export default class GameSetting extends Component {
  constructor(props) {
    super(props);

    var dimensions = Dimensions.get("screen"); //Getting the screen dimensions
    if (dimensions.height > dimensions.width) {
      //If the screen is in portrait mode swap the width and height
      var temp = dimensions.height;
      dimensions.height = dimensions.width;
      dimensions.width = temp;
    }
    var xOS = dimensions.width * 0.035; //X offset for the cards
    this.state = {
      animationBB: [
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 185, y: 0 }),
        new Animated.ValueXY({ x: 450, y: 80 }),
        new Animated.ValueXY({ x: -225, y: 75 }),
      ], //Animated value for the big blinds
      animationSB: [
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 225, y: -95 }),
        new Animated.ValueXY({ x: 415, y: -75 }),
        new Animated.ValueXY({ x: 625, y: 0 }),
      ], //Animated value for the small blinds
      playerCardAnimations: [
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
      ], //Animated value for the player cards
      tableCardsStart: [
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
        new Animated.ValueXY({ x: 0, y: 0 }),
      ], //Animated value for the table cards

      valueFoldCard: new Animated.ValueXY({ x: 25, y: 25 }),
      fadeAnimation: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
      ], //Animated value for the fold card

      quitVisible: false, //Boolean to show the quit game modal
      raiseVisible: false, //Boolean to show the raise modal
      kickVisible: true, //Boolean to show the kick player modal
      idle: false, //Boolean to show the idle modal
      autoFolds: 0, //Number of auto folds
      raiseAmount: 10, //Amount to raise
      screen: dimensions, //Screen dimensions

      newValueBlinds: [
        {
          x:
            ((dimensions.width * parseFloat(styles.player1View.left)) / 100.0) *
            2.5,
          y: dimensions.height * (parseFloat(styles.player1View.top) / 100.0),
        },
        {
          x:
            ((dimensions.width * parseFloat(styles.player2View.left)) / 100.0) *
            1.4,
          y: (dimensions.height * parseFloat(styles.player2View.top)) / 100.0,
        },
        {
          x:
            dimensions.width *
              (1 - parseFloat(styles.player3View.right) / 100.0) -
            20 -
            xOS,
          y: dimensions.height * (parseFloat(styles.player3View.top) / 100.0),
        },
        {
          x:
            dimensions.width *
              (1 - parseFloat(styles.player4View.right) / 100.0) -
            20 -
            xOS,
          y: dimensions.height * (parseFloat(styles.player4View.top) / 100.0),
        },
      ], //Array of new values for the blinds1

      playerNewValues: [
        {
          x:
            -(dimensions.width / 2) *
            (0.75 - parseFloat(styles.player1View.left) / 100.0),
          y:
            dimensions.height *
            (1.09 - parseFloat(styles.player1View.top) / 100.0),
        },
        {
          x:
            -(dimensions.width / 2) *
              (0.75 - parseFloat(styles.player1View.left) / 100.0) +
            60,
          y:
            dimensions.height *
            (1.09 - parseFloat(styles.player1View.top) / 100.0),
        },

        {
          x:
            -(dimensions.width / 2) *
              (parseFloat(styles.player2View.left) / 100.0) +
            30,
          y: dimensions.height * 0.13,
        },
        {
          x:
            -(dimensions.width / 2) *
              (parseFloat(styles.player2View.left) / 100.0) +
            90,
          y: dimensions.height * 0.13,
        },

        {
          x:
            -(dimensions.width / 2) *
            ((1 - parseFloat(styles.player3View.right)) / 100.0),
          y: dimensions.height * 0.13,
        },
        {
          x:
            -(dimensions.width / 2) *
              ((1 - parseFloat(styles.player3View.right)) / 100.0) +
            60,
          y: dimensions.height * 0.13,
        },

        {
          x:
            (dimensions.width / 2) *
            (0.85 - parseFloat(styles.player4View.right) / 100.0),
          y:
            dimensions.height *
            (1.09 - parseFloat(styles.player4View.top) / 100.0),
        },
        {
          x:
            (dimensions.width / 2) *
              (0.85 - parseFloat(styles.player4View.right) / 100.0) +
            60,
          y:
            dimensions.height *
            (1.09 - parseFloat(styles.player4View.top) / 100.0),
        },
      ], //Array of new values for the player cards
    };
  }

  //Use state variable called round 1 = flop 2 = turn 3 = river
  foldCard() {
    Animated.timing(this.state.valueFoldCard, {
      toValue: { x: -515, y: 375 },
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  moveBB(player) {
    Animated.timing(this.state.animationBB[player], {
      toValue: this.state.newValueBlinds[player],
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  moveSB(player) {
    Animated.timing(this.state.animationSB[player], {
      toValue: this.state.newValueBlinds[player],
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  transitionBlinds() {
    var indexSB = this.props.game.smallBlindLoc;
    var indexBB = indexSB + 1;

    if (indexBB == this.props.game.size) {
      indexBB = 0;
    }
    var moveBigBlinds = this.state.animationBB[indexBB].getLayout();
    var moveSmallBlinds = this.state.animationSB[indexSB].getLayout();

    return (
      <View>
        <Animated.View style={moveBigBlinds}>
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 25,
              backgroundColor: "black",
              justifyContent: "center",
              top: "100%",
              right: "2100%",
              opacity: this.props.game.turn == 1 ? 1 : 0,
            }}
          >
            {this.moveBB(indexBB)}
            <Text style={{ textAlign: "center", color: "white" }}>BB</Text>
          </View>
        </Animated.View>

        <Animated.View style={moveSmallBlinds}>
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 25,
              backgroundColor: "white",
              justifyContent: "center",
              top: "100%",
              right: "2100%",
              opacity: this.props.game.turn == 1 ? 1 : 0,
            }}
          >
            {this.moveSB(indexSB)}
            <Text style={{ textAlign: "center" }}>SB</Text>
          </View>
        </Animated.View>
      </View>
    );
  }

  flopTurnRiver(suit, value, i) {
    var screen = this.state.screen;
    var image = CardImages(suit, value);
    return (
      <View style={{ left: 0, right: 0 }}>
        <Animated.View style={this.state.tableCardsStart[i].getLayout()}>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              borderRadius: 2,
              justifyContent: "center",
              alignItems: "center",
              width: screen.width * 0.08,
              height: screen.height * 0.25,
            }}
          >
            <Image source={image} style={styles.tableImage} />
            {this.moveTableCards(i)}
          </View>
        </Animated.View>
      </View>
    );
  }

  moveTableCards(card) {
    var screen = this.state.screen;
    var xOS = (screen.width * 0.034) / 1000;
    var xBase =
      -screen.width * 0.3 +
      screen.width * 0.6 * 0.103 +
      screen.width * 0.035 * 1.45;
    var yBase = screen.height / 2.5;
    var xMod = screen.width * 0.08 + screen.width * 0.6 * xOS;

    var tableCardsMove = [
      { x: 0 + xBase, y: yBase },
      { x: 1 * xMod + xBase, y: yBase },
      { x: 2 * xMod + xBase, y: yBase },
      { x: 3 * xMod + xBase, y: yBase },
      { x: 4 * xMod + xBase, y: yBase },
    ];

    Animated.timing(this.state.tableCardsStart[card], {
      toValue: tableCardsMove[card],
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  cardDeal(suit, value, i) {
    var image = CardImages(suit, value);
    var screen = this.state.screen;
    return (
      <View style={styles.cardDeal}>
        <Animated.View style={this.state.playerCardAnimations[i].getLayout()}>
          <CardDealing image={image} screen={screen}>
            {this.movePlayerCards(i)}
          </CardDealing>
        </Animated.View>
      </View>
    );
  }

  movePlayerCards(card) {
    Animated.timing(this.state.playerCardAnimations[card], {
      toValue: this.state.playerNewValues[card],
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  quitView() {
    return (
      <Modal
        supportedOrientations={["landscape"]}
        animationType="slide"
        transparent={true}
        visible={this.state.quitVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.exitStyle, { fontSize: 20 }]}>
              Game Name:{" "}
              {this.props.matchName.slice(0, this.props.matchName.indexOf("-"))}
            </Text>

            <TouchableOpacity
              style={styles.buttonInExit}
              onPress={() => {
                this.setState({ quitVisible: !this.state.quitVisible });
              }}
            >
              <Text style={styles.exitStyle}>Return To Game</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.buttonInExit}
              onPress={() => {
                this.setState({ quitVisible: !this.state.quitVisible });
                this.props.navigation.navigate("HomePage");
              }}
            >
              <Text style={styles.exitStyle}>Go to Main Menu</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={[styles.buttonInExit, { backgroundColor: "#c80c0d" }]}
              onPress={() => {
                this.setState({ quitVisible: !this.state.quitVisible });
                this.leaveGame();
              }}
            >
              <Text style={styles.textStyle}>Quit Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  kickView() {
    var duration = this.state.idle ? 15 : 10;
    return (
      <Modal
        supportedOrientations={["landscape"]}
        animationType="slide"
        transparent={true}
        visible={this.state.kickVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {this.state.idle ? (
              <Text style={[styles.exitStyle, { fontSize: 20 }]}>
                Are you still there?
              </Text>
            ) : (
              <Text style={[styles.exitStyle, { fontSize: 20 }]}>
                Out of Chips
              </Text>
            )}

            <Text style={[styles.exitStyle, { marginBottom: 10 }]}>
              You'll be leaving the game in:{" "}
            </Text>

            <CountdownCircleTimer
              isPlaying={this.state.kickVisible}
              size={60}
              strokeWidth={8}
              duration={duration}
              onComplete={() => {
                this.setState({ kickVisible: !this.state.kickVisible });
                this.leaveGame();
              }}
              colors={[
                ["#004777", 0.4],
                ["#F7B801", 0.4],
                ["#A30000", 0.2],
              ]}
            >
              {({ remainingTime, animatedColor }) => (
                <Animated.Text style={{ color: animatedColor, fontSize: 20 }}>
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>

            {this.state.idle && ( //this.state.autoFolds < 6 && //This line force kicks anyone
              <TouchableOpacity
                style={styles.buttonInExit}
                onPress={() => {
                  this.setState({ idle: false });
                }}
              >
                <Text style={styles.exitStyle}>Return to Game</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.buttonInExit, { backgroundColor: "#c80c0d" }]}
              onPress={() => {
                this.setState({ kickVisible: !this.state.kickVisible });
                this.leaveGame();
              }}
            >
              <Text style={styles.textStyle}>Quit Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  leaveGame() {
    this.props.navigation.navigate("HomePage");
    this.props.leaveGame();
  }

  raiseView(callAmount, maxChips) {
    const { raiseVisible } = this.state;
    return (
      <Modal
        supportedOrientations={["landscape"]}
        animationType="slide"
        transparent={true}
        visible={raiseVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {callAmount == 0 ? (
              this.state.raiseAmount ==
              this.props.game.balance[this.props.playerNum] ? (
                <Text style={{ padding: 0, fontWeight: "bold" }}>
                  ALL IN! {this.state.raiseAmount} Chips
                </Text>
              ) : (
                <Text style={{ padding: 0, fontWeight: "bold" }}>
                  Raise {this.state.raiseAmount} Chips
                </Text>
              )
            ) : callAmount + this.state.raiseAmount ==
              this.props.game.balance[this.props.playerNum] ? (
              <Text style={{ padding: 0, fontWeight: "bold" }}>
                {" "}
                ALL IN!
                {" " + (callAmount + this.state.raiseAmount)} Chips
              </Text>
            ) : (
              <Text style={{ padding: 0, fontWeight: "bold" }}>
                Call: {callAmount} + New Re-Raise {this.state.raiseAmount} =
                {" " + (callAmount + this.state.raiseAmount)} Chips
              </Text>
            )}

            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={
                this.props.game.blindAmount ? this.props.game.blindAmount : 0
              }
              maximumValue={maxChips - callAmount}
              step={10}
              onValueChange={(raiseAmount) => {
                this.setState({ raiseAmount });
              }}
              value={this.state.raiseAmount}
              minimumTrackTintColor="#1B2430"
              maximumTrackTintColor="#000000"
            />
            {/* //https://github.com/callstack/react-native-slider */}

            <TouchableOpacity
              style={styles.buttonInExit}
              onPress={() => {
                //this.raiseAnimation()
                this.setState({ raiseVisible: !raiseVisible });
                //this.raisePot();
                if (this.state.raiseAmount > 0) {
                  if (
                    this.state.raiseAmount ==
                    this.props.game.balance[this.props.playerNum]
                  ) {
                    console.log("hey", this.state.raiseAmount, callAmount);
                    this.props.updateGame(
                      "all in",
                      this.state.raiseAmount + callAmount
                    );
                    this.setState({ raiseAmount: 10 });
                  } else {
                    this.props.updateGame(
                      "raise",
                      this.state.raiseAmount + callAmount
                    );
                    this.setState({ raiseAmount: 10 });
                  }
                  //this.fadeIn(this.props.playerNum);
                } else {
                  alert(
                    "Raise Value Invalid",
                    "Please Input Raise Value greater than 0"
                  );
                }
              }}
            >
              <Text style={{ fontWeight: "bold" }}>APPLY</Text>
            </TouchableOpacity>

            <View style={{ padding: 5 }}></View>
            <TouchableOpacity
              style={styles.buttonInExit}
              onPress={() => {
                this.setState({ raiseVisible: !raiseVisible });
              }}
            >
              <Text style={styles.exitStyle}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  actionsView() {
    var myTurn = this.props.game.playerTurn == this.props.playerNum;
    var callAmount = 0;
    var balance = this.props.game.balance[this.props.playerNum];

    if (myTurn) {
      if (
        this.props.game.move[this.props.playerNum] === "fold" ||
        this.props.game.move[this.props.playerNum] === "all in"
      ) {
        //if you fold
        myTurn = false;
        callAmount = 0;
        this.props.updateGame(
          this.props.game.move[this.props.playerNum],
          callAmount
        );
      }

      /* var lowestchips = this.props.game.chipsIn.map((chips, index) => {
          if(this.props.game.move[index] != 'fold'){
            return chips + this.props.game.balance[index]
          }
        }).filter(x => { return x !== undefined})
        lowestchips =  Math.min(...lowestchips) */
      var lowestchips = Math.min(...this.props.game.balance);

      var setupCall = true;
      var callString = "Call: ";
      var callType = "call";
      var callAmount = 0;
      var raiseDisabled = false;

      if (this.props.game.turn == 1) {
        var smallBlindLoc = this.props.game.smallBlindLoc;
        if (
          this.props.game.smallBlindLoc ==
          this.props.game.size - this.props.game.newPlayer
        ) {
          smallBlindLoc = 0;
        }

        var bigBlindLoc = smallBlindLoc + 1;
        if (bigBlindLoc >= this.props.game.size) {
          bigBlindLoc = 0;
        }

        if (
          smallBlindLoc == this.props.playerNum &&
          !this.props.game.ready.includes(true)
        ) {
          callString = "Small Blind: ";
          callType = "small blind";
          callAmount = Math.ceil(this.props.game.blindAmount * 0.5);
          callString += callAmount;
          setupCall = false;
        } else if (
          bigBlindLoc == this.props.playerNum &&
          this.props.game.raisedVal ==
            Math.ceil(this.props.game.blindAmount * 0.5)
        ) {
          callString = "Big Blind: ";
          callType = "big blind";
          callAmount = this.props.game.blindAmount;
          callString += callAmount;
          setupCall = false;
        }
      }

      if (balance == 0) {
        //if you run out of funds
        callAmount = 0;
        this.props.updateGame("check");
      }
      if (setupCall) {
        callString = "Call: ";
        callType = "call";
        callAmount =
          Math.max(...this.props.game.chipsIn) -
          this.props.game.chipsIn[this.props.playerNum];
        callString += callAmount;

        if (callAmount >= balance) {
          //partial still not implemented at pay out
          callAmount = balance; //might also depricate later
          callString = "All In!";
          callType = "all in";
          raiseDisabled = true;
        }
        if (callAmount >= lowestchips) {
          raiseDisabled = true;
        }
      }
    }

    return (
      <View style={styles.bettingButtonsView}>
        {this.raiseView(callAmount, lowestchips)}

        <TouchableOpacity
          style={[
            styles.bettingButtons,
            myTurn && !raiseDisabled ? styles.raiseButt : styles.disabled,
          ]}
          disabled={!myTurn || raiseDisabled}
          onPress={() => this.setState({ raiseVisible: true })}
        >
          {this.props.game.raisedVal == 0 ? (
            <Text>Raise</Text>
          ) : (
            <Text>Re-Raise</Text>
          )}
        </TouchableOpacity>

        {callAmount == 0 ? (
          <TouchableOpacity
            style={[
              styles.bettingButtons,
              myTurn ? { backgroundColor: "#D6A2E8" } : styles.disabled,
            ]}
            disabled={!myTurn}
            onPress={() => this.props.updateGame("check")}
          >
            <Text>Check</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.bettingButtons,
              myTurn ? styles.callButt : styles.disabled,
            ]}
            disabled={!myTurn}
            onPress={() => this.props.updateGame(callType, callAmount)}
          >
            <Text>{callString}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.bettingButtons,
            myTurn ? styles.foldButt : styles.disabled,
          ]}
          disabled={!myTurn}
          onPress={() => {
            this.foldCard();
            this.props.updateGame("fold");
          }}
        >
          <Text>Fold</Text>
        </TouchableOpacity>
      </View>
    );
  }

  roundWinnerView() {
    var isVisible =
      !this.props.game.ready[this.props.playerNum] && !this.state.idle;
    var newPlayer =
      this.props.game.size - this.props.game.newPlayer <= this.props.playerNum;

    return (
      <Modal
        supportedOrientations={["landscape"]}
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#ff9f1a" }}
            >
              {" "}
              {this.props.game.roundWinner}{" "}
            </Text>
            <Text style={{ padding: 0, fontWeight: "bold", marginBottom: 10 }}>
              won with a {this.props.game.roundWinnerRank}!
            </Text>

            <CountdownCircleTimer
              isPlaying={isVisible}
              size={60}
              strokeWidth={8}
              duration={15}
              onComplete={() => {
                if (!newPlayer) {
                  this.props.updateGame("check");
                }
                this.setState({
                  playerCardAnimations: this.state.playerCardAnimations.map(
                    (a) => new Animated.ValueXY({ x: 0, y: 0 })
                  ),
                  tableCardsStart: this.state.tableCardsStart.map(
                    (a) => new Animated.ValueXY({ x: 0, y: 0 })
                  ),
                });
              }}
              colors={[
                ["#004777", 0.4],
                ["#F7B801", 0.4],
                ["#A30000", 0.2],
              ]}
            >
              {({ remainingTime, animatedColor }) => (
                <Animated.Text style={{ color: animatedColor, fontSize: 20 }}>
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>

            <View style={{ padding: 5 }}></View>
            {!newPlayer && (
              <TouchableOpacity
                style={styles.buttonInExit}
                onPress={() => {
                  this.props.updateGame("check");
                  this.setState({
                    playerCardAnimations: this.state.playerCardAnimations.map(
                      (a) => new Animated.ValueXY({ x: 0, y: 0 })
                    ),
                    tableCardsStart: this.state.tableCardsStart.map(
                      (a) => new Animated.ValueXY({ x: 0, y: 0 })
                    ),
                  });
                }}
              >
                <Text style={styles.exitStyle}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    );
  }

  timerView() {
    var myTurn = this.props.game.playerTurn == this.props.playerNum;
    var isPlaying = 0 < this.props.game.turn && this.props.game.turn < 5;

    var name = this.props.game.players[this.props.game.playerTurn];
    if (typeof name === "undefined") {
    } else {
      name = name.slice(0, 8);
      if (name != this.props.game.players[this.props.game.playerTurn]) {
        name = name + "...";
      }
    }

    return (
      <View style={styles.timer}>
        <CountdownCircleTimer
          key={this.props.game.playerTurn}
          isPlaying={isPlaying}
          size={60}
          strokeWidth={8}
          duration={45}
          onComplete={() => (myTurn ? this.timedOut() : [false])}
          colors={[
            ["#004777", 0.4],
            ["#F7B801", 0.4],
            ["#A30000", 0.2],
          ]}
        >
          {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor, fontSize: 20 }}>
              {remainingTime}
            </Animated.Text>
          )}
        </CountdownCircleTimer>

        <View style={[styles.timerTextBackground]}>
          {0 == this.props.game.turn || this.props.game.turn == 5 ? (
            <Text style={[styles.playerNames, { marginLeft: 20 }]}>
              Waiting For Other Players
            </Text>
          ) : (
            <Text style={styles.playerNames}>{name}'s Turn</Text>
          )}
        </View>
      </View>
    );
  }

  timedOut() {
    if (this.state.autoFolds == 3 || this.state.autoFolds > 5) {
      this.setState({ quitVisible: false });
      this.setState({ raiseVisible: false });
      this.setState({ kickVisible: true });
      this.setState({ idle: true, autoFolds: this.state.autoFolds + 1 });
    } else {
      /* else if(this.state.autoFolds > 5){ //This kicks user out of game without choice
        this.setKickVisible(true)
        this.setState({idle: true})
      } */
      this.setState({ quitVisible: false });
      this.setState({ raiseVisible: false });
      this.setState({ autoFolds: this.state.autoFolds + 1 });
    }
    this.props.updateGame("fold");
  }

  fade(num, opac) {
    Animated.timing(this.state.fadeAnimation[num], {
      toValue: opac,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  playerMoveView(num) {
    var show = false;
    if (
      this.props.game.move[num] === "fold" ||
      this.props.game.move[num] === "all in" ||
      this.props.game.move[num] === "small blind" ||
      this.props.game.move[num] === "waiting"
    ) {
      show = true;
    }
    var opac = show || this.props.game.ready[num] ? 1 : 0;
    return (
      <Animated.View
        style={[
          {
            opacity: this.state.fadeAnimation[num],
            backgroundColor: "#D70040",
            padding: 2,
            borderRadius: 15,
          },
        ]}
      >
        <Text style={styles.textStyle}>
          {this.props.game.move[num] == "raise" ||
          this.props.game.move[num] == "call"
            ? this.props.game.move[num] + " " + this.props.game.raisedVal
            : this.props.game.move[num]}
        </Text>
        {this.fade(num, opac)}
      </Animated.View>
    );
  }

  playerAvatarView(num) {
    var name = this.props.game.players[num];
    if (typeof name === "undefined") {
    } else {
      name = name.slice(0, 8);
      if (name != this.props.game.players[num]) {
        name = name + "...";
      }
    }

    return this.props.game.size > num ? (
      <View style={{ alignItems: "center" }}>
        <View
          style={[
            styles.avatarImage,
            { overflow: "hidden", marginBottom: -10 },
          ]}
        >
          <Image
            source={{ uri: this.props.game.playerAvatar[num] }}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.textBackground}>
          <Text style={styles.playerNames}>{name}</Text>
        </View>
        {this.playerMoveView(num)}
      </View>
    ) : (
      this.defaultEmptyAvatar()
    );
  }

  defaultEmptyAvatar() {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/pokerfriends-843ef.appspot.com/o/transparent.png?alt=media&token=30b3c6ed-592b-4802-a2ee-d9c846ab3a05",
          }}
          style={styles.avatarImage}
        />
        <View style={styles.textBackground}>
          <Text style={styles.playerNames}>Empty</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ left: "2%", top: "2.5%", position: "absolute" }}>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => this.setState({ quitVisible: true })}
          >
            <Text style={styles.textStyle}>MENU</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tableView}>
          <Image
            style={styles.tableImage}
            source={require("../../../assets/pokertable.png")}
          />
        </View>

        {1 < this.props.game.turn &&
          this.props.game.turn < 5 &&
          this.props.game.board.map((card, i) =>
            this.flopTurnRiver(card.suit, card.value, i)
          )}

        <View style={styles.player1View}>{this.playerAvatarView(0)}</View>

        <View style={styles.player2View}>{this.playerAvatarView(1)}</View>

        <View style={styles.player3View}>{this.playerAvatarView(2)}</View>

        <View style={styles.player4View}>{this.playerAvatarView(3)}</View>

        <View style={styles.potView}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Pot: {this.props.game.pot}
          </Text>
        </View>

        <View>
          {0 < this.props.game.turn &&
            this.props.game.turn < 5 &&
            this.props.myCards.map((card, i) =>
              this.cardDeal(card.suit, card.value, i + this.props.playerNum * 2)
            )}
        </View>

        {0 < this.props.game.turn &&
          this.props.game.turn < 5 &&
          this.actionsView()}

        {this.timerView()}

        <View style={styles.chat}>
          <Chat
            matchName={this.props.matchName}
            matchType={this.props.matchType}
          />
        </View>

        <View style={styles.chipView}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
              }}
              source={require("../../../assets/chipAmount.png")}
            />
          </View>
          <Text style={styles.ChipsAmount}>
            chips: {this.props.game.balance[this.props.playerNum]}
          </Text>
        </View>

        {this.props.game.turn == 1 && this.transitionBlinds()}

        {this.props.game.turn == 5 &&
          this.props.game.roundWinner != -1 &&
          this.roundWinnerView()}

        {this.quitView()}
        {((this.props.game.turn == 0 &&
          this.props.game.balance[this.props.playerNum] == 0) ||
          this.state.idle) &&
          this.kickView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  ChipsAmount:{
    top: "2%",
    left: "25%",
    color : "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "nowrap",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  exitStyle: {
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInExit: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    width: "80%",
    backgroundColor: "#cccccc",
    marginTop: 5,
    alignItems: "center",
  },
  exitButton: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: "#D70040",
  },
  timer: {
    position: "absolute",
    top: "2%",
    left: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    resizeMode: "contain",
    width: "50%",
  },
  timerTextBackground: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#D70040",
    borderRadius: 15,
    marginLeft: 5,
    maxHeight: 50,
    width: "40%",
    marginTop: 10,
  },
  textStyle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  playerNames: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
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
    width: "35%",
  },
  textBackground: {
    backgroundColor: "#D70040",
    paddingBottom: 4,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  player1View: {
    position: "absolute",
    borderRadius: 2,
    borderColor: "black",
    top: "33%",
    left: "6%",
    alignContent: "center",
    paddingBottom: 15,
  },
  player2View: {
    borderRadius: 2,
    borderColor: "black",
    position: "absolute",
    width: 110,
    left: "20%",
    top: "1%",
  },
  player3View: {
    borderRadius: 2,
    borderColor: "black",
    position: "absolute",
    width: 110,
    right: "20%",
    top: "1%",
  },
  player4View: {
    position: "absolute",
    borderRadius: 2,
    borderColor: "black",
    width: 110,
    top: "33%",
    right: "6%",
    alignContent: "center",
  },
  potView: {
    position: "absolute",
    top: "10%",
    right: "4%",
  },
  pot: {
    borderRadius: 2,
    borderColor: "black",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  chipAmount: {
    top: "500%",
    left: "50%",
  },
  chipView: {
    position: "absolute",
    width: 50,
    right: "50%",
    top: "2%",
    alignContent: "center",
    alignItems: "center",
  },
  tableView: {
    position: "absolute",
    top: "5%",
    bottom: 0,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  tableImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  chat: {
    position: "absolute",
    bottom: "4%",
    right: "20%",
  },
  bettingButtonsView: {
    position: "absolute",
    bottom: "20%",
    left: "25%",
    flexDirection: "row",
  },
  bettingButtons: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
  },
  raiseButt: {
    backgroundColor: "#add8e6",
    paddingHorizontal: 10,
  },
  callButt: {
    backgroundColor: "#fed8b1",
    paddingHorizontal: 10,
  },
  foldButt: {
    backgroundColor: "#ffcccb",
    paddingHorizontal: 10,
  },
  disabled: {
    backgroundColor: "#cccccc",
  },
  cardImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  foldCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  foldContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardDeal:{
    position: "absolute",
    bottom: "5%",
    left: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    resizeMode: "contain",
    width: "50%",
  }
});
