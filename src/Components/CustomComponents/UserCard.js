"use strict";

import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Scaler from "../../Utils/Scaler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { profilePic } from "../../Assets/icon";
import useApiServices from "../../Services/useApiServices";
import { ActivityIndicator } from "react-native-paper";
import { useAppValue } from "../../Recoil/appAtom";
import Lang from "../../Language";
import FastImage from "react-native-fast-image";

export default function UserCard(props) {
  const { ApiPostMethod } = useApiServices();
  const [btnLoader, setBtnLoader] = useState(false);
  const [getIndex, setIndex] = useState(null);
  const [userData, setUserData] = useState({});
  console.log("userData => ", userData);
  const { user } = useAppValue();

  useEffect(() => {
    setUserData(props.data);
  }, []);

  const followFunction = async (item) => {
    setIndex(props.index);
    setBtnLoader(true);
    try {
      const resp = await ApiPostMethod("user/sendFriendRequest", {
        receiverId: item.user_Id ?? item?._id,
      });
      console.log("followFunction =>", resp);

      // let tempObj = { ...userData };
      // if (tempObj.user_Id === item.user_Id) {
      item.requestPending = true;
      //   setUserData(tempObj);
      // }
      setBtnLoader(false);
      setIndex(null);
    } catch (error) {
      console.log(error);
      setBtnLoader(false);
      setIndex(null);
    }
  };

  const removeUserFunction = async (item) => {
    setIndex(props.index);
    setBtnLoader(true);
    try {
      const resp = await ApiPostMethod("user/unfollow", {
        senderId: item.user_Id ?? item?._id,
      });
      console.log("followFunction =>", resp);
      if (resp?.statusCode === 200) {
        item.isFollower = false;
      }
      setBtnLoader(false);
      setIndex(null);
    } catch (error) {
      console.log(error);
      setBtnLoader(false);
      setIndex(null);
    }
  };

  const unFollowUserFunction = async (item) => {
    setIndex(props.index);
    setBtnLoader(true);
    try {
      const resp = await ApiPostMethod("user/unfriend", {
        receiverId: item.user_Id ?? item?._id,
      });
      console.log("followFunction =>", resp);
      if (resp?.statusCode === 200) {
        item.isFollowing = false;
      }
      setBtnLoader(false);
      setIndex(null);
    } catch (error) {
      console.log(error);
      setBtnLoader(false);
      setIndex(null);
    }
  };

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
          style={{ flexDirection: "row", alignItems: "center", width: "70%" }}
        >
          {userData?.profilePic?.trim() == "" ||
          userData.profilePic?.indexOf("https://") != 0 ||
          userData?.profilePic === undefined ||
          userData?.profilePic === null ? (
            <Image
              style={{
                height: Scaler(60),
                width: Scaler(60),
                resizeMode: "cover",
                borderRadius: Scaler(30),
              }}
              source={profilePic}
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
                  height: Scaler(60),
                  width: Scaler(60),
                  resizeMode: "cover",
                  borderRadius: Scaler(30),
                }}
                source={{ uri: userData.profilePic }}
              />
            </View>
          )}
          <View
            style={{
              width: "50%",
              alignItems: "flex-start",
              justifyContent: "center",
              marginLeft: Scaler(10),
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-SemiBold",
                color: "#110D26",
              }}
              numberOfLines={1}
            >
              {userData.userName
                ? (userData?.userName ?? "") + " " + (userData?.userLast ?? "")
                : (userData?.name ?? "") + " " + (userData?.lastName ?? "")}
            </Text>
            <Text
              style={{
                color: "#7F8190",
                fontSize: 12,
                fontFamily: "Poppins-Medium",
              }}
            >
              {userData?.role}
            </Text>
          </View>
        </View>

        {(userData?.user_Id ?? userData?._id) === user?._id ? null : (
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              disabled={userData?.requestPending || btnLoader}
              onPress={() =>
                userData?.isFollower
                  ? removeUserFunction(userData)
                  : userData?.isFollowing
                  ? unFollowUserFunction(userData)
                  : followFunction(userData)
              }
              style={{
                backgroundColor: "#110D26",
                width: Scaler(100),
                height: Scaler(48),
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {getIndex === props.index && btnLoader ? (
                <ActivityIndicator color="#FFFF" size="small" />
              ) : (
                <Text
                  style={{
                    color: "#fff",
                    fontSize: Scaler(12),
                    paddingHorizontal: Scaler(10),
                    textAlign: "center",
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
          </View>
        )}
      </View>
    </View>
  );
}
