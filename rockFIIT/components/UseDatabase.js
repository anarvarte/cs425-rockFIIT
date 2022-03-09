import React, {useEffect} from "react";
import {database} from './Database';

const userList = ['john', 'alice', 'cyrille', 'aitor', 'jr'];
const exerciseList = ['Back Squats', 'Deadlift', 'Goblet Squats', 'KB Swing', 'RDL', 'Lunges', 
'Bench Press', 'Incline DB Press', 'Military Press', 'DB Shoulder Press', 'Tricep Pushdowns', 'Tricep Kickbacks',
 'Hammer Curls', 'Bicep Curls', 'Lat Pulldowns', 'Barbell Rows',
 'Lock Offs', 'Max Hangs'];
 

export default function useDatabase() {
    const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

    useEffect(() => {
        async function loadDataAsync(){
            try {

                await database.dropDatabaseTablesAsync();
                await database.setupDatabaseAsync();
                await database.setupUsersAsync(userList, exerciseList);

                setDBLoadingComplete(true);
            } catch(e) {
                console.warn(e);
            }
        }

        loadDataAsync();
    }, []);

    return isDBLoadingComplete;
}