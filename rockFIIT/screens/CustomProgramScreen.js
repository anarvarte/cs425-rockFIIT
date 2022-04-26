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
import AddExercise from "../components/AddExercise";
import EmptyProgram from "../components/EmptyProgram";
import DefaultExercise from "../components/DefaultExercise";
//import Program from './ProgramScreen';

import { UserObject } from "../user_object/UserObject";

const CustomProgram = ({ route }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [newProgramExercises, setNewProgramExercises] = useState([]);
  const [modalVal, setModalVal] = useState(false);
  const [data, setData] = useState([]);

  var programName = route.params;
  var exerciseList = UserObject.exerciseListTest;
  var exerciseListMap = exerciseList.map(exercises => 
    <TouchableOpacity onPress={() => addNewProgramExercise(exercises[0])}>
        <Text>{exercises[0]}</Text>
    </TouchableOpacity>
  )

  async function loadExerciseList(){
    exerciseList = await UserObject.getExerciseList();
    console.log('exerciseList is ' + exerciseList);
  }

  async function loadModalWithExercises(){
    setIsVisible(true);
  }

  function addNewProgramExercise(exercise){
    setNewProgramExercises([... newProgramExercises, {
      id: newProgramExercises.length,
      value : exercise
    }])
  }

  return (
    <ComponentContainer>
      <View style={styles.headerContainer}>
        <HeaderText style={styles.programHeader}>{programName}</HeaderText>
        <ScrollView>
          {
            newProgramExercises.map(programExercises => (
              <DefaultExercise exerciseName={programExercises.value}/>
            ))
          }
        </ScrollView>
      </View>

      <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', marginLeft:40, marginBottom:60}}>     
          <TouchableOpacity  style={{width:'40%'}} onPress= {() => loadModalWithExercises()}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addButtonText}>+</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  style={{width:'40%'}}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addButtonText}>Save</Text>
                </View>
              </TouchableOpacity>
        </View>

        <Modal transparent visible={isVisible}>
            <View style={styles.exerciseModalBackground}>
                <View>
                    <Text style={styles.modalHeader}>
                        Exercise List
                    </Text>
                </View>
                <View style={[styles.exerciseModalContainer]}>
                    <ScrollView>
                        {exerciseListMap}
                    </ScrollView>
                    {/*
                    <FlatList
                        data={exerciseArray}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item}
                        onPress={() => setisVisible(false)}
                         /> 
                     */}
                  <TouchableOpacity onPress={() => setIsVisible(false) }>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addButtonText}>x</Text>
                        </View>
                 </TouchableOpacity>  
                </View>
            </View>
        </Modal>

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
  },
  programHeader:{
    fontWeight:'bold',
    color:'black',
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

  exerciseContainer:{
    marginTop:10,
},
addExerciseWrapper: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
},
addWrapper2: {
  width: 45,
  height: 45,
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
exerciseModalBackground:{
    backgroundColor:'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
exerciseModalContainer:{
    width:'80%',
    backgroundColor:'white',
    paddingHorizontal:20,
    paddingVertical:30,
    borderRadius:15,
    alignItems:'flex-start', 
    flexDirection:'row',
    flexWrap: 'wrap',
},
modalFieldLabels:{
  width:'50%',
  fontSize: 16,
  fontWeight: 'bold',
  height:35,
  fontFamily: 'Georgia',
},
modalFieldInputs:{
  width:'50%',
  fontSize: 18,
  fontWeight: 'bold',
  borderRadius: 7,
  backgroundColor: 'lightgray',
  paddingHorizontal:5,
  height:30,
  fontFamily: 'Georgia',
},
modalHeader:{
    fontWeight: 'bold',
    fontSize: 28,
    color:'white',
},
commentFieldInputs:{
  width:'50%',
  fontSize: 14,
  fontWeight: 'bold',
  borderRadius: 7,
  backgroundColor: 'lightgray',
  paddingHorizontal:5,
  height:70,
  fontFamily: 'Georgia',
  paddingTop:2,
  paddingBottom:2,
},
});
const ComponentContainer = styled.View`
  background-color: #00264D;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default CustomProgram;
