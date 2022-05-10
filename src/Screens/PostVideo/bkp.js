/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  NativeModules,
  Alert,
  Dimensions,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
const { UIManager } = NativeModules;
import { arrowBelu, whiteback } from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "react-native-paper";
import moment from "moment";
import Scaler from "../../Utils/Scaler";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import PollDetailTitle from "./Component/PollDetailTitle";
import PollDetailQuestion from "./Component/PollDetailQuestion";
import LikesAndCommentPanel from "./Component/LikesAndCommentPanel";
import { capitalizeEach, isImage } from "../../Utils/Helpers";
import useApiServices from "../../Services/useApiServices";
import Lang from "../../Language";
const width = Dimensions.get("window").width;
const height = Dimensions.get("screen").height;
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
import Video from "react-native-video";
import VideoPausedIcon from "../Community/Components/VideoPausedIcon";
import LinearGradient from "react-native-linear-gradient";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Share from "react-native-share";
import dynamicLinks from "@react-native-firebase/dynamic-links";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default function PostDetailScreen({ navigation, route }) {
  const {
    postId,
    eventType,
    creator,
    creatorRole,
    pictureUrl,
    questions,
    selectedCommunityId,
  } = route.params;

  const [isPaused, setIsPaused] = useState(true);
  console.log(
    "eventType",
    postId,
    eventType,
    creator,
    creatorRole,
    pictureUrl,
    questions
  );
  let videoComponent = useRef();
  const load = () => {
    videoComponent.seek(0);
  };

  const {
    getPollDetails,
    getSurveyDetailsById,
    getPostDetailsById,
    likeOrComment,
  } = useCommunityServices();

  const [ButtonTitle, setButtonTitle] = useState(eventType.toLowerCase());
  const [pollDetail, setPollDetail] = useState([]);
  const [PostDetail, setPostDetail] = useState([]);
  const [Question, setQuestion] = useState("");
  const [surveyDetail, setSurveyDetail] = useState([]);
  const [SurveyDetailLikes, setSurveyDetailLikes] = useState([]);
  const [PostDetailLikes, setPostDetailLikes] = useState([]);
  const [PollDetailLikes, setPollDetailLikes] = useState([]);
  const [PollDetails, setPollDetails] = useState([]);
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
    // alert(e.nativeEvent.lines.length >=2);
  }, []);

  useEffect(() => {
    console.log("creatorRole", creatorRole);
    const unsubscribe = navigation.addListener("focus", () => {
      getPost(postId, eventType);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPostDetail(postId, eventType);
    });
    return unsubscribe;
  }, []);

  const getPostDetail = async (id, type) => {
    console.log("type", type);
    if (type.toLowerCase() === "poll") {
      const res = await getPollDetails(id);
      console.log("PollDetails", res);
      setPollDetail(res);
      setPollDetailLikes(res);
      setPollDetails(res.pollDetails[0]);
      // PollDetails.userData[0].department
    } else if (type.toLowerCase() === "survey") {
      const res = await getSurveyDetailsById(id);
      setSurveyDetail(res.surveyDetails[0]);
      setSurveyDetailLikes(res.surveyDetails);
      setQuestion(res.surveyDetails[0].questions.length);
    } else if (
      type.toLowerCase() === "contest" ||
      type.toLowerCase() === "participate"
    ) {
      const res = await getPostDetailsById(id);
      setPostDetailLikes(res.postDetails);
      let temp = [...res.postDetails];
      temp.map((item) => {
        if (item.eventType == "POST") {
          item.pictureUrl = item.pictureUrlArray.reduce(
            (acc, item) => acc.concat(item.image),
            []
          );
        }
      });
      setPostDetail(temp);
    }
  };

  const getPost = async (id) => {
    const res = await getPostDetailsById(id);
    setPostDetailLikes(res.postDetails);
    let temp = [...res.postDetails];
    temp.map((item) => {
      if (item.eventType == "POST") {
        item.pictureUrl = item.pictureUrlArray.reduce(
          (acc, item) => acc.concat(item.image),
          []
        );
      }
    });
    setPostDetail(temp);
    console.log("postDetails1", PostDetail);
  };

  const likeAction = async (action) => {
    if (ButtonTitle === "survey") {
      console.log("ButtonTitle", ButtonTitle);
      let dataValue = SurveyDetailLikes;
      dataValue[0].isLikes = !dataValue[0]?.isLikes;
      dataValue[0].totalLikes = dataValue[0]?.isLikes
        ? dataValue[0].totalLikes + 1
        : dataValue[0].totalLikes - 1;
      setSurveyDetailLikes(dataValue);
    } else if (ButtonTitle === "contest" || ButtonTitle === "participate") {
      console.log("ButtonTitle", ButtonTitle);
      let dataValue = PostDetailLikes;
      dataValue[0].isLikes = !dataValue[0]?.isLikes;
      dataValue[0].totalLikes = dataValue[0]?.isLikes
        ? dataValue[0].totalLikes + 1
        : dataValue[0].totalLikes - 1;
      setPostDetailLikes(dataValue);
    } else if (ButtonTitle === "poll") {
      console.log("ButtonTitle", ButtonTitle);
      let dataValue = PostDetailLikes;
      dataValue[0].isLikes = !dataValue[0]?.isLikes;
      dataValue[0].totalLikes = dataValue[0]?.isLikes
        ? dataValue[0].totalLikes + 1
        : dataValue[0].totalLikes - 1;
      setPostDetailLikes(dataValue);
    } else {
      let dataValue = PostDetailLikes;
      dataValue[0].isLikes = !dataValue[0]?.isLikes;
      dataValue[0].totalLikes = dataValue[0]?.isLikes
        ? dataValue[0].totalLikes + 1
        : dataValue[0].totalLikes - 1;
      setPostDetailLikes(dataValue);
    }
    likeOrComment(action, postId, selectedCommunityId, "")
      .catch((error) => {
        console.log("likeOrCommentAction", error);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
      })
      .finally(() => {});
    // .finally(
    //   () => getPostDetail(postId, eventType),
    //   getPost(postId, eventType)
    // );
  };

  const optionSelection = (type, selectedPostId) => {
    let data = {
      postId: selectedPostId,
      questionId: type.id,
      eventType: "POLL",
      answer: type.choice,
    };
    console.log("optionSelection => ", data);
    ApiPostMethod("post/createSurveyAnswer", data)
      .then((res) => {
        console.log("post/createSurveyAnswer ", res);
        if (res.statusCode === 200) {
          getPostDetail(postId, eventType);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
          console.log("res.message =>", res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const commentAction = () => {
    if (ButtonTitle === "contest" || ButtonTitle === "participate") {
      console.log("PostDetail", PostDetail);
      navigation.navigate("CommentScreen", {
        data: {
          isLikes: PostDetail[0]?.isLikes,
          isCommented: PostDetail[0]?.isCommented,
          postId: PostDetail[0]._id,
          totalLikes: PostDetail[0].totalLikes,
          totalComments: PostDetail[0].totalComments,
          description: PostDetail[0]?.description,
          pictureUrl: PostDetail[0]?.pictureUrl,
          name:
            PostDetail[0]?.userData[0]?.userName +
            " " +
            PostDetail[0]?.userData[0]?.lastName,
          postCreatedUserType: PostDetail[0].postCreatedUserType,
          selectedCommunityId: PostDetail[0].communityId,
          eventType: PostDetail[0]?.eventType,
        },
        item: PostDetail,
      });
    } else if (ButtonTitle === "survey") {
      navigation.navigate("CommentScreen", {
        data: {
          isLikes: surveyDetail?.isLikes,
          isCommented: surveyDetail?.isCommented,
          postId: surveyDetail._id,
          totalLikes: surveyDetail.totalLikes,
          totalComments: surveyDetail.totalComments,
          description: surveyDetail?.description,
          pictureUrl: surveyDetail?.pictureUrl,
          name:
            surveyDetail?.userData[0]?.userName +
            " " +
            surveyDetail?.userData[0]?.lastName,
          postCreatedUserType: surveyDetail.postCreatedUserType,
          selectedCommunityId: surveyDetail.communityId,
          eventType: PostDetail[0]?.eventType,
        },
        item: surveyDetail,
      });
    } else if (ButtonTitle === "poll") {
      console.log("hii", PostDetail);
      navigation.navigate("CommentScreen", {
        data: {
          isLikes: PostDetail[0]?.isLikes,
          isCommented: PostDetail[0]?.isCommented,
          postId: PostDetail[0]._id,
          totalLikes: PostDetail[0].totalLikes,
          totalComments: PostDetail[0].totalComments,
          description: PostDetail[0]?.description,
          pictureUrl: PostDetail[0]?.pictureUrl,
          name:
            PostDetail[0]?.userData[0]?.name +
            " " +
            PostDetail[0]?.userData[0]?.lastName,
          postCreatedUserType: PostDetail[0]?.postCreatedUserType,
          selectedCommunityId: PostDetail[0]?.communityId,
          eventType: PostDetail[0]?.eventType,
        },
        item: PostDetail[0],
      });
    } else {
      console.log("hii", PostDetail);
      navigation.navigate("CommentScreen", {
        data: {
          isLikes: PostDetail[0]?.isLikes,
          isCommented: PostDetail[0]?.isCommented,
          postId: PostDetail[0]._id,
          totalLikes: PostDetail[0].totalLikes,
          totalComments: PostDetail[0].totalComments,
          description: PostDetail[0]?.description,
          pictureUrl: PostDetail[0]?.pictureUrl,
          name:
            PostDetail[0]?.userData[0]?.name +
            " " +
            PostDetail[0]?.userData[0]?.lastName,
          postCreatedUserType: PostDetail[0].postCreatedUserType,
          selectedCommunityId: PostDetail[0]?.communityId,
          eventType: PostDetail[0]?.eventType,
        },
        item: PostDetail[0],
      });
    }
  };
  ButtonTitle === "survey"
    ? surveyDetail.isLikes
    : ButtonTitle === "contest" || ButtonTitle === "participate";

  const theme = useTheme();

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

  const generateLink = async (item) => {
    console.log("itemsss", item);
    let postId = item._id;
    let eventType = item.eventType;
    var companyName = item?.userData[0].companyName
      .split(" ")
      .slice(0, -1)
      .join(" ");
    let cName =
      companyName === "" ? item?.userData[0].companyName : companyName;
    console.log("companyName", companyName);
    // const map1 = item.userData.map(x => x.companyName);
    // const items = map1
    // items.forEach((item) => {
    //   setCompName(item)
    // })
    try {
      var link = await dynamicLinks().buildShortLink(
        {
          link: `https://rehvupap.page.link/d6o5/${postId}/${eventType}/${cName}`,
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

  const shareApiHit = async(item)=>{
    console.log("helloitem", item)
    ApiGetMethod(`coach/sharePost?id=${item._id}`)
    .then((res) => {
      console.log("data", res);
    })
    .catch((error) => {
      console.assert(error);
    })
    .finally(() => setLoading(false));
  }

  const onShare = async (item) => {
    const getLink = await generateLink(item);
    const resData ={
      message: "Check out my Post",
      url: getLink,
    }
    Share.open(resData)
    .then((res) => {
      console.log("resData",res);
      shareApiHit(item)
    })
    .catch((err) => {
      err && console.log(err);
      shareApiHit(item)
    });
  };

  const ItemView = (item, index) => {
    console.log("itemssss,", item.item);
    return (
      <View key={index} style={{ flex: 1, backgroundColor: "#2d3436" }}>
        {isImage(item.item) ? (
          <View>
            <ImageBackground
              style={{ width, height }}
              source={{ uri: item.item.trim() }}
              // imageStyle={{ resizeMode: "contain" }}
              imageStyle={{ resizeMode: "contain" }}
            />
            <LinearGradient
              colors={["#000000", "transparent"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 150,
              }}
              start={{ x: 0, y: 1.0 }}
              end={{ x: 0, y: 0 }}
            />
          </View>
        ) : (
          <View style={{}}>
            <TouchableWithoutFeedback onPress={() => setIsPaused(!isPaused)}>
              <Video
                ref={(ref) => (videoComponent = ref)}
                source={{ uri: item.item.trim() }}
                paused={isPaused}
                style={{ width, height }}
                repeat={true}
                onLoad={load}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
            {isPaused && (
              <View
                style={{
                  position: "absolute",
                  alignItems: "center",
                  width: "100%",
                  height: "100%"
                }}
              >
                <VideoPausedIcon playVideo={() => setIsPaused(false)} />
              </View>
            )}
            <LinearGradient
              colors={["#000000", "transparent"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 350,
              }}
              start={{ x: 0, y: 1.0 }}
              end={{ x: 0, y: 0 }}
            />
          </View>
        )}
      </View>
    );
  };

  const takeSurvey = () => {
    if (surveyDetail.givenAnswer != 1) {
      navigation.navigate("TakeSurveyScreen", {
        questions: questions,
        surveyDetail: surveyDetail,
      });
    } else {
      SnackbarHandler.errorToast(
        Lang.MESSAGE,
        "You already participated on this survey"
      );
    }
  };

  const contestNav = () => {
    setIsPaused(true);
    navigation.navigate("ContestScreen", { postId: postId });
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <View>
          <FlatList
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
          <View
            style={{
              flexDirection: "row",
              //flex: 1,
              marginTop:
                Platform.OS === "ios"
                  ? Scaler(55)
                  : StatusBar.currentHeight + 10,
              justifyContent: "space-between",
              position: "absolute",
              width: width / 1.1,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                marginLeft: Scaler(15),
                width: Scaler(30),
                height: Scaler(30),
              }}
            >
              <Image
                source={whiteback}
                resizeMode={"contain"}
                style={{
                  width: Scaler(25),
                  height: Scaler(25),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <View style={{}}>
              {ButtonTitle == "poll" ? (
                <PollDetailTitle
                  creator={capitalizeEach(
                    PollDetails?.userData[0]?.name +
                      " " +
                      PollDetails?.userData[0]?.lastName
                  )}
                  creatorRole={PollDetails?.postCreatedUserType}
                />
              ) : ButtonTitle == "contest" ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: Scaler(16),
                    ...theme.fonts.medium,
                    left: -Scaler(10),
                  }}
                >
                  {Lang.CONTEST}
                </Text>
              ) : ButtonTitle == "survey" ? (
                <View style={{}}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontSize: Scaler(18),
                      ...theme.fonts.medium,
                      left: -10,
                    }}
                  >
                    {`${capitalizeEach(
                      surveyDetail?.userData[0]?.name +
                        " " +
                        surveyDetail?.userData[0]?.lastName
                    )}'s Post`}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontSize: Scaler(14),
                      ...theme.fonts.medium,
                      opacity: 0.8,
                      left: -10,
                    }}
                  >
                    {surveyDetail?.postCreatedUserType}
                  </Text>
                </View>
              ) : (
                <View style={{}}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontSize: Scaler(16),
                      ...theme.fonts.medium,
                    }}
                  >
                    {/* {`${capitalizeEach(PostDetailLikes[0].userData[0].name + " " + PostDetailLikes.userData[0].lastName)}'s Post`} */}
                    {capitalizeEach(
                      PostDetail[0]?.userData[0]?.name +
                        " " +
                        PostDetail[0]?.userData[0]?.lastName
                    )}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontSize: Scaler(14),
                      ...theme.fonts.medium,
                      top: hp(2.5),
                      opacity: 0.8,
                    }}
                  >
                    {/* {creatorRole} */}
                    {PostDetailLikes?.[0]?.postCreatedUserType}
                  </Text>
                </View>
              )}
            </View>
            <View />
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              //paddingBottom: Scaler(40),
              position: "absolute",
              bottom: 50,
              width: width,
            }}
          >
            {ButtonTitle == "survey" ? (
              <View style={{ justifyContent: "flex-end" }}>
                <Text
                  style={{
                    lineHeight: 25,
                    alignSelf: "center",
                    color: "#fff",
                    fontSize: Scaler(14),
                    ...theme.fonts.medium,
                    left: 10,
                    width: wp(95),
                  }}
                  onTextLayout={onTextLayout}
                  numberOfLines={textShown ? undefined : 2}
                >
                  {surveyDetail?.description}
                </Text>
                {lengthMore ? (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        padding: 5,
                        paddingHorizontal: 10,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        borderRadius: 5,
                      }}
                      activeOpacity={0.8}
                      onPress={() => setTextShown(!textShown)}
                    >
                      <Text style={{ lineHeight: 21, color: "#ffff" }}>
                        {textShown ? Lang.READ_LESS : Lang.READ_MORE}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#F0635A",
                      width: Scaler(120),
                      height: Scaler(60),
                      borderRadius: 15,
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: Scaler(12),
                        ...theme.fonts.regular,
                        opacity: 0.8,
                      }}
                    >
                      {Lang.EXPIRES_ON}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: Scaler(19),
                        ...theme.fonts.medium,
                      }}
                    >
                      {moment(surveyDetail?.expiresDateOn)?.format("MMM, DD")}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        surveyDetail.givenAnswer != 1 ? "#4D39E9" : "gray",
                      width: wp(50),
                      height: hp(7.5),
                      borderRadius: 15,
                    }}
                    onPress={() => takeSurvey()}
                  >
                    <View style={{ left: 10, top: hp(1) }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: Scaler(15),
                          ...theme.fonts.medium,
                        }}
                      >
                        {Lang.TAKE} {ButtonTitle.toUpperCase()}
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: Scaler(14),
                          ...theme.fonts.medium,
                          opacity: 0.9,
                        }}
                      >
                        {Question} {Lang.QUESTIONS}
                      </Text>
                      {surveyDetail.givenAnswer != 1 ? (
                        <Image
                          style={{
                            alignSelf: "flex-end",
                            height: hp(3),
                            width: wp(18),
                            top: Platform.OS == "ios" ? -30 : -35,
                          }}
                          source={arrowBelu}
                          resizeMode={"contain"}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : ButtonTitle == "contest" ? (
              <View style={{ justifyContent: "flex-end" }}>
                <Text
                  style={{
                    lineHeight: 30,
                    alignSelf: "center",
                    color: "#fff",
                    fontSize: Scaler(16),
                    ...theme.fonts.medium,
                    left: 10,
                    width: wp(95),
                  }}
                >
                  {PostDetail?.description}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#F0635A",
                      width: wp(40),
                      height: hp(7.5),
                      borderRadius: 15,
                    }}
                  >
                    <View style={{ top: hp(1), alignSelf: "center" }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: Scaler(15),
                          ...theme.fonts.medium,
                          textAlign: "center",
                          opacity: 0.9,
                        }}
                      >
                        {Lang.EXPIRES_ON}
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: Scaler(14),
                          textAlign: "center",
                          ...theme.fonts.medium,
                        }}
                      >
                        {moment(PostDetail?.expiresDateOn)?.format("MMM, DD")}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => contestNav()}
                    style={{
                      backgroundColor: "#4D39E9",
                      width: wp(50),
                      height: hp(7.5),
                      borderRadius: 15,
                    }}
                  >
                    <View style={{ left: 10, top: 10 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: Scaler(15),
                          ...theme.fonts.medium,
                        }}
                      >
                        {/* {ButtonTitle} */}
                        {Lang.PARTICIPATE}
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: Scaler(13),
                          ...theme.fonts.medium,
                          opacity: 0.9,
                        }}
                      >
                        {Lang.GET_REWARDED}
                      </Text>
                      <Image
                        style={{
                          alignSelf: "flex-end",
                          height: hp(3),
                          width: wp(18),
                          top: Platform.OS == "ios" ? -30 : -35,
                        }}
                        source={arrowBelu}
                        resizeMode={"contain"}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <PollDetailQuestion
                pollDetail={pollDetail}
                options={pollDetail.choices}
                onOptionSelection={(opt) => optionSelection(opt, postId)}
              />
            )}

            <LikesAndCommentPanel
              isLikes={
                ButtonTitle === "survey"
                  ? SurveyDetailLikes?.[0]?.isLikes
                  : ButtonTitle === "contest" || ButtonTitle === "participate"
                  ? PostDetailLikes?.[0]?.isLikes
                  : ButtonTitle === "poll"
                  ? PostDetailLikes?.[0]?.isLikes
                  : PostDetailLikes?.[0]?.isLikes
              }
              isCommented={
                ButtonTitle === "survey"
                  ? surveyDetail?.isCommented
                  : PostDetailLikes[0]?.isCommented
              }
              totalLikes={
                ButtonTitle === "survey"
                  ? SurveyDetailLikes?.[0]?.totalLikes
                  : ButtonTitle === "contest" || ButtonTitle === "participate"
                  ? PostDetailLikes?.[0]?.totalLikes
                  : ButtonTitle === "poll"
                  ? PostDetailLikes?.[0]?.totalLikes
                  : PostDetailLikes?.[0]?.totalLikes
              }
              totalComments={
                ButtonTitle === "contest" || ButtonTitle === "participate"
                  ? PostDetailLikes?.[0]?.totalComments
                  : ButtonTitle === "survey"
                  ? SurveyDetailLikes?.[0]?.totalComments
                  : PostDetailLikes?.[0]?.totalComments
              }
              eventType={eventType}
              onLike={() => likeAction("like", SurveyDetailLikes?.length)}
              onComment={commentAction}
              onShare={() =>
                onShare(
                  ButtonTitle === "survey"
                    ? SurveyDetailLikes[0]
                    : ButtonTitle === "poll"
                    ? PollDetails?.[0]
                    : PostDetail?.[0]
                )
              }
            />
          </View>
        </View>
      )}
    </View>
  );
}
