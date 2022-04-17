import React, { useEffect, useState as US } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  TextInput,
  Platform,
  ActivityIndicator
} from "react-native";
import { Portal, Provider, Modal, useTheme } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import {
  arrowBelu,
  backblack,
  blackcrossIcon,
  surveyIcon,
} from "../../Assets/icon";
import Scaler from "../../Utils/Scaler";
import useApiServices from "../../Services/useApiServices";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { useSelector, useDispatch } from "react-redux";
import { updateSurvey, updateQA, deleteQA } from "../../Redux/actions";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";

const COLORS = {
  primary: "#252c4a",
  secondary: "#1E90FF",
  accent: "#3498db",

  success: "#00C851",
  error: "#ff4444",

  black: "#171717",
  white: "#FFFFFF",
  background: "#252C4A",
};

const SIZES = {
  base: 10,
  width,
  height,
};

const TakeSurveyScreen = ({ navigation, route }) => {
  console.log("route.params.questions", route.params.surveyDetail);
  const { surveyDetail } = route.params;
  const { ApiPostMethod } = useApiServices();
  const [visible, setVisible] = US(false);
  const [ShowButton, setShowButton] = US(false);
  const [backColor, setBackColor] = US(false);
  const [progress, setProgress] = US(new Animated.Value(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = US(0);
  const [data, setData] = US([]);
  const [dataSource, setDataSource] = US([]);
  const [currentOptionSelected, setCurrentOptionSelected] = US("");
  const [questionId, setQuestionId] = US("");
  const [PostId, setPostId] = US("");
  const [other, setOther] = US("");
  const [score, setScore] = US(0);
  const [showNextButton, setShowNextButton] = US(true);
  const [visibleTextInput, setVisibleTextInput] = US(false);
  const [loading, setLoading] = US(true);
  const theme = useTheme();
  
  const currentSurvey = useSelector((state) => state.currentSurvey);
  const surveyQA = useSelector((state) => state.surveyQA);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    surveyDetail ? setData(surveyDetail.questionsData) : null;
    
    if (
      surveyDetail.questionsData.length >= currentSurvey?.currentQuestionIndex
    ) {
      let qid =
        surveyDetail.questionsData[currentSurvey.currentQuestionIndex]?._id;
      questionsHandler(qid);
    }
    if (currentSurvey != null) {
      setDataSource(currentSurvey.listObjects);
      setData(currentSurvey.data);
      setCurrentQuestionIndex(currentSurvey.currentQuestionIndex);
    }

    if (surveyDetail.questionsData.length === 1) {
      setShowButton(true);
      setBackColor(false);
      setShowNextButton(true);
      setVisibleTextInput(false);
      setCurrentOptionSelected(null);
    }

    const unsubscribe = navigation.addListener("focus", () => {
      surveyDetail ? setData(surveyDetail.questionsData) : null;
      console.log("surveyDetail", surveyDetail, "currentSurvey", currentSurvey);
      console.log("checkData", surveyDetail.questionsData.length, currentSurvey?.currentQuestionIndex)
      if (
        surveyDetail.questionsData.length >= currentSurvey?.currentQuestionIndex
      ) {
        let qid =
          surveyDetail.questionsData[currentSurvey.currentQuestionIndex]?._id;
        questionsHandler(qid);
      }
      if (currentSurvey != null) {
        setDataSource(currentSurvey.listObjects);
        setData(currentSurvey.data);
        setCurrentQuestionIndex(currentSurvey.currentQuestionIndex);
      }
    });
    return unsubscribe;
  }, []);

  const questionsHandler = (questionId) => {
    if (surveyQA.length > 0) {
      let data = surveyQA.find((x) => x.questionId === questionId);
      setBackColor(true);
      setCurrentOptionSelected(data.answer);
      setVisibleTextInput(true);
      setShowNextButton(true);
      setQuestionId(data.questionId);
      setPostId(data.postId);
    }
  };

  const validateAnswer = (selectedOption, data) => {
    setBackColor(true);
    setCurrentOptionSelected(selectedOption);
    setVisibleTextInput(true);
    setShowNextButton(true);
    setQuestionId(data._id);
    setPostId(data.postId);
    console.log("selectedOption", selectedOption, data);
  };

  const handleSubmit = () => {
    let listObjects = [...dataSource];
    console.log("datasource => " + JSON.stringify(dataSource));
    var newElem = {
      questionId: questionId,
      answer: currentOptionSelected,
      other: other,
      postId: PostId,
    };
    listObjects.splice(currentQuestionIndex, 1, newElem);
    setDataSource(listObjects);
    console.log("dataSource", listObjects);
    console.log("newElem", newElem);
    var surveydta = {
      listObjects: listObjects,
      currentQuestionIndex: currentQuestionIndex,
      data: data,
    };
    dispatch(updateSurvey(surveydta));
    dispatch(updateQA(newElem));
    setBackColor(false);
    let datas = {
      postId: PostId,
      answeerArray: listObjects,
      eventType: "SURVEY",
    };
    ApiPostMethod("post/createSurveyAnswer", datas)
      .then((res) => {
        console.log("post/createSurveyAnswer ", res);
        if (res.statusCode === 200) {
          if (currentQuestionIndex == data.length - 1) {
            setVisible(true);
            dispatch(updateSurvey(null));
          } else {
            setVisibleTextInput(false);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setShowNextButton(true);
            Animated.timing(progress, {
              toValue: currentQuestionIndex + 1,
              duration: 1000,
              useNativeDriver: false,
            }).start();
          }
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => {
        setLoading(false);
      });
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleNext = (currentQuestionIndex) => {
    let listObjects = [...dataSource];
    console.log("datasource => " + JSON.stringify(dataSource));
    var newElem = {
      questionId: questionId,
      answer: currentOptionSelected,
      other: other,
      postId: PostId,
    };
    listObjects.splice(currentQuestionIndex, 1, newElem);
    setDataSource(listObjects);
    console.log("dataSource", listObjects);
    console.log("newElem", newElem);

    var surveydta = {
      listObjects: listObjects,
      currentQuestionIndex: currentQuestionIndex,
      data: data,
    };
    dispatch(updateSurvey(surveydta));
    dispatch(updateQA(newElem));

    if (data.length - 1 === currentQuestionIndex + 1) {
      setShowButton(true);
      setBackColor(false);
      setVisibleTextInput(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setShowNextButton(true);
      Animated.timing(progress, {
        toValue: currentQuestionIndex + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      setShowButton(false);
      console.log("currentQuestionIndex", currentQuestionIndex);
      let cindex = currentQuestionIndex + 1;
      if (surveyQA.length - 1 > cindex || surveyQA.length - 1 === cindex) {
        questionsHandler(data[currentQuestionIndex + 1]?._id);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setBackColor(false);
        setVisibleTextInput(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentOptionSelected(null);
        setShowNextButton(true);
      }
      Animated.timing(progress, {
        toValue: currentQuestionIndex + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleBack = () => {
    console.log("currentQuestionIndex", currentQuestionIndex);
    setShowButton(false);
    if (currentQuestionIndex == 0) {
      navigation.goBack();
    } else {
      let data = surveyQA[currentQuestionIndex - 1].questionId;
      setVisibleTextInput(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentOptionSelected(null);
      setShowNextButton(true);
      Animated.timing(progress, {
        toValue: currentQuestionIndex - 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      questionsHandler(data);
    }
  };

  const renderQuestion = () => {
    return (
      <View style={{}}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: Scaler(20),
            textAlign: "left",
            fontWeight: "700",
          }}
        >
          {data[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {data[currentQuestionIndex]?.answer.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option, data[currentQuestionIndex])}
            //disabled={isOptionsDisabled}
            key={option}
            style={{
              borderWidth: option == currentOptionSelected ? 0 : 0.8,
              borderColor:
                option == currentOptionSelected
                  ? COLORS.white
                  : option == currentOptionSelected
                  ? COLORS.error
                  : COLORS.black + "40",
              backgroundColor:
                option == currentOptionSelected ? "#4d39e9" : COLORS.white,
              height: 60,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 10,
              width: width / 1.2,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: Scaler(16),
                fontWeight: "600",
                color:
                  option == currentOptionSelected ? COLORS.white : COLORS.black,
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={() =>
            backColor === true ? handleNext(currentQuestionIndex) : null
          }
          activeOpacity={backColor === true ? 0.5 : 1}
          style={
            {
              // borderRadius: 10,
              // width: "75%",
              // height: Scaler(50),
              // backgroundColor: backColor === true ? "#4d39e9" : "#f4f2f1",
              // justifyContent: "center",
              // alignSelf: "center",
            }
          }
        >
          <Text
            style={{
              color: backColor === true ? "#fff" : "#7F8190",
              textAlign: "center",
              fontSize: Scaler(18),
              fontFamily: "Poppins-Medium",
            }}
          >
            {Lang.NEXT}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const renderSubmitButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={() => (backColor === true ? handleSubmit() : null)}
          activeOpacity={backColor === true ? 0.5 : 1}
          style={
            {
              // borderRadius: 10,
              // width: "75%",
              // height: Scaler(50),
              // backgroundColor: backColor === true ? "#4d39e9" : "#f4f2f1",
              // justifyContent: "center",
              // alignSelf: "center",
            }
          }
        >
          <Text
            style={{
              color: backColor === true ? "#fff" : "#7F8190",
              textAlign: "center",
              fontSize: Scaler(18),
              fontFamily: "Poppins-Medium",
            }}
          >
            {Lang.SUBMIT}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const progressAnim = progress.interpolate({
    inputRange: [0, data.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 5,
          borderRadius: 20,
          backgroundColor: "#eeebff",
        }}
      >
        <Animated.View
          style={[
            {
              height: 5,
              borderRadius: 20,
              backgroundColor: "#4d39e9",
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const hideDialog = () => {
    setVisible(false);
    setBackColor(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View
          style={{
            flexDirection: "row",
            marginTop: StatusBar.currentHeight + 10,
            justifyContent: "space-between",
            alignItems: "center",
            height: 40,
          }}
        >
          <TouchableOpacity
            //onPress={() => navigation.goBack()}
            onPress={() => handleBack()}
            style={{
              marginLeft: Scaler(15),
              width: Scaler(25),
              height: Scaler(25),
            }}
          >
            <Image
              source={backblack}
              resizeMode={"contain"}
              style={{
                width: Scaler(25),
                height: Scaler(25),
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          <View style={{}}>
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: Scaler(22),
                ...theme.fonts.medium,
                left: -95,
                fontWeight: "bold",
              }}
            >
              {Lang.SURVEY}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: Scaler(15),
              height: Scaler(15),
              marginRight: Scaler(25),
            }}
          >
            <Image
              source={blackcrossIcon}
              resizeMode={"contain"}
              style={{
                width: Scaler(15),
                height: Scaler(15),
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
            marginTop: Scaler(20),
            height: height - (StatusBar.currentHeight + 50),
          }}
        >
          <View style={{ width: width / 1.1, alignSelf: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: Scaler(18),
                  opacity: 0.6,
                  marginRight: Scaler(2),
                  fontWeight: "600",
                }}
              >
                {currentQuestionIndex + 1}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: Scaler(18),
                  opacity: 0.6,
                  fontWeight: "600",
                }}
              >
                of {data.length}
              </Text>
            </View>
            <View style={{ marginTop: Scaler(10) }}>{renderProgressBar()}</View>
          </View>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
          <View
            style={{
              // flex: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 6,
              shadowOpacity: 0.1,
              elevation: 5,
              backgroundColor: "#fff",
              borderRadius: 10,
              alignSelf: "center",
              width: width / 1.1,
              marginTop: Scaler(25),
              padding: Scaler(20),
            }}
          >
            {renderQuestion()}
            {renderOptions()}
          </View>
          {visibleTextInput == true ? (
            <View
              style={{
                alignSelf: "center",
                borderWidth: 1.5,
                borderColor: "#E9E5E4",
                marginTop: 15,
                backgroundColor: "#fff",
                width: width / 1.1,
                height: Scaler(100),
                borderRadius: 10,
              }}
            >
              <TextInput
                style={{ padding: 10, left: 10, fontFamily: "Poppins-Regular" }}
                placeholder="Enter Text"
                placeholderTextColor="#7F8190"
                multiline={true}
                onChangeText={(text) => setOther(text)}
                returnKeyType="done"
              />
            </View>
          ) : null}

          {/* {data.length > 1 ? (
          <View
            style={{
              borderRadius: 10,
              width: "75%",
              height: Scaler(50),
              backgroundColor: backColor === true ? "#4d39e9" : "#f4f2f1",
              justifyContent: "center",
              alignSelf: "center",
              position: "absolute",
              bottom: Scaler(220),
            }}
          >
            {renderBackButton()}
          </View>
        ) : null} */}
          {ShowButton === false ? (
            <View
              style={{
                borderRadius: 10,
                width: "75%",
                height: Scaler(50),
                backgroundColor: backColor === true ? "#4d39e9" : "#f4f2f1",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 15,
                position: "absolute",
                bottom: 120,
              }}
            >
              {renderNextButton()}
            </View>
          ) : (
            <View
              style={{
                borderRadius: 10,
                width: "75%",
                height: Scaler(50),
                backgroundColor: backColor === true ? "#4d39e9" : "#f4f2f1",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 15,
                position: "absolute",
                bottom: 120,
              }}
            >
              {renderSubmitButton()}
            </View>
          )}
        </SafeAreaView>

        {visible == true ? (
          <Provider>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideDialog}
                style={{ justifyContent: "flex-end", position: "absolute" }}
                contentContainerStyle={{
                  backgroundColor: "#ffff",
                  // padding: Scaler(20),
                  height: Platform.OS === "ios" ? Scaler(550) : Scaler(400),
                  width: width,
                  borderTopRightRadius: Scaler(20),
                  borderTopLeftRadius: Scaler(20),
                }}
              >
                <Image
                  style={{
                    width: width / 1.2,
                    height: 150,
                    alignSelf: "center",
                  }}
                  source={surveyIcon}
                  resizeMode={"contain"}
                />
                <View style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: Scaler(21),
                      width: width / 1.1,
                      textAlign: "center",
                      alignSelf: "center",
                      color: "#110D26",
                    }}
                  >
                    {Lang.SUCCESS}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: Scaler(16),
                      width: width / 1.1,
                      paddingTop: Scaler(10),
                      textAlign: "center",
                      alignSelf: "center",
                      color: "#7F8190",
                      lineHeight: Scaler(30),
                    }}
                  >
                    {Lang.SUCCESS_DESC}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(deleteQA());
                    navigation.navigate("Community");
                  }}
                  style={{
                    width: width / 1.3,
                    height: Scaler(55),
                    backgroundColor: "#4D39E9",
                    borderRadius: Scaler(10),
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    // marginBottom:Scaler(225),
                    // top:Platform.OS === "ios" ? -Scaler(20):-Scaler(100)
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "#fff",
                      fontSize: Scaler(20),
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    {Lang.OK}
                  </Text>
                </TouchableOpacity>
              </Modal>
            </Portal>
          </Provider>
        ) : null}
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TakeSurveyScreen;
