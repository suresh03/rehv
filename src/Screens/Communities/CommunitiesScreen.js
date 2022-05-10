import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { profilePic } from "../../Assets/icon";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const dimensions = { window, screen };
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import { useAppValue } from "../../Recoil/appAtom";
import Lang from "../../Language";

export default function CommunitiesScreen({ navigation }) {
  const [communityList, setCommunityList] = useState([]);
  const { ApiGetMethod } = useApiServices();
  const { user } = useAppValue();
  const { role } = user;
  console.log("role", role);


  const [LangType, setLangType] = useState("")

  useEffect(() => {
    getUserDetails();
  }, [LangType]);

  const getUserDetails = () => {
    ApiGetMethod(`user/getUserDetails`)
      .then((res) => {
        setLangType(res.data[0].langSymbol)
      })
      .finally(() => console.log("success"));
  };

  useEffect(() => {
    getSelectedCommunity();
  }, []);

  const getSelectedCommunity = () => {
    if (role === "MANAGER") {
      let payload = role === "MANAGER" ? "" : "Employee";
      ApiGetMethod(`user/allCommunityList`)
        .then((res) => {
          setCommunityList(res.data.list);
          console.log("data", res.data.list);
        })
        .catch((error) => {
          console.assert(error);
          Alert.alert("Message", error);
        })
        .finally(() => setLoading(false));
    } else {
      let payload = "Employee";
      ApiGetMethod(`user/allCommunityList?type=${payload}`)
        .then((res) => {
          setCommunityList(res.data.list);
          console.log("data", res.data.list);
        })
        .catch((error) => {
          console.assert(error);
          Alert.alert("Message", error);
        })
        .finally(() => setLoading(false));
    }
  };

  const communitiListItem = ({ item }) => {
    var UserProfile = item.data.slice(0, 4);
    console.log("UserProfile", item.data);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("NewFeedTrendingScreen", {
              join: item.isJoined === false ? "Join" : "Joined",
              contentName: item.data[0].name,
              item: item,
            })
          }
          style={{
            width: wp(40),
            height:
              Platform.OS === "ios"
                ? dimensions.window.height > 800
                  ? hp(20)
                  : hp(25)
                : hp(22),
            borderWidth: 1.5,
            marginHorizontal: Scaler(8),
            borderRadius: Scaler(10),
            borderColor: "#E9E5E4",
            marginTop: Scaler(20),
          }}
        >
          <View style={{ marginHorizontal: Scaler(10) }}>
            <View
              style={{
                marginVertical: 10,
                width: item.data[0].name?.length > 14 ? wp(35) : wp(22),
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
                {LangType === "en" ? item.data[0].name:item.data[0].frenchName}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: item.isJoined == true ? "#fff" : "#4D39E9",
                height: hp(3.2),
                borderRadius: Scaler(5),
                borderWidth: item.isJoined == true ? 0.8 : 0,
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
                justifyContent: "space-between",
                top: hp(1),
              }}
            >
              {UserProfile.map((items) => {
                return (
                  <View>
                    {items.userData.profilePic != "" ? (
                      <Image
                        style={{
                          width: Scaler(30),
                          height: Scaler(30),
                          borderRadius: Scaler(30),
                        }}
                        source={{ uri: items.userData.profilePic }}
                      />
                    ) : (
                      <Image
                        style={{
                          width: Scaler(30),
                          height: Scaler(30),
                          borderRadius: Scaler(30),
                        }}
                        source={profilePic}
                        //resizeMode={"contain"}
                      />
                    )}
                  </View>
                );
              })}
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
                    : hp(1.4),
                fontWeight: "500",
              }}
            >
              {item.data.length} {Lang.MEMBERS}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={CommonStyle["container"]}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={Lang.COMMUNITIES}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ alignSelf: "center" }}
        data={communityList}
        numColumns={2}
        extraData={communityList}
        keyExtractor={(item) => item.name}
        renderItem={communitiListItem}
      />
    </SafeAreaView>
  );
}
