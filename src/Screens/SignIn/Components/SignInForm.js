/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useMemo } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import { TextField } from "../../../Components/SharedComponents/TextField";
import {
  email_icon,
  arrowbackgroundBlue,
  greyArrow,
} from "../../../Assets/icon";
import { CustomButton } from "../../../Components/SharedComponents/Button";
import PasswordInput from "../../../Components/SharedComponents/PasswordComponet";
import useApiServices from "../../../Services/useApiServices";
import { useAppValue, useSetAppState } from "../../../Recoil/appAtom";
import { useNavigation } from "@react-navigation/native";
import { useValidation } from "react-native-form-validator";
import Spacer from "../../../Components/SharedComponents/Space";
import Scaler from "../../../Utils/Scaler";
import {
  CountryCode,
  GlobalInput,
} from "../../../Components/SharedComponents/CountryCodeModal";
import ValidationConstants from "../../../Constants/ValidationConstants";
import { useTheme } from "react-native-paper";
import { getFromLocal, storeToLocal } from "../../../Utils/LocalStorage";
import { DayTheme } from "../../../Constants/theme";
import SnackbarHandler from "../../../Utils/SnackbarHandler";
import Lang from "../../../Language";
import messaging from "@react-native-firebase/messaging";

export default function SignInForm() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [signInWithEmail, setSignInWithEmail] = useState(true);
  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
  const [country, setCountry] = useState("United States");
  const [selectedCode, setSelectedCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firebaseToken, setFirebaseToken] = useState("");
  const disabled =
    (signInWithEmail ? email : phoneNumber) == "" || password == "";
  const setAppState = useSetAppState();
  const appValue = useAppValue();
  const { ApiPostMethod } = useApiServices();

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { email, password, phoneNumber },
    ...ValidationConstants,
  });

  const validationRules = {
    email: { email: signInWithEmail, required: signInWithEmail },
    password: {
      required: true,
    },
    phoneNumber: {
      numbers: true,
      minlength: 10,
      maxlength: 10,
      required: !signInWithEmail,
    },
  };

  const validateFields = async () => {
    return validate(validationRules).valueOf();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFromLocal("firebaseToken").then((token) => {
        setFirebaseToken(token.fcmId);
      });
      messaging()
        .getToken()
        .then((fcmToken) => {
          setFirebaseToken(fcmToken);
        });
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    setLoading(true);
    let data = {
      email: email,
      password: password,
      deviceType: Platform.OS.toUpperCase(),
      deviceToken: firebaseToken,
    };
    let dataForPhoneNumber = {
      countryCode: selectedCode,
      phoneNo: phoneNumber,
      password: password,
      deviceType: Platform.OS.toUpperCase(),
      // deviceToken: Math.random().toString(),
      deviceToken: firebaseToken,
    };

    ApiPostMethod("user/signIn", signInWithEmail ? data : dataForPhoneNumber)
      .then((res) => {
        console.log("Login ", res);
        if (res.statusCode === 200) {
          if (res.data.mobileVerification === false) {
            setAppState({
              ...appValue,
              loggedIn: false,
              user: res.data,
              token: res.data.accessToken,
            });
            storeToLocal("token", res.data.accessToken);
            navigation.navigate("EnterPhoneNumber");
            SnackbarHandler.normalToast(
              Lang.MESSAGE,
              "Your mobile number is not verified"
            );
          } else if (res.data.accountVerified === false) {
            setAppState({
              ...appValue,
              loggedIn: false,
              user: res.data,
              token: res.data.accessToken,
            });
            navigation.navigate("CompanyName");
            SnackbarHandler.normalToast(
              Lang.MESSAGE,
              "Please complete your profile."
            );
          } else {
            setAppState({
              ...appValue,
              loggedIn: true,
              user: res.data,
              token: res.data.accessToken,
            });
            storeToLocal("user", res.data);
            storeToLocal("token", res.data.accessToken);
            console.log("token", res.data.accessToken);
            SnackbarHandler.successToast(Lang.MESSAGE, "Login successful.");
          }
        } else {
          if (res.responseType === "BLOCKED_BY_ADMIN") {
            setAppState({
              ...appValue,
              loggedIn: false,
              accountFreezed: true,
            });
          } else {
            SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
            console.log("res.message =>", res.message);
          }
          console.log("res =>  error ", res);
          //  Alert.alert(Lang.MESSAGE, res.message);
          // SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
          console.log("res.message =>", res.message);
        }
      })
      .catch((error) => {
        console.log(error);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => setLoading(false));
  };

  const _onPressButton = async () => {
    validateFields().then((res) => {
      if (res == true) {
        if (
          getErrorsInField("email").length == 0 &&
          getErrorsInField("password").length == 0
        ) {
          signIn();
        }
      }
    });
  };

  const valueChange = async (setState) => async (val) => setState(val);

  useEffect(() => {
    validate({
      email: validationRules.email,
    });
  }, [email]);

  useEffect(() => {
    validate({
      password: validationRules.password,
    });
  }, [password]);
  useEffect(() => {
    validate({
      phoneNumber: validationRules.phoneNumber,
    });
  }, [phoneNumber]);
  const setCountryFlag = (dialCode, name) => {
    setSelectedCode(dialCode);
    setCountry(name);
    setCountryCodeModalVisible(!countryCodeModalVisible);
  };

  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        clickHereStyle: {
          fontSize: Scaler(13),
          color: theme.colors.primary,
          ...theme.fonts.medium,
        },
      }),
    []
  );
  return (
    <>
      {signInWithEmail ? (
        <OutlinedInput
          placeholder={Lang.WORK_EMAIL}
          placeholderTextColor={"#7F8190"}
          img={email_icon}
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => valueChange(setEmail(text))}
          errorMessage={getErrorsInField("email")}
          inputViewStyle={isFieldInError("email") ? { borderColor: "red" } : {}}
        />
      ) : (
        <GlobalInput
          placeholder={Lang.NUMBER}
          placeholderTextColor={"#7F8190"}
          dropDown={true}
          maxLength={10}
          onPress={() => setCountryCodeModalVisible(!countryCodeModalVisible)}
          data={selectedCode}
          returnKeyType="done"
          value={phoneNumber}
          keyboardType={"numeric"}
          onChangeText={(text) => valueChange(setPhoneNumber(text))}
          errorMessage={getErrorsInField("phoneNumber")}
          inputViewStyle={
            isFieldInError("phoneNumber") ? { borderColor: "red" } : {}
          }
        />
      )}
      <Spacer />
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          top: -Scaler(8),
          marginVertical: Scaler(2.5),
        }}
      >
        <Text
          style={{
            ...DayTheme.fonts.regular,
            color: "gray",
            fontSize: Scaler(13),
          }}
        >
          {signInWithEmail ? Lang.NO_WORK_EMAIL : Lang.WORK_EMAIL}
          <Text
            onPress={() => {
              signInWithEmail ? setEmail("") : setPhoneNumber("");
              setSignInWithEmail(!signInWithEmail);
            }}
            style={styles.clickHereStyle}
          >
            {" "}
            {Lang.CLICK_HERE}
          </Text>
        </Text>
      </View>

      <PasswordInput
        placeholder={Lang.PASSWORD}
        placeholderTextColor={"grey"}
        value={password}
        onChangeText={(text) => valueChange(setPassword(text))}
        hidePassword={hidePassword}
        onShowPassword={() => setHidePassword(!hidePassword)}
        errorMessage={getErrorsInField("password")}
        inputViewStyle={
          isFieldInError("password") ? { borderColor: "red" } : {}
        }
        returnKeyType="done"
        returnKeyLabel="Done"
        onSubmitEditing={() => _onPressButton()}
      />

      <Text
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
        style={[
          CommonStyle.continueStyle,
          { fontFamily: "Poppins-Medium", alignSelf: "flex-end" },
        ]}
      >
        {Lang.FORGOTPASS}
      </Text>

      <Spacer size={Scaler(15)} />

      <CustomButton
        loading={loading}
        disabled={disabled}
        buttonIcon={disabled || loading ? greyArrow : arrowbackgroundBlue}
        onPress={() => _onPressButton()}
        status={Lang.SIGN_IN}
      />

      <CountryCode
        visible={countryCodeModalVisible}
        onCodeSelection={(dialCode, countyName) =>
          setCountryFlag(dialCode, countyName)
        }
        CancelModal={() => setCountryCodeModalVisible(false)}
      />
    </>
  );
}
