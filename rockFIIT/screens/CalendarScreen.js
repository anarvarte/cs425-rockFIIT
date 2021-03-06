import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components";

import Calendar from "../components/Calendar";
import { UserObject } from "../user_object/UserObject";

const homeImg = require("../assets/homeImg.png");

const CalendarScreen = ({ navigation, propName }) => {
  const [userLogs, setUserLogs] = useState([]);

  useEffect(() => {
    const requestData = async() => {
      const temp = await UserObject.getUserLogs(propName.currentUser.username, propName.currentUser.password);
      setUserLogs(temp);
    };
    requestData();
  }, []);

  return (
    <View style={styles.container}>
      {
        <View style={styles.calendarView}>
          <Calendar propName={propName}/>
        </View>
      } 
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f5",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  subheading: {
    fontSize: 25,
    color: "black",
    fontWeight: "300",
    fontFamily: "Georgia",
    marginBottom: 20,
  },
  graph: {
    flex: 0.5,
    justifyContent: "center",
    flexDirection: "column",
    height: 60,
    paddingBottom: 5
  },
  calendarView: {
    flex: .818,
    justifyContent: "center",
    flexDirection: "column",
    
    paddingTop: 50
  },
  calendar: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    height: 20,
    paddingTop: 10
  }
});

const TextItem = styled.Text`
  color: black;
  width: 270px;
  height: auto;
  font-size: 20px;
  justify-content: center;
  background-color: white;
  width: 100%
  shadowColor: white;
  shadowRadius: 1000px;
  fontFamily: Georgia;
`;

const Logo = styled.Text`
  color: black;
  width: auto;
  height: auto;
  font-size: 50px;
  font-weight: bold;
  borderColor: yellow;
  justify-content: space-between;
  textShadowColor: rgb(255,255,255);
  textShadowRadius: 3px
  fontFamily: Georgia;
`