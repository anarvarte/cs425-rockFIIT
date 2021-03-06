import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";

import styled from "styled-components";
import DefaultList from "../components/DefaultList";
import CustomProgramScreen from "./CustomProgramScreen";

import { UserObject } from "../user_object/UserObject";
import { useNavigation } from "@react-navigation/native";


const WeightLiftingScreen = ({ propName }) => {
  const navigation = useNavigation();
  const[userPrograms, setUserPrograms] = useState([]);
  const[defaultPrograms, setDefaultPrograms] = useState([]);


  useEffect(() => {
    const requestData = async() => {
      const userPrograms = await UserObject.getUserPrograms(propName.currentUser.username, propName.currentUser.password);
      const defaultPrograms = await UserObject.getDefaultPrograms();
      setUserPrograms(userPrograms);
      setDefaultPrograms(defaultPrograms);
    };
    requestData();
  }, [])

  function addNewProgram(){
    var credentials = []
    credentials.push(propName.currentUser.username);
    credentials.push(propName.currentUser.password);
    navigation.navigate('CustomProgramScreen', {credentials})
  }
  

  var userProgramsList = userPrograms.map((programs) => 
      <DefaultList item={programs[2]} exercises={programs} location={'Program'}/>
   )
   

  var defaultProgramsList = defaultPrograms.map((programs) => 
    <DefaultList item={programs[2]} exercises={programs} location={'Program'}/>
)

   
  return (
    <ComponentContainer>
      <View>
      <HeaderText>Fitness Programs</HeaderText>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>  
      <View>
          <ScrollView>
            {
              defaultProgramsList
            }
            {
              userProgramsList
            }
          </ScrollView>
            <InputContainer>
              <SubmitButton onPress={() => {
                  addNewProgram()
                }}>
                <Text style={{color: "white", fontSize: 18, fontFamily: "Georgia"}}> Add </Text>
              </SubmitButton>
            </InputContainer>
      </View>

      
    </ComponentContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc"
  },
  programInput:{
    borderWidth: 1,
    borderColor: '#777',
    width: 200,
  }
});
const HeaderText = styled.Text`
  color: white;
  font-size: 30px;
  margin-top: 130px;
  fontFamily: Georgia;
`;

const ComponentContainer = styled.View`
  background-color: #00264D;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
  justify-content: center;
`;

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 270px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 220px;
  border-radius: 10px;
  fontFamily: Georgia;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  background-color: #DD7F4A;
  margin-bottom: 250px;
  border-radius: 50px;
`;

export default WeightLiftingScreen;
