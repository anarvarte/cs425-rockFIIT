import React, { useState } from "react";
import {
  View,
  ScrollView,
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
import ExerciseList from "../components/ExerciseList";
import LogIn from './LogInScreen';
import Tabs from "../navigation/tabs";
import AddExercise from "../components/AddExercise";
import EmptyProgram from "../components/EmptyProgram";
import DefaultExercise from "../components/DefaultExercise";
//import Program from './ProgramScreen';
import { useNavigation } from "@react-navigation/native";

const RealProgram = ({ route }) => {
  const navigation = useNavigation();
  const [isVisible, setisVisible] = useState(false);

  const [data, setData] = useState([]);

  var exerciseList = route.params.exercises;
  var programName = exerciseList[2];
  var displayedExercises = [];

  for(var i = 3 ; i < exerciseList.length ; i++){
    displayedExercises[i] = exerciseList[i];
  }

  var displayedExercisesMap = displayedExercises.map(exercises => 
    <DefaultExercise exerciseName={exercises}/>
  )

  return (
    <ComponentContainer>
      <View style={styles.headerContainer}>
        <HeaderText style={styles.programHeader}>{programName}</HeaderText>
        <ScrollView>
          {displayedExercisesMap}
        </ScrollView>
      </View>
      <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', marginLeft:60, marginBottom:60}}>     
            <TouchableOpacity style={{width:'40%'}} onPress={() => {navigation.navigate('Tabs', route.params.currentUser)}}>
          </TouchableOpacity>
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
    backgroundColor: "#097392",
  },
  headerContainer:{
    marginTop:20,
    alignItems:"center",
    
  },
  programHeader:{

    color:'white',
    fontFamily:"Georgia"
    
  },
  addWrapper: {
    width: 60,
    height: 60,
    marginLeft:10,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addButtonText:{
      fontSize: 20,
      
  },
});
const ComponentContainer = styled.View`
  background-color: #00264D;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default RealProgram;
