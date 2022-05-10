/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { SafeAreaView, Platform, View, Dimensions } from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import Padding from "../../Components/SharedComponents/Padding";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import OtpInput from "./Components/OtpForm";
import { heightPercentageToDP } from "react-native-responsive-screen";
import useApiServices from "../../Services/useApiServices";
import { useAppValue } from "../../Recoil/appAtom";
import Body from "../../Components/SharedComponents/Body";
import Lang from "../../Language";
import Scaler from "../../Utils/Scaler";
import SnackbarHandler from "../../Utils/SnackbarHandler";

const { height } = Dimensions.get("window");
const IS_IPHONE_X =
  height === 812 || height === 896 || height === 926 || height === 844;

export default function VerifyOtpScreen({ navigation, route }) {
  const { ApiPostMethod } = useApiServices();
  const appValue = useAppValue();
  const [loading, setLoading] = useState(false);
  const [dataShow, setDataShow] = useState(false)
  useEffect(() => {
    console.log("LangssLang.ACCEPT", Lang.ACCEPT)
    if(Lang.ACCEPT === "J'accepte"){
      setDataShow(true)
    }else{
      setDataShow(false)
    }
  }, [])

  const _verifyCode = (code) => {
    setLoading(true);
    let data = {
      id: appValue.user._id,
      otp: code,
    };
    ApiPostMethod("user/verifyOtp", data)
      .then((res) => {
        console.log("verifyOtp ", res);
        if (res.statusCode === 200) {
          navigation.navigate("CompanyName");
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
  };

  const _resendCode = () => {
    setLoading(true);
    ApiPostMethod("user/resendOtp", route.params.data)
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          SnackbarHandler.successToast(Lang.MESSAGE, res.message);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      {/* <Body> */}
      {/* <HeaderBackAction
          back_nav={() => navigation.pop()}
          headerViewStyle={{ backgroundColor: "#fff" }}
        /> */}
      <Padding horizontal size={Scaler(20)}>
        <Spacer size={10} />
        <TextField
          textStyle={[
            CommonStyle.tittleStyle,
            {
              top: Platform.OS == "ios" ? 0 : heightPercentageToDP(1),
              fontSize: Scaler(18),
              height:Scaler(32),
              lineHeight: Scaler(32),
            },
          ]}
          status={Lang.VERIFY_PHONE}
        />
        <Spacer size={20} />
        <TextField
          textStyle={[ChangeStyle.textchangeStyle, { color: "#110D26" }]}
          status={Lang.VERIFY_CODE}
        />
        <View
          style={{
            height: IS_IPHONE_X ? "77%" : "80%",
            justifyContent: "space-between",
          }}
        >
          <OtpInput
            loading={loading}
            navigation={navigation}
            VerifyCode={(code) => _verifyCode(code)}
            resendOtp={() => _resendCode()}
            check={dataShow}
          />
        </View>
      </Padding>
      {/* </Body> */}
    </SafeAreaView>
  );
}
