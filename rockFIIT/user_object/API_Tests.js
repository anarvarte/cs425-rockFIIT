//File used for testing the GET, POST, and FETCH requests to the API from the frontend.

function exercisesTest(){
    var exerciseList = []
    fetch('https://RockFIIT-DB-Test.cybern.repl.co/exercises').then(response => response.json().then(data => {
        setExerciseObjectList(data.data);
      }))
    
    console.log(exerciseObjectList);
}

function logExercisesTest(){
    const newData = 
    {
        userName: 'NewUser3@gmail.com',
        exerciseID: 3,
        setsCompleted: 4,
        repsCompleted: 12,
        weight: 225,
        notes:'Burned out',
        date: '4/17/22',
        password:'gamer775',
    };

fetch('http://192.168.1.192:5000/logActivity', {
    method: 'POST',
    headers: {
        'Accept': 'application/json;',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(newData)
}).then(response => response.json().then(data => {
    console.log(data.info);
}))
}

function addExerciseTest(){
    const newData = 
        {
            Category: 'Push',
            Exercises: 'Decline Bench Press',
            Description: 'test string',
            Sets: 4,
            Reps: 9,
            Link: '',
        };

    fetch('http://192.168.1.192:5000/addExercise', {
        method: 'POST',
        headers: {
            'Accept': 'application/json;',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newData)
    }).then(response => response.json().then(data => {
        console.log(data.info);
    }))

}

function getUserTest(){
    var userList = []
    fetch('https://servertesting.juancaridad.repl.co/userName').then(response => response.json().then(data => {
        setUserList(data.data);
      }))

    for(var i = 0; i < userNameList.length; i++){
        userList[i] = userNameList[i][0];
    }

    console.log(userList);
    console.log(userList.includes('NewUser1@gmail.com'));
}


function addNewUser(){
    const newData = 
    {
        userName: 'newtest@gmail.com',
        password: 'password',
        firstName: 'testname',
        weight: '',
    };

    fetch('http://192.168.1.192:5000/addUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json;',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newData)
    }).then(response => response.json().then(data => {
        console.log(data.info);
    }))
}

function userAuthenticate(){
    const userCredentials =
    {
        userName: 'NewUser3@gmail.com',
        password: 'gamer775',
    }; 
    fetch('http://192.168.1.192:5000/activities', {
        method: 'POST',
        headers: {
            'Accept': 'application/json;',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    }).then(response => response.json().then(data => {
        console.log(data.info);
    }))

}