import React, {useState} from "react";
import {Text, StyleSheet, Button, View, ScrollView, Image, TextInput} from 'react-native';

import '../assets/LogInScreenLogo.png';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import Tabs from '../navigation/tabs';
import SignUp from './SignUpScreen';

const LogIn = ({navigation}) => {

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const onLogInPressed = () => {
        navigation.navigate('Tabs');
    };

    const onForgotPasswordPressed = () => {
        console.warn("FORGOT PASSWORD");
    };


    function navigateTabs(){
        navigation.navigate('Tabs');
    }

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
                        placeholder="Username"
                        value={username}
                        setValue={setUsername}

                    />
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true}
                    />
                    <CustomButton
                        text="Log In"
                        onPress={onLogInPressed}
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