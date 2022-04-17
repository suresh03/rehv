/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Pressable, Text } from "react-native";
import { getFontSize } from "./ResponsiveSize";

export const TextField = (props) => {
  return (
    <Pressable
      style={[{ backgroundColor: "white" }, props.style]}
      onPress={props.onPress}
    >
      <Text style={[{ fontSize: getFontSize(10) }, props.textStyle]}>
        {props.status}
      </Text>
    </Pressable>
  );
};
