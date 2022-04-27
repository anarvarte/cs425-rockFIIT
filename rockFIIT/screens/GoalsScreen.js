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

  var testUserGoals = [
    ['NewUser3@gmail.com', 'gamer775', 'Bench 315 LBS', 0],
    ['NewUser3@gmail.com', 'gamer775', 'Squat 405 LBS', 1 ],
  ]

  var userGoalsList = testUserGoals.map((goals) => 
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
            goalList.map(goals => (
              <GoalList item={goals.value} deleteItem={deleteItem} completed={0}/>
            ))
          }
        </ScrollView>

        <InputContainer>
              <Input placeholder="Create Goal..." onChangeText={getGoalName}/>
              <SubmitButton onPress={() => {
                  addNewGoal()
                }}>
                <Text style={{color:"white", fontSize: 20}}> + </Text>
              </SubmitButton>
              <SubmitButton onPress={() => {
                saveNewGoals();
              }}>
                <Text style={{color: "white", fontSize: 18}}>Save</Text>
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
  background-color: #00264D;
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
  width: 210px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 136px;
  border-radius: 10px;
  fontFamily: Georgia;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: #DD7F4A;
  margin-bottom: 136px;
  border-radius: 50px;
  margin-right: 10px;

  
`;