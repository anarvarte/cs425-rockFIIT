import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import WeightLiftingScreen from "../screens/WeightLiftingScreen";
import CalendarScreen from "../screens/CalendarScreen";
import GoalsScreen from "../screens/GoalsScreen";
import RockClimbingScreen from "../screens/RockClimbingScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const Tabs = ({route}) => {
  //console.log(route.params);
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 30,
          height: 100,
        },
      }}
    >
    <Tab.Screen
      //initialParams={{id: 'test', num: 2}}
      name="Home"
      //component={HomeScreen}
      children={() =>
        <HomeScreen propName={route.params}/>
      }
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              top: 10,
            }}
          >
            <Image
              source={require("../assets/home.png")}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
                tintColor: focused ? "#DD7F4A" : "#748c94",
              }}
            />
            <Text style={{
                fontFamily: 'Georgia',}}>Home</Text>
          </View>
        ),
      }}
    />
      <Tab.Screen
        name="Calendar"
        //component={CalendarScreen}
        children={() =>
          <CalendarScreen propName={route.params}/>
        }
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
                
              }}
            >
              <Image
                source={require("../assets/calendar.png")}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 50,
                  opacity: 0.7,
                  tintColor: focused ? "#DD7F4A" : "#748c94",
                }}
              />
              <Text style={{
                fontFamily: 'Georgia',
              }}>Calendar</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Weightlifting"
        //component={WeightLiftingScreen}
        children={() =>
          <WeightLiftingScreen propName={route.params}/>
        }
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/weightlifting.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? "#DD7F4A" : "#748c94",
                }}
              />
              <Text style={{
                fontFamily: 'Georgia',
              }}>Fitness</Text>
            </View>
          ),
        }}
      />
            <Tab.Screen
        name="Goals"
        //component={GoalsScreen}
        children={() =>
          <GoalsScreen propName={route.params}/>
        }
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/goals.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? "#DD7F4A" : "#748c94",
                }}
              />
              <Text style={{
                fontFamily: 'Georgia',}}>Goals</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        //component={SettingsScreen}
        children={() =>
          <SettingsScreen propName={route.params}/>
        }
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/settings.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? "#DD7F4A" : "#748c94",
                }}
              />
              <Text style={{
                fontFamily: 'Georgia',}}>Settings</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default Tabs;