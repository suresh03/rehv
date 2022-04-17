/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Children,
} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import {
  settingIcon,
  requesBlanktIcon,
  croshGray,
  profilePic,
  Edit,
  oneIcon,
  twoIcon,
  threeIcon,
  fourIcon,
  fiveIcon,
  sevenIcon,
  twelveIcon,
} from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeaderWithBackAction } from "../../Components/CustomHeader/Header";
import Body from "../../Components/SharedComponents/Body";
import { ActivityIndicator, useTheme } from "react-native-paper";
import Share from "react-native-share";
import Spacer from "../../Components/SharedComponents/Space";
import Scaler from "../../Utils/Scaler";
import { getFromLocal } from "../../Utils/LocalStorage";
import useApiServices from "../../Services/useApiServices";
import Lang from "../../Language";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import MyPostCard from "../Dashboard/Components/MyPostCard";
import FastImage from "react-native-fast-image";
import SnackbarHandler from "../../Utils/SnackbarHandler";


export default function DashboardScreen({ navigation }) {
  const [postButton, setpostButton] = useState(true);
  const [activitiesButton, setactivitiesButton] = useState(false);
  const [requestButton, setrequestButton] = useState(false);
  const { ApiGetMethod, ApiPostMethod } = useApiServices();
  const [requestList, setRequestList] = useState([]);
  const [getAcceptBtnLoading, setAcceptBtnLoading] = useState(false);
  const [getIndex, setIndex] = useState(null);
  const [getBtnType, setBtnType] = useState("");
  const [postData, setPostData] = useState([]);
  const [ActivitiesPostData, setActivitiesPostData] = useState([]);
  const [name, setName] = useState("");
  const [profilePics, setProfilePic] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [getAchievements, setAchievements] = useState([
    {
      title: "1",
      image: oneIcon,
    },
    {
      title: "2",
      image: twoIcon,
    },
    {
      title: "3",
      image: oneIcon,
    },
    {
      title: "4",
      image: threeIcon,
    },
    {
      title: "5",
      image: twelveIcon,
    },
    {
      title: "6",
      image: fiveIcon,
    },
    {
      title: "7",
      image: fourIcon,
    },
    {
      title: "8",
      image: sevenIcon,
    },
  ]);
  const { likeOrCommentHome } = useCommunityServices();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const [lengthMore, setLengthMore] = useState(false);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text

  const colorChange = (type) => {
    if (type == "post") {
      setpostButton(true);
      setactivitiesButton(false);
      setrequestButton(false);
    } else if (type == "act") {
      setpostButton(false);
      setactivitiesButton(true);
      setrequestButton(false);
    } else {
      setpostButton(false);
      setactivitiesButton(false);
      setrequestButton(true);
    }
  };
  // const profileClick = (type) => {
  //   console.log("type=====>", type);
  //   if (type == "EX Coach") {
  //     navigation.navigate("ExCoachProfileScreen");
  //   } else if (type == "Manager") {
  //     navigation.navigate("MemberProfileScreen");
  //   }
  // };

  const getMyProfile = async () => {
    try {
      const resp = await ApiGetMethod(`user/getUserDetails`);
      console.log("resp", resp);
      const profile = resp.data[0];
      setName(profile.name + " " + profile.lastName);
      setProfilePic(profile.profilePic);
      setRole(profile.role);
      setDepartment(profile.department);
      setDescription(profile.profileDescription);
      setFollowers(profile.followers);
      setFollowing(profile.following);
      getRequestListFunction();
      global.userDepartment = profile.role;
      global.loginCompany = profile.companyName;
      global.companyDescription = profile.profileDescription;
      global.userId = profile._id;
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPostList = () => {
    ApiGetMethod(`post/myPostList`).then((res) => {
      console.log("get post/myPostList list => ", JSON.stringify(res));
      let temp = [...res.data.myPost];
      temp.map((item) => {
        if (item.eventType == "POST") {
          item.pictureUrl = item.pictureUrlArray.reduce(
            (acc, item) => acc.concat(item.image),
            []
          );
        }
      });
      var result = [];
      const myData = []
        .concat(temp)
        .sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1))
        .map((item, i) => result.push(item));
      console.log("tempu", temp);
      setPostData(result);
    });
  };

  const getMyActivities = () => {
    ApiGetMethod(`post/activitiesList`).then((res) => {
      console.log("get post/ActivitiesPostData list => ", res);
      setActivitiesPostData(res.data.activitiesList);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMyPostList();
      getMyActivities();
      getMyProfile();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getMyPostList();
  }, []);

  const likeOrCommentAction = async (action, val, postId, index, flag) => {
    console.log("wkfposwkfoikwj", action, val, postId, index);
    let dataValue = flag === "MyPost" ? postData:ActivitiesPostData;
    dataValue[index].isLikes = !dataValue[index].isLikes;
    dataValue[index].totalLikes = dataValue[index].isLikes
      ? dataValue[index].totalLikes + 1
      : dataValue[index].totalLikes - 1;
    setPostData(dataValue);
    likeOrCommentHome(action, postId, val)
      .catch((error) => {
        console.log("like Action Error ", error);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      //.finally(() => getTrendingPostList());
      .finally(() => console.log());
  };

  const profileClick = (role, _id) => {
    if (role.toLowerCase() == "excoach") {
      navigation.navigate("ExCoachProfileScreen", { _id });
    } else {
      navigation.navigate("MemberProfileScreen", { _id });
    }
  };

  const _deletePost = async (id) => {
    ApiPostMethod("post/deletePost", { postId: id })
      .then((resp) => {
        SnackbarHandler.successToast(Lang.MESSAGE, resp.message);
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => getMyPostList());
  };

  const getRequestListFunction = () => {
    ApiGetMethod(`coach/requestList`).then((res) => {
      console.log("get request list => " + JSON.stringify(res));
      setRequestList(res.data.requestList);
    });
  };

  const acceptRequest = async (senderID, requestId, index, status, type) => {
    setAcceptBtnLoading(true);
    setIndex(index);
    setBtnType(type);
    try {
      const resp = await ApiPostMethod("user/acceptFriendRequest", {
        senderId: senderID,
        status: status,
        requestId: requestId,
      });
      console.log("resp block => ", resp);
      if (resp.statusCode === 200) {
        console.log("follow request success");
        getMyProfile();
      }
      setIndex(null);
      setAcceptBtnLoading(false);
      getRequestListFunction();
    } catch (error) {
      console.log(error);
      setIndex(null);
      setAcceptBtnLoading(false);
    }
  };



  const renderFollowRequest = ({ item, Index }) => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: Scaler(10),
          flexDirection: "row",
          width: wp(96),
          height: Scaler(100),
          justifyContent: "space-between",
          borderBottomColor: "grey",
          borderBottomWidth: Scaler(0.5),
          alignSelf: "center",
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          {item?.userData[0]?.profilePic?.trim() == "" ||
          item?.userData[0]?.profilePic == undefined ||
          item?.userData[0]?.profilePic == null ? (
            <FastImage
              style={{
                height: Scaler(50),
                width: Scaler(50),
                resizeMode: "cover",
                borderRadius: Scaler(25),
              }}
              source={profilePic}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <View
              style={{
                height: Scaler(60),
                width: Scaler(60),
                borderRadius: Scaler(30),
              }}
            >
              <FastImage
                style={{
                  height: Scaler(50),
                  width: Scaler(50),
                  resizeMode: "cover",
                  borderRadius: Scaler(25),
                }}
                source={{ uri: item?.userData[0]?.profilePic }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          )}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                width: "50%",
                alignItems: "flex-start",
                justifyContent: "center",
                marginLeft:Scaler(8)
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-SemiBold",
                  color: "#110D26",
                }}
              >
                {item?.userData[0].name} {item?.userData[0]?.lastName}
              </Text>
              <Text
                style={{
                  color: "#7F8190",
                  fontSize: 12,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {item?.userData[0]?.department}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "row",
                width: "50%",
                height: hp(5),
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  acceptRequest(
                    item.senderId,
                    item._id,
                    Index,
                    "Accepted",
                    "Button"
                  )
                }
                style={{
                  backgroundColor: "#110D26",
                  width: wp(25),
                  height: hp(5),
                  alignSelf: "flex-end",
                  right: wp(5),
                  borderRadius: Scaler(10),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getIndex === Index &&
                getBtnType === "Button" &&
                getAcceptBtnLoading ? (
                  <ActivityIndicator color="#FFFF" size="small" />
                ) : (
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: Scaler(16),
                      paddingHorizontal: Scaler(10),
                      textAlign: "center",
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    {Lang.ACCEPT}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  acceptRequest(
                    item.senderId,
                    item._id,
                    Index,
                    "Rejected",
                    "Close"
                  )
                }
              >
                {getIndex === Index &&
                getBtnType === "Close" &&
                getAcceptBtnLoading ? (
                  <ActivityIndicator color="grey" size="small" />
                ) : (
                  <FastImage
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={croshGray}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const theme = useTheme();

  const renderAcheivements = () => {
    return (
      <View style={{}}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: wp(7),
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: Scaler(18),
              fontFamily: "Poppins-SemiBold",
              color: "#000",
            }}
          >
            {Lang.ACHIEVEMENTS}
          </Text>
          <TouchableOpacity
            //onPress={() => navigation.navigate("FollowingScreen")}
            onPress={() => navigation.navigate("Acheivement")}
            style={{
              paddingHorizontal: 10,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 5,
              backgroundColor: "#EEEBFF",
            }}
          >
            <Text
              style={{
                color: "#4D39E9",
                textAlign: "center",
                fontSize: Scaler(12),
                fontFamily: "Poppins-Medium",
              }}
            >
              {Lang.VIEW_ALL}
            </Text>
          </TouchableOpacity>
        </View>
        {getAchievements.length > 0 ? (
          <View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: Scaler(14),
                  alignSelf: "center",
                  color: "#110D26",
                  width: wp(86),
                  fontFamily: "Poppins-Regular",
                }}
              >
                {Lang.RECENT}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: wp(7),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Children.toArray(
                  getAchievements.map((item) => {
                    return (
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          margin: 5,
                        }}
                      >
                        <FastImage
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                          }}
                          source={item.image}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                    );
                  })
                )}
              </ScrollView>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  marginTop: 10,
                  borderWidth: 0.6,
                  borderColor: "lightgray",
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const renderInsights = () => {
    return (
      <View style={{}}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: wp(7),
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: Scaler(18),
              fontFamily: "Poppins-SemiBold",
              color: "#000",
            }}
          >
            RehvUp {Lang.INSIGHTS}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: wp(7),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Personal")}
              style={{
                width: "48%",
                height: 40,
                borderRadius: 10,
                backgroundColor: "#FFFF",
                borderWidth: 1,
                borderColor: "lightgray",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "80%",
                  height: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <FastImage
                  style={{ width: 30, height: 30, marginHorizontal: 5 }}
                  source={require("../../Assets/Images/empolyeeId.png")}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text
                  style={{
                    color: "#4D39E9",
                    textAlign: "center",
                    fontSize: Scaler(13),
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {Lang.PERSONAL}
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FastImage
                  source={require("../../Assets/Images/rightdropdwon.png")}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{ width: "80%", height: "50%" }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("InsightCompanyScreen")}
              style={{
                width: "48%",
                height: 40,
                borderRadius: 10,
                backgroundColor: "#FFFF",
                borderWidth: 1,
                borderColor: "lightgray",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "80%",
                  height: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <FastImage
                  style={{ width: 30, height: 30, marginHorizontal: 5 }}
                  source={require("../../Assets/Images/companyIcon.png")}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text
                  style={{
                    color: "#4D39E9",
                    textAlign: "center",
                    fontSize: Scaler(13),
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {Lang.COMPANY_OPTION}
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FastImage
                  source={require("../../Assets/Images/rightdropdwon.png")}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{ width: "80%", height: "50%" }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              marginTop: 15,
              borderWidth: 0.6,
              borderColor: "lightgray",
            }}
          />
        </View>
      </View>
    );
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
  }, []);

  const listHeaderRender = () => {
    return (
      <View style={{ top: hp(2) }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            {profilePics != "" ? (
              <FastImage
                style={{
                  overflow: "hidden",
                  width: 115,
                  height: 115,
                  left: wp(5),
                  top: hp(1),
                  borderRadius: 60,
                }}
                source={{ uri: profilePics }}
              />
            ) : (
              <FastImage
                style={{
                  overflow: "hidden",
                  width: 115,
                  height: 115,
                  left: wp(5),
                  top: hp(1),
                  borderRadius: 60,
                }}
                source={profilePic}
              />
            )}

            {/* <View
              style={{
                width: wp(20),
                height: hp(17),
                alignSelf: "flex-start",
                zIndex: 1,
                right: wp(10),
                top: Platform.OS == "ios" ? 50 : 50,
                backgroundColor:'red'
              }}
              //source={balckCamera}
            /> */}
          </View>
          <View
            style={{
              alignSelf: "center",
              left: 40,
              width: "55%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                width: "82%",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: Scaler(22),
                  fontFamily: "Poppins-SemiBold",
                  color: "#000",
                }}
              >
                {name}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfileScreen")}
                style={{
                  width: Scaler(50),
                  resizeMode: "contain",
                  backgroundColor: "#fff",
                }}
              >
                <FastImage
                  style={{
                    width: wp(8),
                    height: hp(2.5),
                    left: wp(7.5),
                    top: hp(1),
                  }}
                  source={Edit}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "green",
                  marginTop: Platform.OS == "ios" ? hp(1) : hp(0),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  width: "48%",
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: Scaler(10),
                    color: "#FFFF",
                    fontFamily: "Poppins-Medium",
                    marginHorizontal: hp(0.1),
                  }}
                >
                  {role + (department == "H.R." ? ",  " + department : "")}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#FFFF",
                  marginTop: Platform.OS == "ios" ? hp(1) : hp(0),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  width: "48%",
                  elevation: 5,
                  marginLeft: 5,
                  paddingVertical: 2,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: Scaler(16),
                    color: "#4D39E9",
                    fontFamily: "Poppins-SemiBold",
                    marginHorizontal: hp(0.1),
                  }}
                >
                  3.32
                </Text>
                <Text
                  style={{
                    fontSize: Scaler(13),
                    color: "#4D39E9",
                    fontFamily: "Poppins-Regular",
                    marginHorizontal: hp(0.1),
                  }}
                >
                  {" "}
                  ES
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                top: Platform.OS == "ios" ? hp(1.8) : hp(1),
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("FollowingScreen")}
                style={{
                  width: "48%",
                  alignSelf: "center",
                  borderRadius: Scaler(15),
                  backgroundColor: "#EEEBFF",
                }}
              >
                <Text
                  style={{
                    color: "#4D39E9",
                    textAlign: "center",
                    fontSize: Scaler(20),
                    fontFamily: "Poppins-SemiBold",
                    top: Platform.OS == "ios" ? hp(0.1) : hp(0.5),
                  }}
                >
                  {following}
                </Text>
                <Text
                  style={{
                    color: "#110D26",
                    textAlign: "center",
                    fontSize: Scaler(12),
                    fontFamily: "Poppins-Medium",
                    top: hp(-0.5),
                  }}
                >
                  {Lang.FOLLOWING}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("FollowerScreen")}
                style={{
                  width: "48%",
                  alignSelf: "center",
                  borderRadius: Scaler(15),
                  backgroundColor: "#EEEBFF",
                }}
              >
                <Text
                  style={{
                    color: "#4D39E9",
                    textAlign: "center",
                    fontSize: Scaler(20),
                    fontFamily: "Poppins-SemiBold",
                    top: Platform.OS == "ios" ? hp(0.1) : hp(0.5),
                  }}
                >
                  {followers}
                </Text>
                <Text
                  style={{
                    color: "#110D26",
                    textAlign: "center",
                    fontSize: Scaler(12),
                    fontFamily: "Poppins-Medium",
                    top: hp(-0.5),
                  }}
                >
                  {Lang.FOLLOWERS}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ marginTop: hp(3) }}>
          <Text
            style={{
              fontSize: Scaler(14),
              alignSelf: "center",
              color: "#110D26",
              width: wp(86),
              fontFamily: "Poppins-Regular",
            }}
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 2}
          >
            {description}
          </Text>
          {lengthMore ? (
            <View
              style={{
                width: wp(100),
                alignItems: "flex-end",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 5,
                  paddingHorizontal: 10,
                  // backgroundColor: "#EEEBFF",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                }}
                activeOpacity={0.8}
                onPress={() => setTextShown(!textShown)}
              >
                <Text style={{ lineHeight: 21, color: "#000" }}>
                  {textShown ? Lang.READ_LESS : Lang.READ_MORE}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        {renderAcheivements()}
        {renderInsights()}

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginVertical: hp(1.5),
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              justifyContent: "space-between",
              borderRadius: 60,
              borderWidth: 1,
              borderColor: "#E9E5E4",
              overflow: "hidden",
              height: Scaler(42),
              width: wp(94),
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => colorChange("post")}
              style={{
                backgroundColor: postButton ? "#4D39E9" : "#fff",
                width: "30%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                height: Scaler(40),
              }}
            >
              <Text
                style={{
                  color: postButton ? "#FFFFFF" : "#000000",
                  fontFamily: "Poppins-Medium",
                  fontSize: Scaler(13),
                }}
              >
                {Lang.MY_POST}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => colorChange("act")}
              style={{
                backgroundColor: activitiesButton ? "#4D39E9" : "#fff",
                width: "30%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                height: Scaler(40),
              }}
            >
              <Text
                style={{
                  color: activitiesButton ? "#FFFFFF" : "#000000",
                  fontFamily: "Poppins-Medium",
                  fontSize: Scaler(13),
                }}
              >
                {Lang.ACTIVITIES}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => colorChange("req")}
              style={{
                backgroundColor: requestButton ? "#4D39E9" : "#fff",
                width: "30%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
                height: Scaler(40),
              }}
            >
              <Text
                style={{
                  color: requestButton ? "#FFFFFF" : "#000000",
                  fontFamily: "Poppins-Medium",
                  fontSize: Scaler(13),
                }}
              >
                {Lang.REQUEST}
              </Text>
            </Pressable>
          </View>
        </View>
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
                width: wp(90),
                alignSelf: "center",
                fontSize: 17,
                fontFamily: "Poppins-Medium",
                color: "#7F8190",
                top: hp(-12),
              }}
            >
              {Lang.NO_REQUEST}
            </Text>
          </View>
        </View>
      </Body>
    );
  };

  const EmptyListMessage2 = () => {
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
            <Image
              source={requesBlanktIcon}
              resizeMode={"contain"}
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
                width: wp(90),
                alignSelf: "center",
                fontSize: 17,
                fontFamily: "Poppins-Medium",
                color: "#7F8190",
                top: hp(-12),
              }}
            >
              {Lang.NO_ACTIVITIES}
            </Text>
          </View>
        </View>
      </Body>
    );
  };

  const EmptyListMessage3 = () => {
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
            <Image
              source={requesBlanktIcon}
              resizeMode={"contain"}
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
                width: wp(90),
                alignSelf: "center",
                fontSize: 17,
                fontFamily: "Poppins-Medium",
                color: "#7F8190",
                top: hp(-12),
              }}
            >
              {Lang.NO_REQUESTS}
            </Text>
          </View>
        </View>
      </Body>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: theme.colors.primary }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={CommonStyle.container}>
          <HeaderWithBackAction
            onPress={
              () =>
                navigation.navigate("SettingScreen", { department: department })
              // navigation.navigate("EditProfileScreen")
            }
            tittle_nav={true}
            tittle={Lang.PROFILE}
            leftNav={true}
            // backstyle={{ width: 25, height: 25 }}
            // leftImage={Edit}
            leftImage={settingIcon}
          />
          <View style={{ flex: 1 }}>
            <View>
              {activitiesButton == true ? (
                <View>
                  <MyPostCard
                  data={ActivitiesPostData}
                  profileClick={(role, id) => profileClick(role, id)}
                  onLike={(action, val, postId, index) =>
                      likeOrCommentAction(action, val, postId, index, "MyActivities")
                    }
                  onDeletePost={(id) => _deletePost(id)}
                  flag="MyActivities"
                  listHeader={() => listHeaderRender()}
                  EmptyList={() => EmptyListMessage()}
                />
                </View>
              ) : postButton == true ? (
                <View>
                  <MyPostCard
                    data={postData}
                    profileClick={(role, id) => profileClick(role, id)}
                    onLike={(action, val, postId, index) =>
                      likeOrCommentAction(action, val, postId, index, "MyPost")
                    }
                    onDeletePost={(id) => _deletePost(id)}
                    flag="MyPost"
                    listHeader={() => listHeaderRender()}
                    EmptyList={() => EmptyListMessage()}
                  />
                </View>
              ) : (
                <FlatList
                  data={requestList}
                  renderItem={renderFollowRequest}
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent={listHeaderRender}
                  ListEmptyComponent={EmptyListMessage3}
                  ListFooterComponent={() => {
                    return <View style={{ width: 50, height: 50 }} />;
                  }}
                  showsVerticalScrollIndicator={false}
                />
              )}
              <Spacer size={Scaler(220)} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
