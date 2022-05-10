/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { getFontSize } from "./ResponsiveSize";
import PropTypes from "prop-types";
import Spacer from "./Space";
import Scaler from "../../Utils/Scaler";
const { width } = Dimensions.get("window");
import Lang from "../../Language/index";

const OutlinedInput = (props) => {
  const {
    inputViewStyle,
    imgStyle,
    img,
    errorMessage,
    inputTitle,
    textInputStyle,
    ValidationErrorStyle,
    inputTitleStyle,
    keyboardType,
    autoCapitalize,
    handleChange
  } = props;

  return (
    <View style={{ width: inputViewStyle.width }}>
      <View style={[styles.container, inputViewStyle]}>
        <Image
          source={img}
          style={[
            {
              width: Scaler(40),
              resizeMode: "contain",
              marginHorizontal: Scaler(5),
            },
            imgStyle,
          ]}
          resizeMode="contain"
        />

        <TextInput
          {...props}
          maxLength={2}
          style={{ ...styles.textInputStyle, ...textInputStyle }}
          underlineColorAndroid="transparent"
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          keyboardType={keyboardType}
          textAlign={props.textAlign}
          onChangeText={handleChange}
          returnKeyType="done"
        />
      </View>
      {errorMessage?.length > 0 && <Spacer size={5} />}
      {errorMessage?.length > 0 &&
        errorMessage?.reverse()?.map((message) => (
          <Text key={message} style={[styles.errorText, ValidationErrorStyle]}>
            {message}
          </Text>
        ))}

      <Text style={[styles.inputTitleStyle, inputTitleStyle]}>
        {inputTitle}
      </Text>
    </View>
  );
};

OutlinedInput.propTypes = {
  inputViewStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  ValidationError: PropTypes.object,
  inputTitleStyle: PropTypes.object,
  imgStyle: PropTypes.object,
  img: PropTypes.any,
  errorMessage: PropTypes.arrayOf(PropTypes.string),
  inputTitle: PropTypes.string,
  keyboardType: PropTypes.oneOf([
    "default",
    "email-address",
    "numeric",
    "phone-pad",
    "number-pad",
    "decimal-pad",
  ]),
  textAlign: PropTypes.oneOf(["left", "center", "right"]),
  autoCapitalize: PropTypes.string,
};

OutlinedInput.defaultProps = {
  inputViewStyle: {},
  imgStyle: {},
  errorMessage: [],
  inputTitle: "",
  textInputStyle: {},
  ValidationErrorStyle: {},
  inputTitleStyle: {},
  keyboardType: "default",
  textAlign: "left",
  autoCapitalize:"none"
};

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
    height: Scaler(65),
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    color: "red",
    fontSize: getFontSize(14),
    textAlign: "justify",
  },
});

export default OutlinedInput;
