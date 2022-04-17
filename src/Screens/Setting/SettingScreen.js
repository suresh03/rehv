/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  DeviceEventEmitter,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import AsyncStorage from "@react-native-community/async-storage";
import {
  onIcon,
  offIcon,
  bellIcon,
  keyIcon,
  changeLanIcon,
  termsIcon,
  privacyIcon,
  contactIcon,
  dropDwonUp,
  dwonArrowIcon,
  blockedIcon,
  freezeEncircledIcon,
  arrowbackgroundBlue,
  greyArrow,
  finger,
} from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import { getFontSize } from "../../Components/SharedComponents/ResponsiveSize";
import { Divider } from "react-native-paper";
import { CustomButton } from "../../Components/SharedComponents/Button";
import { useResetAppState } from "../../Recoil/appAtom";
import { storeToLocal, removeFromLocal } from "../../Utils/LocalStorage";
import Spacer from "../../Components/SharedComponents/Space";
import Scaler from "../../Utils/Scaler";
import Lang from "../../Language";
import TouchID from "react-native-touch-id";
import useApiServices from "../../Services/useApiServices";
import { useAppValue, useSetAppState } from "../../Recoil/appAtom";

export default function SettingScreen({ navigation, route }) {
  const setAppState = useSetAppState();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isToggleOn, setIstoggleOn] = useState(false);
  const [isBioSwitchOn, setBioIsSwitchOn] = useState(false);
  const [isBioToggleOn, setBioIstoggleOn] = useState(false);
  const [faceBioToggle, setFaceBioToggle] = useState(false);
  const [fingerBioToggle, setFingerBioToggle] = useState(false);
  const [userToggle, setUserToggle] = useState(false);
  const [teamToggle, setteamToggle] = useState(false);
  const [loading, setLoading] = useState();
  const [biometricType, setBiometricType] = useState("");
  const [getLanguageData, setLanguageData] = useState("en");
  const { department } = route.params;
  const [selectedLang, setSelectedLang] = useState("en");
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const [englishLangId, setEnglishLangId] = useState("");
  const [frenchLangId, setFrenchLangId] = useState("");

  const getLanguage = async () => {
    try {
      const resp = await ApiGetMethod("coach/getLanguage");
      console.log("language => ", resp);
      resp.data.forEach((item) => {
        if (item.symbol === "en") {
          setEnglishLangId(item._id);
        } else {
          setFrenchLangId(item._id);
        }
      });
    } catch (error) {
      console.log("error => ", error);
    }
  };
  useEffect(() => {
    getLanguage();
  }, []);

  const SelectLanguageFunction = async (data) => {
    await AsyncStorage.setItem("LANGUAGE", data);
    try {
      const resp = await ApiPostMethod("coach/changeLanguages", {
        languageId: data === "en" ? englishLangId : frenchLangId,
      });
      console.log("changeLanguages resp", resp);
    } catch (error) {}
  };

  useEffect(() => {
    configureBiometric();
  }, []);

  const configureBiometric = async () => {
    const getLockEnabled = await AsyncStorage.getItem("LOCK_TYPE");
    if (getLockEnabled === "FaceID") {
      setFaceBioToggle(true);
    }
    if (getLockEnabled === "TouchID") {
      setFingerBioToggle(true);
    }
    const langs = await AsyncStorage.getItem("LANGUAGE");
    if (langs) {
      setSelectedLang(langs);
      setLanguageData(langs);
      DeviceEventEmitter.emit("Language", "fa");
    } else {
      setSelectedLang("en");
      setLanguageData("en");
      DeviceEventEmitter.emit("Language", "en");
    }
    TouchID.isSupported()
      .then((biometryType) => {
        console.log("Biometric type: " + biometryType);
        if (biometryType === "FaceID") {
          setBiometricType("FaceID");
        } else if (biometryType === "TouchID") {
          //TouchID is supported.
          setBiometricType("TouchID");
        } else if (biometryType === true) {
          setBiometricType("TouchID");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const biometricLocalHandler = async (type) => {
    if (type === "add") {
      await AsyncStorage.setItem("LOCK_TYPE", biometricType);
    } else {
      await AsyncStorage.removeItem("LOCK_TYPE");
    }
  };

  const notificationToggle = () => {
    setIsSwitchOn(!isSwitchOn);
    setIstoggleOn(!isToggleOn);
  };

  const biometricToggle = () => {
    setBioIsSwitchOn(!isBioSwitchOn);
    setBioIstoggleOn(!isBioToggleOn);
  };

  const resetAppState = useResetAppState();

  const _logoutFromServer = async () => {
    ApiPostMethod("user/logout");
  };

  const _logout = async () => {
    try {
      await _logoutFromServer();
      await storeToLocal("user", JSON.stringify({}));
      await storeToLocal("token", "");
      await removeFromLocal("token");
      setTimeout(() => {
        navigation.navigate("SignInScreen");
      }, 100);
    } catch (error) {
      console.log(error);
    }
    setAppState({
      user: {},
    });
    resetAppState();
    setLoading(false);
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.navigate("Dashboard")}
        headerText={true}
        headerContain={Lang.SETTINGS}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            width: wp(90),
            top: 10,
          }}
        >
          <Image
            style={CommonStyle.settingiconStyle}
            source={bellIcon}
            resizeMode={"contain"}
          />
          <Text
            style={{
              width: wp(53),
              fontSize: Scaler(18),
              fontFamily: "Poppins-SemiBold",
              color: "#000",
              left: Platform.OS === "ios" ? -Scaler(16) : -Scaler(18),
            }}
          >
            {Lang.NOTIFICATION}
          </Text>
          <TouchableOpacity onPress={() => notificationToggle()}>
            <Image
              source={isSwitchOn ? dropDwonUp : dwonArrowIcon}
              resizeMode={"contain"}
              style={{ height: hp(1.5) }}
            />
          </TouchableOpacity>
        </View>
        {isToggleOn == false ? null : (
          <View style={{ alignSelf: "center" }}>
            <View
              style={{
                marginVertical: hp(1),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
                width: wp(90),
                top: 10,
              }}
            >
              <Text
                style={{
                  width: wp(53),
                  fontSize: getFontSize(18),
                  fontFamily: "Poppins-Medium",
                  color: "#000",
                  left: wp(23),
                }}
              >
                {Lang.USER}
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => setUserToggle(!userToggle)}
              >
                <Image source={userToggle ? offIcon : onIcon} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
                width: wp(90),
                top: 10,
              }}
            >
              <Text
                style={{
                  width: wp(53),
                  fontSize: getFontSize(18),
                  fontFamily: "Poppins-Medium",
                  color: "#000",
                  left: wp(23),
                }}
              >
                {Lang.TEAM}
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => setteamToggle(!teamToggle)}
              >
                <Image source={teamToggle ? offIcon : onIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Divider
          style={{
            width: wp(90),
            alignSelf: "center",
            marginVertical: hp(1.5),
            top: hp(1.5),
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePasswordScreen")}
          style={CommonStyle.settingTouchStyle}
        >
          <Image
            style={CommonStyle.settingiconStyle}
            source={keyIcon}
            resizeMode={"contain"}
          />
          <Text style={CommonStyle.settingTextStyle}>
            {Lang.CHANGE_PASSWORD}
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: wp(90),
            alignSelf: "center",
            marginVertical: hp(1.5),
            top: hp(1.5),
          }}
        />
        {biometricType != "" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20,
                width: wp(90),
                top: 10,
              }}
            >
              <Image
                style={[CommonStyle.settingiconStyle]}
                source={finger}
                resizeMode={"contain"}
              />
              <Text
                style={{
                  width: wp(53),
                  fontSize: Scaler(18),
                  fontFamily: "Poppins-SemiBold",
                  color: "#000",
                  left: Platform.OS === "ios" ? -Scaler(16) : -Scaler(18),
                }}
              >
                {Lang.BIOMETRICS}
              </Text>
              <TouchableOpacity onPress={() => biometricToggle()}>
                <Image
                  source={isBioSwitchOn ? dropDwonUp : dwonArrowIcon}
                  resizeMode={"contain"}
                  style={{ height: hp(1.5) }}
                />
              </TouchableOpacity>
            </View>
            {isBioToggleOn == false ? null : (
              <View style={{ alignSelf: "center" }}>
                {biometricType === "FaceID" ? (
                  <View
                    style={{
                      marginVertical: hp(1),
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginHorizontal: 20,
                      width: wp(90),
                      top: 10,
                    }}
                  >
                    <Text
                      style={{
                        width: wp(53),
                        fontSize: getFontSize(18),
                        fontFamily: "Poppins-Medium",
                        color: "#000",
                        left: wp(23),
                      }}
                    >
                      {Lang.FACE}
                    </Text>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        biometricLocalHandler(
                          faceBioToggle === true ? "remove" : "add"
                        );
                        setFaceBioToggle(!faceBioToggle);
                      }}
                    >
                      <Image
                        source={faceBioToggle === false ? offIcon : onIcon}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginHorizontal: 20,
                      width: wp(90),
                      top: 10,
                    }}
                  >
                    <Text
                      style={{
                        width: wp(53),
                        fontSize: getFontSize(18),
                        fontFamily: "Poppins-Medium",
                        color: "#000",
                        left: wp(23),
                      }}
                    >
                      {Lang.FINGERPRNT}
                    </Text>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => {
                        setFingerBioToggle(!fingerBioToggle);
                        biometricLocalHandler(
                          fingerBioToggle === true ? "remove" : "add"
                        );
                      }}
                    >
                      <Image
                        source={fingerBioToggle === false ? offIcon : onIcon}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            <Divider
              style={{
                width: wp(90),
                alignSelf: "center",
                marginVertical: hp(1.5),
                top: hp(1.5),
              }}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            width: wp(90),
            top: 10,
          }}
        >
          <Image
            style={CommonStyle.settingiconStyle}
            source={changeLanIcon}
            resizeMode={"contain"}
          />
          <Text
            style={{
              right: wp(1.2),
              width: wp(50),
              fontSize: getFontSize(18),
              fontFamily: "Poppins-SemiBold",
              color: "#000",
              left: wp(1),
            }}
          >
            {Lang.CHANGE_LANG}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                Lang.setLanguage("en");
                setLanguageData("en");
                SelectLanguageFunction("en");
              }}
              style={{
                backgroundColor:
                  getLanguageData === "en" ? "#4D39E9" : "#0000000D",
                width: wp(10),
                height: hp(5),
                borderRadius: 10,
                right: wp(2),
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: getLanguageData === "en" ? "#fff" : "#7F8190",
                  textAlign: "center",
                  top: Platform.OS == "ios" ? hp(1) : hp(1),
                }}
              >
                ENG
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Lang.setLanguage("fr");
                setLanguageData("fr");
                SelectLanguageFunction("fr");
              }}
              style={{
                backgroundColor:
                  getLanguageData === "en" ? "#0000000D" : "#4D39E9",
                width: wp(10),
                height: hp(5),
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: getLanguageData === "en" ? "#7F8190" : "#fff",
                  textAlign: "center",
                  top: Platform.OS == "ios" ? hp(1) : hp(1),
                }}
              >
                FRA
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Divider
          style={{
            width: wp(90),
            alignSelf: "center",
            marginVertical: hp(1.5),
            top: hp(1.5),
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("TermsServiceScreen")}
          style={CommonStyle.settingTouchStyle}
        >
          <Image
            style={CommonStyle.settingiconStyle}
            source={termsIcon}
            resizeMode={"contain"}
          />
          <Text style={CommonStyle.settingTextStyle}>{Lang.TERMS}</Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: wp(90),
            alignSelf: "center",
            marginVertical: hp(1.5),
            top: hp(1.5),
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("PrivacyScreen")}
          style={CommonStyle.settingTouchStyle}
        >
          <Image
            style={CommonStyle.settingiconStyle}
            source={privacyIcon}
            resizeMode={"contain"}
          />
          <Text style={CommonStyle.settingTextStyle}>{Lang.PRIVACY}</Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: wp(90),
            alignSelf: "center",
            marginVertical: hp(1.5),
            top: hp(1.5),
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("BlockedUserScreen")}
          style={CommonStyle.settingTouchStyle}
        >
          <Image
            style={CommonStyle.settingiconStyle}
            source={blockedIcon}
            resizeMode={"contain"}
          />
          <Text style={CommonStyle.settingTextStyle}>
            {Lang.BLOCKED_USERS}{" "}
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: wp(90),
            alignSelf: "center",
            marginVertical: hp(1.5),
            top: hp(1.5),
          }}
        />

        {department == "H.R." ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("FreezedUser")}
              style={CommonStyle.settingTouchStyle}
            >
              <Image
                style={CommonStyle.settingiconStyle}
                source={freezeEncircledIcon}
                resizeMode={"contain"}
              />
              <Text style={CommonStyle.settingTextStyle}>
                {Lang.FREEZED_USER}
              </Text>
            </TouchableOpacity>
            <Divider
              style={{
                width: wp(90),
                alignSelf: "center",
                marginVertical: hp(1.5),
                top: hp(1.5),
              }}
            />
          </>
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.navigate("ContactUsScreen")}
          style={CommonStyle.settingTouchStyle}
        >
          <Image
            style={CommonStyle.settingiconStyle}
            source={contactIcon}
            resizeMode={"contain"}
          />
          <Text style={CommonStyle.settingTextStyle}>{Lang.CONTACT_US}</Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: wp(90),
            alignSelf: "center",
            marginVertical: hp(1.5),
            top: hp(1.5),
          }}
        />
        <Spacer size={Scaler(100)} />
      </ScrollView>
      <CustomButton
        loading={loading}
        disabled={false}
        onPress={() => {
          setLoading(true);
          _logout();
        }}
        style={{ position: "absolute", bottom: Scaler(20) }}
        buttonIcon={loading ? greyArrow : arrowbackgroundBlue}
        status={Lang.LOGOUT}
      />
    </SafeAreaView>
  );
}
