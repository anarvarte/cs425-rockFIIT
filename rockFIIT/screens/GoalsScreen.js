import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
} from "react-native";
import {Dropdown} from 'react-native-material-dropdown-v2';
import styled from "styled-components";
import AddGoal from "../components/AddGoal";
import GoalList from "../components/GoalList";
import Header from "../components/Header";
import { UserObject } from "../user_object/UserObject";

function getGoalName(val){
  setNewGoal(val);
}

const GoalsScreen = ({propName}) => {
  const [data, setData] = useState([]);
  const [userGoals, setUserGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const[goalList, setNewGoalList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [modalVis, setModalVis] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const [exerciseText, setExercise] = useState(' ');
  const [weightText, setWeight] = useState(0);


  const dropdownItems = [];


  useEffect(() => {
    const requestData = async() => {
      const userGoals = await UserObject.getUserGoals(propName.currentUser.username, propName.currentUser.password);
      const exerciseList = await UserObject.loadExerciseLibrary();
      setUserGoals(userGoals);
      setExerciseList(exerciseList);
    };
    requestData();
  }, [])

  const deleteItem = (id) => {
    setNewGoalList((items) => {
      return items.filter((items) => items.key != id);
    });
  };

  function getGoalName(val){
    setNewGoal(val);
  }

  async function addNewGoal(){
    console.log(UserObject.getIdFromExercise(exerciseText));
    console.log(weightText);

    if((exerciseText == ' ') || (weightText == 0)){
      alert('Please fill out your goal information!')
    }
    else{
      alert('You have successfully added a new goal.');
      setModalVis(false);
      await UserObject.addUserGoals(propName.currentUser.username, propName.currentUser.password, UserObject.getIdFromExercise(exerciseText), weightText);
    }
  }
  
  async function saveNewGoals(){
    for(var i = 0; i < goalList.length ; i++){
      console.log(goalList[i].value);
      await UserObject.addUserGoals(propName.currentUser.username, propName.currentUser.password, goalList[i].value, 0);
    }
    alert('Successfully added new goals!');
  }

  var userGoalsList = userGoals.map((goals) => 
  <GoalList item={goals[2]} deleteItem={deleteItem} completed={goals[4]} weight={goals[3]} />
  )

  for(var i = 0 ; i < exerciseList.length ; i++){
    var currentExercise = {
      value : exerciseList[i][2]
    }
    dropdownItems[i] = currentExercise;
  }

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
              <SubmitButton onPress={() => {
                  setModalVis(true)
                }}>
                <Text style={{color: "white", fontSize: 18, fontFamily: "Georgia"}}> Add </Text>
              </SubmitButton>
        </InputContainer>

          {/*
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
            */}
    
      </View>

      <Modal transparent visible={modalVis}>
            <View style={styles.exerciseModalBackground}>
                  <View>
                    <Text style={styles.modalHeader}>
                        Add New Goal
                    </Text>
                </View>
                <View style={[styles.exerciseModalContainer]}>
                <Text style={styles.modalFieldLabels}>
                        Exercise:
                    </Text>
                  <Dropdown 
                    data={dropdownItems}
                    style={styles.dropdownStyle}
                    onChangeText={newText => setExercise(newText)}
                  />
                    <Text style={styles.modalFieldLabels}>
                        Weight Goal:
                    </Text>
                    <TextInput name='weight' style={styles.modalFieldInputs} onChangeText={newText => setWeight(newText)}>
                    </TextInput>
                    <TouchableOpacity onPress={() => setModalVis(false) }>
                        <View style={styles.addWrapper2}>
                            <Text style={styles.addButtonText}>x</Text>
                        </View>
                 </TouchableOpacity> 
                 <TouchableOpacity onPress={() => addNewGoal()}>
                        <View style={styles.addWrapper2} >
                            <Text style={styles.addButtonText}>Add</Text>
                        </View>
                 </TouchableOpacity>     

                </View>
            </View>
        </Modal>
    </ComponentContainer>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  dropdownStyle: {
    marginBottom: 10,
    height: 35,
    width:150,
    fontFamily: 'Georgia',
  },
    addExerciseWrapper: {
      position: 'absolute',
      bottom: 100,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  addWrapper: {
      width: 30,
      height: 30,
      marginLeft:10,
      marginTop:40,
      backgroundColor: 'white',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
      fontWeight: 'bold',
  },
  addWrapper2: {
    width: 65,
    height: 65,
    backgroundColor: '#00264D',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 8,
    
  },
  addButtonText:{
      fontSize: 20,
      color: 'white',
      fontFamily: 'Georgia',
      
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
      height:'25%',
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
    borderRadius: 5,
    backgroundColor: 'lightgray',
    paddingHorizontal:5,
    height:30,
    fontFamily: 'Georgia',
  },
  modalHeader:{
      fontWeight: 'bold',
      fontSize: 38,
      marginBottom: 10,
      color:'white',
      fontFamily: "Georgia",
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

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
  justify-content: center;
  
  
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
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  background-color: #DD7F4A;
  margin-bottom: 168px;
  border-radius: 50px;
`;