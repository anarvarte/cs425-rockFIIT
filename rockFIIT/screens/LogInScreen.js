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

const LogIn = ({navigation}) => {

    const {
        control, 
        handleSubmit, 
        formState: {errors}
    } = useForm();
    
    /*
    useEffect(() => {
        //createTable();
        //getData();
    }, []);
    */

    /*
    
   const createTable = () => {
       db.transaction((tx) =>{
           tx.executeSql(
               "CREATE TABLE IF NOT EXISTS" 
               +"Users "
               +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Password TEXT);"
           )
       })
   }
   

   const setData = async() => {
       if(username.length == 0 || password.length == 0){
           Alert.alert('Warning!', 'Please enter your username and password.')
       }
       else{
           try{
               await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "INSERT INTO Users (Name, Password) VALUES ('"+username+"', '"+password+"')"
                    )
               })
           } catch(error){
               console.log(error);
           }

       }
   }
   */
   
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
                        onPress={handleSubmit(onLogInPressed)}
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
        backgroundColor:'#2B3D53',
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
        backgroundColor:'#2B3D53',
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
        color:'#ffc107',
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