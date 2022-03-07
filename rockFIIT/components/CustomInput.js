import React from 'react';
import {View, Text, TextInput, StyleSheet } from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({control, name, placeholder, secureTextEntry, rules = {}}) =>{
    return(
        
            <Controller 
                control={control}
                name={name}
                rules={rules}
                render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View style={[styles.inputContainer, {borderColor: error ? 'red' : 'white'}]}>
                        <TextInput 
                        value={value} 
                        onChangeText={onChange} 
                        onBlur={onBlur} 
                        placeholder={placeholder}
                        style={[styles.input]}
                        placeholderTextColor={"lightgray"} 
                        secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style={{color: 'red'}}>{error.message || 'Error'}</Text>
                    )}
                    
                </>
                )}   
            />
        
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