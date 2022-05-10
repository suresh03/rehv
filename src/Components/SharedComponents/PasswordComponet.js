/* eslint-disable react-native/no-inline-styles */
import React, {useState} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Text,
} from "react-native";
import PropTypes from "prop-types";
import { getFontSize } from "./ResponsiveSize";
import { password_icon, passwordShow, passwordHide } from "../../Assets/icon";
import Spacer from "./Space";
import Scaler from "../../Utils/Scaler";
const { width } = Dimensions.get("window");
import { DayTheme } from "../../Constants/theme";

const PasswordInput = (props) => {
  const {
    inputViewStyle,
    imgStyle,
    img,
    errorMessage,
    inputTitle,
    textInputStyle,
    ValidationErrorStyle,
    inputTitleStyle,
    hidePassword,
    onShowPassword,
  } = props;
  const [getBorderColor, setBorderColor] = useState("#a9a9a9")

  return (
    <>
      <View style={[styles.container, inputViewStyle, {borderColor: getBorderColor}]}>
        <Image
          resizeMode="contain"
          source={password_icon}
          style={[
            {
              width: Scaler(40),
              resizeMode: "contain",
              marginHorizontal: Scaler(5),
            },
            imgStyle,
          ]}
        />
        <TextInput
          {...props}
          style={[styles.textInputStyle, textInputStyle]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onFocus={() => setBorderColor(DayTheme.colors.primary)}
          onBlur={() => setBorderColor("#a9a9a9")}
          autoCorrect={false}
          secureTextEntry={hidePassword}
          returnKeyType={props.returnKeyType ?? "done"}
        />

        <TouchableOpacity onPress={() => onShowPassword()}>
          <Image
            resizeMode="contain"
            source={!hidePassword ? passwordShow : passwordHide}
            style={[
              {
                width: 28,
                resizeMode: "contain",
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      {errorMessage?.length > 0 && <Spacer size={5} />}
      {errorMessage?.length > 0 &&
        errorMessage?.map((message) => (
          <Text key={message} style={[styles.errorText, ValidationErrorStyle]}>
            {message}
          </Text>
        ))}

      <Text style={[styles.inputTitleStyle, inputTitleStyle]}>
        {inputTitle}
      </Text>
    </>
  );
};

PasswordInput.propTypes = {
  onShowPassword: PropTypes.func,
  hidePassword: PropTypes.bool,
  inputViewStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  ValidationError: PropTypes.object,
  inputTitleStyle: PropTypes.object,
  imgStyle: PropTypes.object,
  img: PropTypes.any,
  errorMessage: PropTypes.arrayOf(PropTypes.string),
  inputTitle: PropTypes.string,
};

PasswordInput.defaultProps = {
  hidePassword: false,
  inputViewStyle: {},
  imgStyle: {},
  errorMessage: [],
  inputTitle: "",
  textInputStyle: {},
  ValidationErrorStyle: {},
  inputTitleStyle: {},
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: width - 44,
    height: Scaler(65),
    borderColor: "#a9a9a9",
    borderWidth: Scaler(1),
    borderRadius: Scaler(10),
    paddingHorizontal: Scaler(5),
  },
  textInputStyle: {
    flex: 0.96,
    color: "#110D26",
    height: 68,
    borderRadius: Scaler(10),
    fontSize: Scaler(15),
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    color: "red",
    fontSize: getFontSize(14),
    textAlign: "justify",
  },
});
