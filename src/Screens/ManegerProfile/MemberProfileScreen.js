/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { profilePic, Calendar, threedots } from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import { useAppValue, useSetAppState } from "../../Recoil/appAtom";
import useApiServices from "../../Services/useApiServices";
import Spacer from "../../Components/SharedComponents/Space";
import Scaler from "../../Utils/Scaler";
import ViewShotModal from "../../Components/Modals/ViewShotModal";
import Lang from "../../Language";
import moment from "moment";
import { useTheme } from "react-native-paper";

export default function MemberProfileScreen({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState({});
  const setAppState = useSetAppState();
  const { ApiGetMethod, ApiPostMethod } = useApiServices();
  const [getBtnLoading, setBtnLoading] = useState(false);
  const appValue = useAppValue();
  const { user } = appValue;
  const hideDialog = () => setVisible(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const followFunction = async (id) => {
    setBtnLoading(true);
    console.log(id);
    try {
      const resp = await ApiPostMethod("user/sendFriendRequest", {
        receiverId: id,
      });
      console.log("resp block => ", resp);
      if (resp.statusCode === 200) {
        console.log("follow request success");
        getUserData();
      }
      setToggle(!toggle);
      setVisible(true);
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

  const optionRef = useRef();
  const freezeFun = async () => {
    setVisible(false);
    setAppState({ ...appValue, accountFreezed: true });
    setTimeout(() => {
      navigation.navigate("SignInScreen");
    }, 300);
  };

  const getUserData = () => {
    ApiGetMethod(`user/getUserDetails?userId=${route.params._id}`).then(
      (res) => {
        console.log("user/getUserDetails?userId => ", res);
        setUserData(res.data[0]);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getUserData();
  }, []);

  const _blockUser = async (id) => {
    try {
      const resp = await ApiPostMethod("post/blockAndUnblockPost", {
        isBlock: true,
        createdPostId: id,
      });
      console.log("resp block => ", resp);
      setVisible(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const _freezeUser = async (id) => {
    try {
      const resp = await ApiPostMethod("user/freezeUser", {
        id: id,
        status: true,
      });
      console.log("resp block => ", resp);
      setVisible(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        iconView={appValue.user._id === userData._id ? false : true}
        iconVisible={threedots}
        iconStyle={{ height: Scaler(20) }}
        iconClick={() => optionRef?.current?.show()}
        headerViewStyle={{
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}
      />
      <StatusBar barStyle="default" />
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                fontSize: Scaler(20),
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
                  right: wp(2),
                  color: "#7F8190",
                  fontSize: Scaler(18),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {userData.role}
              </Text>
              {userData.department && (
                <View
                  style={{
                    // width: wp(8),
                    // height: hp(3.5),
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
                      fontSize: Scaler(17),
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    {userData.department}
                  </Text>
                </View>
              )}
            </View>
            <Spacer />
            {userData?.dateOfBirth !== "false" && (
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  borderWidth: 1.5,
                  height: Scaler(50),
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 10,
                  paddingHorizontal: 5,
                  minWidth: Scaler(135),
                  borderColor: "#E9E5E4",
                }}
              >
                <Image
                  source={Calendar}
                  resizeMode={"contain"}
                  style={{ width: Scaler(20), height: Scaler(20) }}
                />
                <Text
                  style={{
                    top: hp(0.4),
                    alignItems: "center",
                    color: "#110D26",
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {moment(userData?.dateOfBirth).format("ll")}
                </Text>
              </View>
            )}
            {user._id === userData._id ? null : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  padding: 5,
                }}
              >
                <TouchableOpacity
                  style={{ width: wp(45), height: hp(6.5) }}
                  disabled={userData?.requestPending || getBtnLoading}
                  onPress={() =>
                    userData?.isFollower
                      ? removeUserFunction(userData)
                      : userData?.isFollowing
                      ? unFollowUserFunction(userData)
                      : followFunction(userData._id)
                  }
                >
                  <View
                    style={{
                      borderRadius: 10,
                      width: wp(45),
                      height: Scaler(55),
                      backgroundColor: "#EEEBFF",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getBtnLoading ? (
                      <ActivityIndicator color="#FFFF" size="small" />
                    ) : (
                      <Text
                        style={{
                          alignItems: "center",
                          color: "#2D19C6",
                          fontFamily: "Poppins-Medium",
                          textAlign: "center",
                          fontSize: Scaler(16),
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
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    width: wp(45),
                    height: Scaler(55),
                    backgroundColor: "#0000001A",
                    justifyContent: "center",
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
                      alignItems: "center",
                      color: "#110D26",
                      fontFamily: "Poppins-Medium",
                      textAlign: "center",
                      fontSize: Scaler(16),
                    }}
                  >
                    {Lang.SEND_MESSAGE}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <Text
              style={{
                top: hp(2),
                alignItems: "center",
                color: "#110D26",
                fontFamily: "Poppins-Medium",
                fontSize: Scaler(18),
                marginHorizontal: wp(4),
              }}
            >
              {Lang.DESCRIPTION}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                marginVertical: hp(3),
                alignItems: "center",
                color: "#110D26",
                lineHeight: 30,
                fontSize: Scaler(15),
                marginHorizontal: wp(4),
              }}
            >
              {userData.profileDescription === ""
                ? "There is no any description"
                : userData.profileDescription}
            </Text>
          </ScrollView>

          {!(appValue.user._id === userData._id) && (
            <ViewShotModal
              ref={optionRef}
              id={userData._id}
              top={Scaler(60)}
              right={Scaler(35)}
              // options={["block", "freeze"]}
              options={
                appValue?.user?.department == "H.R."
                  ? ["block", "freeze"]
                  : ["block"]
              }
              onBlock={(id) => {
                Alert.alert(
                  Lang.MESSAGE,
                  `${Lang.BLOCK_MESSAGE} ${
                    userData.name + " " + userData.lastName
                  }?`,
                  [
                    { text: Lang.YES, onPress: () => _blockUser(id) },
                    { text: Lang.CANCEL, onPress: () => {} },
                  ]
                );
              }}
              onFreeze={(id) => {
                Alert.alert(
                  Lang.MESSAGE,
                  `${Lang?.FREEZE_MSG} ${
                    userData.name + " " + userData.lastName
                  }?`,
                  [
                    { text: Lang.YES, onPress: () => _freezeUser(id) },
                    { text: Lang.CANCEL, onPress: () => {} },
                  ]
                );
              }}
              onHide={() => optionRef?.current?.hide()}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
