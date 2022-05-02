import React, {useEffect, useState} from "react";

class User {
    constructor(username, password, programs, exercises, goals, exerciseList){
        this.username = username;
        this.passwword = password;
        this.programs = programs;
        this.exercises = exercises;
        this.goals = goals;
        this.exerciseList = exerciseList;
    }
};

const homeIP = 'http://192.168.1.192:5000'
const unrIP = 'http://172.27.32.199:5000'

//These lists were used for testing purposes.
let programListTest = [
    [1, 'NewUser3@gmail.com', 'PPL Split', 0, 2, 4, 9, 11],
    [2, 'NewUser3@gmail.com', 'Strength Program', 4, 1, 6, 3, 8],
    [3, 'NewUser3@gmail.com', 'V4 Climbing', 2, 12, 17, 18, 19],
]

let exerciseListTest = [
    ['DB Bench', 5, 8, 'DB Bench Comment'],
    ['Barbell Squats', 4, 12, 'Barbell Squats Comment'],
    ['DB Shoulder Press', 4, 10, 'DB Shoulder Press Comment'],
    ['Walking Lunges', 5, 8, 'Walking Lunges Comment'],
]

let exerciseLibrary = [];

let exerciseLogTest = [
    [1, 'NewUser3@gmail.com', 0, 3, 10, 225.0, 'Easy Work', '4/5/22'],
    [2, 'NewUser3@gmail.com', 4, 3, 10, 230.0, 'Easy Work', '4/8/22'],
    [3, 'NewUser3@gmail.com', 7, 3, 10, 235.0, 'Easy Work', '4/9/22'],
    [4, 'NewUser3@gmail.com', 8, 3, 10, 240.0, 'Easy Work', '4/12/22'],
    [5, 'NewUser3@gmail.com', 9, 3, 10, 245.0, 'Easy Work', '4/13/22'],
    [6, 'NewUser3@gmail.com', 1, 3, 10, 245.0, 'Easy Work', '4/14/22'],
];


let goalListTest = [
    [1, 'NewUser3@gmail.com', 'Gain 15 LBS', 1],
    [2, 'NewUser3@gmail.com', 'Bench 225 LBS', 0],
    [3, 'NewUser3@gmail.com', 'Increase Squat By 10 LBS', 1],
    [4, 'Test@gmail.com', 'Lose 30 LBS', 0],
]

function setCurrentUser(user, programs, exercises){
    currentUser = new User(user, programs, exercises);
    return currentUser;
}

async function addNewUser(username, password, name){
    var possibleError = '';
    return new Promise((resolve) => {
        const newData = 
        {
            userName: username,
            password: password,
            firstName: name,
            weight: '',
        };
        fetch(unrIP + '/addUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        }).then(response => response.json().then(data => {
            possibleError = data.info;

        }))
        setTimeout(() => {
            console.log('requestMSG is ' + possibleError);
            if(possibleError == 'duplicate user'){
                resolve('false');
            }
            else{
                resolve('true');
            }
        }, 800);
    })

}

async function userAuthenticate(username, password){
    var responseMsg = '';
    return new Promise((resolve) => {
        const userCredentials =
        {
            userName: username,
            password: password,
        }; 
        fetch(unrIP + '/activities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            responseMsg = data.info;
        }))
        
        setTimeout(() => {
            if (responseMsg == 'Successfully retrieved user activity logs'){
                resolve('true');
            }
            else{
                resolve('false');
            }
        }, 800);
    })
}

async function changePassword(username, oldPass, newPass){
    return new Promise(() => {
        const userCredentials =
        {
            userName: username,
            oldPwd: oldPass,
            newPwd: newPass,
        }; 
        fetch(unrIP + '/changePassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            console.log(data.info);
        }))
    })
}

async function getExerciseList(){
    var exerciseList = [];
    return new Promise((resolve) => {
        fetch(unrIP + '/exercises').then(response => response.json().then(data => {
            exerciseList = data.data;
          }))
          setTimeout(() => {
            resolve(exerciseList);
        }, 800);
    })
}

async function getUserLogs(username,password){
    var userLogs = [];
    return new Promise((resolve) => {
        const userCredentials =
        {
            userName: username,
            password: password,
        }; 
        fetch(unrIP + '/activities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            userLogs = data.data;
        }))

        setTimeout(() => {
            resolve(userLogs);
        }, 800);
    })
}

async function getDefaultPrograms(){
    var programList = {};
    return new Promise((resolve) => {
        fetch(unrIP + '/getProgram').then(response => response.json().then(data => {
            programList = data.data;
          }))
          setTimeout(() => {
            resolve(programList);
        }, 800);
    })
}

async function getUserPrograms(username,password){
    var programData = {};
    return new Promise((resolve) => {
        const userCredentials =
        {
            userName: username,
            password: password,
        }; 
        fetch(unrIP + '/programs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            programData = data.data;
        }))
        setTimeout(() => {
            resolve(programData);
        }, 800);
    })
}

async function getUserGoals(username,password){
    var userGoals = [];
    return new Promise((resolve) => {
        const userCredentials =
        {
            userName: username,
            password: password,
        }; 
        fetch(unrIP + '/goals', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            userGoals = data.data;
        }))
        setTimeout(() => {
            resolve(userGoals);
        }, 800);
    })
}

async function addUserProgram(username, program, e1, e2, e3, e4, e5, password){
    return new Promise(() => {
        const userCredentials =
        {
            userName: username,
            programName: program,
            exercise1 : e1,
            exercise2 : e2,
            exercise3 : e3,
            exercise4 : e4,
            exercise5 : e5,
            password: password,
        }; 
        fetch(unrIP + '/addProgram', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            console.log(data.info);
        }))
    })
}

async function addUserGoals(username, password, exercise, weight){
    return new Promise(() => {
        const userCredentials =
        {
            userName: username,
            exerciseGoal : exercise,
            weightGoal : weight,
            completed : 0,
            date : '',
            password : password,
        }; 
        fetch(unrIP + '/addGoal', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            console.log(data);
        }))
    })
}

async function updateUserGoal(username, password, exercise, weight){
    return new Promise(() => {
        const userCredentials =
        {
            userName: username,
            exerciseGoal : exercise,
            weightGoal : weight,
            completed : 1,
            password : password,
        }; 
        fetch(unrIP + '/updateGoal', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json().then(data => {
            console.log(data);
        }))
    })
}

async function logUserExercise(username, id, sets, reps, weight, notes, date, password){
    return new Promise(() => {
        const newData = 
        {
            userName: username,
            exerciseID: id,
            setsCompleted: sets,
            repsCompleted: reps,
            weight: weight,
            notes: notes,
            date: date,
            password: password,
        };
        fetch(unrIP + '/logActivity', {
            method: 'POST',
            headers: {
                'Accept': 'application/json;',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        }).then(response => response.json().then(data => {
            console.log(data.info);
        }))
    })
}

async function loadExerciseLibrary(){
    exerciseLibrary = await getExerciseList();
    return exerciseLibrary;
}

loadExerciseLibrary();

function getExerciseFromId(id){
    for(var i = 0; i < exerciseLibrary.length ; i++){
        if(id == exerciseLibrary[i][0]){
            return exerciseLibrary[i];
        }
    }
}

function getExerciseNameFromId(id){
    for(var i = 0; i < exerciseLibrary.length ; i++){
        if(id == exerciseLibrary[i][0]){
            return exerciseLibrary[i][2];
        }
    }
}

function getIdFromExercise(exercise){
    for(var i = 0; i < exerciseLibrary.length ; i++){
        if(exercise == exerciseLibrary[i][2]){
            return exerciseLibrary[i][0];
        }
    }
    return 'false';
}

export var UserObject = {
    addNewUser,
    userAuthenticate,
    changePassword,
    getExerciseList,
    getUserLogs,
    getDefaultPrograms,
    getUserPrograms,
    getUserGoals,
    addUserProgram,
    addUserGoals,
    updateUserGoal,
    logUserExercise,
    setCurrentUser,
    getExerciseFromId,
    getExerciseNameFromId,
    getIdFromExercise,
    loadExerciseLibrary,
    User,
    programListTest,
    exerciseListTest,
    exerciseLogTest,
    goalListTest,
    exerciseLibrary,
}