import React, {useState, useEffect} from "react";
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomButton from "../components/CustomButton";
import { UserObject } from "../user_object/UserObject";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = ({ propName }) => {
    const navigation = useNavigation();
    const [passwordText, setPasswordText] = useState('');
    const [checkPasswordText, setCheckPasswordText] = useState('');

    const [isVisible, setIsVisible] = useState(false);

    async function saveNewPassword(){
        if(passwordText == ''){
            alert('Please enter your old password.');
        }
        else if(checkPasswordText == ''){
            alert('Please enter your new password.');
        }
        else if(passwordText == checkPasswordText){
            alert('You cannot use the same password.');
        }
        else if(passwordText != propName.currentUser.password ){
            alert('You have entered the wrong password.');
        }
        else{
            alert('You have successfully changed your password!');
            setIsVisible(false);
            await UserObject.changePassword(propName.currentUser.username, passwordText, checkPasswordText);
            navigation.navigate("LogIn");
            
        }
    }

    return (


        <View style={styles.container}>
            <Modal transparent visible={isVisible}>
                <View style={styles.exerciseModalBackground}>
                    <View style={[styles.exerciseModalContainer]}>
                    <Text style={styles.modalFieldLabels}>
                            Old Password
                        </Text>
                        <TextInput name='password' secureTextEntry={true} style={styles.modalFieldInputs} onChangeText={newText => setPasswordText(newText)}>
                        </TextInput>
                        <Text style={styles.modalFieldLabels}>
                            New Password
                        </Text>
                        <TextInput name='newPassword' secureTextEntry={true} style={styles.modalFieldInputs} onChangeText={newText => setCheckPasswordText(newText)}>
                        </TextInput>
                    <TouchableOpacity onPress={() => setIsVisible(false) }>
                            <View style={styles.addWrapper}>
                                <Text style={styles.addButtonText}>x</Text>
                            </View>
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={() => saveNewPassword() }>
                            <View style={styles.addWrapper}>
                                <Text style={styles.addButtonText}>Save</Text>
                            </View>
                    </TouchableOpacity>  
                    </View>
                </View>
            </Modal>

            <CustomButton
                text="Sign Out"
                onPress={() => navigation.navigate('LogIn')}
            />  
            <CustomButton
                text="Change Password"
                onPress={() => setIsVisible(true)}
            />  
            </View>
        

    );
};

export default SettingsScreen;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
  
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00264D",
    fontFamily: 'Georgia',
    color: 'black',
  },
  exerciseContainer:{
    marginTop:10,
},
addExerciseWrapper: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
},
addWrapper: {
    width: 90,
    height: 90,
    marginTop: 30,
    marginLeft:50,
    backgroundColor: '#00264D',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    
},
addWrapper2: {
  width: 45,
  height: 45,
  marginLeft:10,
  backgroundColor: 'white',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#C0C0C0',
  borderWidth: 1,
  
},
addButtonText:{
    fontSize: 20,
    color: 'white',
    
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
modalFieldLabels:{
  width:'50%',
  fontSize: 16,
  fontWeight: 'bold',
  height:35,
  fontFamily: 'Georgia',
},
modalFieldInputs:{
  width:'50%',
  fontSize: 18,
  fontWeight: 'bold',
  borderRadius: 7,
  backgroundColor: 'lightgray',
  paddingHorizontal:5,
  height:30,
  fontFamily: 'Georgia',
},
modalHeader:{
    fontWeight: 'bold',
    fontSize: 28,
    color:'white',
},
commentFieldInputs:{
  width:'50%',
  fontSize: 14,
  fontWeight: 'bold',
  borderRadius: 7,
  backgroundColor: 'lightgray',
  paddingHorizontal:5,
  height:70,
  fontFamily: 'Georgia',
  paddingTop:2,
  paddingBottom:2,
},
});
