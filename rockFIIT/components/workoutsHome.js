import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native'

const WorkoutScroll = ({workoutData}) => {
    return (
        <ScrollView horizontal={true} style={styles.scrollView}>
            <Text> "hello" </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex:0.4,
        backgroundColor: '#25374bcd',
        padding:30
    },
    image: {
        width: 150,
        height: 150
    },
    currentTempContainer: {
        flexDirection: 'row',
        backgroundColor: '#00000033',
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        borderColor:'#eee',
        borderWidth:1,
        padding: 15
    },
    day: {
        fontSize: 20,
        color:"black",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },
    
    otherContainer: {
        paddingRight: 40
    }
})

export default WorkoutScroll
