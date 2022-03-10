import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Styles,
} from "react-native";

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import styled from "styled-components";
import AddInput from "../components/AddInput";
import ToDoList from "../components/ToDoList";
import EmptyLifting from "../components/EmptyLifting"
import LogIn from './LogInScreen';
import AddExercise from "../components/AddExercise";

const StrengthScreen = ({ navigation }) => {
    const [isVisible, setisVisible] = useState(false);

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
      <View style={styles.headerContainer}>
      <HeaderText style={styles.programHeader}>Strength Program</HeaderText>
      </View>

      <View>
        <FlatList
          data={data}
          ListEmptyComponent={() => <EmptyLifting />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <ToDoList item={item} deleteItem={deleteItem} navigation={navigation}/>
          )}
        />
        <AddExercise navigation={navigation}/>
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
  headerContainer:{
    marginTop:55,
  },
  programHeader:{
    fontWeight:'bold',
    color:'black',
  }
});
const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default StrengthScreen;
