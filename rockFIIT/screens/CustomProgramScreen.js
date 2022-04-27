import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
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
import { useNavigation } from "@react-navigation/native";

const CustomProgram = ({ route }) => {

  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [modalProgramName, setModalProgramName] = useState(false);
  const [newProgramExercises, setNewProgramExercises] = useState([]);
  const [nameText, setName] = useState('');
  const [modalVal, setModalVal] = useState(false);
  const [data, setData] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  
  //route.params.credentials[0], route.params.credentials[1]
  
  useEffect(() => {
    const requestData = async() => {
      const exerciseList = await UserObject.loadExerciseLibrary();
      setExerciseList(exerciseList);
    };
    requestData();
  }, [])

  var exerciseListMap = exerciseList.map(exercises => 
    <TouchableOpacity onPress={() => addNewProgramExercise(exercises[2])}>
        <Text style={{fontSize: 22, fontFamily:"Georgia"}}>- {exercises[2]}</Text>
    </TouchableOpacity>
  )

  async function loadModalWithExercises(){
    setIsVisible(true);
  }

  function addNewProgramExercise(exercise){
    setNewProgramExercises([... newProgramExercises, {
      id: newProgramExercises.length,
      value : exercise
    }])
    console.log(newProgramExercises);
  }

  async function saveNewGoals(){

    for(var i = 0; i < newProgramExercises.length ; i++){
      console.log(UserObject.getIdFromExercise(newProgramExercises[i].value));
    }

    if(nameText == ''){
      alert('Please name your program!');
    }
    else{
      alert('You have successfully created a new program!');
      await UserObject.addUserProgram(route.params.credentials[0], nameText, UserObject.getIdFromExercise(newProgramExercises[0].value), UserObject.getIdFromExercise(newProgramExercises[1].value), UserObject.getIdFromExercise(newProgramExercises[2].value), UserObject.getIdFromExercise(newProgramExercises[3].value), UserObject.getIdFromExercise(newProgramExercises[4].value), route.params.credentials[1]);
      navigation.navigate("WeightLiftingScreen");
    }

    //UserObject.getIdFromExercise(newProgramExercises[0].value);

  }

  return (
    <ComponentContainer>
      <View style={styles.headerContainer}>
        <HeaderText style={styles.programHeader}>Create New Program</HeaderText>
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
              <TouchableOpacity  style={{width:'40%'}} onPress= {() => setModalProgramName(true)}>
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
                  <TouchableOpacity onPress={() => setIsVisible(false) }>
                        <View style={styles.addWrapper2}>
                            <Text style={{color:'white',fontSize:30}}>x</Text>
                        </View>
                 </TouchableOpacity>  
                </View>
            </View>
        </Modal>
        <Modal transparent visible={modalProgramName}>
            <View style={styles.exerciseModalBackground}>
                <View style={[styles.saveModalContainer]}>
                <Text style={styles.modalFieldLabels}>
                        Program Name: 
                    </Text>
                    <TextInput name='name' style={styles.modalFieldInputs} onChangeText={newText => setName(newText)}>
                    </TextInput>
                  <TouchableOpacity onPress={() => setModalProgramName(false) }>
                        <View style={styles.addWrapper2}>
                            <Text style={{fontSize: 20,
      color: 'white',}}>x</Text>
                        </View>
                 </TouchableOpacity>  
                 <TouchableOpacity onPress={() => saveNewGoals() }>
                        <View style={styles.addWrapper2}>
                            <Text style={{fontSize: 20,
      color: 'white',}}>Save</Text>
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
    alignItems:"center",
  },
  programHeader:{
    marginTop:70,
    color:'white',
    fontFamily:"Georgia"
    
  },
  addWrapper: {
    width: 90,
    height: 90,
    marginLeft:20,
    marginBottom:50,
    backgroundColor: '#DD7F4A',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
   
      
  },
  addButtonText:{
      fontSize: 20,
      color: 'white',
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
  width: 85,
  height: 85,
  marginLeft:40,
  backgroundColor: '#00264D',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
  
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
saveModalContainer:{
  width:'80%',
  backgroundColor:'white',
  paddingHorizontal:20,
  paddingVertical:30,
  borderRadius:15,
  alignItems:'flex-start', 
  flexDirection:'row',
  flexWrap: 'wrap',
  height: '25%',
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
