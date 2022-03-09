import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Modal, } from "react-native";
import styled from "styled-components";

export default function AddExercise({ submitHandler, navigation }) {
  const [value, setValue] = useState("");
  const [isVisible, setisVisible] = useState(false);

  const onChangeText = (text) => {
    setValue(text);
  };

  return (
    <ComponentContainer>
        {
            <Modal transparent visible={isVisible}>
            <View style={styles.exerciseModalBackground}>
                <View style={[styles.exerciseModalContainer]}>
                    <Text style={styles.modalFieldLabels}>
                        Sets: 
                    </Text>
                    <TextInput name='sets' style={styles.modalFieldInputs}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Reps: 
                    </Text>
                    <TextInput name='reps' style={styles.modalFieldInputs}>
                    </TextInput>
                    <Text style={styles.modalFieldLabels}>
                        Comments: 
                    </Text>
                    <TextInput name='comments' style={styles.modalFieldInputs}>
                    </TextInput>
                    <TouchableOpacity onPress={() => setisVisible(false) }>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addButtonText}>x</Text>
                        </View>
                 </TouchableOpacity>    
                </View>
            </View>
        </Modal>
        }
        <KeyboardAvoidingView style={styles.addExerciseWrapper}>
                <TouchableOpacity onPress={()=> setisVisible(true)}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addButtonText}>+</Text>
                    </View>
                 </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Tabs')}}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addButtonText}>x</Text>
                    </View>
                    </TouchableOpacity>            
            </KeyboardAvoidingView>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  
  
`;

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 180px;
  border-radius: 10px;
  
`;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    programScreenTitle:{
        fontSize: 24,
        fontWeight: 'bold',
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
        height:25,
    },
    modalFieldInputs:{
        width:'50%',
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: 10,
        backgroundColor: 'lightgray',
        paddingHorizontal:5,
        height:30,
    }
})