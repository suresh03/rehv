/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";
import { getFontSize } from "../../../Components/SharedComponents/ResponsiveSize";

import FlipCard from "react-native-flip-card-plus";
import useApiServices from "../../../Services/useApiServices";
import Lang from "../../../Language";
import FastImage from "react-native-fast-image";
const { width } = Dimensions.get("window");
export default function Persona(props) {
  const panelRef = useRef(null);
  const [getSelected, setSelected] = useState(null);
  const [getAndroidShield, setAndroidShield] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState([]);
  const [isMoverShaker, setIsMoverShaker] = useState(false);
  const [isNewJoiner, setIsNewJoiner] = useState(false);
  const [isTrendsetter, setIsTrendsetter] = useState(false);
  const [badge, setBadges] = useState({});
  const rankingOptions = [
    {
      title: "MoverShaker",
      name: "Mover Shaker",
      logoFront: require("../../../Assets/Images/logoFrontm.png"),
      logoBack: require("../../../Assets/Images/logoBackm.png"),
      description: Lang.badgesDesc,
    },
    {
      title: "NewJoiner",
      name: "New Joiner",
      logoFront: require("../../../Assets/Images/logoFrontn.png"),
      logoBack: require("../../../Assets/Images/logoBackn.png"),
      description: Lang.badgesDesc,
    },
    {
      title: "Trendsetter",
      name: "Trendsetter",
      logoFront: require("../../../Assets/Images/logoFrontt.png"),
      logoBack: require("../../../Assets/Images/logoBackt.png"),
      description: Lang.badgesDesc,
    },
  ];
  const [Rank, setRank] = useState([]);
  const { ApiGetMethod } = useApiServices();

  useEffect(() => {
    getUserDetails();

    let rank = rankingOptions;
    rank[0].isMoverShaker = isMoverShaker;
    rank[1].isNewJoiner = isNewJoiner;
    rank[2].isTrendsetter = isTrendsetter;
    console.log("rankk", rank);
    setRank(rank);
  }, [isMoverShaker, isNewJoiner, isTrendsetter]);

  const getUserDetails = () => {
    ApiGetMethod(`user/getUserDetails`)
      .then((res) => {
        console.log("res.data[0]", res.data[0]);
        setIsMoverShaker(res.data[0].isMoverShaker);
        setIsNewJoiner(res.data[0].isNewJoiner);
        setIsTrendsetter(res.data[0].isTrendsetter);
        setBadges(res.data[0]);
      })
      .finally(() => {
        getBadges();
      });
  };

  const getBadges = () => {
    ApiGetMethod(`post/getBadgesList`).then((res) => {
      console.log("post/getBadgesList list => ", res.data.list);
      setUserData(res.data.list);
    });
  };

  const flipViewRef = React.useRef();
  const renderBottomSheet = () => {
    function isString(x) {
      return getSelected?.logoFront.toString.call(x) === getSelected?.logoFront;
    }
    function isString2(x) {
      return getSelected?.logoBack.toString.call(x) === getSelected?.logoFront;
    }
    console.log("getSelected", getSelected, isString(getSelected?.logoFront));
    return (
      <View style={styles.bottomSheetContainer}>
        <TouchableOpacity
          onPress={() => {
            panelRef.current.togglePanel();
            setAndroidShield((data) => !data);
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
              top: -15,
            }}
          >
            ✕
          </Text>
        </TouchableOpacity>
        <FlipCard
          flipDirection={"h"}
          style={{
            width: width / 4,
            height: width / 4,
            top: -35,
            borderWidth: 0,
          }}
          ref={flipViewRef}
          clickable={true}
          onFlipStart={() => console.log("onFlipStart")}
          onFlipEnd={() => console.log("onFlipEnd")}
          flipHorizontal={true}
        >
          <Pressable
            style={{
              width: width / 4,
              height: width / 4,
              borderRadius: width / 4,
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
              marginTop: 30,
              borderWidth: 2,
            }}
            onPress={() => {
              flipViewRef.current.flipHorizontal();
            }}
          >
            <FastImage
              source={
                isString(getSelected?.logoFront) === true
                  ? { uri: getSelected?.logoFront }
                  : getSelected?.logoFront
              }
              style={{ width: "75%", height: "75%" }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Pressable>
          <Pressable
            style={{
              width: width / 4,
              height: width / 4,
              borderRadius: width / 4,
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
              marginTop: 30,
              borderWidth: 2,
            }}
            onPress={() => {
              flipViewRef.current.flipHorizontal();
            }}
          >
            <FastImage
              // source={{ uri: getSelected?.logoBack }}
              source={
                isString2(getSelected?.logoBack) === true
                  ? { uri: getSelected?.logoBack }
                  : getSelected?.logoBack
              }
              style={{ width: "75%", height: "75%" }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Pressable>
        </FlipCard>
        <Text
          style={{
            fontSize: getFontSize(18),
            margintop: 10,
            fontFamily: "Poppins-Medium",
            color: "#000",
            textAlign: "center",
            top: 10,
          }}
        >
          {getSelected === null ? "" : getSelected.name}
        </Text>
        {isString(getSelected?.logoFront) === true ? (
          <View
            style={{
              width: "55%",
              height: 35,
              marginVertical: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#E9E5E4",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              top: 20,
            }}
          >
            <FastImage
              source={{ uri: getSelected?.picture }}
              style={{ width: 22, height: 22 }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text
              style={{
                fontSize: getFontSize(12),
                margintop: 10,
                fontFamily: "Poppins-Medium",
                color: "#000",
                textAlign: "center",
              }}
            >
              {getSelected === null ? "" : getSelected.communityName}
            </Text>
          </View>
        ) : null}
        <Text
          numberOfLines={6}
          style={{
            fontSize: getFontSize(14),
            fontFamily: "Poppins-Medium",
            width: "95%",
            marginBottom: 10,
            color: "#7F8190",
            textAlign: "center",
            top: 20,
          }}
        >
          {/* {Lang.BADGE} */}
          {getSelected === null ? "" : getSelected.description}
        </Text>
      </View>
    );
  };

  const firstThreeImageAction = (item) => {
    if (
      item.isMoverShaker === true ||
      item.isNewJoiner === true ||
      item.isTrendsetter === true
    ) {
      setSelected(item);
      panelRef.current.togglePanel();
    }
  };

  const firstThreeImageAction2 = (item) => {
    if (item.isMaker === true && item.status === "Maker") {
      setSelected(item);
      panelRef.current.togglePanel();
    } else if (item.isNailed === true && item.status === "Nailed") {
      setSelected(item);
      panelRef.current.togglePanel();
    } else {
    }
  };

  const listHeader = () => {
    return (
      <View style={{ width: width / 1.1, flexDirection: "row" }}>
        {Rank.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => firstThreeImageAction(item)}
              style={styles.imageContainer}
            >
              <FastImage
                source={item.logoFront}
                style={{
                  width: "75%",
                  height: "75%",
                  opacity:
                    item.isMoverShaker === true ||
                    item.isNewJoiner === true ||
                    item.isTrendsetter === true
                      ? 1
                      : 0.3,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          );
        })}
      </View>
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
          <FlatList
            style={{ marginTop: 20, width: width / 1.1 }}
            data={UserData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => firstThreeImageAction2(item)}
                  style={styles.imageContainer}
                >
                  <FastImage
                    source={{ uri: item.logoFront }}
                    style={{
                      width: "75%",
                      height: "75%",
                      opacity:
                        (item.isMaker === true && item.status === "Maker") ||
                        (item.isNailed === true && item.status === "Nailed")
                          ? 1
                          : 0.3,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => listHeader()}
          />
        )}
      </View>
      <BottomSheet
        wrapperStyle={{ backgroundColor: "#FFFF", elevation: 10, height: 400 }}
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
    width: "29%",
    height: width / 3.8,
    borderRadius: width / 4,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "rgba(0,0,0,0.05)",
    margin: 8,
    shadowColor: "gray",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    elevation: 5,
  },
  bottomSheetContainer: {
    alignItems: "center",
  },
});
