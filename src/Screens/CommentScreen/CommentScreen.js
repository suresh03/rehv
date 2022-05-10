/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";

import {
  whiteback,
  likeIcon,
  commentIcon,
  postShareIcon,
  messageSendIcon,
  profilePic,
  likeBlackIcon,
  commentBlue,
} from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Body from "../../Components/SharedComponents/Body";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import { ActivityIndicator, Divider, useTheme } from "react-native-paper";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import Scaler from "../../Utils/Scaler";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import { getFromLocal } from "../../Utils/LocalStorage";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";
import dynamicLinks from "@react-native-firebase/dynamic-links";
const width = Dimensions.get("window").width;

import Video from "react-native-video";
import VideoPausedIcon from "../Community/Components/VideoPausedIcon";
import { isImage } from "../../Utils/Helpers";
import Icon from "react-native-vector-icons/Ionicons";
import Share from "react-native-share";
import useApiServices from "../../Services/useApiServices";

export default function CommentScreen({ navigation, route }) {
  const { item } = route.params;
  const [data, setData] = useState(route?.params?.data);
  const [ProfilePic, SetProfilePic] = useState("");
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentDetails, setCommentDetails] = useState([]);
  const [comment, setComment] = useState("");
  const [commenting, setCommenting] = useState(false);
  const {
    likeOrComment,
    likeOrCommentList,
    getPostDetailsById,
    getPollDetails,
    getSurveyDetailsById,
  } = useCommunityServices();
  const inputRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [sound, setSound] = React.useState(false);

  const [ButtonTitle, setButtonTitle] = useState(
    data?.eventType?.toLowerCase()
  );
  const [pollDetail, setPollDetail] = useState([]);
  const [PostDetail, setPostDetail] = useState([]);
  const [surveyDetail, setSurveyDetail] = useState([]);
  const [SurveyDetailLikes, setSurveyDetailLikes] = useState([]);
  const [PostDetailLikes, setPostDetailLikes] = useState([]);
  const [PollDetailLikes, setPollDetailLikes] = useState([]);
  const [PollDetails, setPollDetails] = useState([]);
  const { ApiPostMethod, ApiGetMethod } = useApiServices();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPostDetail(data?.postId, data?.eventType);
      getPostDetails(data?.postId, data?.eventType);
    });
    return unsubscribe;
  }, []);

  const getPostDetail = async (id, type) => {
    console.log("type", type);
    if (type?.toLowerCase() === "poll") {
      const res = await getPostDetailsById(id);
      console.log("PollDetails", res);
      setPollDetail(res);
      setPollDetailLikes(res);
      setPollDetails(res.pollDetails[0]);
      // PollDetails.userData[0].department
    } else if (type.toLowerCase() === "survey") {
      const res = await getSurveyDetailsById(id);
      console.log("resresres", res);
      setSurveyDetail(res.surveyDetails[0]);
      setSurveyDetailLikes(res.surveyDetails);
      setQuestion(res.surveyDetails[0].questions.length);
    } else if (
      type?.toLowerCase() === "contest" ||
      type?.toLowerCase() === "participate" ||
      type?.toLowerCase() === "post"
    ) {
      const res = await getPostDetailsById(id);
      console.log("resresres", res);
      setPostDetailLikes(res.postDetails);
      let temp = [...res.postDetails];
      temp.map((item) => {
        if (item?.eventType == "POST") {
          item.pictureUrl = item.pictureUrlArray.reduce(
            (acc, item) => acc.concat(item.image),
            []
          );
        }
      });
      setPostDetail(temp);
      console.log("temptemp", temp);
    }
  };

  const getPostDetails = async (id, type) => {
    const res = await getPostDetailsById(id);
    console.log("resresres", res);
    setPostDetailLikes(res.postDetails);
    let temp = [...res.postDetails];
    temp.map((item) => {
      if (item?.eventType == "POST") {
        item.pictureUrl = item.pictureUrlArray.reduce(
          (acc, item) => acc.concat(item.image),
          []
        );
      }
    });
    setPostDetail(temp);
    console.log("temptemp", temp);
  };

  let videoComponent = useRef();
  const load = () => {
    videoComponent.seek(0);
  };

  //get like or comment list
  const getLikeOrCommentList = async () => {
    try {
      const res = await likeOrCommentList(data.postId, false);
      console.log(" likeOrCommentList =?>  ", res);
      setCommentsCount(res.commentCount);
      setCommentDetails(res.list);
      setCommenting(false);
    } catch {
      (error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
        setCommenting(false);
      };
    }
  };

  const likeOrCommentAction = async (action) => {
    inputRef.current.blur();
    setCommenting(true);
    likeOrComment(action, data.postId, data.selectedCommunityId, comment)
      .then((res) => {
        console.log("likeOrCommentAction", res);
        let x = { ...data };
        x.isLikes = res.likes;
        setData(x);
        
        if (ButtonTitle === "survey") {
          let x = [...SurveyDetailLikes];
          x[0].totalLikes=  x[0]?.totalLikes + (res.likes ? 1 : -1);
          x[0].isLikes=res.likes
          setSurveyDetailLikes(x);
        } else {
          let x = [...PostDetailLikes];
          x[0].totalLikes= x[0]?.totalLikes + (res.likes ? 1 : -1);
          x[0].isLikes=res.likes
          setPostDetailLikes(x);
        }

        setComment("");
      })
      .catch((error) => {
        console.log("likeOrCommentAction", error);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
      })
      .finally(() => {
        getLikeOrCommentList();
        getPostDetail();
      });
  };

  useLayoutEffect(() => {
    getLikeOrCommentList();
    getFromLocal("user").then((profile) => {
      SetProfilePic(profile?.profilePic);
    });
  }, []);

  const generateLink = async (item) => {
    let postId = item._id;
    let eventType = item.eventType;
    let companyName = item?.userData[0].companyName
      .split(" ")
      .slice(0, -1)
      .join(" ");
    console.log("companyName", companyName);
    try {
      var link = await dynamicLinks().buildShortLink(
        {
          link: `https://rehvupap.page.link/d6o5/${postId}/${eventType}/${companyName}`,
          domainUriPrefix: "https://rehvupap.page.link",
          social: {
            title: "RehvUp",
            imageUrl: item.pictureUrl[0],
          },
          android: {
            packageName: "com.rehvup",
            minimumVersion: "18",
          },
          ios: {
            appStoreId: "159968947",
            bundleId: "com.RehvUp",
            minimumVersion: "18",
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT
      );
      return link;
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const shareApiHit = async (item) => {
    console.log("helloitem", item);
    ApiGetMethod(`coach/sharePost?id=${item._id}`)
      .then((res) => {
        console.log("data", res);
      })
      .catch((error) => {
        console.assert(error);
      })
      .finally(() => setLoading(false));
  };

  const onShare = async (item) => {
    const getLink = await generateLink(item);
    const resData = {
      message: "Check out my Post",
      url: getLink,
    };
    Share.open(resData)
      .then((res) => {
        console.log("resData", res);
        shareApiHit(item);
      })
      .catch((err) => {
        err && console.log(err);
        shareApiHit(item);
      });
  };

  const postDetailsNav = () => {
    setIsPaused(true);
    navigation.navigate("PostDetailScreen", {
      postId: data.postId,
      eventType: data.eventType,
      creator: data.name,
      creatorRole: data.role,
      pictureUrl: data.pictureUrl,
      isLikes: data.isLikes,
      totalLikes: data.totalLikes,
      totalComments: data.totalComments,
      questions: data.questions,
    });
  };

  const ItemView = (item, index) => {
    return (
      <View key={index} style={{ flex: 1 }}>
        {isImage(item.item) ? (
          <TouchableOpacity onPress={() => postDetailsNav()}>
            <Image
              style={{
                opacity: 0.8,
                height: hp(50),
                width: wp(100),
                alignSelf: "center",
              }}
              source={{ uri: item.item.trim() }}
              imageStyle={{ resizeMode: "cover" }}
            />
          </TouchableOpacity>
        ) : (
          <View style={{}}>
            <TouchableWithoutFeedback onPress={() => postDetailsNav()}>
              <Video
                ref={(ref) => (videoComponent = ref)}
                source={{ uri: item.item.trim() }}
                paused={isPaused}
                style={{
                  opacity: 0.8,
                  height: hp(50),
                  width: wp(100),
                  alignSelf: "center",
                }}
                repeat={true}
                onLoad={load}
                resizeMode={"cover"}
                volume={sound ? 1.0 : 0.0}
              />
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={{ position: "absolute", right: 16, bottom: Scaler(310) }}
              onPress={() => setSound(!sound)}
            >
              <Icon
                name={!sound ? "volume-mute" : "volume-high-sharp"}
                size={25}
                color="white"
              />
            </TouchableOpacity>
            {isPaused && (
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
            )}
          </View>
        )}
      </View>
    );
  };

  const onScroll = (event) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPos = event.nativeEvent.contentOffset.x;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    const current = Math.floor(xPos / totalWidth);
    setCurrentIndex(current);
    if (indexOfNextScreen !== currentIndex) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };

  const back = () => {
    setIsPaused(true);
    navigation.pop();
  };

  const theme = useTheme();
  return (
    <View style={CommonStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <View style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
        {/* <SliderBox
          style={{
            opacity: 0.8,
            height: hp(50),
            width: wp(100),
            alignSelf: "center",
          }}
          ImageComponent={FastImage}
          images={pictureUrl}
          sliderBoxHeight={hp(0)}
          dotColor="#fff"
          inactiveDotColor="lightgrey"
          dotStyle={{
            width: wp(2.8),
            height: hp(1.4),
            borderRadius: 15,
            top: hp(-12),
          }}
          onCurrentImagePressed={() =>
            navigation.navigate("PostDetailScreen", {
              postId: data.postId,
              eventType: data.eventType,
              creator: data.name,
              creatorRole: data.role,
              pictureUrl: data.pictureUrl,
              isLikes: data.isLikes,
              totalLikes: data.totalLikes,
              totalComments: data.totalComments,
              questions: data.questions,
            })
          }
        /> */}
        <View
          style={{
            opacity: 0.8,
            height: hp(50),
            width: wp(100),
            alignSelf: "center",
          }}
        >
          <FlatList
            // data={pictureUrl}
            data={
              ButtonTitle === "survey"
                ? SurveyDetailLikes[0]?.pictureUrl
                : PostDetail[0]?.pictureUrl
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => ItemView(item, index)}
            horizontal={true}
            pagingEnabled={true}
            bounces={false}
            onScroll={onScroll}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          top: Platform.OS == "android" ? hp(-46) : hp(-42),
        }}
      >
        <TouchableOpacity onPress={() => back()}>
          <Image
            source={whiteback}
            resizeMode={"contain"}
            style={{ left: 10, width: wp(7), height: hp(2.2) }}
          />
        </TouchableOpacity>
        {PostDetailLikes?.length > 0 && (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: Scaler(17),
                fontFamily: "Poppins-Medium",
              }}
            >
              {/* {PostDetailLikes[0].userData[0].name != ""
              ? `${PostDetailLikes[0].userData[0].lastName}'s Post`
              : ""} */}
              {ButtonTitle === "survey"
                ? SurveyDetailLikes[0]?.userData[0]?.name +
                  " " +
                  SurveyDetailLikes[0]?.userData[0]?.lastName +
                  "'s Post"
                : ButtonTitle === "contest" || ButtonTitle === "participate"
                ? PostDetailLikes[0]?.userData[0]?.name +
                  " " +
                  PostDetailLikes[0]?.userData[0]?.lastName +
                  "'s Post"
                : ButtonTitle === "poll"
                ? PostDetailLikes[0]?.userData[0]?.name +
                  " " +
                  PostDetailLikes[0]?.userData[0]?.lastName +
                  "'s Post"
                : PostDetailLikes[0]?.userData[0]?.name +
                  " " +
                  PostDetailLikes[0]?.userData[0]?.lastName +
                  "'s Post"}
            </Text>

            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: Scaler(14),
                fontFamily: "Poppins-Regular",
                opacity: 0.7,
              }}
            >
              {data?.postCreatedUserType}
            </Text>
          </View>
        )}
      </View>
      <View style={ChangeStyle.lorembackgroundStyle}>
        <Body contentContainerStyle={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: wp(5),
            }}
          >
            <TouchableOpacity
              onPress={() => likeOrCommentAction("like")}
              style={{ flexDirection: "row" }}
            >
              <Image
                style={CommonStyle.commenticonStyle}
                source={
                  ButtonTitle === "survey"
                    ? SurveyDetailLikes[0]?.isLikes
                      ? likeIcon
                      : likeBlackIcon
                    : ButtonTitle === "contest" || ButtonTitle === "participate"
                    ? PostDetailLikes[0]?.isLikes
                      ? likeIcon
                      : likeBlackIcon
                    : ButtonTitle === "poll"
                    ? PostDetailLikes[0]?.isLikes
                      ? likeIcon
                      : likeBlackIcon
                    : PostDetailLikes[0]?.isLikes
                    ? likeIcon
                    : likeBlackIcon
                }
                resizeMode={"contain"}
              />

              <Text
                style={[
                  CommonStyle.likeTextStyle,
                  {
                    color: data?.isLikes
                      ? theme.colors.primary
                      : theme.colors.disabledText,
                  },
                ]}
              >
                {ButtonTitle === "survey"
                  ? SurveyDetailLikes[0]?.totalLikes
                  : ButtonTitle === "contest" || ButtonTitle === "participate"
                  ? PostDetailLikes[0]?.totalLikes
                  : ButtonTitle === "poll"
                  ? PostDetailLikes[0]?.totalLikes
                  : PostDetailLikes[0]?.totalLikes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: "row", right: wp(15) }}>
              <Image
                style={CommonStyle.commenticonStyle}
                source={data?.isCommented ? commentBlue : commentIcon}
                resizeMode={"contain"}
              />
              <Text
                style={[
                  CommonStyle.commentTextStyle,
                  {
                    color: data?.isCommented
                      ? theme.colors.primary
                      : theme.colors.disabledText,
                  },
                ]}
              >
                {commentsCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigation.navigate("CommentPictureScreen")}
              onPress={() => onShare(item)}
            >
              <Image
                style={CommonStyle.commenticonStyle}
                source={postShareIcon}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              width: wp(90),
              alignSelf: "center",
              left: wp(0.9),
              fontSize: 14,
              color: "#110D26",
              fontFamily: "Poppins-Medium",
              marginTop: Scaler(10),
            }}
          >
            {data?.description}
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "#110D26",
              fontFamily: "Poppins-Medium",
              left: wp(5.5),
              marginVertical: hp(1.8),
            }}
          >
            {commentsCount} {Lang.COMMENT}
          </Text>
          <Divider
            style={{
              width: wp(90),
              alignSelf: "center",
              borderWidth: 0.5,
              borderColor: "#CECECE",
            }}
          />
          {commentDetails?.map((item, Index) => {
            return (
              <View style={{ top: hp(3) }} key={Index}>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: hp(0.5),
                    marginHorizontal: wp(4),
                  }}
                >
                  {item?.userData[0]?.profilePic == undefined ||
                  item?.userData[0]?.profilePic == null ||
                  item?.userData[0]?.profilePic?.trim() == "" ? (
                    <Image
                      style={{
                        height: Scaler(50),
                        width: Scaler(50),
                        borderRadius: Scaler(25),
                      }}
                      source={profilePic}
                      resizeMode={"contain"}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: item.userData[0]?.profilePic.trim(),
                      }}
                      style={{
                        height: Scaler(50),
                        width: Scaler(50),
                        alignItems: "center",
                        borderRadius: Scaler(25),
                        resizeMode: "cover",
                      }}
                    />
                  )}
                  <View
                    style={{
                      padding: hp(2),
                      backgroundColor: "#0000001A",
                      minHeight: Scaler(40),
                      borderRadius: Scaler(10),
                      left: Scaler(15),
                      maxWidth: "75%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        fontSize: Scaler(17),
                        alignItems: "center",
                        color: "#000",
                      }}
                    >
                      {(item?.userData[0].name ?? "") +
                        " " +
                        (item?.userData[0]?.lastName ?? "")}
                      {/* {data.name} */}
                    </Text>
                    <Text
                      style={{
                        color: "#110D26",
                        fontSize: Scaler(14),
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      {item.comments ?? ""}
                    </Text>
                    {/* <TouchableOpacity><Text>Reply</Text></TouchableOpacity> */}
                  </View>
                </View>
              </View>
            );
          })}
          <View style={{ height: hp(30) }} />
        </Body>
      </View>
      <KeyboardAvoidingView
        style={{ bottom: 0, position: "absolute" }}
        behavior={Platform.OS == "android" ? null : "padding"}
      >
        <View>
          <View style={CommonStyle.typeInboxStyle}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: Scaler(10),
              }}
            >
              <Image
                source={ProfilePic == "" ? profilePic : { uri: ProfilePic }}
                resizeMode={"contain"}
                style={{
                  height: Scaler(50),
                  width: Scaler(50),
                  alignItems: "center",
                  borderRadius: Scaler(25),
                  resizeMode: "cover",
                }}
              />
              <TextInput
                multiline={true}
                ref={inputRef}
                style={{
                  backgroundColor: "#F8F9F9",
                  flex: 1,
                  borderRadius: 10,
                  //color: "#7F8190",
                  marginHorizontal: Scaler(10),
                  padding: 10,
                }}
                placeholder={Lang.TYPE_HERE}
                placeholderTextColor={theme.colors.placeholder}
                onChangeText={(text) => setComment(text)}
                value={comment}
                returnKeyType="done"
                maxLength={240}
              />
              <TouchableOpacity
                disabled={comment.trim() == "" || commenting}
                style={{
                  height: Scaler(50),
                  width: Scaler(50),
                  borderRadius: Scaler(50),
                  alignSelf: "flex-end",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  comment.trim() !== "" && likeOrCommentAction("comment");
                }}
              >
                {commenting ? (
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.primary}
                  />
                ) : (
                  <Image
                    source={messageSendIcon}
                    resizeMode={"contain"}
                    style={{
                      height: Scaler(50),
                      width: Scaler(50),
                      borderRadius: Scaler(50),
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
