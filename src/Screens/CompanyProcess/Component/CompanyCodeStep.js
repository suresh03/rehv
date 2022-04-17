import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Spacer from "../../../Components/SharedComponents/Space";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import { companyIcon } from "../../../Assets/icon";
import PropTypes from "prop-types";
import { useValidation } from "react-native-form-validator";
import ValidationConstants from "../../../Constants/ValidationConstants";
import { useTheme } from "react-native-paper";
import Lang from "../../../Language";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";

const validationRules = {
  companyCode: { number: true, required: true },
};

function CompanyCodeStep(props) {
  const { companyCode, setCompanyCode, setCompanyCodeFocus, companyCodeFocus } =
    props;

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { companyCode },
    ...ValidationConstants,
  });

  useEffect(() => {
    if (companyCode == "") return;
    validate(validationRules);
  }, [companyCode]);

  const theme = useTheme();

  return (
    <View style={{ height: hp(80), alignItems: "flex-start" }}>
      <View>
        <Spacer />

        <View style={{ width: "90%" }}>
          <Text style={commonStyle.tittleStyle}>
            {`${Lang.ENTER_UR}\n${Lang.COMPANY_CODE}`}
          </Text>
        </View>
        <Spacer size={25} />

        <OutlinedInput
          // keyboardType="done"
          value={companyCode}
          onChangeText={(val) => setCompanyCode(val)}
          placeholder={Lang.COMPANY_CODE}
          placeholderTextColor={"grey"}
          img={companyIcon}
          keyboardType={"numeric"}
          onFocus={setCompanyCodeFocus}
          onBlur={setCompanyCodeFocus}
          errorMessage={getErrorsInField("companyCode")}
          inputViewStyle={
            isFieldInError("companyCode")
              ? { borderColor: "red" }
              : companyCodeFocus
              ? { borderColor: theme.colors.primary }
              : { borderColor: theme.colors.border }
          }
        />
      </View>
    </View>
  );
}

CompanyCodeStep.propTypes = {
  disabled: PropTypes.bool,
  companyCode: PropTypes.string,
  setCompanyCode: PropTypes.func,
  companyCodeFocus: PropTypes.bool,
  setCompanyCodeFocus: PropTypes.func,
  onPrevStepCompany: PropTypes.func,
  onNextStep: PropTypes.func,
};

export default CompanyCodeStep;
