import React from "react";
/* eslint-disable react-native/no-inline-styles */
import {
  Platform,
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Spacer from "../../../Components/SharedComponents/Space";
import { textShowIcon } from "../../../Assets/icon";
import PropTypes from "prop-types";
import Scaler from "../../../Utils/Scaler";
import { TextInput, useTheme } from "react-native-paper";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";
import Lang from "../../../Language";

function ProfileDescription(props) {
  const {
    describeIconToggle,
    setDescribeIconToggle,
    profileDescriptionField,
    setProfileDescriptionField,
    onFocusDescribe,
    onBlurDescribe,
  } = props;
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={() => setDescribeIconToggle(false)}>
      <View
        style={{
          height: hp(63),
          alignItems: "flex-start",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Spacer />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={commonStyle.tittleStyle}>{Lang.SELF_DESC}</Text>

          <TouchableOpacity
            style={{
              width: wp(15),
              position: "absolute",
              right: Scaler(0),
              top: Scaler(8),
            }}
            onPress={() => setDescribeIconToggle(!describeIconToggle)}
          >
            <Image
              source={textShowIcon}
              style={{
                width: wp(20),
                height: hp(3),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Spacer size={Scaler(30)} />
        {describeIconToggle == false ? null : (
          <View
            style={{
              padding: hp(1),
              position: "absolute",
              alignSelf: "flex-end",
              width: wp(65),
              backgroundColor: "#000",
              borderRadius: 10,
              zIndex: 1,
              right: wp(8),
              top: Platform.OS == "ios" ? hp(3) : hp(2),
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "Poppins-Regular",
                lineHeight: 18,
                alignItems: "center",
                fontSize: Scaler(10),
              }}
            >
              {Lang.SELF_DESC_EXAMPLE}
            </Text>
          </View>
        )}
        <TextInput
          mode="outlined"
          multiline={true}
          placeholder={Lang.PROFILE_DESC}
          placeholderTextColor={"grey"}
          value={profileDescriptionField}
          textAlign="left"
          onChangeText={(text) => setProfileDescriptionField(text)}
          onFocus={() => onFocusDescribe()}
          onBlur={() => onBlurDescribe()}
          style={{
            width: "100%",
            maxHeight: Scaler(400),
            minHeight: Scaler(200),
          }}
          theme={(theme, { roundness: Scaler(10) })}
          returnKeyType="done"
          maxLength={350}
          onSubmitEditing={()=>Keyboard.dismiss()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

ProfileDescription.propTypes = {
  describeIconToggle: PropTypes.bool,
  setDescribeIconToggle: PropTypes.func,
  profileDescriptionField: PropTypes.string,
  setProfileDescriptionField: PropTypes.func,
  onFocusDescribe: PropTypes.func,
  onBlurDescribe: PropTypes.func,
};

export default ProfileDescription;
