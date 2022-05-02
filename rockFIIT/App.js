import React, {useState} from "react";
import 'react-native-gesture-handler';

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';

import LogIn from './screens/LogInScreen';
import SignUp from './screens/SignUpScreen';
import Tabs from './navigation/tabs';
import RealProgram from './screens/RealProgramScreen';
import CustomProgramScreen from "./screens/CustomProgramScreen";
import { UserObject } from "./user_object/UserObject";


const App: () =>  Node = () =>{

  //SplashScreen.preventAutoHideAsync();
  const Stack = createStackNavigator();


  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Program"
          component={RealProgram}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomProgramScreen"
          component={CustomProgramScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
