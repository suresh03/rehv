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
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";

import { backblack } from "../../Assets/icon";
import Scaler from "../../Utils/Scaler";
import { updatePersonalCommunity } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import useApiServices from "../../Services/useApiServices";
import Lang from "../../Language";

export default function InsightCompany({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [getCommunitites, setCommunitites] = useState([]);
  const [getManagerCommunities, setManagerCommunitites] = useState([]);
  const [getCommunity, setCommunity] = useState("Worker");
  const dispatch = useDispatch();
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const panelRef = useRef(null);

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
    global.isPersonal = true;
    getCommunityMembers();
  }, []);

  const getCommunityMembers = () => {
    ApiPostMethod(`post/personalCommunityList`).then((res) => {
      console.log(
        "get post/personalCommunityList list => ",
        JSON.stringify(res)
      );
      let empcmnty = res.data.list.filter((x) => x.type === "Employee");
      let mgrcmnty = res.data.list.filter((x) => x.type === "Manager");
      empcmnty.push({
        title: "Aggregate Stats1",
        picture: require("../../Assets/Images/aggregate.png"),
        isAggregate: true,
        name: "Aggregate Stats",
        type: "Employee",
      });
      mgrcmnty.push({
        title: "Aggregate Stats2",
        picture: require("../../Assets/Images/aggregate.png"),
        isAggregate: true,
        name: "Aggregate Stats",
        type: "Manager",
      });
      setCommunitites(empcmnty);
      setManagerCommunitites(mgrcmnty);
      setLoading(false);
    });
  };

  const renderHeaderComponent = () => {
    return (
      <View style={styles.communityHeadingContainer}>
        <View style={styles.comOptionContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setCommunity("Worker")}
          >
            <Text
              style={{
                fontSize: Scaler(16),
                opacity: 0.4,
                fontFamily: "Poppins-Medium",
                color: "#4C38E8",
                textAlign: "center",
              }}
            >
              {Lang.WORKER}
            </Text>
          </TouchableOpacity>
          {global.userDepartment != "EMPLOYEE" ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setCommunity("Manager")}
            >
              <Text
                style={{
                  fontSize: Scaler(16),
                  opacity: 0.4,
                  fontFamily: "Poppins-Medium",
                  color: "#5E8B00",
                  textAlign: "center",
                }}
              >
                {Lang.MANAGER}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const renderManagerView = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignSelf: "center",
            width: "85%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            {getCommunitites.map((item) => {
              return (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => {
                    navigation.navigate("CommunityDetails", {
                      flag: "personal"
                    });
                    dispatch(
                      updatePersonalCommunity(
                        item.isAggregate ? item.type : item
                      )
                    );
                  }}
                  activeOpacity={0.8}
                  style={[
                    styles.comContainer,
                    {
                      borderColor: "#4C38E8",
                      marginHorizontal: "1%",
                      width: Dimensions.get("screen").width / 2.5,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "50%",
                      height: "50%",
                      overflow: "hidden",
                      borderRadius: 100,
                      borderWidth: 4,
                      borderColor: "#EEEBFF",
                    }}
                  >
                    <Image
                      source={
                        item.isAggregate ? item.picture : { uri: item.picture }
                      }
                      style={styles.comImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: Scaler(14),
                      alignSelf: "center",
                      color: "#110D26",
                      fontFamily: "Poppins-SemiBold",
                      textAlign: "center",
                      marginTop: 5,
                      width: "95%",
                    }}
                  >
                    {item.isAggregate
                      ? Lang.Aggregate_TITLE
                      : LangType === "en"
                      ? item.name
                      : item.frenchName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            {getManagerCommunities.map((item) => {
              return (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => {
                    navigation.navigate("CommunityDetails", {
                      flag: "personal",
                    });
                    dispatch(
                      updatePersonalCommunity(
                        item.isAggregate ? item.type : item
                      )
                    );
                  }}
                  activeOpacity={0.8}
                  style={[
                    styles.comContainer,
                    {
                      borderColor: "#5E8B00",
                      marginHorizontal: "1%",
                      width: Dimensions.get("screen").width / 2.5,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "50%",
                      height: "50%",
                      overflow: "hidden",
                      borderRadius: 100,
                      borderWidth: 4,
                      borderColor: "rgba(170, 196, 121, 0.3)",
                    }}
                  >
                    <Image
                      source={
                        item.isAggregate ? item.picture : { uri: item.picture }
                      }
                      style={styles.comImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: Scaler(14),
                      alignSelf: "center",
                      color: "#110D26",
                      fontFamily: "Poppins-SemiBold",
                      textAlign: "center",
                      marginTop: 5,
                      width: "95%",
                    }}
                  >
                    {item.isAggregate
                      ? Lang.Aggregate_TITLE
                      : LangType === "en"
                      ? item.name
                      : item.frenchName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CommunityDetails", { flag: "personal" });
            dispatch(updatePersonalCommunity("All"));
          }}
          activeOpacity={0.8}
          style={[
            styles.comContainer,
            {
              borderColor: "#4C38E8",
              width: "83%",
              height: 100,
              marginBottom: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <View
            style={{
              width: 75,
              height: 75,
              overflow: "hidden",
              borderRadius: 100,
              borderWidth: 4,
              borderColor: "#0000001A",
            }}
          >
            <Image
              source={require("../../Assets/Images/aggregate.png")}
              style={styles.comImage}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontSize: Scaler(14),
              alignSelf: "center",
              color: "#110D26",
              fontFamily: "Poppins-SemiBold",
              textAlign: "center",
              width: "60%",
            }}
          >
            {Lang.aggregateStatsForAllCommunities}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderEmployeeView = () => {
    return (
      <View
        style={{
          alignSelf: "center",
          width: "85%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View>
          <FlatList
            data={getCommunitites}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => {
                    navigation.navigate("CommunityDetails", {
                      flag: "personal",
                    });
                    dispatch(
                      updatePersonalCommunity(
                        item.isAggregate ? item.type : item
                      )
                    );
                  }}
                  activeOpacity={0.8}
                  style={[
                    styles.comContainer,
                    {
                      borderColor: "#4C38E8",
                      marginHorizontal: "1%",
                      width: "48%",
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "50%",
                      height: "50%",
                      overflow: "hidden",
                      borderRadius: 100,
                      borderWidth: 4,
                      borderColor: "#EEEBFF",
                    }}
                  >
                    <Image
                      source={
                        item.isAggregate ? item.picture : { uri: item.picture }
                      }
                      style={styles.comImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: Scaler(14),
                      alignSelf: "center",
                      color: "#110D26",
                      fontFamily: "Poppins-SemiBold",
                      textAlign: "center",
                      marginTop: 5,
                      width: "95%",
                    }}
                  >
                    {item.isAggregate
                      ? Lang.Aggregate_TITLE
                      : item.langType === "en"
                      ? item.name
                      : item.frenchName}
                  </Text>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CommunityDetails", {
                      flag: "personal",
                    });
                    dispatch(updatePersonalCommunity("All"));
                  }}
                  activeOpacity={0.8}
                  style={[
                    styles.comContainer,
                    {
                      borderColor: "#4C38E8",
                      width: "98%",
                      height: 100,
                      marginBottom: 30,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      overflow: "hidden",
                      borderRadius: 100,
                      borderWidth: 4,
                      borderColor: "#0000001A",
                    }}
                  >
                    <Image
                      source={require("../../Assets/Images/aggregate.png")}
                      style={styles.comImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: Scaler(14),
                      alignSelf: "center",
                      color: "#110D26",
                      fontFamily: "Poppins-SemiBold",
                      textAlign: "center",
                      width: "60%",
                    }}
                  >
                    {Lang.Aggregate_ALL}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.title}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
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
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              height: 100,
              backgroundColor: "#fff",
              position: "absolute",
              bottom: -10,
            }}
          />
          <View style={{ flex: 1, backgroundColor: "#ffff" }}>
            <View
              style={{
                width: "100%",
                height: "50%",
                backgroundColor: "#4D39E9",
                position: "absolute",
                top: 0,
              }}
            />
            <View
              elevation={5}
              style={{
                flex: 1,
                backgroundColor: "#fff",
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
                <Text
                  style={{
                    fontSize: Scaler(20),
                    fontFamily: "Poppins-SemiBold",
                    color: "#000",
                    textAlign: "center",
                  }}
                >
                  RehvUp {Lang.INSIGHTS}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: Scaler(18),
                    fontFamily: "Poppins-Medium",
                    color: "#000",
                    textAlign: "center",
                  }}
                >
                  {Lang.PERSONAL}
                </Text>
                {/* <Text
                                style={{
                                    fontSize: Scaler(16),
                                    alignSelf: "center",
                                    color: "#7F8190",
                                    fontFamily: "Poppins-Medium",
                                    marginVertical: 10,
                                    textAlign: "center"
                                }}
                            >
                                Lorem Ipsum is simply dummy text of the dummy text ever since.
                            </Text> */}
                <View style={{ flex: 1 }}>
                  {renderHeaderComponent()}
                  {global.userDepartment != "EMPLOYEE"
                    ? renderManagerView()
                    : renderEmployeeView()}
                </View>
              </View>
            </View>
          </View>
        </View>
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
    width: "46%",
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFF",
    borderRadius: 10,
    elevation: 4,
    flexDirection: "row",
    marginHorizontal: "2%",
    marginVertical: 8,
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
    width: "85%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  comOptionContainer: {
    width: "85%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  radioImage: {
    width: 40,
    height: 20,
    marginHorizontal: 10,
  },
  comContainer: {
    width: "95%",
    height: Dimensions.get("screen").width / 2.5,
    borderRadius: 10,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    alignSelf: "center",
    borderColor: "#BCCD8D",
    marginVertical: 5,
  },
  comImage: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
    borderRadius:50,
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
});
