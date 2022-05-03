import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import styled from "styled-components";
import DefaultExercise from "../components/DefaultExercise";
import { useNavigation } from "@react-navigation/native";
import { UserObject } from "../user_object/UserObject";

const RealProgram = ({ route }) => {
  const navigation = useNavigation();

  var exerciseList = route.params.exercises;
  var programName = exerciseList[2];
  var displayedExercises = [];

  for(var i = 3 ; i < exerciseList.length ; i++){
    displayedExercises[i] = UserObject.getExerciseFromId(exerciseList[i]);
  }

  var displayedExercisesMap = displayedExercises.map(exercises => 
    <DefaultExercise exerciseName={exercises[2]} sets={exercises[4]} reps={exercises[5]} comments={exercises[3]} />
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
