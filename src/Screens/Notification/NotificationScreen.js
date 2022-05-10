/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  rehvupnotiIcon,
  share,
  commentgrayIcon,
  notificationBlankIcon,
  profilePic,
} from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import Padding from "../../Components/SharedComponents/Padding";
import { getFontSize } from "../../Components/SharedComponents/ResponsiveSize";
import { Divider } from "react-native-paper";
import Lang from "../../Language";
import useApiServices from "../../Services/useApiServices";
import Loader from "../../Utils/Loader";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Scaler from "../../Utils/Scaler";
import moment from "moment";

export default function NotificationScreen({ navigation }) {
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotificationList();
    });
    return unsubscribe;
  }, []);

  const getNotificationList = async () => {
    setLoading(true);
    let data = {
      limit: "9999",
    };
    ApiPostMethod("user/notificationList", data)
      .then((res) => {
        console.log("res:", res);
        if (res.statusCode === 200) {
          setData(res.data);
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => setLoading(false));
  };

  const OnclickNotification = (item) => {
    console.log("item", item);
    if (item.type === 1) {
      navigation.navigate("PostDetailScreen", {
        postId: item.postId,
        eventType: item.eventType,
        creator: item?.userName + " " + item?.userLast,
        creatorRole: item?.role,
        pictureUrl: item?.pictureUrl,
        isLikes: item?.isLikes,
        totalLikes: item.totalLikes,
        totalComments: item.totalComments,
        questions: item.questions,
      });
    } else if (item.type === 2) {
      navigation.navigate("PostDetailScreen", {
        postId: item.postId,
        eventType: item.eventType,
        creator: item?.userName + " " + item?.userLast,
        creatorRole: item?.role,
        pictureUrl: item?.pictureUrl,
        isLikes: item?.isLikes,
        totalLikes: item.totalLikes,
        totalComments: item.totalComments,
        questions: item.questions,
      });
    } else if (item.type === 3) {
      navigation.navigate("CommentScreen", {
        data: {
          isLikes: item?.isLikes,
          eventType: item.eventType,
          pictureUrl: item?.pictureUrl,
          isCommented: item?.isCommented,
          postId: item.postId,
          totalLikes: item.totalLikes,
          totalComments: item.totalComments,
          description: item?.description,
          postCreatedUserType: item.postCreatedUserType,
          selectedCommunityId: item.communityId,
        },
        item: item,
      });
    } else if (item.type === 4) {
      navigation.navigate("PostDetailScreen", {
        postId: item.postId,
        eventType: item.eventType,
        creator: item?.userName + " " + item?.userLast,
        creatorRole: item?.role,
        pictureUrl: item?.pictureUrl,
        isLikes: item?.isLikes,
        totalLikes: item.totalLikes,
        totalComments: item.totalComments,
        questions: item.questions,
      });
    } else if (item.type === 5) {
      navigation.navigate("Acheivement");
    } else if (item.type === 6) {
      navigation.navigate("TrendingScreen");
    } else if (item.type === 7) {
      navigation.navigate("HomeScreen");
    } else if (item.type === 8) {
      navigation.navigate("Acheivement");
    } else if (item.type === 9) {
      navigation.navigate("Acheivement");
    }else if (item.type === 17) {
      navigation.navigate("Dashboard");
    }
    let id = item._id;
    ApiGetMethod(`user/readNotification?isReadAll=false&notificationId=${id}`)
      .then((res) => {
        console.log("ressss:", item);
        if (res.statusCode === 200) {
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => console.log);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ margin: 6 }}>
        <Padding horizontal size={wp(4)}>
          <TouchableOpacity onPress={() => OnclickNotification(item)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={{
                    width: Scaler(58),
                    height: Scaler(58),
                    borderRadius: 50,
                    marginBottom: 10,
                  }}
                  source={
                    item.profilePic === undefined || item.profilePic === ""
                      ? profilePic
                      : { uri: item.profilePic }
                  }
                  //resizeMode={"contain"}
                ></Image>
                <Image
                  style={{
                    left: item.type === 5 || item.type === 8 || item.type === 9 ? wp(10):wp(8),
                    width: item.type === 5 || item.type === 8 || item.type === 9 ? wp(5.8):wp(10),
                    height: item.type === 5 || item.type === 8 || item.type === 9 ? hp(5.8):hp(10),
                    top: hp(2),
                    position: "absolute",
                  }}
                  source={
                    item.type === 2
                      ? rehvupnotiIcon
                      : item.type === 3
                      ? commentgrayIcon
                      : item.type === 4
                      ? share
                      : item.type === 5
                      ? require("../../Assets/Images/badges.png")
                      : item.type === 8
                      ? require("../../Assets/Images/medals.png")
                      : item.type === 9
                      ? require("../../Assets/Images/medals.png")
                      : null
                  }
                  resizeMode={"contain"}
                />
              </View>
              <Text
              numberOfLines={4}
                style={{
                  top: hp(-1),
                  width: wp(68),
                  left: wp(5),
                  fontSize: getFontSize(14.5),
                  fontFamily: "Poppins-SemiBold",
                  color: item.isRead ? "#7F8190" : "#110D26",
                }}
              >
                {item.message}
              </Text>
            </View>
            <Text style={[ChangeStyle.notiTimeStyle, {marginTop:10}]}>{moment(item.date).fromNow()}</Text>
            <Divider
              style={{ width: wp(90), alignSelf: "center", top: hp(-1) }}
            />
          </TouchableOpacity>
        </Padding>
      </View>
    );
  };

  const emptyMessage = () => {
    return (
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
            height: hp(75),
          }}
        >
          <Image
            source={notificationBlankIcon}
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
            {Lang.NO_NOTIFICATION}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={"Notifications"}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={{ marginTop: 35 }}
          showsVerticalScrollIndicator={false}
          data={data}
          extraData={data}
          renderItem={renderItem}
          ListEmptyComponent={() => emptyMessage()}
        />
      )}
    </SafeAreaView>
  );
}
