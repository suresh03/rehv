/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import PropTypes from "prop-types";
import Scaler from "../../Utils/Scaler";
import { useTheme } from "react-native-paper";

export const CustomButton = (props) => {
  const {
    loading,
    disabled,
    buttonIcon,
    status,
    textStyle,
    style,
    onPress,
    leftChildren,
  } = props;
  const theme = useTheme();
  let buttonDisable = disabled || loading;

  return (
    <TouchableOpacity
      disabled={buttonDisable}
      style={[
        {
          justifyContent: "center",
          alignSelf: "center",
          height: Scaler(55),
          width: wp(73.33),
          borderRadius: Scaler(11),
          backgroundColor: buttonDisable
            ? theme.colors.disabled
            : theme.colors.primary,
        },
        style,
      ]}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: Scaler(10),
          justifyContent: "space-between",
        }}
      >
        <View>{leftChildren}</View>
        {loading ? (
          <ActivityIndicator size='small' color={theme.colors.primary} />
        ) : (
          <Text
            style={[
              {
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: Scaler(15),
                color: disabled ? theme.colors.disabledText : "#fff",
                ...theme.fonts.medium,
              },
              textStyle,
            ]}
          >
            {status}
          </Text>
        )}
        {buttonIcon ? (
          <Image
            style={[
              { width: Scaler(24), height: Scaler(24), right: Scaler(10) },
              props.buttoniconStyle,
            ]}
            source={buttonIcon}
            resizeMode={"contain"}
          />
        ) : <View></View>}
      </View>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonIcon: PropTypes.any,
  status: PropTypes.string,
  textStyle: PropTypes.object,
  style: PropTypes.object,
  onPress: PropTypes.func,
  leftChildren: PropTypes.node,
};
CustomButton.defaultProps = {
  loading: false,
  disabled: false,
  buttonIcon: null,
  status: "",
  textStyle: {},
  style: {},
  onPress: {},
};
