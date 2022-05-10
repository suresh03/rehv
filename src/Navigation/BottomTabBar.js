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
                  fontSize: 10,
                  fontFamily: "Poppins-Medium",
                  color: focused ? "#4D39E9" : "#9698a4",
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
                source={focused ? require("../Assets/Images/Home.png") : require("../Assets/Images/homeicon1.png")}
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
                  fontSize: 10,
                  fontFamily: "Poppins-Medium",
                  color: focused ? "#4D39E9" : "#9698a4",
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
                    ? require("../Assets/Images/SelectedTrending.png")
                    : require("../Assets/Images/UnSelectedTrending.png")
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
                  fontSize: 10,
                  fontFamily: "Poppins-Medium",
                  color: focused ? "#4D39E9" : "#9698a4",
                 
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
                    ? require("../Assets/Images/SelectedCommunity.png")
                    : require("../Assets/Images/UnSelectedCommunity.png")
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
                  fontSize: 10,
                  fontFamily: "Poppins-Medium",
                  color: focused ? "#4D39E9" : "#9698a4",
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
                    : require("../Assets/Images/noun_profile_339269-1.png")
                }
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
