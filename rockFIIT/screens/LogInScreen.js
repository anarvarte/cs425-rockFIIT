import React, {useEffect, useState} from "react";
import {Text, StyleSheet, Button, View, ScrollView, Image, TextInput, Alert, Modal} from 'react-native';

import '../assets/LogInScreenLogo.png';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import {useForm} from 'react-hook-form';
import { UserObject } from "../user_object/UserObject";

const LogIn = ({navigation}) => {

    const[loading, setLoading] = useState(false);
    const[isVisible, setIsVisible] = useState(false);

    const {
        control, 
        watch,
        handleSubmit, 
        formState: {errors}
    } = useForm();

    var checkUserName = watch('username');
    var checkPassword = watch('password');

    function navigateSignUp(){
        navigation.navigate('SignUp');
    }

    function isLoading(){
        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 2000);
    }


    var currentUser = new UserObject.User();
    async function checkIfUserExists(){
        var userExists = await UserObject.userAuthenticate(checkUserName,checkPassword);
        if(userExists == 'false'){
            alert("Invalid Username or Password");
        }
        else{
            isLoading();
            currentUser.username = checkUserName;
            currentUser.password = checkPassword;
            currentUser.exercises = await UserObject.getUserLogs(checkUserName,checkPassword);
            currentUser.exerciseList = await UserObject.getExerciseList();
            
            alert("Welcome, " + currentUser.username);
            navigation.navigate('Tabs', {currentUser});
        }
    }
    
    return(

        <View style={styles.mainView}>
            
            <View style={styles.pageTop}>
                <Image 
                    source={require('../assets/LogInScreenLogo.png')}
                    style={styles.logoStyle}
                />
                <Text>
                    RockFIIT
                </Text>
            </View>

            <View style={styles.pageBottom}>
                <Text style={styles.logInHeading}>
                    RockFIIT{'\n'}
                    &nbsp;&nbsp;&nbsp;Log In
                </Text>
                <View style={styles.logInForm}>
                   <CustomInput
                        name="username"
                        placeholder="Username"
                        control={control}
                        rules={{required:'Username is required'}}
                    />
                    <CustomInput
                        name="password"
                        placeholder="Password"
                        control={control}
                        secureTextEntry={true}
                        rules={{required: 'Password is required'}}
                    />
                    <CustomButton
                        text="Log In"
                        onPress={handleSubmit(checkIfUserExists)}
                    />  
                    <CustomButton
                        style={{marginTop:50}}
                        text="Create New Account"
                        onPress={navigateSignUp}
                        type="Tertiary"
                    />

                </View>
            </View>

            <Modal transparent visible={isVisible}>
                <View style={styles.exerciseModalBackground}>
                    <Text style={styles.modalHeader}>Loading...</Text>
                </View>
            </Modal>
            
        </View>
    )
    }

const styles = StyleSheet.create({
    mainView:{
        marginTop:40,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00264D',
        
    },
    pageTop:{
        width:'100%',
        height:'32%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    pageBottom:{
        width:'100%',
        height:'68%',
        backgroundColor:'#00264D',
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        alignItems:'center',
    },
    textStyle:{
        color: '#fff',
        fontFamily: 'Georgia',
    },
    logoStyle:{
        width:'100%',
        resizeMode:'contain',
    },
    logInHeading:{
        color:'white',
        fontSize:32,
        fontWeight:'bold',
        justifyContent:'center',
        paddingTop:10,
        fontFamily: 'Georgia',
    },
    logInForm:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:45,
        
    },
    modalHeader:{
        fontFamily: 'Georgia',
        fontWeight: 'bold',
        fontSize: 28,
        color:"white",
    },
    exerciseModalBackground:{
        backgroundColor:'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseModalContainer:{
        width:'90%',
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:30,
        borderRadius:15,
        alignItems:'flex-start', 
        flexDirection:'row',
        flexWrap: 'wrap',
    },
})

export default LogIn