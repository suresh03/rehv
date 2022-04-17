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
  Dimensions
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { profilePic } from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Divider } from "react-native-paper";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Loader from "../../Utils/Loader";
import Lang from "../../Language";
import EmptyCardView from "../../Components/CustomComponents/EmptyCardView";
import {
  requesBlanktIcon
} from "../../Assets/icon";

export default function FreezedUser({ navigation }) {
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
    setLoading(true);
    ApiPostMethod("post/getFreezedUserList", {})
      .then((res) => {
        if (res.statusCode === 200) {
          console.log("Get Freezed User List => ", res);
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

  const _unFreezeUser = async (id) => {
    try {
      const resp = await ApiPostMethod("user/freezeUser", {
        id: id,
        status: false,
      });
      console.log("resp block => ", resp);

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
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
            <View style={{ width: wp(70), left: wp(1.9) }}>
              <Text
                style={{
                  fontSize: Scaler(16),
                  fontFamily: "Poppins-SemiBold",
                  color: "#110D26",
                  marginTop: Scaler(5),
                }}
              >
                {item.name} {item.lastName}
              </Text>

              <Text
                style={{
                  color: "#7F8190",
                  fontSize: Scaler(12),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {item.role}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ top: hp(-4) }}>
          <TouchableOpacity
            onPress={() => _unFreezeUser(item._id)}
            style={{
              backgroundColor: "#F2F2F4",
              width: wp(30),
              height: hp(5),
              alignSelf: "flex-end",
              right: Scaler(20),
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#110D26",
                fontFamily: "Poppins-Medium",
                fontSize: Scaler(15),
                top: hp(1),
                paddingHorizontal: Scaler(10),
                height: hp(3),
                textAlign: "center",
              }}
            >
              {Lang.UNFREEZE}
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
        headerContain={Lang.FREEZED_USER}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={data}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View style={{ width: "100%", height: Dimensions.get("screen").height / 1.3, alignItems: 'center', justifyContent: 'center' }}>
                <EmptyCardView
                imageData={requesBlanktIcon}
                message={Lang.NO_FREZZEDUSER} />
              </View>
            )
          }}
        />
      )}
    </SafeAreaView>
  );
}
