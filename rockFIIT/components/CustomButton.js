import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type = "Primary"}) => {
    return(
        <Pressable 
            style={[styles.buttonContainer, styles['buttonContainer_' + type]]}
            onPress={onPress}>
                <Text style={[styles.buttonText, styles['buttonText_' + type]]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{

        width:'85%',
        padding:15,

        alignItems:'center',
        borderRadius: 10,
    },
    buttonContainer_Primary:{
        backgroundColor:'#DD7F4A',
        marginTop:30,
    },
    buttonContainer_Tertiary:{
        marginTop:10,
    },

    buttonText:{
        fontWeight:'bold',
        fontSize:18,
        fontFamily: 'Georgia',
    },
    buttonText_Primary:{
        color: 'white',
    },
    buttonText_Tertiary:{
        color:'white',
        fontSize:18,
    }
})

export default CustomButton;