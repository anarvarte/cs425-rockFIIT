import React from "react";
import 'react-native-gesture-handler';

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';

import LogIn from './screens/LogInScreen';
import SignUp from './screens/SignUpScreen';
import Tabs from './navigation/tabs';
import Program from './screens/ProgramScreen';

const App: () =>  Node = () =>{

  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}  />
        <Stack.Screen name="Program" component={Program} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
