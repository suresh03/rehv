import React, { useEffect } from "react";
/* eslint-disable react-native/no-inline-styles */
import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Spacer from "../../../Components/SharedComponents/Space";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import Body from "../../../Components/SharedComponents/Body";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import { nameIcon } from "../../../Assets/icon";
import PropTypes from "prop-types";
import { useTheme } from "react-native-paper";
import ValidationConstants from "../../../Constants/ValidationConstants";
import { useValidation } from "react-native-form-validator";
import Lang from "../../../Language";

const validationRules = {
  firstName: { required: true },
  lastName: { required: true },
};
function NameInputStep(props) {
  const {
    firstName,
    lastName,
    setFirstName,
    setLastName,
    lastNameBorderColorChange,
    firstNameBorderColorChange,
    onBlurSec,
    onFocusSec,
    onBlur,
    onFocus,
  } = props;
  const theme = useTheme();

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { firstName, lastName },
    ...ValidationConstants,
  });

  useEffect(() => {
    if (firstName == "" || lastName == "") return;
    validate(validationRules);
  }, [firstName, lastName]);

  return (
    <Body
      keyboardDismissMode="interactive"
      contentContainerStyle={{ height: hp(59) }}
    >
      <Spacer />
      <View style={{ width: "90%" }}>
        <Text style={CommonStyle.tittleStyle}>{Lang.ENTER_NAME}</Text>
      </View>
      <Spacer size={25} />
      <OutlinedInput
        value={firstName}
        onChangeText={(val) => setFirstName(val)}
        placeholder={Lang.F_NAME}
        placeholderTextColor={"grey"}
        img={nameIcon}
        autoCapitalize={"words"}
        maxLength={30}
        onBlur={onBlur}
        onFocus={onFocus}
        inputViewStyle={{
          borderColor: isFieldInError("firstName")
            ? { borderColor: "red" }
            : firstNameBorderColorChange
            ? theme.colors.primary
            : theme.colors.border,
        }}
        errorMessage={getErrorsInField("firstName")}
      />
      <Spacer />
      <OutlinedInput
        value={lastName}
        onChangeText={(val) => setLastName(val)}
        placeholder={Lang.L_NAME}
        autoCapitalize={"words"}
        placeholderTextColor={"grey"}
        img={nameIcon}
        maxLength={30}
        onBlur={() => onBlurSec()}
        onFocus={() => onFocusSec()}
        inputViewStyle={{
          borderColor: isFieldInError("lastName")
            ? { borderColor: "red" }
            : lastNameBorderColorChange == true
            ? theme.colors.primary
            : theme.colors.border,
        }}
        errorMessage={getErrorsInField("lastName")}
      />
    </Body>
  );
}

NameInputStep.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  setFirstName: PropTypes.func,
  setLastName: PropTypes.func,
  lastNameBorderColorChange: PropTypes.bool,
  firstNameBorderColorChange: PropTypes.bool,
};

export default NameInputStep;
