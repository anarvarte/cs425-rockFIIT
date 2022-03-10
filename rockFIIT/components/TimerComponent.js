import React, { useState } from "react";

import styled from "styled-components";

import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import { Stopwatch } from "react-native-stopwatch-timer";

const TimerComponent = () => {
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);

  const [resetStopwatch, setResetStopwatch] = useState(false);

  return (
    <ListContainer>
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            msecs
            start={isStopwatchStart}
            // To start
            reset={resetStopwatch}
            // To reset
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}
          >
            <Text style={styles.buttonText}>
              {!isStopwatchStart ? "START" : "STOP"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}
          >
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ListContainer>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  sectionStyle: {
    flex: 0.5,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    marginTop: 1
  }
});


const ListContainer = styled.TouchableOpacity`
  background-color: rgb(255, 255, 255);
  height: 100px;
  width: auto;
  border-radius: 15px;
  flex-direction: row;
  padding: 10px;
  margin-right: 10px;
`;
