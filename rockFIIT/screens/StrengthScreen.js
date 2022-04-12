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
import DefaultList from "../components/DefaultList";
import DefaultExercise from "../components/DefaultExercise";

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


  return (
    <ComponentContainer>
      <View style={styles.headerContainer}>
        <HeaderText style={styles.programHeader}>Strength Program</HeaderText>
        <Text style={styles.exerciseGroup}>Upper Body Focus</Text>
        <DefaultExercise exerciseName={'Barbell Bench Press'} sets={4} reps={10} weight={'225 LBS'} comments={"- Paused Reps"}/>
        <DefaultExercise exerciseName={'Cable Tricep Pulldowns'} sets={4} reps={10} weight={'70 LBS'} comments={"- Lock out elbows"} />
        <DefaultExercise exerciseName={'Pull Ups'} sets={4} reps={8} weight={'Unweighted'} comments={"- Failure sets"}/>
        <DefaultExercise exerciseName={'DB Bicep Curls'} sets={4} reps={12} weight={'25 LBS'}/>
        <Text style={styles.exerciseGroup}>Lower Body Focus</Text>
        <DefaultExercise exerciseName={'Back Squat'} sets={5} reps={10} weight={'245 LBS'} comments={"Dropset"}/>
        <DefaultExercise exerciseName={'Barbell Deadlift'} sets={4} reps={6} weight={'365 LBS'} />
        <DefaultExercise exerciseName={'Dumbell Lunges'} sets={4} reps={20} weight={'35 LBS'} />
        <DefaultExercise exerciseName={'Calf Raises'} sets={4} reps={20} weight={'50 LBS'} />
      </View>
      <View style={{ top: 250, right:39}}>
        <AddExercise navigation={navigation}/>
            </View>

      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({  }) => (
            <DefaultList item={'Bench Press'} deleteItem={deleteItem} navigation={navigation}/>
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
    backgroundColor: "#C6B8C1",
  },
  headerContainer:{
    marginTop:250,
  },
  programHeader:{
    fontWeight:'bold',
    color:'black',
    marginTop:520,
    marginBottom:15,
  },
  exerciseGroup:{
    fontStyle:'italic',
    fontWeight: 'bold',
    color:'black',
    textDecorationLine: 'underline',
    fontSize:25,
    marginTop:20,
  },
});
const ComponentContainer = styled.View`
  background-color: #C6B8C1;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default StrengthScreen;
