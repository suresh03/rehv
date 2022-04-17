/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import { getFontSize } from "../../../Components/SharedComponents/ResponsiveSize";
import Spacer from "../../../Components/SharedComponents/Space";
import { email_icon } from "../../../Assets/icon";
import { CustomButton } from "../../../Components/SharedComponents/Button";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import useApiServices from "../../../Services/useApiServices";
import { useNavigation } from "@react-navigation/native";
import { useValidation } from "react-native-form-validator";
import ValidationConstants from "../../../Constants/ValidationConstants";
import {
  CountryCode,
  GlobalInput,
} from "../../../Components/SharedComponents/CountryCodeModal";
import Scaler from "../../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import SnackbarHandler from "../../../Utils/SnackbarHandler";
import Lang from "../../../Language";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [getPasswordWithEmail, setGetPasswordWithEmail] = useState(true);
  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
  const [country, setCountry] = useState("United States");
  const [selectedCode, setSelectedCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { ApiBasicAuthMethod } = useApiServices();
  const navigation = useNavigation();

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { email },
    ...ValidationConstants,
  });
  const validationRules = {
    email: { email: getPasswordWithEmail, required: getPasswordWithEmail },
    password: {
      required: true,
    },
    phoneNumber: {
      numbers: true,
      minlength: 10,
      maxlength: 10,
      required: !getPasswordWithEmail,
    },
  };
  const validateFields = async () => {
    return validate({
      email: validationRules.email,
      phoneNumber: validationRules.phoneNumber,
    }).valueOf();
  };

  const resetPassword = () => {
    setLoading(true);
    let data = {
      email: getPasswordWithEmail ? email.toLowerCase() : phoneNumber,
    };
    ApiBasicAuthMethod("user/forgotPassword", data)
      .then((res) => {
        if (res.statusCode === 200) {
          navigation.navigate("EmailSentScreen", { data: data });
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
      })
      .finally(() => setLoading(false));
  };

  const _onPressButton = async () => {
    validateFields().then((res) => {
      if (res == true) {
        if (
          getErrorsInField("email").length == 0 &&
          getErrorsInField("phoneNumber").length == 0
        ) {
          resetPassword();
        }
      }
    });
  };

  const valueChange = async (setState) => async (val) => setState(val);

  useEffect(() => {
    if (email !== "") {
      validate({
        email: validationRules.email,
      });
    }
  }, [email]);
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
      {getPasswordWithEmail ? (
        <OutlinedInput
          placeholder={Lang.WORK_EMAIL}
          img={email_icon}
          value={email}
          onChangeText={(text) => valueChange(setEmail(text))}
          keyboardType="email-address"
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
            ...theme.fonts.regular,
            color: "gray",
            fontSize: Scaler(13),
          }}
        >
          {getPasswordWithEmail
            ? Lang.NO_WORK_EMAIL
            : Lang.HAS_WORK_EMAIL}
          <Text
            onPress={() => {
              getPasswordWithEmail ? setEmail("") : setPhoneNumber("");
              setGetPasswordWithEmail(!getPasswordWithEmail);
            }}
            style={styles.clickHereStyle}
          >
            {" "}
            {Lang.CLICK_HERE}
          </Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          width: 100,
          height: 30,
          right: wp(2),
        }}
      >
        <Text
          style={{
            fontSize: getFontSize(17.5),
            color: "#7F8190",
            fontFamily: "Poppins-Medium",
          }}
        >
          {Lang.BACK_TO}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
          <Text
            style={{
              fontSize: getFontSize(17.5),
              color: "#4D39E9",
              fontFamily: "Poppins-Medium",
            }}
          >
            {Lang.SIGN_IN}
          </Text>
        </TouchableOpacity>
      </View>
      <Spacer />
      <CustomButton
        // disabled={email === ""}
        // loading={loading}
        onPress={() => _onPressButton()}
        status={Lang.RESET_PASSWORD}
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
