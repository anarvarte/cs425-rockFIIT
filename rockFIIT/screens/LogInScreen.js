import React, {useEffect, useState} from "react";
import {Text, StyleSheet, Button, View, ScrollView, Image, TextInput, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

import '../assets/LogInScreenLogo.png';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import Tabs from '../navigation/tabs';
import SignUp from './SignUpScreen';

import {useForm, Controller} from 'react-hook-form';
import {database} from '../components/Database';
import { UserObject } from "../user_object/UserObject";

const LogIn = ({navigation}) => {

    const {
        control, 
        watch,
        handleSubmit, 
        formState: {errors}
    } = useForm();

    var checkUserName = watch('username');
    var checkPassword = watch('password');
    
   
    const onLogInPressed = (data) => {
        console.log(data);
        navigation.navigate('Tabs');
    };

    const onForgotPasswordPressed = () => {
        console.warn("FORGOT PASSWORD");
    };

    function navigateSignUp(){
        navigation.navigate('SignUp');
    }

    function navigateTabs(){
        var currentUser = new UserObject.User();
        navigation.navigate('Tabs', {currentUser});
    }

    /*
    function exercisesTest(){
        var exerciseList = reactAPI.getExerciseList();
        console.log(exerciseList);
    }
    */
    
    
    const [exerciseObjectList, setExerciseObjectList] = useState([]);
    const [userNameList, setUserList] = useState([]);

    
    function exercisesTest(){
        var exerciseList = []
        fetch('https://RockFIIT-DB-Test.cybern.repl.co/exercises').then(response => response.json().then(data => {
            setExerciseObjectList(data.data);
          }))
        
        /*
        for(var i = 0; i < exerciseObjectList.length; i++){
            exerciseList[i] = exerciseObjectList[i];
        }
        */
        
        //console.log(exerciseObjectList);
        console.log(exerciseObjectList);
    }

    function logExercisesTest(){
        const newData = 
        {
            userName: 'NewUser3@gmail.com',
            exerciseID: 3,
            setsCompleted: 4,
            repsCompleted: 12,
            weight: 225,
            notes:'Burned out',
            date: '4/17/22',
            password:'gamer775',
        };

    fetch('http://192.168.1.192:5000/logActivity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json;',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newData)
    }).then(response => response.json().then(data => {
        console.log(data.info);
    }))
}

    function addExerciseTest(){
        const newData = 
            {
                Category: 'Push',
                Exercises: 'Decline Bench Press',
                Description: 'test string',
                Sets: 4,
                Reps: 9,
                Link: '',
            };

        fetch('http://192.168.1.192:5000/addExercise', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        }).then(response => response.json().then(data => {
            console.log(data.info);
        }))

    }
    
    function getUserTest(){
        var userList = []
        fetch('https://servertesting.juancaridad.repl.co/userName').then(response => response.json().then(data => {
            setUserList(data.data);
          }))
    
        for(var i = 0; i < userNameList.length; i++){
            userList[i] = userNameList[i][0];
        }
    
        console.log(userList);
        console.log(userList.includes('NewUser1@gmail.com'));
    }

    
    function addNewUser(){
        const newData = 
        {
            userName: 'newtest@gmail.com',
            password: 'password',
            firstName: 'testname',
            weight: '',
        };

        fetch('http://192.168.1.192:5000/addUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        }).then(response => response.json().then(data => {
            console.log(data.info);
        }))
    }

    function userAuthenticate(){
        const userCredentials =
        {
            userName: 'NewUser3@gmail.com',
            password: 'gamer775',
        }; 
        fetch('http://192.168.1.192:5000/activities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            console.log(data.info);
        }))
    
    }


    

    async function checkIfUserExists(){
        var userExists = await UserObject.userAuthenticate(checkUserName,checkPassword);
        console.log(userExists);
        //console.log('userExists is  ' + userExists);
        if(userExists == 'false'){
            alert("Invalid Username or Password");
        }
        else{
            currentUser.username = checkUserName;
            currentUser.password = checkPassword;
            currentUser.exercises = await UserObject.getUserLogs(checkUserName,checkPassword);
            //currentUser.programs = await UserObject.getUserPrograms(checkUserName, checkPassword);
            //currentUser.programs = UserObject.programListTest;
            //currentUser.goals = await UserObject.getUserGoals(checkUserName, checkPassword);
            currentUser.exerciseList = await UserObject.getExerciseList();

            /*
            console.log('The users username is ' + currentUser.username);
            console.log('The users exercises are ' +currentUser.exercises);
            console.log('The users programs are ' +currentUser.programs);
            console.log('The users goals are ' + currentUser.goals);
            */

            //console.log(currentUser);
            
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
                        //onPress={handleSubmit(checkIfUserExists)}
                        onPress={handleSubmit(navigateTabs)}
                    />  
                    <CustomButton
                        text="Create New Account"
                        onPress={navigateSignUp}
                        type="Tertiary"
                    />
                    {/*
                    <CustomButton
                        text="User Object Test"
                        onPress={userObjectTest}
                        type="Tertiary"
                    />  
                     */}
                    {/*
                    <CustomButton
                        text="Forgot Password"
                        onPress={onForgotPasswordPressed}
                        type="Tertiary"
                    /> 
                    */}  
                    {/*
                    <CustomButton
                        text="Add User Test"
                        onPress={addNewUser}
                        type="Tertiary"
                    /> 
                    */} 
                    {
                    <CustomButton
                        text="Fetch Exercises Test"
                        onPress={exercisesTest}
                        type="Tertiary"
                    />
                    } 
                    <CustomButton
                        text="Log Exercise Test"
                        onPress={logExercisesTest}
                        type="Tertiary"
                    />
                    {/*
                    <CustomButton
                        text="Post Exercises Test"
                        onPress={addExerciseTest}
                        type="Tertiary"
                    />  
                    */}
                    {/*
                    <CustomButton
                        text="Activities Test"
                        onPress={userAuthenticate}
                        type="Tertiary"
                    />  
                */}
                    {/*
                    <CustomButton
                        text="Get Users Test"
                        onPress={getUserTest}
                        type="Tertiary"
                    />  
                    */} 

                </View>
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
})

export default LogIn