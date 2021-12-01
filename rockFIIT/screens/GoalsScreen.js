import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import styled from "styled-components";
import AddInput from "../components/AddInput";
import ToDoList from "../components/ToDoList";
import Header from "../components/Header";
import Empty from "../components/Empty";

const GoalsScreen = ({ navigation }) => {
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
  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>

      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header />}
          ListEmptyComponent={() => <Empty />}
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

export default GoalsScreen;

const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
