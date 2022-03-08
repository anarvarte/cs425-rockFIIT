import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import styled from "styled-components";
import AddInput from "../components/AddInput";
import ToDoList from "../components/ToDoList";
import EmptyClimbing from "../components/EmptyClimbing";
import LogIn from './LogInScreen';
//import Program from './ProgramScreen';

const RockClimbingScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const submitHandler = (value) => {
    setData((prevTodo) => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };
  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  const navigateProgram = () => {
    navigation.navigate("Program");
  };

  return (
    <ComponentContainer>
      <View>
      <HeaderText> </HeaderText>
      <CustomButton
            text="Test"
            onPress={navigateProgram}
      />  
      </View>

      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <EmptyClimbing />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <ToDoList item={item} deleteItem={deleteItem} />
          )}
        />
        <AddInput submitHandler={submitHandler} />
        
      </View>
    </ComponentContainer>
  );
};

const HeaderText = styled.Text`
  color: white;
  
  font-size: 30px;
  margin-top: 50px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default RockClimbingScreen;
