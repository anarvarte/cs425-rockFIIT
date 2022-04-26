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
              //console.log(time);
            }}
          />
        </View>
        <View style={styles.rowStyle}>
        <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}
          >
            <Text style={styles.buttonText}>
              {!isStopwatchStart ? "START          " : "STOP          "}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  sectionStyle: {
    flex: .7,
    alignItems: "center",
    justifyContent: "center",
    
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 23,
    color: "white",
    fontFamily: 'Georgia',
    
  }
});


const ListContainer = styled.TouchableOpacity`
  background-color: #DD7F4A;
  height: 120px;
  width: 250px;
  border-radius: 15px;
  flex-direction: row;
  margin-Bottom: 90px;
  
`;
