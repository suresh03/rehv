/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Platform, Keyboard, Text } from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import {
  CountryCode,
  GlobalInput,
} from "../../Components/SharedComponents/CountryCodeModal";
import { responsiveSize } from "../../Components/SharedComponents/ResponsiveSize";
import Spacer from "../../Components/SharedComponents/Space";
import { TextField } from "../../Components/SharedComponents/TextField";
import { CustomButton } from "../../Components/SharedComponents/Button";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import Padding from "../../Components/SharedComponents/Padding";
import Body from "../../Components/SharedComponents/Body";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import useApiServices from "../../Services/useApiServices";
import { useValidation } from "react-native-form-validator";
import ValidationConstants from "../../Constants/ValidationConstants";
import Scaler from "../../Utils/Scaler";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";

const validationRules = {
  country: { required: true },
  selectedCode: { required: true },
  phoneNumber: { minlength: 10, maxlength: 10, required: true, numbers: true },
};

export default function EnterPhoneNumber({ navigation, route }) {
  const [country, setCountry] = useState("United States");
  const [selectedCode, setSelectedCode] = useState("+1");
  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { ApiPostMethod } = useApiServices();
  const valueChange = async (setState) => async (val) => setState(val);

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { selectedCode, phoneNumber, country },
    ...ValidationConstants,
  });
  const validateFields = async () => {
    return validate(validationRules).valueOf();
  };

  useEffect(() => {
    if (phoneNumber == "" || selectedCode == "" || country == "") {
      return;
    }
    validate(validationRules);
  }, [phoneNumber, selectedCode, country]);

  const onContinue = () => {
    let data = {
      phoneNo: phoneNumber,
      countryCode: selectedCode,
    };
    ApiPostMethod("user/editProfile", data)
      .then((res) => {
        console.log("editProfile res ", res);
        if (res.statusCode === 200) {
          navigation.navigate("VerifyOtpScreen", { data: data });
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(setLoading(false));
  };

  const buttonClick = () => {
    validateFields().then((res) => {
      if (res == true) {
        if (
          getErrorsInField("selectedCode")?.length == 0 &&
          getErrorsInField("phoneNumber")?.length == 0
        ) {
          setLoading(true);
          onContinue();
        }
      }
    });
  };

  const setCountryFlag = (dialCode, name) => {
    setCountry(name);
    setSelectedCode(dialCode);
    setCountryCodeModalVisible(!countryCodeModalVisible);
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <Body>
        <Padding horizontal size={responsiveSize(25)}>
          <Text style={CommonStyle.tittleStyle}>{Lang.PHONE_NUMBER}</Text>
          <Spacer size={Scaler(20)} />
          <TextField
            textStyle={ChangeStyle.textchangeStyle}
            status={Lang.VERIFICATION_DESC}
          />
          <Spacer size={Scaler(30)} />
          <View style={ChangeStyle.inputcheckStyle}>
            <GlobalInput
              placeholder={Lang.NUMBER}
              placeholderTextColor={"grey"}
              dropDown={true}
              maxLength={10}
              keyboardType={"numeric"}
              onPress={() =>
                setCountryCodeModalVisible(!countryCodeModalVisible)
              }
              data={selectedCode}
              value={phoneNumber}
              onChangeText={(text) => valueChange(setPhoneNumber(text))}
              errorMessage={getErrorsInField("phoneNumber")}
              inputViewStyle={
                isFieldInError("phoneNumber") ||
                isFieldInError("selectedCode") ||
                isFieldInError("country")
                  ? { borderColor: "red" }
                  : {}
              }
              returnKeyType="done"
              returnKeyLabel="Done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
          <Spacer />
        </Padding>
        <CountryCode
          visible={countryCodeModalVisible}
          onCodeSelection={(dialCode, countryName) =>
            setCountryFlag(dialCode, countryName)
          }
          CancelModal={() => setCountryCodeModalVisible(false)}
        />
      </Body>
      <CustomButton
        loading={loading}
        disabled={
          loading ||
          phoneNumber.length < 9 ||
          getErrorsInField("phoneNumber").length > 0
        }
        style={{
          position: "absolute",
          bottom: Platform.OS === "ios" ? Scaler(30) : Scaler(50),
        }}
        status={Lang.CONTINUE}
        onPress={() => buttonClick()}
      />
    </SafeAreaView>
  );
}
