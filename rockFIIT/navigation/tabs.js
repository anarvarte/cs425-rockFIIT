import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import WeightLiftingScreen from "../screens/WeightLiftingScreen";
import GoalsScreen from "../screens/GoalsScreen";
import RockClimbingScreen from "../screens/RockClimbingScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
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
      name="Home"
      component={HomeScreen}
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
                tintColor: focused ? "#e32f45" : "#748c94",
              }}
            />
            <Text>Home</Text>
          </View>
        ),
      }}
    />
      <Tab.Screen
        name="Weightlifting"
        component={WeightLiftingScreen}
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
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text>Weights</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
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
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text>Goals</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Rock Climbing"
        component={RockClimbingScreen}
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
                source={require("../assets/rockclimbing.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text>Climbing</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
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
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text>Settings</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default Tabs;