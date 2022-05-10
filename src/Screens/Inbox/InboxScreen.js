import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import {
  blackback,
  Plus,
  Search,
  InboxBlankIcon,
  profilePic,
} from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
import { useTheme } from "react-native-paper";
import OutlinedInput from "../../Components/SharedComponents/OutlinedInput";
import { SwipeListView } from "react-native-swipe-list-view";
import Lang from "../../Language";
import Spacer from "../../Components/SharedComponents/Space";
import useChat from "../../ServiceHooks/useChat";
import Scaler from "../../Utils/Scaler";
import useApiServices from "../../Services/useApiServices";
import Loader from "../../Utils/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { useSocketValue } from "../../Recoil/socketAtom";
import FastImage from "react-native-fast-image";
import { SocketContext } from "../../Utils/SocketProvider";

export default function InboxScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const [listDataCopy, setListDataCopy] = useState([]);
  const [noData, setNoData] = useState(false);

  const [searchHeader, setsearchHeader] = useState(false);
  const { getChatList } = useChat();
  const { refreshChatList } = useSocketValue();

  const { ApiPostMethod } = useApiServices();
  const [searchText, setSearchText] = useState();

  const { connected, socketLoading, newMessage, chatList } = useSocketValue();
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     getChatList();
  //   });
  //   return () => unsubscribe;
  // }, []);
  const { socketRef, updateSocket } = useContext(SocketContext);

  useFocusEffect(
    useCallback(() => {
      getChatList();
    }, [socketRef?.id])
  );

  useEffect(() => {
    let temp = [...listData];
    temp = chatList;
    setListData(temp);
    setListDataCopy(temp);
  }, [chatList]);

  const searchFriend = (e) => {
    setSearchText(e);
    let text = e.toLowerCase();
    let friendJson = [...listDataCopy];
    let filteredJson = friendJson.filter((item) => {
      return (
        item?.user?.name?.toLowerCase()?.match(text) ||
        item?.message?.toLowerCase()?.match(text)
      );
    });
    if (!text || text === "") {
      setListData(listDataCopy);
    } else if (!Array.isArray(filteredJson) && !filteredJson.length) {
      // set no data flag to true so as to render flat list conditionally
      setNoData(true);
    } else if (Array.isArray(filteredJson)) {
      setNoData(false);
      setListData(filteredJson);
    }
  };

  const deleteChat = async (connectionId) => {
    try {
      const resp = await ApiPostMethod("user/deleteChatHistory", {
        connectionId: connectionId,
      });
      getChatList();
      console.log("resp ", resp);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const theme = useTheme();

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: wp(90),
          height: Scaler(85),
          backgroundColor: "#fff",
          justifyContent: "center",
          borderBottomColor: theme.colors.disabled,
          borderBottomWidth: 1,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ChatScreen", {
              item: {
                userId: item?.user?._id,
                name: item?.user?.name + " " + item?.user?.lastName,
                profilePic: item?.user?.profilePic,
                role: item?.user?.role,
              },
            })
          }
          style={{ alignSelf: "center" }}
        >
          <Text
            style={{
              textAlign: "right",
              fontSize: Scaler(12),
              fontFamily: "Poppins-Medium",
              color: "#7F8190",
              width: wp(18),
              alignSelf: "flex-end",
              position: "absolute",
              right: 0,
              top: 10,
            }}
          >
            {item.time}
          </Text>
          <View
            style={{
              height: Scaler(81),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {item?.user?.profilePic === "" ||
            item?.user?.profilePic === null ||
            item?.user?.profilePic?.indexOf("https://") != 0 ||
            item?.user?.profilePic === undefined ? (
              <FastImage
                style={{
                  height: Scaler(60),
                  width: Scaler(60),
                  borderRadius: Scaler(30),
                }}
                source={profilePic}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <FastImage
                style={{
                  height: Scaler(60),
                  width: Scaler(60),
                  borderRadius: Scaler(30),
                }}
                source={{ uri: item?.user?.profilePic }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <View
              style={{
                height: Scaler(50),
                width: "80%",
                left: Scaler(10),
                justifyContent: "space-between",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: Scaler(17),
                  fontFamily: "Poppins-SemiBold",
                  color: "#110D26",
                }}
              >
                {item?.user?.name + " " + item?.user?.lastName}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: item?.isRead === false ? "#000" : "#7F8190",
                  fontSize: Scaler(14),
                  fontFamily: "Poppins-Medium",
                  fontWeight: item?.isRead === false ? "bold" : "normal",
                }}
              >
                {item?.message}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (connectionId) => {
    return (
      <TouchableOpacity
        onPress={() => deleteChat(connectionId)}
        style={{
          opacity: 0.8,
          backgroundColor: "red",
          width: wp(20),
          height: Scaler(85),
          alignSelf: "flex-end",
          right: Scaler(24),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: Scaler(16),
            fontFamily: "Poppins-Medium",
          }}
        >
          {Lang.DELETE}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={CommonStyle["container"]}>
      {searchHeader == false ? (
        <View
          style={{
            width: width,
            height: Scaler(65),
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width / 1.1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "70%",
              }}
            >
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Image
                  style={{
                    height: Scaler(25),
                    width: Scaler(25),
                    top: Scaler(3.5),
                  }}
                  source={blackback}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{ left: Scaler(5) }}>
                <Text
                  style={{
                    fontSize: Scaler(22.5),
                    fontFamily: "Poppins-SemiBold",
                    color: "#000",
                  }}
                >
                  {/* {Lang.INBOX} */}
                  {Lang.INBOX.length < 20
                    ? `${Lang.INBOX}`
                    : `${Lang.INBOX.substring(0, 20)}...`}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setsearchHeader(!searchHeader)}
              style={{}}
            >
              <Image
                style={{
                  height: Scaler(25),
                  width: Scaler(25),
                  top: hp(0.5),
                }}
                source={Search}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewMessageScreen")}
              style={{
                alignSelf: "flex-end",
                left: wp(1),
                top: Platform.OS == "ios" ? hp(-0.5) : hp(-1.5),
              }}
            >
              <Image
                style={{
                  height: Scaler(25),
                  width: Scaler(25),
                  top: hp(0.5),
                }}
                source={Plus}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            width: width,
            height: Scaler(65),
            marginTop: Scaler(10),
          }}
        >
          <TouchableOpacity
            onPress={() => setsearchHeader(false)}
            style={{ top: hp(2) }}
          >
            <Image
              style={{ height: Scaler(25), width: Scaler(25) }}
              source={blackback}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <OutlinedInput
            customStyle={{ top: Platform.OS == "ios" ? hp(0) : hp(0.5) }}
            placeholder={"Search"}
            placeholderTextColor={"grey"}
            img={Search}
            imgStyle={{ height: Scaler(25), resizeMode: "contain" }}
            onChangeText={(t) => searchFriend(t)}
          />
        </View>
      )}
      <Spacer />
      <StatusBar barStyle="default" />
      {socketLoading ? (
        <Loader />
      ) : listData?.length > 0 ? (
        <SwipeListView
          data={listData}
          extraData={listData}
          renderItem={renderItem}
          renderHiddenItem={({ item }) => renderHiddenItem(item.connectionId)}
          rightOpenValue={-wp(22)}
        />
      ) : (
        <View style={{ justifyContent: "center", flex: 1 }}>
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
              source={InboxBlankIcon}
              resizeMode={"contain"}
              style={{ width: wp(60), height: hp(40), alignSelf: "center" }}
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
              {Lang.NO_MSG_INBOX}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
