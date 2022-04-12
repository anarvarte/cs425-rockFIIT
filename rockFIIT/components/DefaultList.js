import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
import StrengthScreen from '../screens/StrengthScreen';
import ArnoldSplitScreen from "../screens/ArnoldSplit";
import PPLScreen from "../screens/PPLScreen";

const DefaultList = ({ item, deleteItem , navigation, location}) => {
  return (
    <ComponentContainer>
      <ListContainer>
        <CircleContainer>
          <TouchableOpacity>
            <Entypo name ="triangle-right" size={25} color="#DD7F4A" onPress={() => navigation.navigate(location)} />
            </TouchableOpacity>
          </CircleContainer>
        <View>
          <TextItem>{item}</TextItem>
        </View>
      </ListContainer>
    </ComponentContainer>
  );
}

export default DefaultList;

const HeaderText = styled.Text`
  color: white;
  font-size: 30px;
`;

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  border-radius: 15px;
  flex-direction: row;
`;

const CircleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 10px;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: 52px;
  width: auto;
  margin-top: 10px;

`;

const TextItem = styled.Text`
  color: black;
  width: 270px;
  height: auto;
  font-size: 20px;
  margin-right: 5px;
  margin-left: 10px;
  justify-content: center;
  margin-top: 12px;
  fontFamily: Georgia;
`;
//  font-family: poppins-regular;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    
  },
  button: {
    paddingRight: 150,
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
});
