import React, {useEffect, useState} from "react";

class User {
    constructor(username, programs, exercises){
        this.username = username;
        this.programs = programs;
        this.exercises = exercises;
    }
};

let currentUser;

let currentUserName = 'test';

let programListTest = [
    ['PPL', 'DB Bench', 'Barbell Squats', 'DB Shoulder Press'],
    ['Strength', 'Walking DB Lunges', 'Max Hangs', 'Pull Ups'],
]
let exerciseListTest = [
    ['DB Bench', 5, 8, 'DB Bench Comment'],
    ['Barbell Squats', 4, 12, 'Barbell Squats Comment'],
    ['DB Shoulder Press', 4, 10, 'DB Shoulder Press Comment'],
    ['Walking Lunges', 5, 8, 'Walking Lunges Comment'],
]

function setCurrentUser(user, programs, exercises){
    currentUser = new User(user, programs, exercises);
}

function userAuthenticate(username, password){
    responseMsg = '';
    userLogs = [];
    const userCredentials =
    {
        userName: username,
        password: password,
    }; 
    fetch('https://servertesting.juancaridad.repl.co/activities', {
        method: 'POST',
        headers: {
            'Accept': 'application/json;',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    }).then(response => response.json().then(data => {
        responseMsg = data.info;
        userLogs = data.data;
        currentUserName = username;
    }))

    setTimeout(() => {
        console.log('the responseMsg variable is' + responseMsg);
        if (responseMsg == 'Successfully retrieved user activity logs'){
            exerciseList = userLogs;
            currentUserName = username;
        }
        else{
            currentUserName = 'fail';
        }
        
    }, 2000);

    setTimeout(() => {
        currentUser = new User(currentUserName, programListTest, exerciseListTest);
        console.log('the current username is ' + currentUser.username)
    }, 3000);

}

setCurrentUser(currentUserName, programListTest, exerciseListTest);

export const UserObject = {
    currentUser,
    userAuthenticate,
    setCurrentUser,
    User,
}