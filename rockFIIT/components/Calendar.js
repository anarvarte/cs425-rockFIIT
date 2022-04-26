import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { UserObject } from "../user_object/UserObject";

const timeToStr = (time) => {
  const date = new Date(time);

  return date.toISOString().split("T")[0];
};

function convertDate(time){
  const newDate = new Date(time);

  return newDate.toISOString().split("T")[0];
}

const Calendar: React.FC = () => {

  var exerciseLogs = UserObject.exerciseLogTest;
  const [items, setItems] = useState({});

  const testItem = {
      '2022-04-05' : [{name: 'test item', height: 50}],
      '2022-04-08' : [{name: 'test item', height: 50}],
      '2022-04-06' : [{name: 'test item', height: 50}],
      '2022-04-03' : [{name: 'test item', height: 50}],
      '2022-03-29' : [{name: 'test item', height: 50}],
  }

  console.log('converted date is: ' + convertDate('4/5/2022'));


  /*
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = 0 ; i < exerciseLogs.length ; i++){
        console.log(day);
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToStr(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: 50,
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
  */
 
  const loadItems = () => {
    setTimeout(() => {
      for (let i = 0 ; i < exerciseLogs.length ; i++){
        const time = exerciseLogs[i][7];
        const strTime = timeToStr(time);
        if (!items[strTime]) {
          items[strTime] = [];
          items[strTime].push({
            name: "Item for " + strTime,
            exercise: UserObject.getExerciseFromId(exerciseLogs[i][2]),
            setsCompleted: exerciseLogs[i][3],
            repsCompleted: exerciseLogs[i][4],
            weight: exerciseLogs[i][5],
            comments: exerciseLogs[i][6],
          });
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(testItem);
      console.log(items);
    }, 2000);
  };
  

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 25, height:80}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            > 
              <View>
                <Text></Text>
              </View>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        //selected={convertDate(exerciseLogs[0][7])}
        selected={exerciseLogs[0][7]}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({

})