import React from 'react';
import {Text, StyleSheet, Button, View, ScrollView, Image, TextInput} from 'react-native';
import {useForm} from 'react-hook-form';

import '../assets/LogInScreenLogo.png';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { UserObject } from '../user_object/UserObject';

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const SignUp = ({navigation}) => {

    const {control, handleSubmit, watch} = useForm();

    var checkPassword = watch('password');
    var checkName = watch('fullname');
    var checkUserName = watch('username');
    var checkEmail = watch('emailaddress');
    
    const navigateLogIn = () =>{
        navigation.navigate('LogIn');
    }

    async function onSignUpPressed(){
        var isUser = await UserObject.addNewUser(checkEmail, checkPassword, checkName);
        if(isUser == 'false'){
            alert("This username is already registered with RockFIIT!");
        }
        else{
            alert("You have successfully made a new account!");
            navigateLogIn();
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New User?{'\n'}
                    Sign Up Below!
                </Text>
                <View style={styles.logInForm}>
                    <CustomInput
                        name="fullname"
                        control={control}
                        placeholder="Name"
                        rules={{required:'Name is required'}}
                        
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
        </View>

        <CustomButton
          text="Already have an account?"
          onPress={navigateLogIn}
          type="Tertiary"
        />
      </View>
    </View>
  );
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
        height:'15%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    pageBottom:{
        width:'100%',
        height:'85%',
        backgroundColor:'#00264D',
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
        color:'white',
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