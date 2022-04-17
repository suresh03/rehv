/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, SafeAreaView, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import Body from "../../Components/SharedComponents/Body";
import Padding from "../../Components/SharedComponents/Padding";
import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import { email_sent, greyArrow, arrowbackgroundBlue } from "../../Assets/icon";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import { CustomButton } from "../../Components/SharedComponents/Button";
import useApiServices from "../../Services/useApiServices";
import Scaler from "../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";

export default function EmailSentScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const { ApiBasicAuthMethod } = useApiServices();

  const resetPassword = () => {
    setLoading(true);
    ApiBasicAuthMethod("user/forgotPassword", route.params.data)
      .then((res) => {
        if (res.statusCode === 200) {
          SnackbarHandler.successToast(Lang.MESSAGE, res.message);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => setLoading(false));
  };

  const theme = useTheme();

  return (
    <View style={CommonStyle.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderBackAction
          back_nav={() => navigation.pop()}
          headerViewStyle={{ backgroundColor: "#fff" }}
        />
        <Body
          keyboardDismissMode="interactive"
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={{ top: hp(8) }}>
            <Image
              style={{ alignSelf: "center", width: wp(60), height: hp(25) }}
              source={email_sent}
            />
            <Spacer size={3} />
            <View style={{ top: hp(8) }}>
              <Padding horizontal size={Scaler(25)}>
                <TextField
                  textStyle={{
                    width: wp(70),
                    fontSize: Scaler(30),
                    color: "#000",
                    fontFamily: "Poppins-Medium",
                    lineHeight: Scaler(40),
                  }}
                  status={Lang.PASSWORD_SENT}
                />
                <Spacer size={15} />
                <TextField
                  textStyle={{
                    width: wp(90),
                    fontSize: Scaler(19),
                    color: "#000",
                    fontFamily: "Poppins-Medium",
                    lineHeight: Scaler(30),
                  }}
                  status={Lang.PASSEORD_INBOX}
                />
                <Spacer size={35} />
              </Padding>
              <View style={{ alignSelf: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    height: hp(2.5),
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <TextField
                    textStyle={{
                      fontSize: 15,
                      color: "#696969",
                      ...theme.fonts.medium,
                    }}
                    status={Lang.RESEND}
                  />

                  <TextField
                    onPress={() =>
                      loading ? console.log("resend action") : resetPassword()
                    }
                    textStyle={{
                      fontSize: 15,
                      color: loading ? "#696969" : theme.colors.primary,
                      ...theme.fonts.medium,
                    }}
                    status={Lang.RESEND_TXT}
                  />
                </View>
                <CustomButton
                  disabled={loading}
                  buttonIcon={loading ? greyArrow : arrowbackgroundBlue}
                  onPress={() => navigation.navigate("SignInScreen")}
                  style={[CommonStyle.submiteButton, { top: Scaler(10) }]}
                  status={Lang.SIGN_IN}
                />
              </View>
            </View>
          </View>
          <Spacer size={35} />
        </Body>
      </SafeAreaView>
    </View>
  );
}
