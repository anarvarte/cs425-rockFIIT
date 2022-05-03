import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { UserObject } from "../user_object/UserObject";

const timeToStr = (time) => {
  const date = new Date(time);

  return date.toISOString().split("T")[0];
};

const Calendar = ({navigation, propName}) => {

  const [items, setItems] = useState({});
  var userLogs = propName.currentUser.exercises;

  async function loadItems(){
    setTimeout(() => {
      for (let i = 0 ; i < userLogs.length ; i++){
        const exerciseName = UserObject.getExerciseNameFromId(userLogs[i][2]);
        const time = userLogs[i][7];
        const strTime = timeToStr(time);
        if (!items[strTime]) {
          items[strTime] = [];
          items[strTime].push({
            name: {
              exercise: exerciseName,
              setsCompleted: userLogs[i][3],
              repsCompleted: userLogs[i][4],
              weight: userLogs[i][5],
              comments: userLogs[i][6],
            }
          });
        }else{
          items[strTime].push({
            name: {
              exercise: exerciseName,
              setsCompleted: userLogs[i][3],
              repsCompleted: userLogs[i][4],
              weight: userLogs[i][5],
              comments: userLogs[i][6],
            }
          })
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1500);
  };
  

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 20, marginTop: 25, height:100}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                
              }}
            > 
              <View style={{flex: .5}}>
                <Text style={{fontFamily: "Georgia", fontWeight: "bold"}}>{item.name.exercise}</Text>
                <Text style={{fontFamily: "Georgia"}}>Reps Done: {item.name.repsCompleted}</Text>
                <Text style={{fontFamily: "Georgia"}}>Sets Done: {item.name.setsCompleted}</Text>
                <Text style={{fontFamily: "Georgia"}}>Weight: {item.name.weight}</Text>
              </View>
              <View style={{flex: .5,flexDirection: "column", alignItems: "center"}}>
              <Text style={{fontFamily: "Georgia", textDecorationLine:'underline'}}>Comments:</Text>
              <Text style={{fontFamily: "Georgia"}}> {item.name.comments}</Text>
              </View>
              
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 , fontFamily: "Georgia"}}>
      <Agenda
        theme={{  
        dotColor: 'white',
        textSecondaryColor:"white",
        textDayHeaderFontFamily: "Georgia",
        dayTextColor:"white",
        indicatorColor: 'white',
        textDayFontFamily: "Georgia",
        textColor: "white",
        textSectionTitleColor: "white",
        monthTextColor: "white",
        calendarBackground: "#DD7F4A",
        selectedDayBackgroundColor: '#00264D', 
        selectedDayTextColor: "white"
        }}
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2022-04-05'}
        //selected = {userLogs[0][7]}
        renderItem={renderItem}
        renderEmptyDate={() => {
          return(
            <Card>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    
                  }}
                > 
                  <View style={{flex: .5}}>
                    <Text style={{fontFamily: "Georgia"}}>No Exercise Logged for Today!</Text>
                  </View>
                  
                </View>
              </Card.Content>
          </Card>
          )
        }}
      />
    
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({

})