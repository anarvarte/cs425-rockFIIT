import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
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
import { UserObject } from "../user_object/UserObject";

const GoalsScreen = ({propName}) => {
  const [data, setData] = useState([]);
  const [userGoals, setUserGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const[goalList, setNewGoalList] = useState([]);

  useEffect(() => {
    const requestData = async() => {
      const userGoals = await UserObject.getUserGoals(propName.currentUser.username, propName.currentUser.password);
      setUserGoals(userGoals);
    };
    requestData();

  }, [])

  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  function getGoalName(val){
    setNewGoal(val);
  }

  function addNewGoal(){
    setNewGoalList([... goalList,{
      id: goalList.length,
      value: newGoal,
    }])
    goalList.push(newGoal);
  }
  
  async function saveNewGoals(){
    for(var i = 0; i < goalList.length ; i++){
      console.log(goalList[i].value);
      await UserObject.addUserGoals('NewUser3@gmail.com', 'gamer775', goalList[i].value, 0);
    }
    alert('Successfully added new goals!');
  }

  var userGoalsList = userGoals.map((goals) => 
  <GoalList item={goals[2]} deleteItem={deleteItem} completed={goals[3]}/>
  )
  
  return (
    <ComponentContainer>
      <View>
        <Header></Header>
        <ScrollView>
          {
            userGoalsList
          }
          {
            goalList.map(programs => (
              <GoalList item={programs.value} deleteItem={deleteItem} completed={0}/>
            ))
          }
        </ScrollView>

        <InputContainer>
              <Input placeholder="Create Goal..." onChangeText={getGoalName}/>
              <SubmitButton onPress={() => {
                  addNewGoal()
                }}>
                <Text> + </Text>
              </SubmitButton>
              <SubmitButton onPress={() => {
                saveNewGoals();
              }}>
                <Text>Save</Text>
              </SubmitButton>
        </InputContainer>
    
      </View>

      {/*
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
          */}
    </ComponentContainer>
  );
};

export default GoalsScreen;

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