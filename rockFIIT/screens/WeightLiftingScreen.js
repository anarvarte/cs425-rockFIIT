import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  StatusBar,
  NativeModules,
  ScrollView,
} from "react-native";

import {useIsFocused} from '@react-navigation/native';
import styled from "styled-components";
import DefaultList from "../components/DefaultList";
import EmptyLifting from "../components/EmptyLifting";
import useDatabase from '../components/UseDatabase';
import {database} from '../components/Database';
import StrengthScreen from './StrengthScreen';
import ArnoldSplitScreen from "./ArnoldSplit";
import PPLScreen from "./PPLScreen";
import CustomProgramScreen from "./CustomProgramScreen";

import { UserObject } from "../user_object/UserObject";
import { useNavigation } from "@react-navigation/native";


const WeightLiftingScreen = ({ propName }) => {
  const navigation = useNavigation();
  const [newProgram, setNewProgram] = useState("");
  const[programList, setNewProgramList] = useState([]);
  const[userPrograms, setUserPrograms] = useState([]);

  const currentUser={
    username: propName.currentUser.username,
    password: propName.currentUser.password,
  }

  useEffect(() => {
    const requestData = async() => {
      const userPrograms = await UserObject.getUserPrograms(propName.currentUser.username, propName.currentUser.password);
      setUserPrograms(userPrograms);
    };
    requestData();
  }, [])
  
  function getProgramName(val){
    setNewProgram(val);
  }

  function addNewProgram(){
    setNewProgramList([... programList, {
      id: programList.length,
      value: newProgram,
    }])
    programList.push(newProgram);
  }
  
  var userProgramsList = userPrograms.map((programs) => 
      <DefaultList item={programs[2]} exercises={programs} location={'Program'}/>
   )
   
   
  return (
    <ComponentContainer>
      <View>
      <HeaderText>Test</HeaderText>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>  
      <View>
          <ScrollView>
            {
              userProgramsList
            }
            {
              programList.map(programs  => (
                <DefaultList item={programs.value} exercises={programs.value} location={'CustomProgramScreen'}/>
              ))
            }
          </ScrollView>
          
            <InputContainer>
              <Input placeholder="Create Program..." onChangeText={getProgramName}/>
              <SubmitButton onPress={() => {
                  addNewProgram()
                }}>
                <Text> + </Text>
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
  margin-top: 50px;
`;

const ComponentContainer = styled.View`
  background-color: #6F93F5;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
  
`;

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 180px;
  border-radius: 10px;
  fontFamily: Georgia;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 180px;
  border-radius: 50px;
`;

export default WeightLiftingScreen;
