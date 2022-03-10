import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Button, View, ScrollView, Image, TextInput} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import {useForm} from 'react-hook-form';
import * as SQLite from 'expo-sqlite';

import '../assets/LogInScreenLogo.png';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import LogIn from './LogInScreen';

import useDatabase from '../components/UseDatabase';
import {database} from '../components/Database';

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


const SignUp = ({navigation}) => {

    const {control, handleSubmit, watch} = useForm();

    var checkPassword = watch('password');
    var checkName = watch('fullname');
    var checkUserName = watch('username');
    var checkEmail = watch('emailaddress');

    async function checkExerciseTable(){
        var result = await database.getExerciseTable();
        console.log(result.rows);
    }
    async function checkUserTable(){
        var result = await database.getUserTable();
        console.log(result.rows);
    }

    async function addNewUser(){
        database.insertNewUserInfo(checkUserName, checkPassword, checkName);
        var result = await database.getUserValues();
        console.log('Amount of users after insertion is: ' + result.length);
        console.log('All of the users are: ' + result);
      };   

    async function onSignUpPressed(){
        var result = await database.getUserValues();
        if(result.includes(checkUserName)){
            alert('This username has already been registered with RockFIIT!');
        }
        else if(!result.includes(checkUserName)){
            addNewUser();
            alert('New Account Successfully Created!');
            navigateLogIn();
        }
    }

    const navigateLogIn = () =>{
        navigation.navigate('LogIn');
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New User?{'\n'}
                    Sign Up Below!
                </Text>
                <View style={styles.logInForm}>
                    <CustomInput
                        name="fullname"
                        control={control}
                        placeholder="Full Name"
                        rules={{required:'Full Name is required'}}
                        
                    />
                    <CustomInput
                        name="username"
                        control={control}
                        placeholder="Username"
                        rules={{
                            required:'Username is required',
                            minLength:{
                                value: 5,
                                message: 'Username should have a minimum of 5 characters',
                            },
                            maxLength:{
                                value: 32,
                                message: 'Username should have a maximum of 32 characters',
                            },
                        }}
                    />
                    <CustomInput
                         name="emailaddress"
                         control={control}
                         placeholder="Email Address"
                         rules={{
                             required:'Email Address is required',
                             pattern:{
                                 value: email_regex,
                                 message:'Please enter a valid email address'
                             },
                         }}
                    />
                    <CustomInput
                        name="password"
                        control={control}
                        placeholder="Password"
                        secureTextEntry={true}
                        rules={{
                            required:'Password is required',
                            minLength:{
                                value: 8,
                                message: 'Password should have a minimum of 8 characters',
                            }
                        }}
                    />
                    <CustomInput
                        name="confirmpassword"
                        control={control}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        rules={{
                            required:'Please confirm password',
                            validate: value => 
                                value == checkPassword || 'Password does not match',
                        }}
                    />
                    <CustomButton
                        text="Sign Up"
                        onPress={handleSubmit(onSignUpPressed)}
                    />  
                    <CustomButton
                        text="Check User Table"
                        onPress={checkUserTable}
                    />                                                                                        
                </View>

                <CustomButton
                        text="Already have an account?"
                        onPress={navigateLogIn}
                        type="Tertiary"
                    />  
            </View>
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
        backgroundColor:'#2B3D53',
    },
    pageTop:{
        width:'100%',
        height:'15%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    pageBottom:{
        width:'100%',
        height:'85%',
        backgroundColor:'#C6B8C1',
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        alignItems:'center',
    },
    textStyle:{
        color: '#fff',
    },
    logoStyle:{
        width:'100%',
        resizeMode:'contain',
    },
    logInHeading:{
        color:'black',
        fontSize:32,
        fontWeight:'bold',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20,
        fontFamily: 'Georgia',
    },
    logInForm:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:45,
    },
    logInInputFields:{
        width:'85%',
        borderWidth: 3,
        borderColor: 'white',
        height: 50,
        borderRadius:10,
        paddingLeft:10,
        marginTop:20,
        color:'white',
    },
    logInButton:{
        width:'85%',
        color:'#000',
        height:50,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:15,
    },
    logInButtonText:{
        fontWeight:'bold',
        fontSize:18,
        fontFamily: 'Georgia',
    }
})

export default SignUp