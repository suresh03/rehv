import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Scaler from "../../../Utils/Scaler";
import { useTheme } from "react-native-paper";

function PollDetailTitle(props) {
  const { creator, creatorRole } = props;
  const theme = useTheme();
  return (
    <>
      <View>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: Scaler(16),
            fontFamily: "Poppins-Medium",
           
          }}
        >
          {`${creator}'s Post`}
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: Scaler(14),
            ...theme.fonts.medium,
            top: hp(2.5),
            opacity: 0.8,
          }}
        >
          {creatorRole}
        </Text>
      </View>
    </>
  );
}

PollDetailTitle.propTypes = {
  creator: PropTypes.string,
  creatorRole: PropTypes.string,
};
PollDetailTitle.defaultProps = {
  creator: "",
  creatorRole: "",
};

export default PollDetailTitle;
