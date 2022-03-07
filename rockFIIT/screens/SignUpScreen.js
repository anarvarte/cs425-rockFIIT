import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Button, View, ScrollView, Image, TextInput} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import {useForm} from 'react-hook-form';
import * as SQLite from 'expo-sqlite';

import '../assets/LogInScreenLogo.png';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import LogIn from './LogInScreen';

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

const db = SQLite.openDatabase(
    {
        name:'rockFIITversion2',
        location:'default',
    },
    () => {},
    error => {console.log('openDB error')}
);

const SignUp = ({navigation}) => {

    const {control, handleSubmit, watch} = useForm();

    var testUser;
    var testPass;

    var checkPassword = watch('password');
    var checkName = watch('fullname');
    var checkUserName = watch('username');
    var checkEmail = watch('emailaddress');

    useEffect(() => {
        createTable();
        getData();
    }, []);

    const createTable = () => {
        try{
            db.transaction((tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS "
                    + "userTable "
                    + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT, password TEXT);"
                )
            })
        } catch(error){
            console.log('createTable error')
        }
    }

    const getData = () => {
        try {
            // AsyncStorage.getItem('UserData')
            //     .then(value => {
            //         if (value != null) {
            //             navigation.navigate('Home');
            //         }
            //     })
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT userName, password FROM userTable",
                    [],
                    (tx, results) => {
                        testUser = results.rows.item(0).userName;
                        testPass = results.rows.item(0).password;
                    }
                )
            })
        } catch (error) {
            console.log('getData error');
        }
    }

    const setData = async () => {
        try {
            await db.transaction(async (tx) => {
                // await tx.executeSql(
                //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ")"
                // );
                await tx.executeSql(
                    "INSERT INTO userTable (userName, password) VALUES (?,?)",
                    [checkUserName, checkPassword]
                );
            })
        } catch (error) {
            console.log('setData error');
        }
    }

    const onSignUpPressed = (data)=>{
        //navigation.navigate('LogIn');
        createTable();
        setData();
        getData();
        console.log('Database user is' + testUser);
        console.log('Database pass is' + testPass);
        alert('New Account Successfully Created!');
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
                        placeholder="password"
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
        alignItems:'center',
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
    }
})

export default SignUp