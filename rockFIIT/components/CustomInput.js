import React from 'react';
import {View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) =>{
    return(
        <View style={styles.inputContainer}>
            <TextInput 
                value = {value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                placeholderTextColor={"lightgray"}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        backgroundColor: 'white',
        width:'85%',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
        paddingHorizontal:10,
        paddingVertical:10,
        marginTop: 10,
        height:50,
    },
    input:{
        fontSize:20,
    },
})

export default CustomInput;