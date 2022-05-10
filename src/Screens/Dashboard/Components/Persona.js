/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef, Children } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Scaler from "../../../Utils/Scaler";
import useApiServices from "../../../Services/useApiServices";
import Lang from "../../../Language";

export default function Persona({ navigation }) {
  const { ApiGetMethod, ApiPostMethod } = useApiServices();
  const [getLoading, setLoading] = useState(true);
  const [ranking, setRanking] = useState(null);

  const rankingOptions = [
    {
      title: "Maestro",
      image: require("../../../Assets/Images/btnimage/one.png"),
      text: "#000",
    },
    {
      title: "Gifted",
      image: require("../../../Assets/Images/btnimage/two.png"),
      text: "#fff",
    },
    {
      title: "Expert",
      image: require("../../../Assets/Images/btnimage/three.png"),
      text: "#fff",
    },
    {
      title: "Experienced",
      image: require("../../../Assets/Images/btnimage/four.png"),
      text: "#fff",
    },
    {
      title: "Talented",
      image: require("../../../Assets/Images/btnimage/five.png"),
      text: "#fff",
    },
  ];

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    let userId = global.userId;
    ApiGetMethod(`AdminRoute/getUserDetails?id=${userId}`).then((res) => {
      console.log("get AdminRoute/getUserDetails list => ", res);
      setRanking(res.data[0].ranking);
      setLoading(false);
    });
  };

  let ranker =
    ranking == ""
      ? require("../../../Assets/Images/persona/needle0.png")
      : ranking == "Talented"
      ? require("../../../Assets/Images/persona/needle1.png")
      : ranking == "Experienced"
      ? require("../../../Assets/Images/persona/needle2.png")
      : ranking == "Expert"
      ? require("../../../Assets/Images/persona/needle3.png")
      : ranking == "Gifted"
      ? require("../../../Assets/Images/persona/needle4.png")
      : ranking == "Maestro"
      ? require("../../../Assets/Images/persona/needle5.png")
      : require("../../../Assets/Images/persona/needle0.png");
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            overflow: "hidden",
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: "70%",
              height: Dimensions.get("screen").width / 2.5,
              marginBottom: 10,
              alignSelf: "center",
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../Assets/Images/persona/meter.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
            <Image
              source={ranker}
              resizeMode="contain"
              style={{
                width: "100%",
                height: Dimensions.get("screen").width / 2.5,
                position: "absolute",
                bottom: 0,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: Scaler(22),
              fontFamily: "Poppins-SemiBold",
              color: "#4A7C14",
              textAlign: "center",
            }}
          >
            {ranking}
          </Text>
          {ranking == null || ranking == undefined ? null : (
          <Text
            style={{
              fontSize: Scaler(16),
              alignSelf: "center",
              color: "#505460",
              fontFamily: "Poppins-Regular",
              fontSize: Scaler(14),
              marginVertical: 10,
              textAlign: "center",
              width: "85%",
            }}
          >
            {Lang.greatJobFirstHalf} {ranking} {Lang.greatJobSecondHalf}
          </Text>
          )}
          <Text
            style={{
              fontSize: Scaler(20),
              fontFamily: "Poppins-SemiBold",
              color: "#505460",
              textAlign: "center",
            }}
          >
            {Lang.rankings}
          </Text>

          <View
            style={{
              width: "95%",
              backgroundColor: "#fff",
              alignSelf: "center",
              paddingLeft: 10,
            }}
          >
            {Children.toArray(
              rankingOptions.map((item, index) => {
                return (
                  <ImageBackground
                    source={item.image}
                    resizeMode="stretch"
                    style={{
                      width: "100%",
                      height: 45,
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingLeft: 15,
                      marginVertical: 5,
                      alignSelf: "center",
                    }}
                    key={item.title}
                  >
                    <Text
                      style={{
                        fontSize: Scaler(17),
                        fontFamily: "Poppins-Medium",
                        color: item.text,
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Text>
                  </ImageBackground>
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 30,
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
