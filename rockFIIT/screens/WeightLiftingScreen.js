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

  var userPrograms = [];

  for(var i = 0 ; i < UserObject.currentUser.programs.length ; i++){
    userPrograms[i] = UserObject.currentUser.programs[i][0];
  }


  var userProgramsList;
  userProgramsList = userPrograms.map(programs => 
    <DefaultList item={programs} navigation={navigation}/>
    )

  const [newProgram, setNewProgram] = useState("");
  const[programList, setNewProgramList] = useState([]);

  function getProgramName(val){
    setNewProgram(val);
    console.log(newProgram);
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
        {/*
        <FlatList
          data={data}
          ListEmptyComponent={() => 
            userProgramArray.map(programs => <DefaultList item={programs[0]} navigation={navigation} location={'StrengthScreen'}></DefaultList>)
          }
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <ToDoList item={item} deleteItem={deleteItem} navigation={navigation}/>
          )}
        />
        <FlatList
          data={userProgramArray}
          renderItem={({item}) => (
            <DefaultList item={userProgramArray[0]} navigation={navigation} location={'StrengthScreen'}></DefaultList>
          )}
        />
          */}

          <ScrollView>
            {
              userProgramsList
            }
            {
              programList.map(programs  => (
                <DefaultList item={programs.value} navigation={navigation}/>
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
        {/*
        <AddInput submitHandler={submitHandler} />
          */}
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
