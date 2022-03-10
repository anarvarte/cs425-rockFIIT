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
import AddGoal from "../components/AddGoal";
import GoalList from "../components/GoalList";
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
        
      </View>

      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <GoalList item={item} deleteItem={deleteItem} />
          )}
        />
        <AddGoal submitHandler={submitHandler} />
      </View>
    </ComponentContainer>
  );
};

export default GoalsScreen;



const ComponentContainer = styled.View`
  background-color: #C6B8C1;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;
