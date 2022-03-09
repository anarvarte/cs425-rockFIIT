import React from 'react';

import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset';

const db = SQLite.openDatabase('rockFIITversion2.db');

/*
function getUsers(){
    db.transaction(
        tx => {
        tx.executeSql(
            'SELECT exercise FROM exerciseLibrary',
            [],
            (tx, results) =>{
                var parName = results.rows.item(7).exercise;
                console.log('name is ' + parName);
                //return parName;
                
            },
            (t, error) => { console.log("db error getUsers"); console.log(error);},
        );
    }
    );
}
*/

function getExerciseValues(){
    return new Promise((resolve) => {
        db.transaction(
            tx => {
            tx.executeSql(
                'SELECT exercise FROM exerciseLibrary;',
                [],
                (tx, results) =>{
                    var exerciseList = [];
                    for(var i = 0; i < 18; i++){
                        exerciseList[i]= results.rows.item(i).exercise;
                    }
                    resolve(exerciseList);
                    return exerciseList;
                    
                },
                (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
            );
        }
        );
    })
}

const insertUser = (userName, successFunc) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into userTable (userName) values (?)', [userName] );
        },
        (t, error) => { console.log("db error insertUser"); console.log(error);},
        (t, success) => { successFunc() }
    )
}

const dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE if exists exerciseLibrary;',
          [],
          (_, result) => { resolve(result) },
          (_, error) => { console.log("error dropping users table"); reject(error)
          }
        );
        tx.executeSql(
            'DROP TABLE if exists userTable;',
            [],
            (_, result) => { resolve(result) },
            (_, error) => { console.log("error dropping users table"); reject(error)
            }
          );
      })
    })
  }
  
const setupDatabaseAsync = async () => {
return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE if not exists userTable (id integer primary key not null, userName text, password text);'
        );
        tx.executeSql(
            'CREATE TABLE if not exists exerciseLibrary (exerciseID integer primary key not null, category text, exercise text, sets integer, reps integer);'
        );
    },
    (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
    (_, success) => { resolve(success)}
    )
})
}

const setupUsersAsync = async (userList,exerciseList) => {
return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        for(var i = 0; i < userList.length; i++ ){
            tx.executeSql( 'INSERT into userTable (id, userName, password) values (?,?,?);', [i, userList[i], "password"])
        };
        
        for(var i = 0; i < exerciseList.length; i++ ){
            tx.executeSql( 'INSERT into exerciseLibrary (exerciseID, category, exercise, sets, reps) values (?,?,?,?,?);', [i, 'Test-Category', exerciseList[i], 4, 10]);
        };
        
    },
    (t, error) => { console.log("db error setUpUsersAsync"); console.log(error); resolve() },
    (t, success) => { resolve(success)}
    )
})
}

export const database = {
    getExerciseValues,
    insertUser,
    setupDatabaseAsync,
    setupUsersAsync,
    dropDatabaseTablesAsync,
}