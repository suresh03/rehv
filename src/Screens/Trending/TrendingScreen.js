/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, Children } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { communityBlankIcon, profilePic } from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeaderWithBackAction } from "../../Components/CustomHeader/Header";
import { TextField } from "../../Components/SharedComponents/TextField";
import { useTheme } from "react-native-paper";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import TrendingPostcard from "./Components/TrendingPostcard";
import Spacer from "../../Components/SharedComponents/Space";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";
import { useAppValue } from "../../Recoil/appAtom";
import FastImage from "react-native-fast-image";

export default function TrendingScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({ window, screen });
  const { ApiGetMethod } = useApiServices();
  const [postData, setPostData] = useState([]);
  const [CommunityList, setCommunityList] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const { likeOrCommentHome } = useCommunityServices();

  const { user } = useAppValue();
  const { role } = user;
  console.log("role", role);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTrendingPostList();
      getSelectedCommunity();
    });
    return unsubscribe;
  }, [selectedCommunityId]);

  const getSelectedCommunity = async () => {
    if (role === "MANAGER") {
      try {
        const res = await ApiGetMethod(`user/topCommunity`);
        setCommunityList(res.data.list);
        console.log("MANAGER getSelectedCommunity", res.data.list);
      } catch (error) {
        console.log(error);
      }
    } else {
      let payload = "Employee";
      try {
        const res = await ApiGetMethod(`user/topCommunity?type=${payload}`);
        setCommunityList(res.data.list);
        console.log("Employee getSelectedCommunity", res.data.list);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTrendingPostList = () => {
    ApiGetMethod(`post/getTrendingList`)
      .then((res) => {
        console.log("trendingList res => ", res);
        // setPostData(res.data.tendingList);
        let temp = [...res?.data?.tendingList];
        // temp.map((item) => {
        //   item.pictureUrl = item?.pictureUrlArray?.reduce((acc, item) => acc.concat(item.image), [])
        // })
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
        console.log("error?.message", error?.message);
      })
      .finally(() => setLoading(false));
  };

  const likeOrCommentAction = async (action, val, postId, index) => {
    console.log(action, val, postId, index);
    let dataValue = postData;
    dataValue[index].isLikes = !dataValue[index]?.isLikes;
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

  const profileClick = (item,role, _id) => {
    if (role.toLowerCase() == "excoach") {
      navigation.navigate("ExCoachProfileScreen", {item, _id });
    } else {
      navigation.navigate("MemberProfileScreen", {item, _id });
    }
  };

  const theme = useTheme();

  const listHeaderRender = () => {
    return (
      <>
        <View style={CommonStyle.trendingTittleViewStyle}>
          <TextField
            textStyle={CommonStyle.tittleTextFieldStyle}
            status={Lang.COMMUNITY}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 5,
              backgroundColor: "#EEEBFF",
            }}
            onPress={() => navigation.navigate("CommunitiesScreen")}
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

        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            height:
              Platform.OS === "ios"
                ? dimensions.window.height > 800
                  ? hp(30)
                  : hp(35)
                : hp(33),

            padding: 15,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {Children.toArray(
            CommunityList?.map((item, Index) => {
              let UserProfile = item.data.slice(0, 4);

              return (
                <View key={Index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("NewFeedTrendingScreen", {
                        join: item.isJoined === false ? Lang.JOIN : Lang.JOINED,
                        contentName: item.data[0].name,
                        item: item,
                      })
                    }
                    style={{
                      width: wp(40),
                      height:
                        Platform.OS === "ios"
                          ? dimensions.window.height > 800
                            ? hp(22)
                            : hp(25)
                          : hp(22),
                      borderWidth: 1.5,
                      marginHorizontal: Scaler(8),
                      borderRadius: Scaler(10),
                      borderColor: "#E9E5E4",
                    }}
                  >
                    <View style={{ marginHorizontal: Scaler(10) }}>
                      <View
                        style={{
                          marginVertical: 10,
                          width:
                            item.data[0]?.name.length > 14 ? wp(35) : wp(22),
                        }}
                      >
                        <Text
                          style={{
                            fontSize: Scaler(20),
                            lineHeight: Scaler(25),
                            fontFamily: "Poppins-Medium",
                            color: "#000",
                          }}
                          numberOfLines={2}
                        >
                          {item?.data[0]?.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor:
                            item.isJoined == true ? "#fff" : "#4D39E9",
                          height: hp(3.2),
                          borderRadius: Scaler(5),
                          borderWidth: item?.isJoined == true ? 0.8 : 0,
                          borderColor: "lightgrey",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins-Medium",
                            textAlign: "center",
                            color: item.isJoined == true ? "#7F8190" : "#fff",
                            top:
                              Platform.OS === "ios"
                                ? dimensions.window.height > 800
                                  ? hp(0.5)
                                  : hp(0.2)
                                : hp(0.2),
                          }}
                        >
                          {item.isJoined == true ? Lang.JOINED : Lang.JOIN}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          flexWrap: "wrap",
                          top: Scaler(10),
                          width: wp(40),
                        }}
                      >
                        {Children.toArray(
                          UserProfile?.map((items) => {
                            return (
                              <View style={{ width: "23%" }}>
                                {items.userData?.profilePic.trim() == "" ||
                                items.userData?.profilePic == null ||
                                items.userData?.profilePic?.indexOf(
                                  "https://"
                                ) != 0 ||
                                items.userData?.profilePic == undefined ? (
                                  <FastImage
                                    style={{
                                      width: Scaler(30),
                                      height: Scaler(30),
                                      borderRadius: Scaler(30),
                                    }}
                                    source={profilePic}
                                  />
                                ) : (
                                  <FastImage
                                    style={{
                                      width: Scaler(30),
                                      height: Scaler(30),
                                      borderRadius: Scaler(30),
                                    }}
                                    source={{ uri: items?.userData?.profilePic }}
                                  />
                                )}
                              </View>
                            );
                          })
                        )}
                      </View>
                      <Text
                        style={{
                          color: "#7F8190",
                          fontSize: Scaler(13),
                          top:
                            Platform.OS === "ios"
                              ? dimensions.window.height > 800
                                ? hp(2)
                                : hp(2)
                              : hp(2),
                          fontWeight: "500",
                        }}
                      >
                        {item?.data?.length} {Lang.MEMBERS}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
        <Text
          style={{
            marginHorizontal: Scaler(20),
            color: "#110D26",
            fontSize: Scaler(18),
            fontFamily: "Poppins-Medium",
            top: hp(-3),
          }}
        >
          {Lang.TrendingPosts}
        </Text>
      </>
    );
  };

  const EmptyListMessage = () => {
    return (
      <View style={{ justifyContent: "center", height: hp(50) }}>
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
    <>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: theme.colors.primary }}
      />
      <SafeAreaView style={CommonStyle.container}>
        <HeaderWithBackAction tittle_nav={true} tittle={Lang.TRENDING} />
        <StatusBar barStyle="light-content" />
        <TrendingPostcard
          data={postData}
          profileClick={(item,role, id) => profileClick(item,role, id)}
          onLike={(action, val, postId, index) =>
            likeOrCommentAction(action, val, postId, index)
          }
          selectedCommunityId={selectedCommunityId}
          onDeletePost={(id) => _deletePost(id)}
          listHeader={() => listHeaderRender()}
          EmptyList={() => EmptyListMessage()}
          refReshData={getTrendingPostList}
        />
        <Spacer size={Scaler(120)} />
      </SafeAreaView>
    </>
  );
}
