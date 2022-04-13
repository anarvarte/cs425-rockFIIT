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
import AddExercise from "../components/AddExercise";
import DefaultList from "../components/DefaultList";
import DefaultExercise from "../components/DefaultExercise";
import SaveExercise from "../components/SaveExercise";

const CustomProgramScreen = ({ navigation }) => {
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
        <HeaderText style={styles.programHeader}>Custom Program</HeaderText>
        {/*
        <DefaultExercise exerciseName={'Tricep Pushdowns'} sets={4} reps={12} weight={'60 LBS'} comments={'- Lock out elbows'}/>
        <DefaultExercise exerciseName={'Tricep Kickbacks'} sets={4} reps={15} weight={'15 LBS'} />
        <DefaultExercise exerciseName={'Bicep Curls'} sets={4} reps={10} weight={'30 LBS'}/>
        */
        }

      </View>
      <View style={{ top: 300, right:37}}>
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
        
        <SaveExercise navigation={navigation}/>
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
    marginTop:170,
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

export default CustomProgramScreen;
