import React, {useState, useEffect} from "react";
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
import CustomButton from "../components/CustomButton";
import { database } from "../components/Database";

const SettingsScreen = ({ navigation }) => {
  const [value, setValue] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [modalVal, setModalVal] = useState(false);
  const [exerciseArray, setExerciseArray] = useState(['DB Bench Press', 'Incline Bench Press', 'Back Squats', 'Walking Lunges', 'Weighted Pullups', 'Calf Raises', 'Military Press', 'Bicep Curls']);

function getExerciseList(){
      setExerciseArray(result);
  }

  const renderItem = ({ item } ) => (
    <TouchableOpacity onPress={() => {
      setValue(pressHandler(item));
    }} >
        <Text>{item}</Text>
    </TouchableOpacity>
);  

function setExerciseDetails(){
  alert('New exercise successfully saved!');
  setModalVal(false);
  exerciseArray[exerciseArray.length] = 'Hamstring Curls';
}

function signOut(){

}

  return (


        <View style={styles.container}>
                  <Modal transparent visible={modalVal}>
            <View style={styles.exerciseModalBackground}>
                <View style={[styles.exerciseModalContainer]}>
                    <Text style={styles.modalFieldLabels}>
                        Exercise Name:
                    </Text>
                    <TextInput name='date' style={styles.modalFieldInputs}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Reps: 
                    </Text>
                    <TextInput name='sets' style={styles.modalFieldInputs}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Sets:
                    </Text>
                    <TextInput name='reps' style={styles.modalFieldInputs}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Weight:
                    </Text>
                    <TextInput name='reps' style={styles.modalFieldInputs}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Comments:
                    </Text>
                    <TextInput name='comments' style={styles.commentFieldInputs} multiline={true}>
                    </TextInput>
                    <TouchableOpacity onPress={() => setModalVal(false) }>
                        <View style={styles.addWrapper2}>
                            <Text style={styles.addButtonText}>x</Text>
                        </View>
                 </TouchableOpacity> 
                 <TouchableOpacity onPress={() => setExerciseDetails() }>
                        <View style={styles.addWrapper2} >
                            <Text style={styles.addButtonText}>Add</Text>
                        </View>
                 </TouchableOpacity>     

                </View>
            </View>
        </Modal>
        <Modal transparent visible={isVisible}>
            <View style={styles.exerciseModalBackground}>
                <View>
                    <Text style={styles.modalHeader}>
                        Exercise List
                    </Text>
                </View>
                <View style={[styles.exerciseModalContainer]}>
                    <ScrollView>

                    </ScrollView>
                    {/*
                    <FlatList
                        data={exerciseArray}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item}
                        onPress={() => setisVisible(false)}
                         /> 
                     */}
                  <TouchableOpacity onPress={() => setisVisible(false) }>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addButtonText}>x</Text>
                        </View>
                 </TouchableOpacity>  
                </View>
            </View>
        </Modal>

            <CustomButton
                text="Sign Out"
                onPress={() => navigation.navigate('LogIn')}
            />  
            <CustomButton
                text="Change Password"
                onPress={() => navigation.navigate('LogIn')}
            />  
          </View>
      

  );
};

export default SettingsScreen;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6F93F5",
    fontFamily: 'Georgia',
    color: 'black',
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
addWrapper: {
    width: 30,
    height: 30,
    marginLeft:10,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    
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
