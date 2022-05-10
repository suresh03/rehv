/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { backblack, profilePic, star, marketingIcon } from "../../Assets/icon";
import { getFontSize } from "../../Components/SharedComponents/ResponsiveSize";
import Scaler from "../../Utils/Scaler";
import { useSelector } from "react-redux";
import useApiServices from "../../Services/useApiServices";
import Lang from "../../Language";

export default function InsightCompany({ navigation, route }) {
  const [getCommunitites, setCommunities] = useState([]);
  const [getDescStatus, setDescStatus] = useState(false);
  const panelRef = useRef(null);
  const communityId = useSelector((state) => state.selectedCommunity);
  const { ApiGetMethod } = useApiServices();
  const [getMemberList, setMemberList] = useState([]);
  const [getMemberListImages, setMemberListImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
    if (route.params.flag === "company") {
      if (route.params.name === "Aggregate") {
        console.log("hii");
        getCommunityMembersAggregate();
      } else {
        getCommunityMembersCompany();
      }
    } else {
      getCommunityMembers();
    }
  }, []);

  const minToHrMin = (minutes) => {
    let h = Math.round(minutes / 60);
    let m = Math.round(minutes % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return h + ":" + m + " hrs";
  };

  const getCommunityMembers = () => {
    if (
      communityId === "Manager" ||
      communityId === "Employee" ||
      communityId === "All"
    ) {
      ApiGetMethod(`post/personalAggregationDetails?type=${communityId}`).then(
        (res) => {
          console.log("get post/ActivitiesPostData list => ", res.data);
          setMemberList(res.data);
          let mlist = res.data.memberList;
          mlist.length = 4;
          let data = res.data;
          console.log("mlist", mlist, res.data);
          setMemberListImages(mlist);
          if (global.isPersonal === true) {
            setCommunities([
              { title: Lang.POST, value: data.totalPost },
              {
                title: `Rehvups ${Lang.RECEIVED}`,
                value: data.totalLikeReceived,
              },
              { title: `Rehvups ${Lang.GIVEN}`, value: data.totalLikesGiven },
              { title: Lang.APPEARENCE_NEWSFEED, value: data.totalHome },
              { title: Lang.TREND_BOARD, value: data.totalTranding },
              { title: Lang.RCVD_COMMENTS, value: data.totalCommentReceived },
              { title: Lang.POST_SHARED, value: data.totalSharedPost },
            ]);
          } else {
            setCommunities([
              { title: Lang.POST, value: data.totalPost },
              {
                title: `Rehvups ${Lang.RECEIVED}`,
                value: data.totalLikeReceived,
              },
              { title: `Rehvups ${Lang.GIVEN}`, value: data.totalLikesGiven },
              { title: Lang.APPEARENCE_NEWSFEED, value: data.totalHome },
              { title: Lang.TREND_BOARD, value: data.totalTranding },
              { title: Lang.RCVD_COMMENTS, value: data.totalCommentReceived },
              { title: Lang.POST_SHARED, value: data.totalSharedPost },
              { title: Lang.AVG_TIME_SPENT, value: minToHrMin(data.avgTime) },
              {
                title: Lang.TOTAL_TIME_SPENT,
                value: minToHrMin(data?.totalTime),
              },
            ]);
          }
          setLoading(false);
        }
      );
    } else {
      ApiGetMethod(
        `post/personalDetailsById?communityId=${communityId._id}`
      ).then((res) => {
        console.log("get post/ActivitiesPostData list => ", res.data);
        setMemberList(res.data);
        let mlist = res.data.memberList;
        mlist.length = 4;
        let data = res.data;
        console.log("mlist22", mlist, res.data);
        setMemberListImages(mlist);
        if (global.isPersonal === true) {
          setCommunities([
            { title: Lang.POST, value: data.totalPost },
            {
              title: `Rehvups ${Lang.RECEIVED}`,
              value: data.totalLikeReceived,
            },
            { title: `Rehvups ${Lang.GIVEN}`, value: data.totalLikesGiven },
            { title: Lang.APPEARENCE_NEWSFEED, value: data.totalHome },
            { title: Lang.TREND_BOARD, value: data.totalTranding },
            { title: Lang.RCVD_COMMENTS, value: data.totalCommentReceived },
            { title: Lang.POST_SHARED, value: data.totalSharedPost },
          ]);
        } else {
          setCommunities([
            { title: Lang.POST, value: data.totalPost },
            {
              title: `Rehvups ${Lang.RECEIVED}`,
              value: data.totalLikeReceived,
            },
            { title: `Rehvups ${Lang.GIVEN}`, value: data.totalLikesGiven },
            { title: Lang.APPEARENCE_NEWSFEED, value: data.totalHome },
            { title: Lang.TREND_BOARD, value: data.totalTranding },
            { title: Lang.RCVD_COMMENTS, value: data.totalCommentReceived },
            { title: Lang.POST_SHARED, value: data.totalSharedPost },
            { title: Lang.AVG_TIME_SPENT, value: minToHrMin(data.avgTime) },
            {
              title: Lang.TOTAL_TIME_SPENT,
              value: minToHrMin(data?.totalTime),
            },
          ]);
        }
        setLoading(false);
      });
    }
  };

  const getCommunityMembersCompany = () => {
    console.log("communityId._id", communityId._id);
    ApiGetMethod(
      `post/companyBaseCommunityById?communityId=${communityId._id}`
    ).then((res) => {
      console.log("get post/ActivitiesPostData list => ", res.data);
      setMemberList(res.data);
      let mlist = res.data.memberList;
      mlist.length = 4;
      let data = res.data;

      setMemberListImages(mlist);
      if (global.isPersonal === true) {
        setCommunities([
          { title: Lang.POST, value: data.totalPost },
          {
            title: `Rehvups ${Lang.RECEIVED}`,
            value: data.totalLikeReceived,
          },
          { title: `Rehvups ${Lang.GIVEN}`, value: data.totalLikesGiven },
          { title: Lang.APPEARENCE_NEWSFEED, value: data.totalHome },
          { title: Lang.TREND_BOARD, value: data.totalTranding },
          { title: Lang.RCVD_COMMENTS, value: data.totalCommentReceived },
          { title: Lang.POST_SHARED, value: data.totalSharedPost },
        ]);
      } else {
        setCommunities([
          { title: Lang.POST, value: data.totalPost },
          {
            title: `Rehvups ${Lang.RECEIVED}`,
            value: data.totalLikeReceived,
          },
          { title: `Rehvups ${Lang.GIVEN}`, value: data.totalLikesGiven },
          { title: Lang.APPEARENCE_NEWSFEED, value: data.totalHome },
          { title: Lang.TREND_BOARD, value: data.totalTranding },
          { title: Lang.RCVD_COMMENTS, value: data.totalCommentReceived },
          { title: Lang.POST_SHARED, value: data.totalSharedPost },
          { title: Lang.AVG_TIME_SPENT, value: minToHrMin(data.avgTime) },
          { title: Lang.TOTAL_TIME_SPENT, value: minToHrMin(data?.totalTime) },
        ]);
      }
      setLoading(false);
    });
  };

  const getCommunityMembersAggregate = () => {
    console.log("communityId._id", communityId._id);
    ApiGetMethod(`post/companyAggregationDetails?type=${communityId}`).then(
      (res) => {
        console.log("get post/ActivitiesPostData list => ", res.data);
        setMemberList(res.data);
        let mlist = res.data.memberList;
        mlist.length = 4;
        let data = res.data;

        setMemberListImages(mlist);
        if (global.isPersonal === true) {
          setCommunities([
            { title: Lang.POST, value: data.totalPost },
            {
              title: `Rehvups ${Lang.RECEIVED}`,
              value: data.totalLikeReceived,
            },
            { title: `Rehvups ${Lang.GIVEN}`, value: data.totalLikesGiven },
            { title: Lang.APPEARENCE_NEWSFEED, value: data.totalHome },
            { title: Lang.TREND_BOARD, value: data.totalTranding },
            { title: Lang.RCVD_COMMENTS, value: data.totalCommentReceived },
            { title: Lang.POST_SHARED, value: data.totalSharedPost },
          ]);
        } else {
          setCommunities([
            { title: Lang.POST, value: data.totalPost },
            {
              title: `Rehvups ${Lang.RECEIVED}`,
              value: data.totalLikeReceived,
            },
            { title: `Rehvups ${Lang.GIVEN}`, value: data.totalLikesGiven },
            { title: Lang.APPEARENCE_NEWSFEED, value: data.totalHome },
            { title: Lang.TREND_BOARD, value: data.totalTranding },
            { title: Lang.RCVD_COMMENTS, value: data.totalCommentReceived },
            { title: Lang.POST_SHARED, value: data.totalSharedPost },
            { title: Lang.AVG_TIME_SPENT, value: minToHrMin(data.avgTime) },
            {
              title: Lang.TOTAL_TIME_SPENT,
              value: minToHrMin(data?.totalTime),
            },
          ]);
        }
        setLoading(false);
      }
    );
  };

  const renderBigButton = (title) => {
    var images = getMemberListImages;
    console.log("images", images.length);
    let memberCounter = getMemberList.totalCommunityMember - 4;
    return (
      <View
        style={[
          styles.options,
          { width: "95%", height: 75, justifyContent: "space-between" },
        ]}
      >
        <View
          style={[
            styles.optionLeft,
            {
              width: "50%",
              height: "85%",
              borderRightWidth: 1,
              borderColor: "#00000029",
            },
          ]}
        >
          <Image
            source={star}
            style={styles.optionImage}
            resizeMode="contain"
          />
          <View>
            <Text
              style={{
                fontSize: getFontSize(14),
                color: "#A2A6AF",
                fontFamily: "Poppins-Regular",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: getFontSize(20),
                color:
                  communityId === "Employee"
                    ? "#4D39E9"
                    : communityId === "Manager"
                    ? "#5E8B00"
                    : communityId === "All"
                    ? "#0089BD"
                    : communityId.type === "Employee"
                    ? "#4D39E9"
                    : "#5E8B00",
                fontFamily: "Poppins-bold",
                fontWeight: "bold",
              }}
            >
              {getMemberList.totalPoints}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.optionRight,
            {
              width: "50%",
              height: "85%",
              borderLeftWidth: 1,
              borderColor: "#00000029",
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: getFontSize(14),
                color: "#A2A6AF",
                fontFamily: "Poppins-Regular",
              }}
            >
              {Lang.MEMBERS}
            </Text>
            <View
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {images.length > 0
                ? images.map((item, index) => {
                    console.log(
                      "getMemberListImages.length - 1",
                      getMemberListImages.length - 1
                    );
                    return (
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          position: "absolute",
                          marginLeft: index === 0 ? 0 : index * 15,
                          borderRadius: 20,
                          backgroundColor: "lightgray",
                          overflow: "hidden",
                          borderWidth: 2,
                          borderColor: "#fff",
                        }}
                      >
                        {index != getMemberListImages.length - 1 ? (
                          <Image
                            source={
                              item.userData.profilePic === ""
                                ? profilePic
                                : { uri: item.userData.profilePic }
                            }
                            resizeMode="contain"
                            style={{ width: 30, height: 30 }}
                          />
                        ) : (
                          <Text
                            style={{
                              fontSize: getFontSize(10),
                              color: "#110D26",
                              fontFamily: "Poppins-Medium",
                            }}
                          >
                            {memberCounter > 0 ? memberCounter : 0}+
                          </Text>
                        )}
                      </View>
                    );
                  })
                : null}
              <Text
                style={{
                  fontSize: getFontSize(20),
                  marginLeft: "80%",
                  width: "40%",
                  color:
                    communityId === "Employee"
                      ? "#4D39E9"
                      : communityId === "Manager"
                      ? "#5E8B00"
                      : communityId === "All"
                      ? "#0089BD"
                      : communityId.type === "Employee"
                      ? "#4D39E9"
                      : "#5E8B00",
                  fontFamily: "Poppins-bold",
                  fontWeight: "bold",
                }}
              >
                {getMemberList.totalCommunityMember}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHeaderComponent = () => {
    return (
      <View style={{ width: "95%", alignSelf: "center", paddingVertical: 10 }}>
        {renderBigButton(Lang.TotalPoints)}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading === true ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFF",
          }}
        >
          <ActivityIndicator color={"#4D39E9"} size="large" />
        </View>
      ) : (
        <>
          <View
            style={{
              width: "100%",
              height: 100,
              backgroundColor: "#fff",
              position: "absolute",
              bottom: -10,
            }}
          />
          <View
            elevation={5}
            style={{
              backgroundColor: "#fff",
              flex: 1,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              marginTop:
                Platform.OS === "ios" ? StatusBar.currentHeight + 10 : 10,
              overflow: "hidden",
            }}
          >
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", left: 20 }}
              >
                <Image
                  style={[styles.all_image]}
                  source={backblack}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[
                    styles.all_image,
                    { marginRight: 5, width: 35, height: 35, },
                  ]}
                  source={
                    communityId === "Employee" ||
                    communityId === "Manager" ||
                    communityId === "All"
                      ? require("../../Assets/Images/aggregate.png")
                      : { uri: communityId.picture }
                  }
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: getFontSize(18),
                    fontFamily: "Poppins-SemiBold",
                    color: "#000",
                    textAlign: "center",
                    maxWidth: "65%",
                  }}
                >
                  {communityId === "Manager" ||
                  communityId === "Employee" ||
                  communityId === "All"
                    ? "Aggregate stats"
                    : LangType === "en"
                    ? communityId.name
                    : communityId.frenchName}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setDescStatus((data) => !data)}>
              {getDescStatus === false ? (
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: getFontSize(16),
                    alignSelf: "center",
                    color: "#7F8190",
                    fontFamily: "Poppins-Medium",
                    marginVertical: 10,
                    width: "85%",
                    textAlign: "center",
                  }}
                >
                  {LangType == "en" ? communityId.description:communityId.frenchDescription}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: getFontSize(16),
                    alignSelf: "center",
                    color: "#7F8190",
                    fontFamily: "Poppins-Medium",
                    marginVertical: 10,
                    width: "85%",
                    textAlign: "center",
                  }}
                >
                  {LangType == "en" ? communityId.description:communityId.frenchDescription}
                </Text>
              )}
            </TouchableOpacity>
            <View style={{ alignSelf: "center", width: "90%" }}>
              <FlatList
                data={getCommunitites}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[styles.comContainer]}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          overflow: "hidden",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <View style={styles.round} />
                        <View style={[styles.round, { right: 30, top: -20 }]} />
                        <Text
                          style={{
                            fontSize: getFontSize(20),
                            color:
                              communityId === "Employee"
                                ? "#4D39E9"
                                : communityId === "Manager"
                                ? "#5E8B00"
                                : communityId === "All"
                                ? "#0089BD"
                                : communityId.type === "Employee"
                                ? "#4D39E9"
                                : "#5E8B00",
                            fontFamily: "Poppins-bold",
                            fontWeight: "bold",
                          }}
                        >
                          {item.value}
                        </Text>
                        <Text
                          style={{
                            fontSize: getFontSize(12),
                            alignSelf: "center",
                            color: "#7F8190",
                            textAlign: "center",
                            fontFamily: "Poppins-medium",
                            width: "80%",
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.title}
                ListHeaderComponent={renderHeaderComponent()}
                numColumns={3}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D39E9",
    paddingTop: 30,
  },
  header: {
    width: "100%",
    height: 55,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  all_image: {
    height: Scaler(25),
    width: Scaler(25),
  },
  options: {
    width: "48%",
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFF",
    borderRadius: 10,
    elevation: 4,
    flexDirection: "row",
    marginHorizontal: "2%",
    marginVertical: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  optionLeft: {
    width: "70%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 5,
  },
  optionRight: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 5,
  },
  optionImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  optionImageRight: {
    width: 15,
    height: 15,
    marginLeft: 2,
  },
  communityHeadingContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
  },
  comOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  radioImage: {
    width: 40,
    height: 20,
    marginHorizontal: 10,
  },
  comContainer: {
    width: "31%",
    height: Dimensions.get("screen").width / 4,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: "1%",
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  comImage: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
  bottomSheetContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },
  bsheetButton: {
    width: "90%",
    borderRadius: 10,
    height: 50,
    margin: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
  },
  round: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EEEBFF",
    position: "absolute",
    top: -10,
    opacity: 0.6,
    right: -15,
  },
});
