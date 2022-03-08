import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, TextInput} from 'react-native';
import {useForm} from 'react-hook-form';

import Exercise from '../components/Exercise';
import CustomInput from '../components/CustomInput';


const ExerciseModal = ({visible, children}) => {

    const{watch} = useForm();

    var exerciseVar = watch('exercise');
    var exerciseVar = watch('exercise');
    var exerciseVar = watch('exercise');
    var exerciseVar = watch('exercise');
    

    const [showModal, setShowModal] = useState(false);
    
    return(
        <Modal transparent visible={true}>
            <View style={styles.exerciseModalBackground}>
                <View style={[styles.exerciseModalContainer]}>
                    <Text style={styles.modalFieldLabels}>
                        Exercise: 
                    </Text>
                    <TextInput name='exercise' style={styles.modalFieldInputs}>
                    </TextInput>
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
                        Day of Week: 
                    </Text>
                    <TextInput name='day' style={styles.modalFieldInputs}>
                    </TextInput>
                    <TouchableOpacity onPress={()=> setVisible(false)}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addButtonText}>X</Text>
                        </View>
                 </TouchableOpacity>    
                </View>
            </View>
        </Modal>
    );
};

const Program = ({navigation}) => {

    const[visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.programScreenTitle}>Program Title</Text>
            </View>
            <View style={styles.headerLine}><Text></Text></View>
            <View style={styles.exerciseContainer}>
                <Exercise text={'Back Squat'} day={'Wednesday'} />
                <Exercise text={'Walking DB Lunges'}/>
            </View>

            {/*<ExerciseModal visible={false}></ExerciseModal>*/}
            <KeyboardAvoidingView style={styles.addExerciseWrapper}>
                <TouchableOpacity onPress={()=> setVisible(true)}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addButtonText}>+</Text>
                    </View>
                 </TouchableOpacity>               
            </KeyboardAvoidingView>
        </View>
    );
}

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
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: 'lightblue',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addButtonText:{
        fontSize: 22,
        fontWeight: 'bold',
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

export default Program