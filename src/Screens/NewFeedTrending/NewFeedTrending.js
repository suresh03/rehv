/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import { TextField } from "../../Components/SharedComponents/TextField";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Portal, Provider, Modal, useTheme } from "react-native-paper";
import Body from "../../Components/SharedComponents/Body";
import { giftIcon, communityBlankIcon, profilePic } from "../../Assets/icon";
const window = Dimensions.get("window");
import Scaler from "../../Utils/Scaler";
import CommunityTrendingPost from "./Components/CommunityTrendingPost";
import useApiServices from "../../Services/useApiServices";
import useCommunityServices from "../../ServiceHooks/useCommunityServices";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";
import { useAppValue } from "../../Recoil/appAtom";
import FastImage from "react-native-fast-image";

export default function NewFeedTrendingScreen({ navigation, route }) {
  console.log("datasss", route.params);
  const [manegemnetButton, setmanegemnetButton] = useState(true);
  const [tittle, setTittle] = useState("");
  const [Buttontittle, setButtonTittle] = useState("");
  const [visible, setVisible] = useState(false);
  const [IsJoined, setIsJoined] = useState(null);
  const [data, setData] = useState(route.params.item);
  const [MembersData, setMembersData] = useState([]);
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const { likeOrCommentHome } = useCommunityServices();
  const [postData, setPostData] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const [managementIds, setManagementIds] = useState([]);
  const [commIds, setCommIds] = useState([]);
  const [TotalMembers, setTotalMembers] = useState(0);
  const { user } = useAppValue();
  const { role } = user;
  console.log("role", role);
  const [UserId, SetUserId] = useState("")
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const tittlename = route.params.join;
      const buttonname = route.params.contentName;
      setTittle(tittlename);
      setButtonTittle(buttonname);
      getData();
      getSelectedCommunitys();
      getMyProfile()
    });
    return unsubscribe;
  }, []);

  const getMyProfile = async () => {
    try {
      const resp = await ApiGetMethod(`user/getUserDetails`);
      const profile = resp.data[0];
      SetUserId(profile._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedCommunitys = () => {
    let tempManagementIds = [];
    let tempCommIds = [];
    ApiGetMethod("user/selectedCommunityList")
      .then((res) => {
        console.log("selectedCommunityList res => ", res);
        let temp = res?.data?.list.reduce((acc, item, currIndex) => {
          let { __v, updatedAt, createdAt, isDeleted, ...rest } =
            item.data[0].communityData;
          if (rest.type == "Manager") {
            tempManagementIds.push(rest._id);
          } else {
            tempCommIds.push(rest._id);
          }
          return acc.concat({ ...rest, selected: currIndex == 0 });
        }, []);
        setManagementIds(tempManagementIds);
        setCommIds(tempCommIds);
      })
      .catch((error) => {
        console.assert(error);
        SnackbarHandler.errorToast("Message", error);
      })
      .finally(() => setLoading(false));
  };

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getData = () => {
    ApiGetMethod(
      `user/communityDetailWithMember?communityId=${route.params.item._id.communityId}`
    )
      .then((res) => {
        console.log("result", res);
        if (res.statusCode === 200) {
          setMembersData(res.data.list[0].data);
          setIsJoined(res.data.list[0].data[0].isJoined);
          setTotalMembers(res.data.list[0].data.length);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
          console.log("res.message =>", res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => console.log("kjhh"));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTrendingPostList();
      getHomePostList();
    });
    return unsubscribe;
  }, []);

  const getHomePostList = () => {
    let status = "Home";
    ApiGetMethod(
      `post/homeAndTrendingPostList?status=${status}&communityId=${route.params.item._id.communityId}`
    )
      .then((res) => {
        console.log(
          "homeAndTrendingPostList res => ",
          res,
          route.params.item._id.communityId
        );
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
    ApiGetMethod(
      `post/homeAndTrendingPostList?status=${status}&communityId=${route.params.item._id.communityId}`
    )
      .then((res) => {
        console.log(
          "homeAndTrendingPostList res => ",
          res,
          route.params.item._id.communityId
        );
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

  const profileClick = (item,role, _id) => {
    if (role.toLowerCase() == "excoach") {
      navigation.navigate("ExCoachProfileScreen", {item, _id });
    } else {
      navigation.navigate("MemberProfileScreen", {item, _id });
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

  const theme = useTheme();

  const ChangeButton = (item) => {
    if (item === "NewsFeed") {
      setmanegemnetButton(true);
      getHomePostList();
    } else {
      setmanegemnetButton(false);
      getTrendingPostList();
    }
  };

  const listHeaderRender = () => {
    return (
      <>
        <View>
          <View
            style={{
              overflow: "hidden",
              borderWidth: 1,
              width: 135,
              height: 135,
              alignSelf: "center",
              borderRadius: 135 / 2,
              borderColor: "#E9E5E4",
            }}
          >
            <FastImage
              style={{
                alignSelf: "center",
                width: 110,
                height: 110,
                top: 10,
              }}
              source={{uri: route.params.item.data[0].picture}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View>
            <Text
              style={{
                marginVertical: 15,
                color: "#110D26",
                alignSelf: "center",
                textAlign: "center",
                fontSize: Scaler(20),
                fontFamily: "Poppins-SemiBold",
              }}
            >
              {Buttontittle}
              {/* {item.langType === "en" ? item.name : item.frenchName} */}
            </Text>
          </View>
          {IsJoined == false ? (
            <TouchableOpacity
              onPress={showDialog}
              // onPress={() => Joined()}
              style={{
                backgroundColor: "#4D39E9",
                width: wp(50),
                height: hp(6.5),
                alignSelf: "center",
                borderRadius: Scaler(15),
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  textAlign: "center",
                  top: hp(1.3),
                  fontSize: Scaler(20),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {Lang.JOIN}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: wp(50),
                height: hp(6.5),
                alignSelf: "center",
                borderRadius: Scaler(15),
                borderWidth: 1,
                borderColor: "#E9E5E4",
                top: -1,
              }}
            >
              <Text
                style={{
                  color: "#7F8190",
                  alignSelf: "center",
                  textAlign: "center",
                  top: hp(1.3),
                  fontSize: Scaler(20),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {Lang.JOINED}
              </Text>
            </View>
          )}
        </View>

        <View style={CommonStyle["trendingTittleViewStyle"]}>
          <TextField
            textStyle={CommonStyle["tittleTextFieldStyle"]}
            status={TotalMembers + " " + Lang.MEMBERS}
          />
          <TouchableOpacity
            style={CommonStyle["viewTouchStyle"]}
            onPress={() =>
              navigation.navigate("TrendingCommunityMembersList", {
                members: MembersData,
                totalMembers: TotalMembers,
              })
            }
          >
            <Text style={CommonStyle["viewAllTextStyle"]}>{Lang.VIEW_ALL}</Text>
          </TouchableOpacity>
        </View>
        {TotalMembers > 0 ? (
          <Body
            contentContainerStyle={{
              flexDirection: "row",
              height:
                Platform.OS === "ios"
                  ? window.height > 800
                    ? hp(15)
                    : hp(18)
                  : hp(17),
              top: 30,
              padding: 15,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {MembersData.map((items, Index) => {
              return (
                <View key={Index}>
                  <View style={{}}>
                    <View style={{ marginHorizontal: Scaler(10) }}>
                      <View
                        style={{ flexDirection: "row", alignSelf: "flex-end" }}
                      >
                        {items.userData?.profilePic?.trim() == "" ||
                        items.userData.profilePic?.indexOf("https://") != 0 ||
                        items.userData?.profilePic === undefined ||
                        items.userData?.profilePic === null ? (
                          <FastImage
                            style={{
                              height: Scaler(60),
                              width: Scaler(60),
                              resizeMode: "cover",
                              borderRadius: Scaler(30),
                            }}
                            source={profilePic}
                          />
                        ) : (
                          <FastImage
                            style={{
                              height: Scaler(60),
                              width: Scaler(60),
                              resizeMode: "cover",
                              borderRadius: Scaler(30),
                            }}
                            source={{ uri: items.userData.profilePic }}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </Body>
        ) : null}
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
              height: hp(5.7),
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
                top: 3,
                borderRadius: 50,
                height: hp(4.5),
                left: 5,
              }}
            >
              <Text
                style={{
                  color: manegemnetButton ? "#FFFFFF" : "#000000",
                  fontFamily: "Poppins-Medium",
                  fontSize: Scaler(15),
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
                top: 3,
                borderRadius: 50,
                height: hp(4.5),
                right: 5,
              }}
            >
              <Text
                style={{
                  color: !manegemnetButton ? "#FFFFFF" : "#000000",
                  fontFamily: "Poppins-Medium",
                  fontSize: Scaler(15),
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
          <FastImage
            source={communityBlankIcon}
            resizeMode={FastImage.resizeMode.contain}
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
      <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }}>
        <HeaderBackAction
          back_nav={() => navigation.pop()}
          headerViewStyle={{ backgroundColor: "#fff" }}
        />
        <View>
          {manegemnetButton == false ? (
            <View>
              <CommunityTrendingPost
                data={postData}
                profileClick={(item,role, id) => profileClick(item,role, id)}
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
              <CommunityTrendingPost
                data={postData}
                profileClick={(item,role, id) => profileClick(item,role, id)}
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
        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideDialog}
              style={{ justifyContent: "flex-end" }}
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
                height: hp(35),
                width: wp(100),
                borderTopRightRadius: Scaler(20),
                borderTopLeftRadius: Scaler(20),
                bottom: 100,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: Scaler(20),
                    width: wp(80),
                    paddingTop: 20,
                    textAlign: "center",
                    alignSelf: "center",
                    color: "#110D26",
                    lineHeight: 30,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {Lang.LEAVE_COMMUNITY}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <TouchableOpacity
                  onPress={hideDialog}
                  style={{
                    width: wp(40),
                    height: hp(8),
                    backgroundColor: "#F2F2F4",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      alignSelf: "center",
                      color: "#000",
                      fontSize: Scaler(20),
                      top: Platform.OS == "ios" ? 20 : 15,
                    }}
                  >
                    {Lang.CANCEL}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      role === "MANAGER"
                        ? "EditManagementCommunities"
                        : "EditCommunitiesScreen",
                      { managementIds: managementIds, commIds: commIds }
                    )
                  }
                  style={{
                    width: wp(40),
                    height: hp(8),
                    backgroundColor: "#4D39E9",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      alignSelf: "center",
                      color: "#fff",
                      fontSize: Scaler(20),
                      top: Platform.OS === "ios" ? 20 : 15,
                    }}
                  >
                    {Lang.OK}
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </Portal>
        </Provider>
      </SafeAreaView>
    </>
  );
}
