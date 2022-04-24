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
import styled from "styled-components";
import AddInput from "../components/AddInput";
import ToDoList from "../components/ToDoList";
import DefaultList from "../components/DefaultList";
import EmptyLifting from "../components/EmptyLifting";
import useDatabase from '../components/UseDatabase';
import {database} from '../components/Database';
import StrengthScreen from './StrengthScreen';
import ArnoldSplitScreen from "./ArnoldSplit";
import PPLScreen from "./PPLScreen";
import CustomProgramScreen from "./CustomProgramScreen";

import { UserObject } from "../user_object/UserObject";
import {useForm} from 'react-hook-form';


const WeightLiftingScreen = ({ navigation }) => {

  var userPrograms = UserObject.currentUser.programs;
  var empty = ['exercise'];

  console.log('userPrograms are   ' + userPrograms)

  /*
  for(var i = 0 ; i < UserObject.currentUser.programs.length ; i++){
    for(var j = 1 ; j < UserObject.currentUser.programs[i].length ; j++){
      userPrograms[i][0] = UserObject.currentUser.programs[i][0];
      userPrograms[i][j] = UserObject.currentUser.programs[i][j];
    }
  }
  */

  var userProgramsList = userPrograms.map((programs) => 
    <DefaultList item={programs[0]} navigation={navigation} exercises={programs}/>
    )

  const [newProgram, setNewProgram] = useState("");
  const[programList, setNewProgramList] = useState([]);

  function getProgramName(val){
    setNewProgram(val);
  }

  function addNewProgram(){
    userPrograms.push(newProgram);
    //add to database too;
    setNewProgramList([... programList, {
      id: programList.length,
      value: newProgram,
    }])
  }
  

  return (
    <ComponentContainer>
      <View>
      <HeaderText> </HeaderText>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>  
      <View>
          <ScrollView>
            {
              userProgramsList
            }
            {
              programList.map(programs  => (
                <DefaultList item={programs.value} navigation={navigation} exercises={empty}/>
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
  background-color: #C6B8C1;
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
