import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Exercise = (properties, day, sets, reps) => {
    return(
        <View style={styles.itemContainer}>
            <View style={styles.leftSide}>
                <TouchableOpacity style={styles.leftIcon}>
                    <Text style={styles.editItem}>=</Text>
                </TouchableOpacity>
                <Text style={styles.itemText}>{properties.text}</Text>
            </View>
            <View style={styles.rightIcon}></View>
        </View>


    )
}

const styles = StyleSheet.create({
    itemContainer:{
        width:'80%',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal:30,
    },
    leftSide:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    leftIcon:{
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
        alignItems:'center',
        paddingVertical:2,
    },
    itemText:{
        maxWidth: '80%',
        fontWeight:'bold',
    },
    rightIcon:{
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    editItem:{
        color:'black',
        fontWeight:'bold',
    },
    exerciseWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
});

export default Exercise;
