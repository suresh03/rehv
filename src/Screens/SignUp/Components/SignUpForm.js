/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useMemo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import {
  CountryCode,
  GlobalInput,
} from "../../../Components/SharedComponents/CountryCodeModal";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import Spacer from "../../../Components/SharedComponents/Space";
import { TextField } from "../../../Components/SharedComponents/TextField";
import {
  email_icon,
  arrowbackgroundBlue,
  greyArrow,
  TickSquare,
  TickSquaregrey,
} from "../../../Assets/icon";
import { CustomButton } from "../../../Components/SharedComponents/Button";
import PasswordInput from "../../../Components/SharedComponents/PasswordComponet";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useValidation } from "react-native-form-validator";
import ValidationConstants from "../../../Constants/ValidationConstants";
import Scaler from "../../../Utils/Scaler";
import { useAppValue, useSetAppState } from "../../../Recoil/appAtom";
import useApiServices from "../../../Services/useApiServices";
import { getFromLocal, storeToLocal } from "../../../Utils/LocalStorage";
import { useTheme } from "react-native-paper";
import { DayTheme } from "../../../Constants/theme";
import SnackbarHandler from "../../../Utils/SnackbarHandler";
import Lang from "../../../Language";
import messaging from "@react-native-firebase/messaging";

export default function SignUpForm() {
  const [selectedCode, setSelectedCode] = useState("+1");
  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signUpWithEmail, setSignUpWithEmail] = useState(true);
  const [flagImage, setFlagImage] = useState(false);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("United States");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState("");

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { email, password, phoneNumber },
    ...ValidationConstants,
  });

  const validationRules = {
    email: { email: signUpWithEmail, required: signUpWithEmail },
    password: {
      password: true,
      required: true,
      minlength: 8,
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialCharacter: true,
    },
    phoneNumber: {
      numbers: true,
      minlength: 10,
      maxlength: 10,
      required: !signUpWithEmail,
    },
  };

  const validateFields = async () => {
    return validate(validationRules).valueOf();
  };

  const disabled =
    (signUpWithEmail ? email : phoneNumber) == "" ||
    password == "" ||
    !flagImage;

  const navigation = useNavigation();

  const setAppState = useSetAppState();
  const appValue = useAppValue();
  const { ApiBasicAuthMethod } = useApiServices();

  const setCountryFlag = (dialCode, name) => {
    setSelectedCode(dialCode);
    setCountry(name);
    setCountryCodeModalVisible(!countryCodeModalVisible);
  };

  const signUpWithPhone = () => {
    setLoading(true);
    let data = {
      countryCode: selectedCode,
      phoneNo: phoneNumber,
      password: password,
      deviceType: Platform.OS.toUpperCase(),
      // deviceToken: Math.random().toString(),
      deviceToken: firebaseToken,
      languageId: appValue.languageId,
    };
    ApiBasicAuthMethod("user/signUp", data)
      .then((res) => {
        if (res.statusCode === 200) {
          setAppState({
            ...appValue,
            loggedIn: false,
            user: res.data,
            token: res.data.accessToken,
          });
          storeToLocal("user", res.data);
          storeToLocal("token", res.data.accessToken);
          navigation.navigate("VerifyOtpScreen", {
            data: { phoneNo: phoneNumber, countryCode: selectedCode },
          });
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
          console.log("res.message =>", res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => setLoading(false));
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

  const onSignUpWithEmail = () => {
    console.log("onContinue => ", "onContinue");
    setLoading(true);
    let data = {
      email: email,
      password: password,
      deviceType: Platform.OS.toUpperCase(),
      deviceToken: firebaseToken,
      languageId: appValue.languageId,
    };
    ApiBasicAuthMethod("user/signUp", data)
      .then((res) => {
        if (res.statusCode === 200) {
          setAppState({
            ...appValue,
            loggedIn: false,
            user: res.data,
            token: res.data.accessToken,
          });
          navigation.navigate("EnterPhoneNumber", data);
          // navigation.navigate("CompanyName");
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error.message);
      })
      .finally(() => setLoading(false));
  };

  const signUp = () => {
    signUpWithEmail ? onSignUpWithEmail() : signUpWithPhone();
  };

  const _onPressButton = async () => {
    //navigation.navigate("VerifyOtpScreen");
    validateFields().then((res) => {
      if (res == true) {
        if (
          getErrorsInField(signUpWithEmail ? "email" : "phoneNumber").length ==
            0 &&
          getErrorsInField("password").length == 0 &&
          getErrorsInField(signUpWithEmail ? "email" : "selectedCode").length ==
            0
        ) {
          if (flagImage) {
            signUp();
          } else {
            SnackbarHandler.errorToast(
              "Message",
              "You must agree to terms before signing up"
            );
          }
        }
      }
    });
  };

  const valueChange = async (setState) => async (val) => setState(val);

  useEffect(() => {
    if (signUpWithEmail) {
      validate({
        email: { email: signUpWithEmail, required: signUpWithEmail },
      });
    }
  }, [email]);
  useEffect(() => {
    validate({
      password: validationRules.password,
    });
  }, [password]);
  useEffect(() => {
    validate({
      phoneNumber: { minlength: 10, maxlength: 10, required: !signUpWithEmail },
    });
  }, [phoneNumber]);

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
      <Spacer />
      {signUpWithEmail ? (
        <OutlinedInput
          placeholder={Lang.EMAIL}
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
          value={phoneNumber}
          keyboardType={"numeric"}
          onChangeText={(text) => valueChange(setPhoneNumber(text))}
          errorMessage={getErrorsInField("phoneNumber")}
          inputViewStyle={
            isFieldInError("phoneNumber") ? { borderColor: "red" } : {}
          }
        />
      )}
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
            color: "#000",
            fontSize: Scaler(13),
          }}
        >
          {signUpWithEmail ? Lang.NO_WORK_EMAIL : Lang.WORK_EMAIL}

          <Text
            onPress={() => {
              signUpWithEmail ? setEmail("") : setPhoneNumber("");
              setSignUpWithEmail(!signUpWithEmail);
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
        placeholderTextColor={"#7F8190"}
        value={password}
        onChangeText={(text) => valueChange(setPassword(text))}
        errorMessage={getErrorsInField("password")}
        inputViewStyle={
          isFieldInError("password") ? { borderColor: "red" } : {}
        }
        minLength={8}
        hidePassword={hidePassword}
        onShowPassword={() => setHidePassword(!hidePassword)}
        returnKeyType="done"
        returnKeyLabel="Done"
        onSubmitEditing={() => _onPressButton()}
      />

      <Text
        style={{
          color: "#110D26",
          fontSize: Scaler(13),
          fontFamily: "Poppins-Medium",
        }}
      >
        {Lang.PASSWORD_DESC}
      </Text>

      <Spacer size={Scaler(10)} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ top: Lang.SIGN_UP === "Sign Up" ? -2 : -10 }}
          onPress={() => setFlagImage(!flagImage)}
        >
          <Image
            source={flagImage ? TickSquare : TickSquaregrey}
            style={{ height: Scaler(30), width: Scaler(30) }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={{ marginLeft: Scaler(8) }}>
          <Text style={CommonStyle.continueStyle}>{Lang.Terms}</Text>
          <Text>
            <TouchableOpacity
            style={{alignItems:'center', justifyContent:'center'}}
            activeOpacity={0.9}
              onPress={() => navigation.navigate("TermsCondition")}>
            <Text
              style={[CommonStyle.textColorStyle]}
            >
              {Lang.TermsLink1}
            </Text>
            </TouchableOpacity>
            <Text style={[CommonStyle.continueStyle]}>{Lang.TermsLink2}</Text>
            <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("PrivacyPolicy")}>
            <Text
              style={[CommonStyle.textColorStyle]}
            >
              {Lang.PrivacyLink}
            </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>

      <Spacer size={5} />
      <CustomButton
        loading={loading}
        disabled={disabled}
        buttonIcon={loading || disabled ? greyArrow : arrowbackgroundBlue}
        onPress={() => _onPressButton()}
        // onPress={() => navigation.navigate("CompanyName")}
        style={{ top: Scaler(25) }}
        status={Lang.SIGN_UP}
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
