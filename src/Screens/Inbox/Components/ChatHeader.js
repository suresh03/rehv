import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import Scaler from "../../../Utils/Scaler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { blackback } from "../../../Assets/icon";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

function ChatHeader(props) {
  const { name, role } = props;
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: width,
        height: hp(8),
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "row", width: width - 50 }}>
        <TouchableOpacity onPress={() => navigation.pop()} style={{}}>
          <Image
            style={{
              height: Scaler(25),
              width: Scaler(25),
              top: hp(2),
            }}
            source={blackback}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={{ alignSelf: "center", width: width - 183 }}>
          <Text
            style={{
              fontSize: Scaler(20),
              fontFamily: "Poppins-Medium",
              textAlign: "center",
              left: wp(10),
              color: "#000",
              top: Platform.OS == "ios" ? hp(0.5) : hp(1),
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: Scaler(16),
              fontFamily: "Poppins-Regular",
              textAlign: "center",
              left: wp(10),
              color: "#7F8190",
            }}
          >
            {role}
          </Text>
        </View>
      </View>
    </View>
  );
}

ChatHeader.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

ChatHeader.defaultProps = {
  name: "Guest",
  role: "",
};
export default ChatHeader;
