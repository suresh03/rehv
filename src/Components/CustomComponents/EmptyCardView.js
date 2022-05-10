import React from "react";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native-animatable";
import { followBlankIcon } from "../../Assets/icon";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Scaler from "../../Utils/Scaler";
import FastImage from "react-native-fast-image";
import { useTheme } from "react-native-paper";

function EmptyCardView(props) {
  const { message, imageData } = props;
  const theme =useTheme();
  return (
    <View style={{ justifyContent: "center", flex: 0.92 }}>
      <View
        style={{
          backgroundColor: "#fff",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          shadowOpacity: 0.1,
          elevation: 5,
          borderRadius: 10,
          width: "90%",
          height: Scaler(360),
        }}
      >
        <FastImage
          source={imageData ? imageData : followBlankIcon}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: Scaler(220),
            height:Scaler(250),
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            width: wp(90),
            fontSize: 17,
            fontFamily: "Poppins-Medium",
            color: theme.colors.disabledText,
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}

EmptyCardView.propTypes = {
  message: PropTypes.string,
};

EmptyCardView.defaultProps = {
  message: "",
};

export default EmptyCardView;
