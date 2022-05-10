/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef, Children } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  FlatList,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { updatePersonalCommunity } from "../../Redux/actions";
import { backblack, onButton, offButton } from "../../Assets/icon";
import Scaler from "../../Utils/Scaler";
import Lang from "../../Language";
import useApiServices from "../../Services/useApiServices";
import { useDispatch } from "react-redux";

export default function InsightCompany({ navigation }) {
  const [getOptions, setOptions] = useState([]);
  const [getCommunitites, setCommunitites] = useState([]);
  const [getCommunity, setCommunity] = useState("Worker");
  const [getMCommunities, setMCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bottomSheet, setBottomSheet] = useState(false);
  const [exBottomSheet, setExBottomSheet] = useState(false);
  const [PersonaOfCompany, setPersonaOfCompany] = useState([]);
  const dispatch = useDispatch();
  const { ApiGetMethod, ApiPostMethod } = useApiServices();

  const personList = [
    {
      name: "Myles",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Patrick",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Christopher",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Maria",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Vernon",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Brigette",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Vernon",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Patrick",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Christopher",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
    {
      name: "Myles",
      image: require("../../Assets/Images/shield/Darwin_Front.png"),
      point: "30k Points",
    },
  ];

  const [LangType, setLangType] = useState("");

  useEffect(() => {
    getUserDetails();
  }, [LangType]);

  const getUserDetails = () => {
    ApiGetMethod(`user/getUserDetails`)
      .then((res) => {
        setLangType(res.data[0].langSymbol);
      })
      .finally(() => console.log("success"));
  };

  useEffect(() => {
    global.isPersonal = false;
    getCommunityData();
    personaOfCompany();
  }, [getCommunity]);

  const getCommunityData = () => {
    setLoading(true);
    ApiGetMethod(
      `post/communityListByCompany?type=${
        getCommunity === "Worker" ? "Employee" : "Manager"
      }`
    ).then(async (res) => {
      console.log(
        "get post/communityListByCompany list => ",
        JSON.stringify(res)
      );
      let data = res.data;
      setOptions([
        {
          title: Lang.POST,
          image: require("../../Assets/Images/post.png"),
          value: data.totalPost,
          icon: "image",
        },
        {
          title: Lang.CONTEST,
          image: require("../../Assets/Images/contest.png"),
          value: data.totalContest,
          icon: "certificate",
        },
        {
          title: Lang.SURVEY,
          image: require("../../Assets/Images/survey.png"),
          value: data.totalSurvey,
          icon: "star",
        },
        {
          title: Lang.POLL,
          image: require("../../Assets/Images/poll.png"),
          value: data.totalPoll,
          icon: "bar-chart",
        },
      ]);
      let empcmnty = data.communityList.filter((x) => x.type === "Employee");
      let mgrcmnty = data.communityList.filter((x) => x.type === "Manager");
      empcmnty.push({
        title: "Aggregate Stats1",
        langType: "en",
        picture: require("../../Assets/Images/aggregate.png"),
        isAggregate: true,
        name: "Aggregate Stats",
        frenchName: "Aggregate Stats",
        type: "Employee",
      });
      mgrcmnty.push({
        title: "Aggregate Stats2",
        langType: "en",
        picture: require("../../Assets/Images/aggregate.png"),
        isAggregate: true,
        name: "Aggregate Stats",
        frenchName: "Aggregate Stats",
        type: "Manager",
      });
      setCommunitites(empcmnty);
      setMCommunities(mgrcmnty);
      setLoading(false);
    });
  };

  const personaOfCompany = () => {
    ApiGetMethod(`post/personaOfCompany`)
      .then((res) => {
        let keyOrder = [
          "Maestro",
          "Gifted",
          "Expert",
          "Experienced",
          "Talented",
        ];
        let sortedData = keyOrder.reduce((acc, curr) => {
          let obj = res.data.find((item) => item._id === curr);
          return acc.concat(obj);
        }, []);
        console.log("sortedData ", sortedData);
        setPersonaOfCompany(sortedData);
      })
      .catch((error) => {
        console.assert(error);
      })
      .finally(() => setLoading(false));
  };

  const renderBigButton = (title) => {
    return (
      <TouchableOpacity
        onPress={() =>
          title === "RehvUp Ex" ? setExBottomSheet(true) : setBottomSheet(true)
        }
        activeOpacity={0.8}
        style={[
          styles.options,
          {
            width: "95%",
            elevation: title ? 4 : 0,
            shadowOpacity: title ? 0.3 : 0,
          },
        ]}
      >
        {title ? (
          <View style={styles.optionLeft}>
            {title === Lang.Persona ? (
              <Image
                source={require("../../Assets/Images/persona.png")}
                style={styles.optionImage}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../Assets/Images/likeIcon.png")}
                style={styles.optionImage}
                resizeMode="contain"
              />
            )}
            <Text
              style={{
                fontSize: Scaler(12),
                alignSelf: "center",
                color: "#000",
                fontFamily: "Poppins-Regular",
              }}
            >
              {title}
            </Text>
          </View>
        ) : null}
        {title ? (
          <View
            style={[
              styles.optionRight,
              { justifyContent: "flex-end", paddingRight: 10 },
            ]}
          >
            <Image
              source={require("../../Assets/Images/rightdropdwon.png")}
              style={styles.optionImageRight}
              resizeMode="contain"
            />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderHeaderComponent = () => {
    return (
      <View style={{ marginBottom: 10 }}>
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
        <Text
          style={{
            fontSize: Scaler(24),
            fontFamily: "Poppins-SemiBold",
            color: "#000",
            textAlign: "center",
          }}
        >
          {global.loginCompany}
        </Text>
      </View>
    );
  };

  const renderBottomSheet = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.bottomSheetContainer}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: 45,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: Scaler(20),
                fontFamily: "Poppins-SemiBold",
                color: "#000",
                textAlign: "center",
                position: "absolute",
              }}
            >
              {Lang.Persona}
            </Text>
            <Text
              onPress={() => setBottomSheet(false)}
              style={{
                fontSize: Scaler(20),
                position: "absolute",
                right: 10,
                fontFamily: "Poppins-SemiBold",
                color: "#000",
                textAlign: "center",
              }}
            >
              ✕
            </Text>
          </View>
          <Text
            style={{
              fontSize: Scaler(24),
              fontFamily: "Poppins-SemiBold",
              color: "#000",
              textAlign: "center",
            }}
          >
            {global.loginCompany}
          </Text>
          <View
            style={{
              width: "90%",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: Scaler(10),
            }}
          >
            <Text
              style={{
                fontSize: Scaler(16),
                fontFamily: "Poppins-Medium",
                color: "#7F8190",
                textAlign: "center",
              }}
            >
              {Lang.rankingNote}
            </Text>
          </View>
          <View style={{ paddingVertical: 5, flex: 1 }}>
            {Children.toArray(
              PersonaOfCompany.map((item) => {
                return (
                  <ImageBackground
                    source={
                      item.ranking == "Experienced"
                        ? require("../../Assets/Images/btnimage/four.png")
                        : item.ranking == "Maestro"
                        ? require("../../Assets/Images/btnimage/one.png")
                        : item.ranking == "Gifted"
                        ? require("../../Assets/Images/btnimage/two.png")
                        : item.ranking == "Talented"
                        ? require("../../Assets/Images/btnimage/five.png")
                        : item.ranking == "Expert"
                        ? require("../../Assets/Images/btnimage/three.png")
                        : null
                    }
                    style={[styles.bsheetButton]}
                  >
                    <Text
                      style={{
                        fontSize: Scaler(17),
                        fontFamily: "Poppins-Medium",
                        color:
                          item.ranking == "Experienced"
                            ? "#fff"
                            : item.ranking == "Maestro"
                            ? "#000"
                            : item.ranking == "Gifted"
                            ? "#fff"
                            : item.ranking == "Talented"
                            ? "#fff"
                            : item.ranking == "Expert"
                            ? "#fff"
                            : null,
                        textAlign: "center",
                      }}
                    >
                      {item.ranking}
                    </Text>
                    <Text
                      style={{
                        fontSize: Scaler(22),
                        fontFamily: "Poppins-Bold",
                        color:
                          item.ranking == "Experienced"
                            ? "#fff"
                            : item.ranking == "Maestro"
                            ? "#000"
                            : item.ranking == "Gifted"
                            ? "#fff"
                            : item.ranking == "Talented"
                            ? "#fff"
                            : item.ranking == "Expert"
                            ? "#fff"
                            : null,
                        textAlign: "center",
                      }}
                    >
                      {item.total}
                    </Text>
                  </ImageBackground>
                );
              })
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderExBottomSheet = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.bottomSheetContainer,
            { height: Dimensions.get("screen").height / 1.05 },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setExBottomSheet(false)}
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
              RehvUp Ex
            </Text>
          </View>
          <Text
            style={{
              fontSize: Scaler(24),
              fontFamily: "Poppins-SemiBold",
              color: "#000",
              textAlign: "center",
            }}
          >
            TIM HORTONS
          </Text>
          <Text
            style={{
              fontSize: Scaler(16),
              width: "80%",
              marginVertical: 10,
              fontFamily: "Poppins-Medium",
              color: "#7F8190",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            See the leaders of the Rehvup Ex category sorted by number of
            experience points.
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {personList.map((item) => {
              return (
                <View
                  style={{
                    width: "95%",
                    height: 75,
                    borderBottomColor: "#00000029",
                    borderBottomWidth: 1,
                    alignSelf: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 35,
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ width: 45, height: 45 }}
                      source={item.image}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-start" }}>
                    <Text
                      style={{
                        fontSize: Scaler(16),
                        fontFamily: "Poppins-SemiBold",
                        color: "#000",
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "30%",
                      height: 30,
                      borderRadius: 5,
                      backgroundColor: "rgba(77, 57, 233, 0.1)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Scaler(12),
                        fontFamily: "Poppins-SemiBold",
                        color: "#4D39E9",
                        textAlign: "center",
                      }}
                    >
                      {item.point}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  };

  const renderFooterComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderBigButton(Lang.Persona)}
        <View style={styles.communityHeadingContainer}>
          <Text
            style={{
              fontSize: Scaler(18),
              fontFamily: "Poppins-SemiBold",
              color: "#000",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {Lang.COMMUNITIES}
          </Text>
          <View style={styles.comOptionContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setCommunity("Worker")}
            >
              <Text
                style={{
                  fontSize: Scaler(14),
                  fontFamily:
                    getCommunity === "Worker"
                      ? "Poppins-Bold"
                      : "Poppins-Regular",
                  color: getCommunity === "Worker" ? "#000" : "#E9E5E4",
                  textAlign: "center",
                }}
              >
                {Lang.WORKER}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setCommunity((data) =>
                  data === "Worker" ? "Manager" : "Worker"
                )
              }
            >
              <Image
                source={getCommunity === "Manager" ? offButton : onButton}
                resizeMode="contain"
                style={styles.radioImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setCommunity("Manager")}
            >
              <Text
                style={{
                  fontSize: Scaler(14),
                  fontFamily:
                    getCommunity === "Worker"
                      ? "Poppins-Regular"
                      : "Poppins-Bold",
                  color: getCommunity === "Manager" ? "#000" : "#E9E5E4",
                  textAlign: "center",
                }}
              >
                {Lang.MANAGER}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignSelf: "center", flex: 1 }}>
          {getCommunity === "Worker" ? (
            <FlatList
              data={getCommunitites}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        updatePersonalCommunity(
                          item.isAggregate ? item.type : item
                        )
                      );
                      navigation.navigate("CommunityDetails", {
                        flag: "company",
                        name:
                          item.name === "Aggregate Stats" ? "Aggregate" : "",
                      });
                    }}
                    activeOpacity={0.8}
                    style={[
                      styles.comContainer,
                      {
                        borderColor: item.isAggregate
                          ? "#0089BD"
                          : getCommunity === "Worker"
                          ? "#4C38E8"
                          : "#C8D997",
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "50%",
                        height: "50%",
                        overflow: "hidden",
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: item.isAggregate
                          ? "#0089BD"
                          : getCommunity === "Worker"
                          ? "#EEEBFF"
                          : "#C8D997",
                      }}
                    >
                      <Image
                        source={
                          item.isAggregate
                            ? item.picture
                            : { uri: item.picture }
                        }
                        style={styles.comImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: Scaler(14),
                        alignSelf: "center",
                        color: "#000",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontFamily: "Poppins-SemiBold",
                      }}
                    >
                      {LangType === "en" ? item.name : item.frenchName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Scaler(14),
                        alignSelf: "center",
                        color: "#000",
                        textAlign: "center",
                        fontFamily: "Poppins-SemiBold",
                        marginTop: 10,
                      }}
                    >
                      No data found.
                    </Text>
                  </View>
                );
              }}
              numColumns={2}
            />
          ) : (
            <FlatList
              data={getMCommunities}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        updatePersonalCommunity(
                          item.isAggregate ? item.type : item
                        )
                      );
                      navigation.navigate("CommunityDetails", {
                        flag: "company",
                        name:
                          item.name === "Aggregate Stats" ? "Aggregate" : "",
                      });
                    }}
                    activeOpacity={0.8}
                    style={[
                      styles.comContainer,
                      {
                        borderColor: item.isAggregate
                          ? "#0089BD"
                          : getCommunity === "Worker"
                          ? "#4C38E8"
                          : "#C8D997",
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "50%",
                        height: "50%",
                        overflow: "hidden",
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: item.isAggregate
                          ? "#0089BD"
                          : getCommunity === "Worker"
                          ? "#EEEBFF"
                          : "#C8D997",
                      }}
                    >
                      <Image
                        source={
                          item.isAggregate
                            ? item.picture
                            : { uri: item.picture }
                        }
                        style={styles.comImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: Scaler(14),
                        alignSelf: "center",
                        color: "#000",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontFamily: "Poppins-SemiBold",
                      }}
                    >
                      {LangType === "en" ? item.name : item.frenchName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Scaler(14),
                        alignSelf: "center",
                        color: "#000",
                        textAlign: "center",
                        fontFamily: "Poppins-SemiBold",
                        marginTop: 10,
                      }}
                    >
                      No data found.
                    </Text>
                  </View>
                );
              }}
              numColumns={2}
            />
          )}
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
            <View
              style={{
                width: "95%",
                alignSelf: "center",
                paddingVertical: 10,
                flex: 1,
              }}
            >
              {renderHeaderComponent()}
              <FlatList
                data={getOptions}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.options}
                    >
                      <View style={styles.optionLeft}>
                        <Image
                          source={item.image}
                          style={{ width: 25, height: 25, marginHorizontal: 5 }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            fontSize: Scaler(12),
                            alignSelf: "center",
                            color: "#000",
                            fontFamily: "Poppins-Regular",
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      <View style={styles.optionRight}>
                        <Text
                          style={{
                            fontSize: Scaler(20),
                            alignSelf: "center",
                            color: "#000",
                            fontFamily: "Poppins-Regular",
                            fontWeight: "bold",
                          }}
                        >
                          {item.value}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.title}
                ListFooterComponent={renderFooterComponent()}
                numColumns={2}
              />
            </View>
          </View>
        </View>
      )}

      {bottomSheet || exBottomSheet ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            opacity: 0.4,
            position: "absolute",
          }}
        />
      ) : null}
      {bottomSheet ? renderBottomSheet() : null}
      {exBottomSheet ? renderExBottomSheet() : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D39E9",
    paddingTop: 10,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight + 30 : 0,
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
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  bottomSheetContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FFFF",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    marginBottom: 10,
  },
  radioImage: {
    width: 40,
    height: 20,
    marginHorizontal: 10,
  },
  comContainer: {
    width: Dimensions.get("screen").width / 2.5,
    height: Dimensions.get("screen").width / 2.5,
    borderRadius: 10,
    backgroundColor: "#FFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#BCCD8D",
    margin: 5,
  },
  comImage: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
    borderRadius: 50,
  },
  bsheetButton: {
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 5,
  },
});
