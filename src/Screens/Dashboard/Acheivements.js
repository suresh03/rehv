/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { backblack } from "../../Assets/icon";
import Scaler from "../../Utils/Scaler";
import Persona from "./Components/Persona";
import Badges from "./Components/Badges";
import Medal from "./Components/Medals";
import Lang from "../../Language";

export default function InsightCompany({ navigation }) {
  const [getOptionIndex, setOptionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [getAndroidShield, setAndroidShield] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const renderTabBar = () => {
    const tabOption = [
      { title: Lang.Persona },
      { title: Lang.Badge },
      { title: Lang.Medal },
    ];
    return (
      <View style={styles.barContainer}>
        {tabOption.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => setOptionIndex(index)}
              key={index}
              style={{
                width: "33%",
                height: 50,
                borderBottomWidth: 2,
                borderBottomColor:
                  getOptionIndex === index ? "#4D39E9" : "#ffff",
                paddingVertical: 5,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
              }}
            >
              <Text
                style={{
                  fontSize: Scaler(14),
                  fontFamily: "Poppins-Regular",
                  color: "#505460",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFF",
          }}
        >
          <ActivityIndicator color={"#4D39E9"} size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            elevation={5}
            style={{
              backgroundColor: "#fff",
              flex: 1,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              overflow: "hidden",
              marginTop:
                Platform.OS === "ios" ? StatusBar.currentHeight + 10 : 10,
            }}
          >
            <View
              style={{ width: "90%", alignSelf: "center", paddingVertical: 10 }}
            >
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ position: "absolute", left: 20 }}
                >
                  <Image
                    style={[styles.all_image]}
                    source={backblack}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: Scaler(20),
                    fontFamily: "Poppins-SemiBold",
                    color: "#000",
                    textAlign: "center",
                  }}
                >
                  Achievements
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: Scaler(16),
                alignSelf: "center",
                color: "#110D26",
                fontFamily: "Poppins-Medium",
                fontSize: Scaler(15),
                marginVertical: 10,
                width: "85%",
              }}
            >
              {Lang.ACHIEVEMENTS_DESC}
            </Text>
            {renderTabBar()}
            {getOptionIndex === 0 ? (
              <Persona onPopUp={() => setAndroidShield((data) => !data)} />
            ) : getOptionIndex === 1 ? (
              <Badges onPopUp={() => setAndroidShield((data) => !data)} />
            ) : (
              <Medal />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D39E9",
    paddingTop: 10,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight + 50 : 0,
  },
  header: {
    width: "100%",
    height: 55,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  barContainer: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  all_image: {
    height: Scaler(25),
    width: Scaler(25),
  },
  options: {
    width: "46%",
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFF",
    borderRadius: 10,
    elevation: 4,
    flexDirection: "row",
    marginHorizontal: "2%",
    marginVertical: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  optionLeft: {
    width: "70%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 5,
  },
  optionRight: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 5,
  },
  optionImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  optionImageRight: {
    width: 15,
    height: 15,
    marginLeft: 2,
  },
  communityHeadingContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
  },
  comOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  radioImage: {
    width: 40,
    height: 20,
    marginHorizontal: 10,
  },
  comContainer: {
    width: Dimensions.get("screen").width / 2.5,
    height: Dimensions.get("screen").width / 2.5,
    borderRadius: 10,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#BCCD8D",
    margin: 5,
  },
  comImage: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
  bottomSheetContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },
  bsheetButton: {
    width: "90%",
    borderRadius: 10,
    height: 50,
    margin: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
  },
});
