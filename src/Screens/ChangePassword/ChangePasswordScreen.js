/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import { CustomButton } from "../../Components/SharedComponents/Button";
import ChangePasswordTextInput from "../../Components/SharedComponents/ChangePasswordTextInput";
import { arrowbackgroundBlue, greyArrow } from "../../Assets/icon";
import { getFontSize } from "../../Components/SharedComponents/ResponsiveSize";
import useApiServices from "../../Services/useApiServices";
import ValidationConstants from "../../Constants/ValidationConstants";
import { useValidation } from "react-native-form-validator";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";

export default function ChangePasswordScreen({ navigation }) {
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [hidePassword1, setHidePassword1] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);
  const [hidePassword3, setHidePassword3] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ApiPostMethod } = useApiServices();
  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { OldPassword, NewPassword, ConfirmPassword },
    ...ValidationConstants,
  });
  const disabled =
    OldPassword == "" || NewPassword == "" || ConfirmPassword == "";

  const changePassword = () => {
    if (NewPassword != ConfirmPassword) {
      SnackbarHandler.errorToast(Lang.MESSAGE, Lang.PWD_NOT_MATCH);
    } else if (OldPassword === NewPassword) {
      SnackbarHandler.errorToast(Lang.MESSAGE, Lang.OLD_PWD_DESC);
    } else {
      setLoading(true);
      let data = {
        oldPassword: OldPassword,
        password: NewPassword,
        confirmPassword: ConfirmPassword,
      };
      ApiPostMethod("user/changePassword", data)
        .then((res) => {
          if (res.statusCode === 200) {
            SnackbarHandler.successToast(Lang.MESSAGE, Lang.PWD_SUCCESS, [
              { text: Lang.OK, onPress: () => navigation.goBack() },
            ]);
            navigation.goBack()
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
    }
  };

  const validationRules = {
    OldPassword: {
      password: true,
      required: true,
      minlength: 8,
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialCharacter: true,
    },
    NewPassword: {
      password: true,
      required: true,
      minlength: 8,
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialCharacter: true,
    },
    ConfirmPassword: {
      password: true,
      required: true,
      minlength: 8,
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialCharacter: true,
    },
  };

  useEffect(() => {
    if (OldPassword !== "") {
      validate({
        OldPassword: validationRules.OldPassword,
      });
    }
  }, [OldPassword]);

  useEffect(() => {
    if (NewPassword !== "") {
      validate({
        NewPassword: validationRules.NewPassword,
      });
    }
  }, [NewPassword]);

  useEffect(() => {
    if (ConfirmPassword !== "") {
      validate({
        ConfirmPassword: validationRules.ConfirmPassword,
      });
    }
  }, [ConfirmPassword]);

  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={Lang.CHANGE_PASSWORD}
        headerViewStyle={{ backgroundColor: "#fff" }}
      />
      <StatusBar barStyle="default" />
      <ChangePasswordTextInput
        placeholder={Lang.OLD_PASSWORD}
        placeholderTextColor={"#7F8190"}
        handleChange={(text) => setOldPassword(text)}
        hidePassword={hidePassword1}
        onShowPassword={() => setHidePassword1(!hidePassword1)}
        errorMessage={getErrorsInField("OldPassword")}
        inputViewStyle={
          isFieldInError("OldPassword") ? { borderColor: "red" } : {}
        }
      />
      <ChangePasswordTextInput
        placeholder={Lang.NEW_PASSWORD}
        placeholderTextColor={"#7F8190"}
        handleChange={(text) => setNewPassword(text)}
        hidePassword={hidePassword2}
        onShowPassword={() => setHidePassword2(!hidePassword2)}
        errorMessage={getErrorsInField("NewPassword")}
        inputViewStyle={
          isFieldInError("NewPassword") ? { borderColor: "red" } : {}
        }
      />
      <ChangePasswordTextInput
        placeholder={Lang.CONFIRM_PWD}
        placeholderTextColor={"#7F8190"}
        handleChange={(text) => setConfirmPassword(text)}
        hidePassword={hidePassword3}
        onShowPassword={() => setHidePassword3(!hidePassword3)}
        errorMessage={getErrorsInField("ConfirmPassword")}
        inputViewStyle={
          isFieldInError("ConfirmPassword") ? { borderColor: "red" } : {}
        }
      />
      <CustomButton
        onPress={() => changePassword()}
        buttonIcon={arrowbackgroundBlue}
        style={[
          CommonStyle.submiteButton,
          {
            backgroundColor: disabled || loading ? "gray" : "#4D39E9",
            position: "absolute",
            zIndex: 0,
            bottom: 50,
          },
        ]}
        textStyle={{
          color: "#fff",
          fontSize: getFontSize(15),
          fontWeight: "600",
        }}
        disabled={disabled}
        buttonIcon={disabled || loading ? greyArrow : arrowbackgroundBlue}
        status={Lang.SAVE_PASSWORD}
      />
    </SafeAreaView>
  );
}
