import React, {useEffect} from "react";
import {database} from './Database';

const userList = [
    ['CyrilleUser', 'CyrillePass', 'Cyrille'], 
    ['AitorUser', 'AitorPass', 'Aitor'], 
    ['JuanUser', 'JuanPass', 'Juan'], 
    ['LouisUser', 'LouisPass', 'Louis'], 
    ['JuniorUser', 'JuniorPass', 'Junior']];
const exerciseTable = [
    ['Back Squats', 'Legs', 4, 10],
    ['Goblet Squats', 'Legs', 5, 5],
    ['KB Swing', 'Legs', 3, 20],
    ['RDL', 'Legs', 4, 8],
    ['Lunges', 'Legs', 3, 20],
    
    ['Bench Press', 'Push', 5, 5],
    ['Incline DB Press', 'Push', 3, 12],
    ['Military Press', 'Push', 3, 8],
    ['DB Shoulder Press', 'Push', 4, 12],
    ['Tricep Pushdowns', 'Push', 3, 12],
    ['Tricep Kickbacks', 'Push', 3, 12],
    
    ['Deadlift', 'Pull', 5, 5],
    ['Bicep Curls', 'Pull', 4, 10],
    ['Hammer Curls', 'Pull', 4, 10],
    ['Barbell Rows', 'Pull', 3, 8],
    ['Lat Pulldowns', 'Pull', 3, 10],
    
    ['Lock Offs', 'Climbing', 3, 1],
    ['Max Hangs', 'Climbing', 5, 1],
    ];

 async function isDatabaseExists(){
    var result = await database.getExerciseValues();
    if(result.length > 0){
        return true;
    }
    else if(result.length == 0){
        return false;
    }
 }
 
export default function useDatabase() {
    const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

    useEffect(() => {
        async function loadDataAsync(){
            try {
                
                
                await database.dropDatabaseTablesAsync();
                await database.setupDatabaseAsync();
                await database.setupUsersAsync(userList, exerciseTable);
                
                
                if(!isDatabaseExists){
                    console.log('Creating Prepopulated DB');
                    await database.dropDatabaseTablesAsync();
                    await database.setupDatabaseAsync();
                    await database.setupUsersAsync(userList, exerciseTable);
                }
                console.log('Opening Existing DB');
                setDBLoadingComplete(true);
            } catch(e) {
                console.warn(e);
            }
        }

        loadDataAsync();
    }, []);

    return isDBLoadingComplete;
}