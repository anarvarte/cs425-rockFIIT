import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native'
import styled from "styled-components";
import TimerComponent from "./TimerComponent";

const WorkoutScroll = ({ workoutData }) => {
  return (
    <ScrollView horizontal={true} style={styles.scrollView}>

      <TimerComponent />


      <ListContainer>
        <View>
        <TextItem> Barbell Bench Press{'\n'} 4 sets, 10 reps, 225 LBS</TextItem>
        </View>
      </ListContainer>
      <ListContainer>
        <View>
          <TextItem> Cable Tricep Pulldowns{'\n'} 4 sets, 10 reps, 75 LBS</TextItem>
        </View>
      </ListContainer>
      <ListContainer>
        <View>
          <TextItem> Pull Ups{'\n'} 4 sets, 8 reps, Unweighted</TextItem>
        </View>
      </ListContainer>
      <ListContainer>
        <View>
          <TextItem> DB Bicep Curls{'\n'} 4 sets, 12 reps, 25 LBS</TextItem>
        </View>
      </ListContainer>

    </ScrollView>
  );
};

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
    itemContainer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius:10,
        borderColor:"#eee",
        borderWidth:1,
        padding: 20,
        marginLeft: 10
    }, 
    day: {
        fontSize: 20,
        color:"black",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15,
        fontFamily: 'Georgia',
    },
    
    otherContainer: {
        paddingRight: 40
    },

})

const TextItem = styled.Text`
  color: black;
  width: 270px;
  height: auto;
  font-size: 20px;
  margin-right: 5px;
  margin-left: 10px;
  justify-content: center;
  margin-top: 12px;
  fontFamily: Georgia;
`;

const ListContainer = styled.TouchableOpacity`
  background-color: rgb(255,255,255);
  height: 100px;
  width: 300px;
  border-radius: 15px;
  flex-direction: row;
  padding: 10px;
  margin-right: 10px;
`;


export default WorkoutScroll
