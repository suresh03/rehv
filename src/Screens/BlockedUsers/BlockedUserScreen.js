/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { profilePic } from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Divider } from "react-native-paper";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import {
  getFontSize,
  responsiveSize,
} from "../../Components/SharedComponents/ResponsiveSize";
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";
import EmptyCardView from "../../Components/CustomComponents/EmptyCardView";
import {
  requesBlanktIcon
} from "../../Assets/icon";

export default function BlockedUserScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { ApiPostMethod } = useApiServices();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetBlockUserList();
    });
    return unsubscribe;
  }, []);
  const GetBlockUserList = () => {
    ApiPostMethod("post/getBlockedUserList", {})
      .then((res) => {
        if (res.statusCode === 200) {
          console.log("Get Blocked User List => ", res);
          setData(res.data);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => setLoading(false));
  };

  const _blockUnblock = (item) => {
    let dataPayload = {
      isBlock: false,
      createdPostId: item._id,
    };
    ApiPostMethod("post/blockAndUnblockPost", dataPayload)
      .then((res) => {
        if (res.statusCode === 200) {
          console.log("resss", res);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => GetBlockUserList());
  };

  const ItemView = ({ item }) => {
    console.log("item", item);
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: wp(3),
          marginVertical: hp(1),
          justifyContent: "center",
        }}
      >
        <View style={{ height: hp(5) }}>
          <View style={{ flexDirection: "row" }}>
            {item.profilePic == undefined ||
              item.profilePic == null ||
              item.profilePic?.trim() == "" ? (
              <Image
                style={{
                  width: Scaler(50),
                  height: Scaler(50),
                  borderRadius: 60,
                  resizeMode: "cover",
                }}
                source={profilePic}
                resizeMode={"contain"}
              />
            ) : (
              <Image
                style={{
                  width: Scaler(50),
                  height: Scaler(50),
                  borderRadius: 60,
                }}
                source={{ uri: item.profilePic }}
              />
            )}
            <Text
              style={{
                width: wp(70),
                left: wp(1.9),
                fontSize: getFontSize(16),
                fontFamily: "Poppins-SemiBold",
                color: "#110D26",
                marginTop: Scaler(5),
              }}
            >
              {item.name} {item.lastName}
            </Text>
          </View>
          <Text
            style={{
              left: wp(16),
              top: hp(-3.0),
              color: "#7F8190",
              fontSize: getFontSize(12),
              fontFamily: "Poppins-Medium",
            }}
          >
            {item.role}
          </Text>
        </View>
        <View style={{ top: hp(-4) }}>
          <TouchableOpacity
            onPress={() => _blockUnblock(item)}
            style={{
              backgroundColor: "#F2F2F4",
              width: wp(30),
              height: hp(5),
              alignSelf: "flex-end",
              right: responsiveSize(20),
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#110D26",
                fontFamily: "Poppins-Medium",
                fontSize: getFontSize(15),
                top: hp(1),
                paddingHorizontal: responsiveSize(10),
                height: hp(3),
                textAlign: "center",
              }}
            >
              {Lang.UNBLOCK}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider
          style={{ width: wp(90), alignSelf: "center", top: hp(-0.3) }}
        />
      </View>
    );
  };


  console.log("data", data);
  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={Lang.BLOCKED_USERS}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      <FlatList
        data={data}
        renderItem={ItemView}
        ListEmptyComponent={() => {
          return (
            <View style={{ width: "100%", height: Dimensions.get("screen").height / 1.3, alignItems: 'center', justifyContent: 'center' }}>
              <EmptyCardView
              imageData={requesBlanktIcon}
              message={Lang.NO_BLOCKEDUSER} />
            </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
