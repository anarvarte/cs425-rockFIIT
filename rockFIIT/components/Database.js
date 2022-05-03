import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('rockFIITLocalDb.db');

function getExerciseTable(){
    return new Promise((resolve) => {
        db.transaction(
            tx => {
            tx.executeSql(
                'SELECT * FROM exerciseLibrary;',
                [],
                (tx, results) =>{
                    
                    resolve(results);
                    return results;
                },
                (_, error) => { console.log("db error selecting from exercise tables"); console.log(error); reject(error) },
            );
        }
        );
    })
}

function getUserTable(){
    return new Promise((resolve) => {
        db.transaction(
            tx => {
            tx.executeSql(
                'SELECT * FROM userTable;',
                [],
                (tx, results) =>{
                    resolve(results);
                    return results;
                },
                (_, error) => { console.log("db error selecting from user tables"); console.log(error); reject(error)},
            );
        }
        );
    })
}

function getProgramTable(){
    return new Promise((resolve) => {
        db.transaction(
            tx => {
            tx.executeSql(
                'SELECT * FROM programTable;',
                [],
                (tx, results) =>{
                    resolve(results);
                    return results;
                    
                },
                (_, error) => { console.log("db error selecting from Program tables"); console.log(error); reject(error)},
            );
        }
        );
    })
}

function getUserValues(){
    return new Promise((resolve) => {
        db.transaction(
            tx => {
            tx.executeSql(
                'SELECT userName FROM userTable;',
                [],
                (tx, results) =>{
                    var userList = [];
                    for(var i = 0; i < results.rows.length; i++){
                        userList[i]= results.rows.item(i).userName;
                    }
                    resolve(userList);
                    return userList;
                    
                },
                (_, error) => { console.log("db error selecting from user tables"); console.log(error); reject(error) },
            );
        }
        );
    })
}

function getExerciseValues(){
    return new Promise((resolve) => {
        db.transaction(
            tx => {
            tx.executeSql(
                'SELECT exercise FROM exerciseLibrary;',
                [],
                (tx, results) =>{
                    var exerciseList = [];
                    for(var i = 0; i < results.rows.length; i++){
                        exerciseList[i]= results.rows.item(i).exercise;
                    }
                    resolve(exerciseList);
                    return exerciseList;
                    
                },
                (_, error) => { console.log("db error selecting from exercise table"); console.log(error); reject(error) },
            );
        }
        );
    })
}

function getCategoryValues(){
    return new Promise((resolve) => {
        db.transaction(
            tx => {
            tx.executeSql(
                'SELECT category FROM exerciseLibrary;',
                [],
                (tx, results) =>{
                    var categoryList = [];
                    for(var i = 0; i < results.rows.length; i++){
                        categoryList[i]= results.rows.item(i).category;
                    }
                    resolve(categoryList);
                    return categoryList;
                    
                },
                (_, error) => { console.log("db error selecting from exercise table"); console.log(error); reject(error) },
            );
        }
        );
    })
}

const insertNewUserInfo = (userName, password, firstName) => {
    db.transaction( tx => {
        tx.executeSql( 'INSERT into userTable (userName, password, firstName) values (?,?,?)', [userName, password, firstName] );
        },
        (t, error) => { console.log("db error insertUser"); console.log(error);},
        (t, success) => {console.log('insertUser success!')  }
    )
}

const insertUser = (userName) => {
    db.transaction( tx => {
        tx.executeSql( 'INSERT into userTable (userName) values (?)', [userName] );
        },
        (t, error) => { console.log("db error insertUser"); console.log(error);},
        (t, success) => {console.log('insertUser success!')  }
    )
}

const insertPassword = (password) => {
    db.transaction( tx => {
        tx.executeSql( 'INSERT into userTable (password) values (?)', [password] );
        },
        (t, error) => { console.log("db error insertPassword"); console.log(error);},
        (t, success) => {console.log('insertPassword success!')  }
    )
}

const insertName = (name) => {
    db.transaction( tx => {
        tx.executeSql( 'INSERT into userTable (firstName) values (?)', [name]);
        },
        (t, error) => { console.log("db error insertName"); console.log(error);},
        (t, success) => {console.log('insertPassword success!')  }
    )
}

const insertExercise = (exercise) => {
    db.transaction( tx => {
        tx.executeSql( 'INSERT into exerciseLibrary (exercise) values (?)', [exercise] );
        },
        (t, error) => { console.log("db error insertExercise"); console.log(error);},
        (t, success) => {console.log('insertExercise success!')  }
    )
}

const insertProgramName = (program) => {
    db.transaction( tx => {
        tx.executeSql( 'INSERT into programTable (programName) values (?)', [program] );
        },
        (t, error) => { console.log("db error insertProgram"); console.log(error);},
        (t, success) => {console.log('insertExercise success!')  }
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
          tx.executeSql(
            'DROP TABLE if exists programTable;',
            [],
            (_, result) => { resolve(result) },
            (_, error) => { console.log("error dropping program table"); reject(error)
            }
          );
      })
    })
  }
  
const setupDatabaseAsync = async () => {
return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE if not exists userTable (userName text, password text, firstName text, weight integer);'
        );
        tx.executeSql(
            'CREATE TABLE if not exists exerciseLibrary (exerciseID integer primary key not null, category text, exercise text, description text, sets integer, reps integer, time integer);'
        );
        tx.executeSql(
            'CREATE TABLE if not exists programTable (programID integer, programName text, exercise1 text, exercise2 text, exercise3 text, exercise4 text, exercise5 text, exercise6 text, exercise7 text, exercise8 text);'
        );
    },
    (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
    (_, success) => { resolve(success)}
    )
})
}

const setupUsersAsync = async (userList,exerciseList, programTable) => {
return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        for(var i = 0; i < userList.length; i++ ){
            tx.executeSql( 'INSERT into userTable (userName, password, firstName) values (?,?,?);', [userList[i][0], userList[i][1], userList[i][2]])
        };
        
        for(var i = 0; i < exerciseList.length; i++ ){
            tx.executeSql( 'INSERT into exerciseLibrary (exerciseID, category, exercise, sets, reps) values (?,?,?,?,?);', [i, exerciseList[i][1], exerciseList[i][0], exerciseList[i][2], exerciseList[i][3]]);
        };

        for(var i = 0; i < programTable.length; i++ ){
            tx.executeSql( 'INSERT into programTable (programID, programName, exercise1, exercise2, exercise3, exercise4, exercise5, exercise6, exercise7, exercise8) values (?,?,?,?,?,?,?,?,?,?);', [i, programTable[i][1], programTable[i][2], programTable[i][3], programTable[i][4], programTable[i][5], programTable[i][6], programTable[i][7], programTable[i][8], programTable[i][9]]);
        };
        
    },
    (t, error) => { console.log("db error setUpUsersAsync"); console.log(error); resolve() },
    (t, success) => { resolve(success)}
    )
})
}

export const database = {
    getUserValues,
    getExerciseValues,
    getCategoryValues,
    getExerciseTable,
    getProgramTable,
    getUserTable,
    insertNewUserInfo,
    insertUser,
    insertName,
    insertPassword,
    insertExercise,
    insertProgramName,
    setupDatabaseAsync,
    setupUsersAsync,
    dropDatabaseTablesAsync,
}