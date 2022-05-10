/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from "react-native";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import Body from "../../Components/SharedComponents/Body";
import Padding from "../../Components/SharedComponents/Padding";

import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import { logo, freezeIcon } from "../../Assets/icon";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Modal } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAppValue, useSetAppState } from "../../Recoil/appAtom";
import SignInForm from "./Components/SignInForm";
import Scaler from "../../Utils/Scaler";
import Lang from "../../Language";

export default function SignInScreen({ navigation, route }) {
  const setAppState = useSetAppState();
  const appValue = useAppValue();

  const onDismiss = () => {
    setAppState({ ...appValue, accountFreezed: false });
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Body>
        <Image style={CommonStyle.logoStyle} resizeMode="contain" source={logo} />
        <Padding horizontal size={Scaler(25)}>
          <TextField
            textStyle={[
              CommonStyle.tittleStyle,
              { top: Platform.OS == "ios" ? 0 : heightPercentageToDP(1) },
            ]}
            status={Lang.WELCOME}
          />
          <Spacer size={5} />

          <View
            style={{
              flexDirection: "row",
              width: "99%",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              textStyle={ChangeStyle.textchangeStyle}
              status={Lang.NO_ACCT}
            />

            <TextField
              onPress={() => navigation.navigate("SignUpScreen")}
              textStyle={ChangeStyle.signStyle}
              status={" " + Lang.SIGN_UP}
            />
          </View>
          <Spacer size={Scaler(15)} />
          {/* Sign In form */}
          <SignInForm />
        </Padding>
      </Body>

      <Modal
        visible={appValue.accountFreezed}
        onDismiss={() => onDismiss()}
        style={{ justifyContent: "flex-end", position: "absolute" }}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          height: hp(50),
          width: wp(100),
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Image
          style={{ width: wp(60), height: hp(18), alignSelf: "center" }}
          source={freezeIcon}
          resizeMode={"contain"}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: Scaler(22),
              width: wp(90),
              paddingTop: 20,
              color: "#110D26",
              lineHeight: 10,
              textAlign: "center",
            }}
          >
            {Lang.ACCT_FROZEN}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: Scaler(16),
              width: wp(90),
              paddingTop: 20,
              color: "#7F8190",
              lineHeight: 30,
              textAlign: "center",
            }}
          >
            {Lang.FROZEN_DESC}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onDismiss()}
          style={{
            width: wp(80),
            height: hp(7),
            backgroundColor: "#4D39E9",
            borderRadius: 10,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#fff",
              fontSize: Scaler(20),
              fontFamily: "Poppins-Medium",
              top: Platform.OS === "ios" ? hp(2) : 15,
            }}
          >
            {Lang.OK}
          </Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
