import {useState} from "react";

var api_host = 'http://172.27.210.212:5000/exercises';

const [exerciseObjectList, setExerciseObjectList] = useState([]);

function getExercises(){
      fetch('http://192.168.1.192:5000/exercises').then(response => response.json().then(data => {
        setExerciseObjectList(data.data);
        for(var i = 0; i < data.data.length ; i++){
          exerciseObjectList[i] = data.data[i];
        }
      }))
}

export const reactAPI = {
    exerciseObjectList,
}