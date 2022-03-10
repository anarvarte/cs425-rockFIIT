import React, {useEffect, useState} from "react";
import {Text, StyleSheet, Button, View, ScrollView, Image, TextInput, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

import '../assets/LogInScreenLogo.png';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import Tabs from '../navigation/tabs';
import SignUp from './SignUpScreen';
import { getActiveChildNavigationOptions } from "react-navigation";

import {useForm, Controller} from 'react-hook-form';
import {database} from '../components/Database';

const LogIn = ({navigation}) => {

    const {
        control, 
        watch,
        handleSubmit, 
        formState: {errors}
    } = useForm();

    var checkUserName = watch('username');
    var checkPassword = watch('password');
    
    async function checkIfUserExists(){
        var result = await database.getUserTable();
        for(var i = 0; i < result.rows.length ; i++){
            if((result.rows.item(i).userName == checkUserName) && (result.rows.item(i).password == checkPassword)){
                alert('You are a registered user!')
                navigation.navigate('Tabs');
                return 0;
            }
        }
        alert('Invalid Username and Password!');
    }
   
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
                        text="Forgot Password"
                        onPress={onForgotPasswordPressed}
                        type="Tertiary"
                    /> 

                    <CustomButton
                        text="Create New Account"
                        onPress={navigateSignUp}
                        type="Tertiary"
                    />  

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
        backgroundColor:'#C6B8C1',
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
        backgroundColor:'#C6B8C1',
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
        color:'black',
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