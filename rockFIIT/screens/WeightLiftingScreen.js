import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  StatusBar
} from "react-native";
import styled from "styled-components";
import AddInput from "../components/AddInput";
import ToDoList from "../components/ToDoList";
import DefaultList from "../components/DefaultList";
import EmptyLifting from "../components/EmptyLifting";
import useDatabase from '../components/UseDatabase';
import {database} from '../components/Database';
import StrengthScreen from './StrengthScreen';


const WeightLiftingScreen = ({ navigation }) => {

  const[defaultExercise, setExercise] = useState('');

  const [data, setData] = useState([]);
  const submitHandler = (value) => {
    setData((prevTodo) => {
      return [
        {
          value: value,
          key: Math.random().toString()
        },
        ...prevTodo
      ];
    });
  };
  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };
  return (
    <ComponentContainer>
      <View>
      <HeaderText> </HeaderText>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>

      <View>
      <DefaultList item={'Strength Program'} deleteItem={deleteItem} navigation={navigation} location={'Strength'}/>
      <DefaultList item={'Push/Pull/Legs'} deleteItem={deleteItem} navigation={navigation}/>
      <DefaultList item={'Arnold Split'} deleteItem={deleteItem} navigation={navigation}/>
        <FlatList
          data={data}
          ListEmptyComponent={() => <EmptyLifting />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <ToDoList item={item} deleteItem={deleteItem} navigation={navigation}/>
          )}
        />
        <AddInput submitHandler={submitHandler} />
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

export default WeightLiftingScreen;
