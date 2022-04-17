/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { getFontSize } from "../../Components/SharedComponents/ResponsiveSize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { greylogoIcon, whiteback } from "../../Assets/icon";
import { likeIcon, likeWhite } from "../../Assets/icon";
import { isImage } from "../../Utils/Helpers";
const FULL_Height = Dimensions.get("window").height;
const FULL_Width = Dimensions.get("window").width;
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import Video from "react-native-video";
import VideoPausedIcon from "../Community/Components/VideoPausedIcon";
const width = Dimensions.get("window").width;
const height = Dimensions.get("screen").height;
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import Lang from "../../Language";

export default function ContestPictureScreen({ navigation, route }) {
  const theme = useTheme();
  const { ApiPostMethod } = useApiServices();
  const [participantId, setParticipantId] = useState(route.params.item._id);
  const [postId, setPostId] = useState(route.params.postId);
  const [data, setData] = useState([]);
  const playerRef = useRef();
  const [isPaused, setIsPaused] = useState(true);
  let videoComponent = useRef();
  const load = ({ duration }) => {
    videoComponent.seek(0);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onSave();
    });
    return unsubscribe;
  }, []);

  const onSave = () => {
    let data = {
      postId: postId,
      participantId: participantId,
    };
    ApiPostMethod("post/getParticipantDetailsById", data)
      .then((res) => {
        if (res.statusCode === 200) {
          setData(res.data.postDetails[0]);
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => console.log);
  };

  const likeContestAction = async () => {
    let likePayload = {
      participantId: route.params.item._id,
      isLike: true,
    };
    ApiPostMethod("post/likeParticipants", likePayload)
      .then((res) => {
        console.log("res", res);
        if (res.statusCode === 200) {
          onSave();
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => onSave());
  };

  const renderImagevideo = (item) => {
    console.log("item", item);
    if (isImage(item)) {
      return (
        <ImageBackground
          source={{ uri: route.params.item.pictureUrl[0] }}
          style={{ height: FULL_Height, width: FULL_Width, Opacity: 0.5 }}
          resizeMode={"cover"}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Image
                  source={whiteback}
                  resizeMode={"contain"}
                  style={{ left: 10, width: wp(7), height: hp(2.2), top: 10 }}
                />
              </TouchableOpacity>
              <View style={{ alignSelf: "center", flex: 1 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: getFontSize(18),
                    fontFamily: "Poppins-Medium",
                    top: 10,
                  }}
                >
                  {route.params.item.userData.name}{" "}
                  {route.params.item.userData.lastName}
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                flex: 1,
                marginVertical: hp(1),
              }}
            >
              <View style={{ backgroundColor: "transparent" }}>
                <Text
                  style={{
                    marginVertical: hp(2),
                    alignSelf: "center",
                    color: "#fff",
                    fontSize: getFontSize(17),
                    fontFamily: "Poppins-Medium",
                    left: 10,
                    width: wp(95),
                  }}
                >
                  {data.description}
                </Text>
                <View style={{ flexDirection: "row", left: wp(2) }}>
                  <TouchableOpacity onPress={() => likeContestAction()}>
                    <Image
                      source={greylogoIcon}
                      source={data?.isLikes ? likeIcon : likeWhite}
                      style={{ width: wp(10), height: hp(5) }}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      width: wp(10),
                      height: hp(3),
                      left: wp(2),
                      top: hp(1),
                      color: data?.isLikes
                        ? "#4D39E9"
                        : theme.colors.disabledText,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    {data.totalLikes}
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      );
    } else {
      return (
        <View style={{ height: FULL_Height, width: FULL_Width }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#EEEBFF",
              borderRadius: 10,
              justifyContent: "center",
              position: "absolute",
            }}
          >
            <TouchableWithoutFeedback onPress={() => setIsPaused(!isPaused)}>
              <Video
                ref={(ref) => (videoComponent = ref)}
                source={{ uri: item }}
                paused={isPaused}
                style={{ width, height }}
                repeat={true}
                onLoad={load}
                resizeMode={"cover"}
              />
            </TouchableWithoutFeedback>
            {/* {isPaused && (
              <View
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "43%",
                  alignSelf: "center",
                }}
              >
                <VideoPausedIcon playVideo={() => setIsPaused(false)} />
              </View>
            )} */}
          </View>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Image
                  source={whiteback}
                  resizeMode={"contain"}
                  style={{ left: 10, width: wp(7), height: hp(2.2), top: 10 }}
                />
              </TouchableOpacity>
              <View style={{ alignSelf: "center", flex: 1 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: getFontSize(18),
                    fontFamily: "Poppins-Medium",
                    top: 10,
                  }}
                >
                  {route.params.item.userData.name}{" "}
                  {route.params.item.userData.lastName}
                </Text>
              </View>
            </View>
          </SafeAreaView>
          <View style={{ backgroundColor: "transparent" }}>
            <Text
              style={{
                marginVertical: hp(4),
                alignSelf: "center",
                color: "#fff",
                fontSize: getFontSize(17),
                fontFamily: "Poppins-Medium",
                left: Scaler(7),
                width: wp(90),
              }}
            >
              {data.description}
            </Text>
            <View
              style={{
                //justifyContent: "space-between",
                // flex: 1,
                // marginVertical: hp(2),
                flexDirection: "row",
                marginLeft: Scaler(20),
                marginBottom: Scaler(35),
              }}
            >
              <TouchableOpacity onPress={() => likeContestAction()}>
                <Image
                  source={greylogoIcon}
                  source={data?.isLikes ? likeIcon : likeWhite}
                  style={{ width: wp(10), height: hp(5) }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              {/* <Image
                source={greylogoIcon}
                source={data.isLikes ? likeIcon : likeBlackIcon}
                style={{ width: wp(10), height: hp(5) }}
                resizeMode={"contain"}
              /> */}
              <Text
                style={{
                  width: wp(10),
                  height: hp(3),
                  left: wp(2),
                  top: hp(1),
                  color: data?.isLikes ? "#4D39E9" : theme.colors.disabledText,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {data.totalLikes}
              </Text>
            </View>
          </View>
          {isPaused ? (
            <View
              style={{
                position: "absolute",
                top: "40%",
                left: "43%",
                alignSelf: "center",
              }}
            >
              <VideoPausedIcon playVideo={() => setIsPaused(false)} />
            </View>
          ) : null}
        </View>
      );
    }
  };
  return renderImagevideo(route.params.item.pictureUrl[0]);
}
