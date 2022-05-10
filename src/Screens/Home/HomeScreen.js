/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  Alert,
  SafeAreaView,
  DeviceEventEmitter,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import {
  notificationIcon,
  chatIcon,
  homeheaderIcon,
  communityBlankIcon,
} from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomHeader } from "../../Components/CustomHeader/Header";
import Share from "react-native-share";
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import HomePostcard from "./Components/HomePostcard";
import { DayTheme } from "../../Constants/theme";
import { useTheme } from "react-native-paper";
import Spacer from "../../Components/SharedComponents/Space";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import { storeToLocal, removeFromLocal } from "../../Utils/LocalStorage";
import { useResetAppState } from "../../Recoil/appAtom";
import Lang from "../../Language";
import { getFromLocal } from "../../Utils/LocalStorage";
import dynamicLinks from "@react-native-firebase/dynamic-links";

export default function HomeScreen({ navigation }) {
  const { likeOrCommentHome } = useCommunityServices();
  const { ApiGetMethod, ApiPostMethod } = useApiServices();
  const [postData, setPostData] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const [UserCompanyName, setUserCompanyName] = useState("");
  const [ActiveCount, setActiveCount] = useState("")
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      NotificationCount();
    });
    return unsubscribe;
  }, [])

  const NotificationCount =()=>{
    ApiGetMethod(`user/getNotificationCount`)
      .then((res) => {
        console.log("user/getNotificationCount res => ", res);
        setActiveCount(res.data.totalCount)
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error", error.message);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    DeviceEventEmitter.addListener("authState", (data) => {
      if (data === "failure") {
        _logout();
        DeviceEventEmitter.emit("authState", "");
      }
    });
    getFromLocal("user").then((profile) => {
      setUserCompanyName(profile.companyName);
      dynamicLinks()
        .getInitialLink()
        .then((link) => {
          handleDynamicLink(link);
        });
    });
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    };
  }, [UserCompanyName]);

  const resetAppState = useResetAppState();

  const _logoutFromServer = async () => {
    ApiPostMethod("user/logout");
  };

  const _logout = async () => {
    try {
      await _logoutFromServer();
      await storeToLocal("user", JSON.stringify({}));
      await storeToLocal("token", "");
      await removeFromLocal("token");
      setTimeout(() => {
        navigation.navigate("SignInScreen");
      }, 100);
    } catch (error) {
      console.log(error);
    }
    resetAppState();
  };

  const handleDynamicLink = (link) => {
    let url = link?.url;
    let urlParts = url?.split("https://rehvupap.page.link/d6o5");
    let params = urlParts[1]?.split("/");
    let id = params[1];
    let eventType = params[2];
    let creator = params[3];
    let companyName = params[3];
    var UserPostCompanyName = UserCompanyName.split(" ").slice(0, -1).join(" ");
    console.log(
      "UserPostCompanyName",
      UserPostCompanyName,
      "companyName",
      companyName
    );
    if (companyName != UserPostCompanyName) {
      Alert.alert("The post is from different company");
    }else {
      if (!!link?.url) {
        setTimeout(() => {
          navigation.navigate("PostDetailScreen", {
            postId: id,
            eventType: eventType,
            creator: creator,
          });
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getHomePostList();
    });
    return unsubscribe;
  }, []);

  const getHomePostList = () => {
    ApiGetMethod(`post/homePostList`)
      .then((res) => {
        console.log("getCommunityListById res => ", res?.data?.postList);
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
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error", error.message);
      })
      .finally(() => setLoading(false));
  };

  const likeOrCommentAction = async (action, val, postId, index) => {
    console.log("index", index);
    let dataValue = postData;
    dataValue[index].isLikes = !dataValue[index].isLikes;
    dataValue[index].totalLikes = dataValue[index].isLikes
      ? dataValue[index].totalLikes + 1
      : dataValue[index].totalLikes - 1;
    setPostData(dataValue);
    likeOrCommentHome(action, postId, val)
      .catch((error) => {
        console.log("like Action Error ", error);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error", error.message);
      })
      // .finally(() => getHomePostList());
      .finally(() => console.log());
  };

  const profileClick = (item, role, _id) => {
    if (role.toLowerCase() == "excoach") {
      navigation.navigate("ExCoachProfileScreen", { item, _id });
    } else {
      navigation.navigate("MemberProfileScreen", {  item, _id });
    }
  };

  const _deletePost = async (id) => {
    ApiPostMethod("post/deletePost", { postId: id })
      .then((resp) => {
        if (resp.statusCode === 200) {
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
  const theme = useTheme();
  return (
    <>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: theme.colors.primary }}
      />
      <SafeAreaView style={[CommonStyle.container, {}]}>
        <CustomHeader
          rightImg={() => navigation.navigate("NotificationScreen")}
          Right_nav={true}
          leftImg={() => navigation.navigate("InboxScreen")}
          Left_nav={true}
          Center_nav={true}
          RightImage={notificationIcon}
          LeftImage={chatIcon}
          CenterImage={homeheaderIcon}
        />
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        {postData?.length > 0 ? (
          <HomePostcard
            data={postData}
            profileClick={(item, role, id) => profileClick(item, role, id)}
            onLike={(action, val, postId, index) =>
              likeOrCommentAction(action, val, postId, index)
            }
            selectedCommunityId={selectedCommunityId}
            onDeletePost={(id) => _deletePost(id)}
            refReshData={getHomePostList}
          />
        ) : (
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
        )}
        <Spacer size={Scaler(120)} />
      </SafeAreaView>
    </>
  );
}
