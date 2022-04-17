/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { getFontSize } from "../../../Components/SharedComponents/ResponsiveSize";
import BottomSheet from "react-native-simple-bottom-sheet";
import {
  oneIcon,
  twoIcon,
  threeIcon,
  nineIcon,
  elevenIcon,
  sevenIcon,
  tenIcon,
  eightIcon,
  fourIcon,
  sixIcon,
  requesBlanktIcon,
} from "../../../Assets/icon";
import useApiServices from "../../../Services/useApiServices";
import FlipCard from "react-native-flip-card-plus";
import moment from "moment";
import Lang from "../../../Language";
import Body from "../../../Components/SharedComponents/Body";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";
const { width } = Dimensions.get("window");

export default function Persona(props) {
  const { ApiGetMethod } = useApiServices();
  const panelRef = useRef(null);
  let animatedValue = new Animated.Value(0);
  let currentValue = 0;
  const [flip, setFlip] = useState(false);
  const [getSelected, setSelected] = useState({});
  const [postData, setPostData] = useState([]);
  const rankingOptions = [
    { title: "Maestro", image: oneIcon },
    { title: "Platinum Medal", image: twoIcon },
    { title: "Silver Medal", image: threeIcon },
    { title: "Bronze Medal", image: fourIcon },
    { title: "Gold Medal", image: elevenIcon },
    { title: "Bronze Medal", image: sevenIcon },
    { title: "Bronze Medal", image: sixIcon },
    { title: "Platinum Medal", image: eightIcon },
    { title: "Silver Medal", image: nineIcon },
    { title: "Silver Medal", image: tenIcon },
  ];

  useEffect(() => {
    getMedals();
  }, []);

  const getMedals = () => {
    ApiGetMethod(`post/getMedals`).then((res) => {
      console.log("get post/getMedals list => ", res);
      let temp = [...res.data];
      console.log("tempu", temp);
      setPostData(temp);
    });
  };

  const flipViewRef = React.useRef();
  const renderBottomSheet = () => {
    return (
      <View style={styles.bottomSheetContainer}>
        <TouchableOpacity
          onPress={() => {
            panelRef.current.togglePanel();
          }}
          activeOpacity={0.8}
          style={{
            width: "100%",
            alignItems: "center",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(25),
              fontWeight: "bold",
              position: "absolute",
              right: 10,
              fontFamily: "Poppins-SemiBold",
              color: "#000",
              textAlign: "center",
              top:-15
            }}
          >
            ✕
          </Text>
        </TouchableOpacity>
        <View style={styles.containers}>
          <FlipCard
            flipDirection={"h"}
            style={{
              width: Dimensions.get("screen").width / 4,
              height: Dimensions.get("screen").width / 4,
              // top: -35,
            }}
            ref={flipViewRef}
            clickable={true}
            onFlipStart={() => console.log("onFlipStart")}
            onFlipEnd={() => console.log("onFlipEnd")}
            flipHorizontal={true}
          >
            <Pressable
              style={{
                width: Dimensions.get("screen").width / 4,
                height: Dimensions.get("screen").width / 4,
                borderRadius: Dimensions.get("screen").width / 4,
                backgroundColor: "#fff",
                borderWidth: 3,
                borderColor: "#FFFF",
                margin: 8,
                shadowColor: "gray",
                shadowOpacity: 0.8,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                elevation: 5,
                marginTop: 40,
                borderWidth: 2,
              }}
              onPress={() => {
                flipViewRef.current.flipHorizontal();
              }}
            >
              <Image
                source={{ uri: getSelected?.logoFront }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              style={{
                width: Dimensions.get("screen").width / 4,
                height: Dimensions.get("screen").width / 4,
                borderRadius: Dimensions.get("screen").width / 4,
                backgroundColor: "#fff",
                borderWidth: 3,
                borderColor: "#FFFF",
                margin: 8,
                shadowColor: "gray",
                shadowOpacity: 0.8,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                elevation: 5,
                marginTop: 40,
                borderWidth: 2,
              }}
              onPress={() => {
                flipViewRef.current.flipHorizontal();
              }}
            >
              <ImageBackground
                source={{ uri: getSelected?.logoBack }}
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                //resizeMode="contain"
              >
                <Text
                  style={{
                    fontSize: getFontSize(11),
                    margintop: 10,
                    fontFamily: "Poppins-Medium",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  Earned{"\n"}
                  <Text
                    style={{
                      fontSize: getFontSize(19),
                      fontFamily: "Poppins-Medium",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    {moment(getSelected?.createdAt).format("MMM, DD")}
                    {"\n"}
                  </Text>
                  <Text
                    style={{
                      fontSize: getFontSize(11),
                      fontFamily: "Poppins-Medium",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    {moment(getSelected?.createdAt).format("YYYY")}
                  </Text>
                </Text>
              </ImageBackground>
            </Pressable>
          </FlipCard>
        </View>
        <ImageBackground
          style={{
            width: "80%",
            height: 35,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            left: 30,
            marginTop:110
          }}
          source={
            getSelected.type === "Silver"
              ? require("../../../Assets/Images/silver.png")
              : getSelected.type === "Bronze"
              ? require("../../../Assets/Images/Bronze.png")
              : require("../../../Assets/Images/gold.png")
          }
        >
          <Text
            style={{
              fontSize: getFontSize(14),
              fontFamily: "Poppins-Medium",
              color: "#110D26",
              right: 20,
            }}
          >
            {getSelected.type} Medal
          </Text>
        </ImageBackground>
        <Text
          style={{
            fontSize: getFontSize(16),
            margintop: 10,
            fontFamily: "Poppins-Medium",
            color: "#000",
            textAlign: "center",
            top:10
          }}
        >
          Earned {getSelected.howManyTime} Times in{" "}
          {moment(getSelected?.createdAt).format("YYYY")}
        </Text>
        <Text
          style={{
            fontSize: getFontSize(14),
            fontFamily: "Poppins-Medium",
            width: "95%",
            marginBottom: 0,
            color: "#7F8190",
            textAlign: "center",
            top:20
          }}
        >
          {Lang.MedalDesc}
        </Text>
      </View>
    );
  };

  const EmptyListMessage = () => {
    return (
      <Body>
        <View style={{ justifyContent: "center", height: hp(80) }}>
          <View
            style={{
              backgroundColor: "#fff",
              alignSelf: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              shadowOpacity: 0.1,
              elevation: 5,
              borderRadius: 10,
              width: "90%",
              height: hp(50),
              top: hp(-13),
            }}
          >
            <FastImage
              source={requesBlanktIcon}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: wp(60),
                height: hp(40),
                alignSelf: "center",
                top: hp(-3.3),
              }}
            />
            <Text
              style={{
                textAlign: "center",
                padding: 10,
                paddingHorizontal: 40,
                width: wp(90),
                alignSelf: "center",
                fontSize: 17,
                fontFamily: "Poppins-Medium",
                color: "#7F8190",
                top: hp(-12),
              }}
            >
              {Lang.EMPTY_MEDAL}
            </Text>
          </View>
        </View>
      </Body>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          overflow: "hidden",
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <FlatList
          contentContainerStyle={{alignSelf:'center', width:width/1.1,}}
          data={postData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item);
                  panelRef.current.togglePanel();
                }}
                activeOpacity={0.8}
                style={styles.imageContainer}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{ uri: item.logoFront }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{
                    fontSize: getFontSize(15),
                    fontFamily: "Poppins-Medium",
                    color: "#000",
                    marginTop: 5,
                    textAlign: "center",
                  }}
                >
                  {item.type}
                </Text>
                <View
                  style={{
                    width: "90%",
                    marginTop: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Text
                    style={{
                      fontSize: getFontSize(10),
                      fontFamily: "Poppins-Medium",
                      color: "#000",
                      marginTop: 5,
                      textAlign: "center",
                      opacity: 0.5,
                    }}
                  >
                    Earned
                  </Text>
                  <View
                    style={{
                      width: 50,
                      height: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      backgroundColor: "#4D39E933",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(12),
                        fontFamily: "Poppins-SemiBold",
                        color: "#000",
                        textAlign: "center",
                      }}
                    >
                      ☓{item.howManyTime}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          numColumns={2}
          keyExtractor={(item) => item.title}
          ListEmptyComponent={EmptyListMessage}
        />
      </View>
      <BottomSheet
        wrapperStyle={{height:400}}
        sliderMinHeight={0}
        isOpen={false}
        ref={(ref) => (panelRef.current = ref)}
      >
        {renderBottomSheet()}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 30,
  },
  imageContainer: {
    width: "45.7%",
    height: Dimensions.get("screen").width / 2.6,
    backgroundColor: "#F6F5FF",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#FFFF",
    margin: 8,
    shadowColor: "gray",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    alignSelf:'center'
  },
  bottomSheetContainer: {
    alignItems: "center",
    
  },
  containers: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  cardContainer: {
    width: 100,
    height: 100,
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: "#FE474C",
  },
  card2: {
    backgroundColor: "#FEB12C",
  },
  label: {
    lineHeight: 18,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});
