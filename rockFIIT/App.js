import React, {useState} from "react";
import 'react-native-gesture-handler';

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import LogIn from './screens/LogInScreen';
import SignUp from './screens/SignUpScreen';
import Tabs from './navigation/tabs';
import RealProgram from './screens/RealProgramScreen';

import useDatabase from './components/UseDatabase';
import {database} from './components/Database';


const App: () =>  Node = () =>{

  //SplashScreen.preventAutoHideAsync();
  const Stack = createStackNavigator();

  const isDBLoadingComplete = useDatabase();

  if(isDBLoadingComplete){
    console.log('db opened successfully on App');
  }
  else{
    console.log('db not opened on App');
  }
  
  return (
//<Stack.Screen name="Program" component={Program} options={{headerShown: false}}/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}  />
        <Stack.Screen name="Program" component={RealProgram} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
