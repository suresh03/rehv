import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

function Loader(props) {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" theme={theme} />
    </View>
  );
}

Loader.propTypes = {};

export default Loader;
