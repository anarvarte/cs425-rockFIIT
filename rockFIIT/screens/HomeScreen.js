import React, {useEffect, useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Modal} from "react-native";
import styled from "styled-components";

import TimerComponent from "../components/TimerComponent";
import DateTime from '../components/DateTime';
import CustomButton from "../components/CustomButton";

import useDatabase from '../components/UseDatabase';
import {database} from '../components/Database';
import { useForm } from "react-hook-form";

import PureChart from 'react-native-pure-chart';
import { UserObject } from "../user_object/UserObject";
import { TouchableOpacity } from "react-native-gesture-handler";


const HomeScreen = ({propName}) => {
  //console.log(propName.currentUser.username);
  const [exerciseText, setExercise] = useState('');
  const [setsText, setSets] = useState('');
  const [repsText, setReps] = useState('');
  const [commentsText, setComments] = useState('');
  const [weightText, setWeight] = useState('');

  const [modalVis, setModalVis] = useState(false);
  const [data, setData] = useState({});


  const [graphData, setGraphData] = useState([]);
  const[specificExercises,setSpecificExercises] = useState([]);
  const[dropDownExercises, setDropDownExercises] = useState([]);
  const[exerciseLogs, setExerciseLogs] = useState([]);

  useEffect(() => {
    const requestData = async() => {
      const userLogs = await UserObject.getUserLogs(propName.currentUser.username, propName.currentUser.password);
      setExerciseLogs(userLogs);
    };
    requestData();
  }, [])

  function getSpecificExercise(exercise){
    var temp = []
    for(var i = 0; i < exerciseLogs.length ; i++){
      if(exerciseLogs[i][2] == exercise){
        var obj = {};
        obj['exercise'] = UserObject.getExerciseFromId(exercise);
        obj['date'] = exerciseLogs[i][7];
        obj['weight'] = exerciseLogs[i][5];
        specificExercises.push(obj);
      }
    }
  }

  function loadGraphData(exercise){
    var temp = [];
    getSpecificExercise(exercise);
    for(var i = 0; i < specificExercises.length ; i++){
      var obj = {};
      obj['x'] = specificExercises[i]['date'];
      obj['y'] = specificExercises[i]['weight'];
      graphData.push(obj);
    }
  }

  function getCurrentDate(){
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return month + '/' + date + '/' + year;
  }

  async function logExercise(){
    var id = UserObject.getIdFromExercise(exerciseText);
    if(id == 'false' || id == 'undefined'){
      alert('This exercise is not in your program!');
    }
    else{
      alert('You have successfully logged your exercise!');
      setModalVis(false);
      await UserObject.logUserExercise(propName.currentUser.username, id, setsText, repsText, weightText, commentsText, getCurrentDate(), propName.currentUser.password);
    }
  }

  var testGraphData = [
    { x: "May", y: 215 },
    { x: "June", y: 245 },
    { x: "July", y: 265 },
    { x: "August", y: 300 },
    { x: "September", y: 315 },
    { x: "October", y: 330 },
  ];


  return (
    <View style={styles.container}>

        <View style={styles.header}>
            <View style={{ marginLeft:12}}>
              <Text style={{marginTop: 15,color: 'white', fontSize:30, fontFamily:"Georgia"}}>Welcome</Text>
            </View>
            <View style={{ marginRight:10}}>
            <DateTime current={data.current} timezone={data.timezone} />
            </View>
          
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalVis(true)} style ={styles.Wrapper1}>
          <TextItem  style={{backgroundColor:'rgba(52, 52, 52, 0)', textAlign:'center', color:'white', marginTop: 5}}> Dropdown  </TextItem>
          </TouchableOpacity>
            
          </View>

        <View style={styles.graph}>
          <PureChart data={testGraphData} type="line"  height={250} />
          
          <View>
          <TouchableOpacity onPress={() => setModalVis(true)} style ={styles.Wrapper1}>
          <TextItem  style={{backgroundColor:'rgba(52, 52, 52, 0)', textAlign:'center', color:'white', marginTop: 5}}> Log Exercises  </TextItem>
          </TouchableOpacity>
          </View>
        </View>
        <TimerComponent/>


      <Modal transparent visible={modalVis}>
            <View style={styles.exerciseModalBackground}>
                  <View>
                    <Text style={styles.modalHeader}>
                        Log Workout
                    </Text>
                </View>
                <View style={[styles.exerciseModalContainer]}>
                    <Text style={styles.modalFieldLabels}>
                        Exercise:
                    </Text>
                    <TextInput name='exercise' style={styles.modalFieldInputs} onChangeText={newText => setExercise(newText)}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Weight Used:
                    </Text>
                    <TextInput name='weight' style={styles.modalFieldInputs} onChangeText={newText => setWeight(newText)}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels} >
                        Sets Completed:
                    </Text>
                    <TextInput name='sets' style={styles.modalFieldInputs} onChangeText={newText => setSets(newText)}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Reps Completed:
                    </Text>
                    <TextInput name='reps' style={styles.modalFieldInputs} onChangeText={newText => setReps(newText)}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Comments:
                    </Text>
                    <TextInput name='comments' style={styles.commentFieldInputs} multiline={true} onChangeText={newText => setComments(newText)}>
                    </TextInput>
                    <TouchableOpacity onPress={() => setModalVis(false) }>
                        <View style={styles.addWrapper2}>
                            <Text style={styles.addButtonText}>x</Text>
                        </View>
                 </TouchableOpacity> 
                 <TouchableOpacity onPress={() => logExercise()}>
                        <View style={styles.addWrapper2} >
                            <Text style={styles.addButtonText}>Log</Text>
                        </View>
                 </TouchableOpacity>     

                </View>
            </View>
        </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00264D",
    justifyContent: "center",
    alignItems: "center",
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    fontFamily: 'Georgia',
    
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    
  },
  Wrapper1: {
    backgroundColor: "#DD7F4A",
    marginTop: 35,
    borderRadius: 10,
    height: 35,
    width: 200,
    
  },
  subheading: {
    fontSize: 25,
    color: "black",
    fontWeight: "300",
    fontFamily: "Georgia",
    marginBottom: 20,
  },
  graph: {
    flex: 0.8,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor:'rgba(52, 52, 52, 0)',
    marginTop: 10,
    alignItems: "center",
    
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
    height:'35%',
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

const TextItem = styled.Text`
  color: black;
  width: 270px;
  height: auto;
  font-size: 20px;
  justify-content: center;
  background-color: white;
  width: 100%
  shadowColor: white;
  shadowRadius: 1000px;
  fontFamily: Georgia;
`;

const Logo = styled.Text`
  color: black;
  width: auto;
  height: auto;
  font-size: 50px;
  font-weight: bold;
  borderColor: yellow;
  justify-content: space-between;
  textShadowColor: rgb(255,255,255);
  textShadowRadius: 3px
  fontFamily: Georgia;
`