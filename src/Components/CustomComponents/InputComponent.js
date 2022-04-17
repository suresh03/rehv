/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import Scaler from "../../Utils/Scaler"

import PropTypes from 'prop-types'



function InputComponent({ textInputProps, customProps }) {
  const theme = useTheme();
  return (
    <TextInput
      {...textInputProps}
      theme={{
        roundness: Scaler(16),
        colors: theme.colors,
        fonts: theme.fonts,
      }}
      style={[
        {
          backgroundColor: theme.colors.white,
          // opacity: 0.5,

          fontSize: Scaler(12),
          borderWidth: Scaler(0),
        },
        textInputProps?.style,
      ]}
      mode={textInputProps?.mode ?? "outlined"}
     error={customProps?.error}
     returnKeyType="done"
    />
  );
}

export default InputComponent;




InputComponent.propTypes = {
    textInputProps:PropTypes.elementType,
    customProps: PropTypes.any,
}

