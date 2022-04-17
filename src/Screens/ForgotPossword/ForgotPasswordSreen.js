/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, SafeAreaView, Image, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Body from "../../Components/SharedComponents/Body";
import Padding from "../../Components/SharedComponents/Padding";
import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import ForgotPassword from "./Components/forgotPasswordfrom.js";
import { reset_password } from "../../Assets/icon";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import Scaler from "../../Utils/Scaler";
import { useTheme } from "@react-navigation/native";
import Lang from "../../Language";
const { width } = Dimensions.get("window");

export default function ForgotPasswordScreen({ navigation }) {
  const theme = useTheme();
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Body keyboardShouldPersistTaps={"handled"}>
          <HeaderBackAction
            back_nav={() => navigation.pop()}
            headerViewStyle={{ backgroundColor: "#fff" }}
          />
          <Image
            style={{ alignSelf: "center", width: wp(50), height: hp(20) }}
            source={reset_password}
          />

          <Spacer size={3} />
          <Padding horizontal size={Scaler(25)}>
            <TextField
              textStyle={{
                width: wp(70),
                fontSize: Scaler(30),
                color: "#000",
                fontFamily: "Poppins-Medium",
                lineHeight: Scaler(40),
              }}
              status={Lang.RESET_PASSWORD}
            />
            <Spacer size={15} />
            <TextField
              textStyle={{
                width: wp(90),
                fontSize: Scaler(18),
                color: "#000",
                fontFamily: "Poppins-Medium",
                lineHeight: Scaler(30),
              }}
              status={Lang.FORGOTPASS_DESC}
            />
            <Spacer size={30} />
          </Padding>
          <View style={{ alignSelf: "center", width:width/1.1 }}>
            <ForgotPassword />
          </View>
        </Body>
      </SafeAreaView>
    </>
  );
}
