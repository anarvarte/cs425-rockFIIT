import React from "react";
import {Text, StyleSheet, Button, View, ScrollView, Image, TextInput} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import '../assets/LogInScreenLogo.png';

const LogIn = ({navigation}) => {

    function navigate(){
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
                    Welcome Back!{'\n'}
                    &nbsp;&nbsp;&nbsp;Log In Below
                </Text>
                <View style={styles.logInForm}>
                    <TextInput
                        style={styles.logInInputFields}
                        placeholder={"Username / Email Address"}
                        placeholderTextColor={"white"}
                    /> 
                    <TextInput
                        style={styles.logInInputFields}
                        placeholder={"Password"}
                        placeholderTextColor={"white"}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.logInButton} onPress = {navigate}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>                      
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
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:18,
    }
})

export default LogIn