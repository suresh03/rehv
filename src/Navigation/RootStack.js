import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectLanguage from "../Screens/SelectLanguage/SelectLanguage";
import SignUpScreen from "../Screens/SignUp/SignUpScreen";
import SignInScreen from "../Screens/SignIn/SignInScreen";
import TermsCondition from "../Screens/Terms/TermsConditionScreen";
import PrivacyPolicy from "../Screens/PrivacyPolicy/PrivacyPolicy";
import EnterPhoneNumber from "../Screens/EnterPhoneNumber/EnterPhoneNumber";
import VerifyOtpScreen from "../Screens/VerifyOtp/VerifyOtoScreen";
import CompanyName from "../Screens/CompanyProcess/CompanyName";
import ForgotPasswordScreen from "../Screens/ForgotPossword/ForgotPasswordSreen";
import EmailSentScreen from "../Screens/EmailSents/EmailSentScreen";
import Swiper_screen from "../Screens/WalkThought/WalkThoughtScreen";
import AuthStackNavigator from "./AuthNavigation";
import LoremSlider from "../Screens/Lorem/LoremScreen";

const RootStack = createNativeStackNavigator();

function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="SelectLanguage"
        component={SelectLanguage}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Swiper_screen"
        component={Swiper_screen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      <RootStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="EnterPhoneNumber"
        component={EnterPhoneNumber}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="VerifyOtpScreen"
        component={VerifyOtpScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CompanyName"
        component={CompanyName}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <RootStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="EmailSentScreen"
        component={EmailSentScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="LoremSlider"
        component={LoremSlider}
        options={{ headerShown: false }}
      />
      {/* <RootStack.Screen
        name="AuthStackNavigator"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      /> */}
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
