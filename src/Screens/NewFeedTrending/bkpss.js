/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import {
  getFontSize,
  responsiveSize,
} from "../../Components/SharedComponents/ResponsiveSize";
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
import { useAppValue } from "../../Recoil/appAtom";

export default function NewFeedTrendingScreen({ navigation, route }) {
  console.log("data", route.params.item._id.communityId);
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
  const { user } = useAppValue();
  const { role } = user;
  console.log("role", role);

  useEffect(() => {
    const tittlename = route.params.join;
    const buttonname = route.params.contentName;
    setTittle(tittlename);
    setButtonTittle(buttonname);
    getData();
    getSelectedCommunitys()
  }, []);

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
        } else {
          SnackbarHandler.errorToast("Message", res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast("Message", error);
      })
      .finally(() => console.log("kjhh"));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTrendingPostList();
    });
    return unsubscribe;
  }, []);

  const getTrendingPostList = () => {
    ApiGetMethod(
      `post/homeAndTrendingPostList?status=Home&communityId=${route.params.item._id.communityId}`
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

  const likeOrCommentAction = async (action, val, postId) => {
    likeOrCommentHome(action, postId, val)
      .catch((error) => {
        console.log("like Action Error ", error);
        SnackbarHandler.errorToast("Message", JSON.stringify(error));
      })
      .finally(() => getHomePostList());
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
          SnackbarHandler.successToast("Message", resp.message);
        } else {
          SnackbarHandler.errorToast("Message", resp.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast("Message", error);
      })
      .finally(() => getHomePostList());
  };

  const theme = useTheme();
  return (
    <>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: theme.colors.primary }}
      />
      <SafeAreaView style={CommonStyle["container"]}>
        <HeaderBackAction
          back_nav={() => navigation.pop()}
          headerViewStyle={{ backgroundColor: "#fff" }}
        />
        <Body>
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
              <Image
                style={{
                  alignSelf: "center",
                  width: 110,
                  height: 110,
                  top: 10,
                }}
                source={giftIcon}
                resizeMode={"contain"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 15,
                  color: "#110D26",
                  alignSelf: "center",
                  textAlign: "center",
                  fontSize: getFontSize(20),
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                {Buttontittle}
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
                  borderRadius: responsiveSize(15),
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    alignSelf: "center",
                    textAlign: "center",
                    top: hp(1.3),
                    fontSize: getFontSize(20),
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Join
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  width: wp(50),
                  height: hp(6.5),
                  alignSelf: "center",
                  borderRadius: responsiveSize(15),
                  borderWidth: 1,
                  borderColor: "#E9E5E4",
                }}
              >
                <Text
                  style={{
                    color: "#7F8190",
                    alignSelf: "center",
                    textAlign: "center",
                    top: hp(1.3),
                    fontSize: getFontSize(20),
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Joined
                </Text>
              </View>
            )}
          </View>

          <View style={CommonStyle["trendingTittleViewStyle"]}>
            <TextField
              textStyle={CommonStyle["tittleTextFieldStyle"]}
              status={MembersData.length + " Members"}
            />
            <TouchableOpacity
              style={CommonStyle["viewTouchStyle"]}
              onPress={() =>
                navigation.navigate("TrendingCommunityMembersList", {
                  members: MembersData,
                  totalMembers: MembersData.length,
                })
              }
            >
              <Text style={CommonStyle["viewAllTextStyle"]}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
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
              {
                /* var UserProfile = item.data.slice(1, 5)
              console.log("UserProfile", UserProfile) */
              }
              return (
                <View key={Index}>
                  <View style={{}}>
                    <View style={{ marginHorizontal: responsiveSize(10) }}>
                      <View
                        style={{ flexDirection: "row", alignSelf: "flex-end" }}
                      >
                        {items.userData.profilePic != "" ? (
                          <Image
                            style={{
                              width: wp(15),
                              height: hp(7.5),
                              borderRadius: Scaler(30),
                            }}
                            source={{ uri: items.userData.profilePic }}
                            //resizeMode={"contain"}
                          />
                        ) : (
                          <Image
                            style={{
                              width: wp(15),
                              height: hp(7.5),
                              borderRadius: Scaler(30),
                            }}
                            source={profilePic}
                            //resizeMode={"contain"}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </Body>
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
                onPress={() => setmanegemnetButton(true)}
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
                    fontSize: getFontSize(15),
                  }}
                >
                  New Feed
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setmanegemnetButton(false)}
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
                    fontSize: getFontSize(15),
                  }}
                >
                  Trending
                </Text>
              </Pressable>
            </View>
          </View>
          {manegemnetButton == false ? (
            <View>
              {postData?.length > 0 ? (
                <CommunityTrendingPost
                  data={postData}
                  profileClick={(role, id) => profileClick(role, id)}
                  onLike={(action, val, postId) =>
                    likeOrCommentAction(action, val, postId)
                  }
                  selectedCommunityId={selectedCommunityId}
                  onDeletePost={(id) => _deletePost(id)}
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
                      You have no posts right now. Come back later.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View>
              {postData?.length > 0 ? (
                <CommunityTrendingPost
                  data={postData}
                  profileClick={(role, id) => profileClick(role, id)}
                  onLike={(action, val, postId) =>
                    likeOrCommentAction(action, val, postId)
                  }
                  selectedCommunityId={selectedCommunityId}
                  onDeletePost={(id) => _deletePost(id)}
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
                      You have no post right now. Come back later.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </Body>
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
                borderTopRightRadius: responsiveSize(20),
                borderTopLeftRadius: responsiveSize(20),
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: getFontSize(20),
                    width: wp(80),
                    paddingTop: 20,
                    textAlign: "center",
                    alignSelf: "center",
                    color: "#110D26",
                    lineHeight: 30,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  You need to leave one of the communities to join this
                  community.
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
                      fontSize: getFontSize(20),
                      top: Platform.OS == "ios" ? 20 : 15,
                    }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate("EditJoinCommunities", {
                  //     managementIds: route.params.item._id.communityId,
                  //     commIds: route.params.item._id.communityId,
                  //   })
                  // }
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
                      fontSize: getFontSize(20),
                      top: Platform.OS === "ios" ? 20 : 15,
                    }}
                  >
                    OK
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
