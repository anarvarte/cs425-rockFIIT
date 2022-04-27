import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button, Modal} from "react-native";
import { Entypo } from "@expo/vector-icons";

import styled from "styled-components";


const DefaultExercise = ({exerciseName, sets, reps, weight, comments}) => {

    const [modalVal, setModalVal] = useState(false);
  return (
    <ComponentContainer>
        {
            <Modal transparent visible={modalVal}>
            <View style={styles.exerciseModalBackground}>
                <View style={[styles.exerciseModalContainer]}>
                    <Text style={styles.modalFieldLabels}>
                        Exercise:
                    </Text>
                    <Text style={styles.modalFieldContent}>
                        {exerciseName}
                    </Text>
                    <Text style={styles.modalFieldLabels}>
                        Sets: 
                    </Text>
                    <Text style={styles.modalFieldContent}>
                        {sets}
                    </Text>
                    <Text style={styles.modalFieldLabels}>
                        Reps: 
                    </Text>
                    <Text style={styles.modalFieldContent}>
                        {reps}
                    </Text>                    
                    <Text style={styles.commentFieldLabel}>
                        Comments: 
                    </Text>
                    <Text >
                        {comments}
                    </Text> 
                    <TouchableOpacity onPress={() => setModalVal(false) }>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addButtonText}>x</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        }
      <ListContainer>
        <CircleContainer>
          <TouchableOpacity>
            <Entypo name ="triangle-right" size={25} color="#DD7F4A" onPress={() => setModalVal(true)} />
            </TouchableOpacity>
          </CircleContainer>
        <View>
          <TextItem>{exerciseName}</TextItem>
        </View>
      </ListContainer>
    </ComponentContainer>
  );
}

export default DefaultExercise;

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
  height: 52px;
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
  addExerciseWrapper: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
},
addWrapper: {
    marginLeft:135,
    marginTop:40,
    width: 30,
    height: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    height:35,
    fontFamily: 'Georgia',
},
modalFieldContent:{
  width:'50%',
  fontSize: 18,
  height:35,
  fontFamily: 'Georgia',
},
commentFieldLabel:{
  width:'80%',
  fontSize: 16,
  fontWeight: 'bold',
  height:45,
  fontFamily: 'Georgia',
}
});
