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

        width:'50%',
        padding:15,

        alignItems:'center',
        borderRadius: 10,
    },
    buttonContainer_Primary:{
        backgroundColor:'#ffc107',
        marginTop:20,
    },
    buttonContainer_Tertiary:{
        marginTop:10,
    },

    buttonText:{
        fontWeight:'bold',
        fontSize:18,
    },
    buttonText_Primary:{

    },
    buttonText_Tertiary:{
        color:'lightgray',
        fontSize:14,
    }
})

export default CustomButton;