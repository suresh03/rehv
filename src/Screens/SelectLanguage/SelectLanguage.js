/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { CustomButton } from "../../Components/SharedComponents/Button";
import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import {
  Arrow_black,
  Arrow_blue,
  arrowbackgroundBlue,
  greyArrow,
} from "../../Assets/icon";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useTheme } from "react-native-paper";
import Scaler from "../../Utils/Scaler";
import Body from "../../Components/SharedComponents/Body";
import { DayTheme } from "../../Constants/theme";
import Lang from "../../Language";
import AsyncStorage from "@react-native-community/async-storage";
import useApiServices from "../../Services/useApiServices";
import { useSetAppState } from "../../Recoil/appAtom";
export default function SelectLanguage({ navigation }) {
  const [selectEnglishLanguage, setSelectEnglishLanguage] = useState(false);
  const [selectFrenchLanguage, setSelectFrenchLanguage] = useState(false);
  const [englishLangId, setEnglishLangId] = useState("");
  const [frenchLangId, setFrenchLangId] = useState("");

  const { ApiGetMethod } = useApiServices();
  const setAppState = useSetAppState();

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
    const unsubscribe = navigation.addListener("focus", () => {
      getLanguage();
    });
    return () => unsubscribe;
  }, []);

  const selectButton = async (type) => {
    if (type == "english") {
      setSelectEnglishLanguage(true);
      setSelectFrenchLanguage(false);
      Lang.setLanguage("en");
      await AsyncStorage.setItem("LANGUAGE", "en");
      setAppState((s) => ({
        ...s,
        languageId: englishLangId,
      }));
    } else {
      setSelectEnglishLanguage(false);
      setSelectFrenchLanguage(true);
      Lang.setLanguage("fr");
      await AsyncStorage.setItem("LANGUAGE", "fr");
      setAppState((s) => ({
        ...s,
        languageId: frenchLangId,
      }));
    }
  };
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Body>
        <Spacer size={Scaler(90)} />
        <TextField
          textStyle={{
            marginHorizontal: Scaler(27),
            fontSize: Scaler(34),
            width: wp(60),
            color: "#110D26",
            ...theme.fonts.medium,
          }}
          status={Lang.CHOOSE_LANG}
        />
        <Spacer />
        <TextField
          textStyle={[
            CommonStyle.headingStyle,
            {
              marginTop: Scaler(15),
              fontSize: Scaler(15),
              ...theme.fonts.medium,
            },
          ]}
          status={Lang.SELECT_LANGUAGE}
        />
        <View
          style={{
            justifyContent: "center",
            flex: 0.4,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => selectButton("english")}
            style={{
              height: Scaler(65),
              borderWidth: Scaler(1),
              borderRadius: Scaler(12),
              width: wp(88),
              justifyContent: "center",
              borderColor: selectEnglishLanguage
                ? theme.colors.primary
                : "#E9E5E4",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: Scaler(20),
              }}
            >
              <Text
                style={{
                  ...DayTheme.fonts.medium,
                  color: theme.colors.text,
                  fontSize: Scaler(20),
                }}
              >
                English
              </Text>

              <Image
                style={{
                  width: Scaler(22.91),
                  height: Scaler(14),
                }}
                source={
                  selectEnglishLanguage == true ? Arrow_blue : Arrow_black
                }
                resizeMode={"contain"}
              />
            </View>
          </TouchableOpacity>
          <Spacer size={Scaler(40)} />

          <TouchableOpacity
            onPress={() => selectButton("french")}
            style={{
              height: Scaler(65),
              borderWidth: Scaler(1),
              borderRadius: Scaler(12),
              width: wp(88),
              justifyContent: "center",
              borderColor: selectFrenchLanguage
                ? theme.colors.primary
                : "#E9E5E4",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: Scaler(20),
              }}
            >
              <Text
                style={{
                  ...DayTheme.fonts.medium,
                  fontSize: Scaler(20),
                  color: theme.colors.text,
                }}
              >
                Français
              </Text>

              <Image
                style={{
                  width: Scaler(22.91),
                  height: Scaler(14),
                }}
                source={selectFrenchLanguage == true ? Arrow_blue : Arrow_black}
                resizeMode={"contain"}
              />
            </View>
          </TouchableOpacity>
        </View>

        <CustomButton
          onPress={() => navigation.navigate("Swiper_screen")}
          // onPress={() => navigation.navigate("CompanyName")}
          disabled={!selectEnglishLanguage && !selectFrenchLanguage}
          buttonIcon={
            selectEnglishLanguage || selectFrenchLanguage === true
              ? arrowbackgroundBlue
              : greyArrow
          }
          style={{
            position: "absolute",
            bottom: Scaler(30),
          }}
          status={Lang.LETS_GO}
        />
      </Body>
    </SafeAreaView>
  );
}
