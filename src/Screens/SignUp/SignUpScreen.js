/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, SafeAreaView, Image, Platform } from "react-native";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import Body from "../../Components/SharedComponents/Body";
import Padding from "../../Components/SharedComponents/Padding";
import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import SignUp from "./Components/SignUpForm";
import { logo } from "../../Assets/icon";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Lang from "../../Language";
import Scaler from "../../Utils/Scaler";

export default function SignUpScreen({ navigation }) {
  return (
    <SafeAreaView style={CommonStyle.container}>
      <Body
        keyboardVerticalOffset={100}
        keyboardDismissMode="interactive"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Image style={CommonStyle.logoStyle} resizeMode="contain" source={logo} />

        <Padding horizontal size={Scaler(25)}>
          <TextField
            textStyle={[
              CommonStyle.tittleStyle,
              { top: Platform.OS === "ios" ? 0 : heightPercentageToDP(1) },
            ]}
            status={Lang.CREATE_ACCOUNT}
          />

          <Spacer />
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
              status={Lang.SINGIN_DESC}
            />

            <TextField
              onPress={() =>
                navigation.navigate("SignInScreen", { manager: "signUp" })
              }
              textStyle={ChangeStyle.signStyle}
              status={Lang.SIGN_IN}
            />
          </View>
          <Spacer size={Scaler(5)} />
          <SignUp navigation={navigation} />
        </Padding>
      </Body>
    </SafeAreaView>
  );
}
