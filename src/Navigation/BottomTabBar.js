/* eslint-disable react-native/no-inline-styles */
import React, {useState} from "react";
import { Image, View, Dimensions, Text, DeviceEventEmitter } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/Home/HomeScreen";
import TrendingScreen from "../Screens/Trending/TrendingScreen";
import CreatePostScreen from "../Screens/CreatePost/CreatePostScreen";
import DashboardScreen from "../Screens/Dashboard/DashboardScreen";
import Lang from "../Language";
import CommunityScreen from "../Screens/Community/CommunityScreen";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
  HomebottomactiveIcon,
  HomebottomunactiveIcon,
  trendingbottomactiveIcon,
  trendinfbottomunactiveIcon,
  plusIcon,
  communitybottomactiveIcon,
  communitybottomunactiveIcon,
  dashboardbottomactiveIcon,
  dashboardbottomunactiveIcon,
} from "../Assets/icon";
import Scaler from "../Utils/Scaler";
const width = Dimensions.get("window").width;
const BottomTab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#fff",
          width: wp(100),
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
              numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins-Medium",
                  color: focused ? "#4D39E9" : "#CECECE",
                }}
              >
                {Lang.HOME}
              </Text>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                padding: wp(0.5),
                borderTopColor: "#4D39E9",
                borderTopWidth: focused ? 4 : 0,
                width: wp(15),
              }}
            >
              <Image
                style={{ alignSelf: "center", width: 20, height: 20 }}
                resizeMode={"contain"}
                source={focused ? HomebottomactiveIcon : HomebottomunactiveIcon}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Trending"
        component={TrendingScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
              numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins-Medium",
                  color: focused ? "#4D39E9" : "#CECECE",
                }}
              >
                {Lang.TRENDING}
              </Text>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                padding: wp(0.5),
                borderTopColor: "#4D39E9",
                borderTopWidth: focused ? 4 : 0,
                width: wp(15),
              }}
            >
              <Image
                style={{ alignSelf: "center", width: 20, height: 20 }}
                resizeMode={"contain"}
                source={
                  focused
                    ? trendingbottomactiveIcon
                    : trendinfbottomunactiveIcon
                }
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="createPost"
        component={CreatePostScreen}
        options={{
          tabBarVisible: false,
          tabBarLabel: "",
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <View style={{}}>
              <Image
                style={{
                  alignSelf: "center",
                  width: Scaler(100),
                  height: Scaler(100),
                  top: Scaler(-10),
                }}
                source={plusIcon}
                resizeMode={"contain"}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Community"
        component={CommunityScreen}
        //unmountOnBlur={true}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({ focused }) => {
            return (
              <Text
              numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins-Medium",
                  color: focused ? "#4D39E9" : "#CECECE",
                 
                }}
              >
                {Lang.COMMUNITY}
              </Text>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                
                padding: wp(0.5),
                borderTopColor: "#4D39E9",
                borderTopWidth: focused ? 4 : 0,
                width: wp(15),
              }}
            >
              <Image
                style={{ alignSelf: "center", width: 20, height: 20 }}
                resizeMode={"contain"}
                source={
                  focused
                    ? communitybottomactiveIcon
                    : communitybottomunactiveIcon
                }
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
              numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins-Medium",
                  color: focused ? "#4D39E9" : "#CECECE",
                }}
              >
                {Lang.PROFILE}
              </Text>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                padding: wp(0.5),
                borderTopColor: "#4D39E9",
                borderTopWidth: focused ? 4 : 0,
                width: wp(15),
              }}
            >
              <Image
                style={{ alignSelf: "center", width: 20, height: 20 }}
                resizeMode={"contain"}
                source={
                  focused
                    ? require("../Assets/Images/prof.png")
                    : require("../Assets/Images/noun-profile-339269.png")
                }
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
