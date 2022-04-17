import React from "react";
/* eslint-disable react-native/no-inline-styles */
import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Spacer from "../../../Components/SharedComponents/Space";
import { emailIcon } from "../../../Assets/icon";
import PropTypes from "prop-types";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";
import Lang from "../../../Language";

function ManagerDetail(props) {
  const {
    managerEmail,
    setManagerEmail,
    onFocusManagerEmail,
    onBlurManagerEmail,
    errorMessage,
    inputViewStyle,
  } = props;

  return (
    <View style={{ height: hp(62) }}>
      <View>
        <Spacer />
        <Text style={commonStyle.tittleStyle}>{Lang.MANAGER_EMAIL}</Text>
        <Spacer size={30} />
        <OutlinedInput
          value={managerEmail}
          onChangeText={(val) => setManagerEmail(val)}
          placeholder={Lang.WORK_EMAIL}
          placeholderTextColor={"grey"}
          keyboardType={"email-address"}
          img={emailIcon}
          onFocus={() => onFocusManagerEmail()}
          onBlur={() => onBlurManagerEmail()}
          errorMessage={errorMessage}
          inputViewStyle={inputViewStyle}
        />
      </View>
    </View>
  );
}

ManagerDetail.propTypes = {
  managerEmail: PropTypes.string,
  setManagerEmail: PropTypes.func,
  onFocusManagerEmail: PropTypes.func,
  onBlurManagerEmail: PropTypes.func,
  disabled: PropTypes.func,
  errorMessage: PropTypes.array,
  inputViewStyle: PropTypes.object,
};

export default ManagerDetail;
