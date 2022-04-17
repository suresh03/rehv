/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { Calendar, profilePic, communityBlankIcon } from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import { getFontSize } from "../../Components/SharedComponents/ResponsiveSize";
import Share from "react-native-share";
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import Spacer from "../../Components/SharedComponents/Space";
import { useAppValue } from "../../Recoil/appAtom";
import Lang from "../../Language";
import ProfilePost from "./Components/ProfilePost";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";

export default function ExCoachProfileScreen({ navigation, route }) {
  const { ApiGetMethod, ApiPostMethod } = useApiServices();
  const [manegemnetButton, setmanegemnetButton] = useState(true);

  const [userData, setUserData] = useState({});
  const [getBtnLoading, setBtnLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const [postData, setPostData] = useState([]);

  const { likeOrCommentHome } = useCommunityServices();
  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const { user } = useAppValue();
  const { role } = user;
  console.log("role", role);

  console.log("hi", route.params);
  const onShare = async () => {
    await Share.open({
      message: "Check out my Post",
    })
      .then((result) => console.log("neeraj==>", result))
      .catch((errorMsg) => console.log(errorMsg));
  };

  const getUserData = () => {
    ApiGetMethod(`user/getUserDetails?userId=${route.params._id}`).then(
      (res) => {
        console.log("user/getUserDetails", res);
        setUserData(res.data[0]);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  const followFunction = async (id) => {
    setBtnLoading(true);
    console.log(id);
    try {
      const resp = await ApiPostMethod("user/sendFriendRequest", {
        receiverId: id,
      });
      console.log("resp block => ", resp);
      if (resp.statusCode) {
        console.log("follow request success");
      }
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };

  const removeUserFunction = async (item) => {
    setBtnLoading(true);
    try {
      const resp = await ApiPostMethod("user/unfollow", {
        senderId: item.user_Id ?? item?._id,
      });
      console.log("followFunction =>", resp);
      if (resp?.statusCode === 200) {
        item.isFollower = false;
      }
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };

  const unFollowUserFunction = async (item) => {
    setBtnLoading(true);
    try {
      const resp = await ApiPostMethod("user/unfriend", {
        receiverId: item.user_Id ?? item?._id,
      });
      console.log("followFunction =>", resp);
      if (resp?.statusCode === 200) {
        item.isFollowing = false;
      }
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getHomePostList();
      getTrendingPostList();
    });
    return unsubscribe;
  }, []);

  const getHomePostList = () => {
    let status = "Home";
    ApiGetMethod(`post/homeAndTrendingPostList?status=${status}`)
      .then((res) => {
        let temp = [...res?.data?.postList];
        temp.map((item) => {
          if (item.eventType == "POST") {
            item.pictureUrl = item.pictureUrlArray.reduce(
              (acc, item) => acc.concat(item.image),
              []
            );
          }
        });
        setPostData(temp);
      })
      .catch((error) => {
        SnackbarHandler.errorToast("Message", JSON.stringify(error));
      })
      .finally(() => setLoading(false));
  };

  const getTrendingPostList = () => {
    let status = "Trending";
    ApiGetMethod(`post/homeAndTrendingPostList?status=${status}`)
      .then((res) => {
        console.log("homeAndTrendingPostList res => ", res);
        let temp = [...res?.data?.postList];
        temp.map((item) => {
          if (item.eventType == "POST") {
            item.pictureUrl = item.pictureUrlArray.reduce(
              (acc, item) => acc.concat(item.image),
              []
            );
          }
        });
        setPostData(temp);
      })
      .catch((error) => {
        SnackbarHandler.errorToast("Message", JSON.stringify(error));
      })
      .finally(() => setLoading(false));
  };

  const ChangeButton = (item) => {
    if (item === "NewsFeed") {
      setmanegemnetButton(true);
      getHomePostList();
    } else {
      setmanegemnetButton(false);
      getTrendingPostList();
    }
  };

  const likeOrCommentAction = async (action, val, postId, index) => {
    console.log(action, val, postId, index);
    let dataValue = postData;
    dataValue[index].isLikes = !dataValue[index].isLikes;
    dataValue[index].totalLikes = dataValue[index].isLikes
      ? dataValue[index].totalLikes + 1
      : dataValue[index].totalLikes - 1;
    setPostData(dataValue);
    likeOrCommentHome(action, postId, val)
      .catch((error) => {
        console.log("like Action Error ", error);
        SnackbarHandler.errorToast(Lang.MESSAGE, error.message);
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
        if (resp.status === 200) {
          SnackbarHandler.successToast(Lang.MESSAGE, resp.message);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, resp.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => getHomePostList());
  };

  const listHeaderRender = () => {
    return (
      <>
        {userData?.profilePic == undefined ||
        userData?.profilePic == null ||
        userData?.profilePic?.trim() == "" ? (
          <Image
            style={{
              alignSelf: "center",
              width: Scaler(200),
              height: Scaler(200),
              borderRadius: Scaler(100),
              alignSelf: "center",
            }}
            source={profilePic}
            resizeMode={"cover"}
          />
        ) : (
          <Image
            source={{
              uri: userData.profilePic.trim(),
            }}
            style={{
              width: Scaler(200),
              height: Scaler(200),
              borderRadius: Scaler(100),
              alignSelf: "center",
            }}
          />
        )}
        <Text
          style={{
            textAlign: "center",
            marginVertical: hp(2),
            color: "#110D26",
            fontSize: getFontSize(20),
            fontFamily: "Poppins-SemiBold",
          }}
        >
          {(userData.name ?? "") + " " + (userData.lastName ?? "")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              //right: wp(2),
              color: "#7F8190",
              fontSize: getFontSize(18),
              fontFamily: "Poppins-Medium",
            }}
          >
            {userData.role}
          </Text>
          {/* {userData.department && (
            <View
              style={{
                backgroundColor: "#EEEBFF",
                left: wp(2),
                borderRadius: 12,
                padding: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#4D39E9",
                  fontSize: getFontSize(17),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {userData.department}
              </Text>
            </View>
          )} */}
        </View>
        <Spacer />
        {userData?.employeeStartFrom !== "false" && (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginVertical: hp(2),
              borderWidth: 1.5,
              padding: 5,
              borderRadius: 10,
              borderColor: "#E9E5E4",
            }}
          >
            <Image
              source={Calendar}
              resizeMode={"contain"}
              style={{ width: wp(10), height: hp(3) }}
            />
            <Text
              style={{
                top: hp(0.4),
                alignItems: "center",
                color: "#110D26",
                fontFamily: "Poppins-Medium",
              }}
            >
              {userData?.employeeStartFrom}
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 5,
          }}
        >
          <TouchableOpacity
            disabled={userData?.requestPending || getBtnLoading}
            onPress={() =>
              userData?.isFollower
                ? removeUserFunction(userData)
                : userData?.isFollowing
                ? unFollowUserFunction(userData)
                : followFunction(userData._id)
            }
            style={{
              borderRadius: 10,
              width: wp(45),
              height: hp(6.5),
              backgroundColor: "#110D26",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {getBtnLoading ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Text
                style={{
                  alignItems: "center",
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontSize: getFontSize(16),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {userData?.isFollower
                  ? Lang.REMOVE_USER
                  : userData?.requestPending
                  ? Lang.REQUEST_SENT
                  : userData?.isFollowing
                  ? Lang.UNFOLLOW
                  : Lang.FOLLOW}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              width: wp(45),
              height: hp(6.5),
              backgroundColor: "#0000001A",
            }}
            onPress={() =>
              navigation.navigate("ChatScreen", {
                item: {
                  userId: userData?._id,
                  name: userData?.name + " " + userData?.lastName,
                  profilePic: userData?.profilePic,
                  role: userData.role,
                },
              })
            }
          >
            <Text
              style={{
                top: hp(2),
                alignItems: "center",
                color: "#110D26",
                textAlign: "center",
                fontSize: getFontSize(16),
                fontFamily: "Poppins-Medium",
              }}
            >
              {Lang.SEND_MESSAGE}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            top: hp(2),
            alignItems: "center",
            color: "#110D26",
            fontFamily: "Poppins-Medium",
            fontSize: getFontSize(18),
            marginHorizontal: wp(4),
          }}
        >
          {Lang.DESCRIPTION}
        </Text>
        <Text
          style={{
            marginVertical: Scaler(10),
            fontFamily: "Poppins-Regular",
            alignItems: "center",
            color: "#110D26",
            lineHeight: 30,
            fontSize: getFontSize(15),
            marginHorizontal: wp(4),
          }}
        >
          {userData.profileDescription === ""
            ? "There is no any description"
            : userData.profileDescription}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            marginVertical: 10,
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
              height: hp(6),
              width: wp(90),
            }}
          >
            <Pressable
              // onPress={() => setmanegemnetButton(true)}
              onPress={() => ChangeButton("NewsFeed")}
              style={{
                backgroundColor: manegemnetButton ? "#4D39E9" : "#fff",
                width: "45%",
                alignItems: "center",
                justifyContent: "center",
                top: hp(0.5),
                borderRadius: 50,
                height: hp(4.5),
                left: 5,
              }}
            >
              <Text
                style={{
                  color: manegemnetButton ? "#FFFFFF" : "#000000",
                  fontSize: getFontSize(15),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {Lang.NEWS_FEED}
              </Text>
            </Pressable>
            <Pressable
              // onPress={() => setmanegemnetButton(false)}
              onPress={() => ChangeButton("Trending")}
              style={{
                backgroundColor: !manegemnetButton ? "#4D39E9" : "#fff",
                width: "45%",
                alignItems: "center",
                justifyContent: "center",
                top: hp(0.5),
                borderRadius: 50,
                height: hp(4.5),
                right: 5,
              }}
            >
              <Text
                style={{
                  color: !manegemnetButton ? "#FFFFFF" : "#000000",
                  fontSize: getFontSize(15),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {Lang.TRENDING}
              </Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };

  const EmptyListMessage = () => {
    return (
      <View style={{ justifyContent: "center", height: hp(65) }}>
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
            height: hp(55),
          }}
        >
          <Image
            source={communityBlankIcon}
            resizeMode={"contain"}
            style={{
              width: wp(60),
              height: hp(40),
              alignSelf: "center",
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
            }}
          >
            {Lang.NO_POST}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        // iconView={true}
        // iconVisible={threedots}
        // iconStyle={{ height: hp(2.4) }}
        // iconClick={() => optionRef?.current?.show()}
        headerViewStyle={{
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}
      />
      <StatusBar barStyle="default" />
      <>
        <View>
          {manegemnetButton == true ? (
            <View>
              <ProfilePost
                data={postData}
                profileClick={(role, id) => profileClick(role, id)}
                onLike={(action, val, postId, index) =>
                  likeOrCommentAction(action, val, postId, index)
                }
                selectedCommunityId={selectedCommunityId}
                onDeletePost={(id) => _deletePost(id)}
                listHeader={() => listHeaderRender()}
                EmptyList={() => EmptyListMessage()}
              />
            </View>
          ) : (
            <View>
              <ProfilePost
                data={postData}
                profileClick={(role, id) => profileClick(role, id)}
                onLike={(action, val, postId, index) =>
                  likeOrCommentAction(action, val, postId, index)
                }
                selectedCommunityId={selectedCommunityId}
                onDeletePost={(id) => _deletePost(id)}
                listHeader={() => listHeaderRender()}
                EmptyList={() => EmptyListMessage()}
              />
            </View>
          )}
        </View>
      </>
    </SafeAreaView>
  );
}
