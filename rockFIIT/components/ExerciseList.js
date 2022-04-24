import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button, Modal, TextInput} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";

const ExerciseList = ({ item, deleteItem , navigation }) => {

    const [modalVal, setmodalVal] = useState(false);

    function setExerciseDetails(){
      alert('Exercise details successfully saved!');
      setmodalVal(false);
    }
  return (
    <ComponentContainer>
        {
            <Modal transparent visible={modalVal}>
            <View style={styles.exerciseModalBackground}>
                <View style={[styles.exerciseModalContainer]}>
                    <Text style={styles.modalFieldLabels}>
                        Sets:
                    </Text>
                    <TextInput name='date' style={styles.modalFieldInputs}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Reps:
                    </Text>
                    <TextInput name='sets' style={styles.modalFieldInputs}>
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
                    <TouchableOpacity onPress={() => setmodalVal(false) }>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addButtonText}>x</Text>
                        </View>
                 </TouchableOpacity> 
                 <TouchableOpacity onPress={() => setExerciseDetails() }>
                        <View style={styles.addWrapper} >
                            <Text style={styles.addButtonText}>Add</Text>
                        </View>
                 </TouchableOpacity>     

                </View>
            </View>
        </Modal>
        }
      <ListContainer>
        <CircleContainer>
          <TouchableOpacity>
            <Entypo name ="triangle-right" size={25} color="#DD7F4A" onPress={() => setmodalVal(true)} />
            </TouchableOpacity>
          </CircleContainer>
        <View>
          <TextItem>{item.vralue}</TextItem>
        </View>

        <View style={styles.button}>
          <MaterialIcons name="delete" size={22} onPress={() => deleteItem(item.key)} />
        </View>
      </ListContainer>
    </ComponentContainer>
  );
}

export default ExerciseList;

const HeaderText = styled.Text`
  color: white;
  
  font-size: 30px;
`;

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  border-radius: 15px;
  flex-direction: row;
`;

const CircleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 10px;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  margin-top: 10px;
`;

const TextItem = styled.Text`
  color: black;
  width: 270px;
  height: auto;
  font-size: 20px;
  margin-right: 5px;
  margin-left: 10px;
  justify-content: center;
  margin-top: 12px;
  fontFamily: Georgia;
`;
//  font-family: poppins-regular;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    
  },
  button: {
    paddingRight: 150,
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
programScreenTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Georgia',
},
headerWrapper: {
    marginTop:80,
    paddingHorizontal: 16,
    alignItems:'center',
},
headerLine: {
    borderTopWidth: .5,
    borderBottomColor: 'black',
    marginTop: 15,
    marginHorizontal: 15,
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
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginLeft: 50,
    marginTop: 20,
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
