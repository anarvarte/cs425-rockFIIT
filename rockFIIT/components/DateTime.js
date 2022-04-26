import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { YellowBox } from 'react-native-web';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const WorkoutItem = ({title, value, unit}) => {
    return(
        <View style={styles.workoutItem}>
            <Text style={styles.workoutItemTitle}>{title}</Text>
            <Text style={styles.workoutItemTitle}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({timezone}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + ' ' + months[month] + ' ' + date) 
        
        }, 1000);
    }, [])
    return (
        <View style={styles.container}>  
           <View>
               <View>
                   <Text style={styles.heading}>{time}</Text>
               </View>
               <View>
                   <Text style={styles.subheading}>{date}</Text>
               </View>
               
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between',
    },
    heading: {
        fontSize: 25,
        color:'black',
        fontWeight: 'bold',
        padding: 5,
        paddingLeft:120,
        
        textShadowColor: 'rgb(255,255,255)',
        textShadowRadius: 3,
        fontFamily: 'Georgia',
    },
    subheading: {
        fontSize: 15,
        color: 'black',
        paddingLeft:105,
        fontWeight: 'bold',
        textShadowColor: 'rgb(255,255,255)',
        textShadowRadius: 3,
        fontFamily: 'Georgia',
    },
    rightAlign: {
        textAlign:'right',
        marginTop: 20
    },
    timezone: {
        fontSize: 20,
        color:'black'
    },
    workoutItemContainer: {
        backgroundColor: "#18181b98",
        borderRadius: 10,
    }, 
    workoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    workoutItemTitle: {
        color:'#eee',
        fontSize: 14,
        fontWeight: '100',
        fontFamily: 'Georgia',
    }
})

export default DateTime
