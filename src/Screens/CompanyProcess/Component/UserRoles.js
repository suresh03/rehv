import React from "react";
/* eslint-disable react-native/no-inline-styles */
import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Spacer from "../../../Components/SharedComponents/Space";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import PropTypes from "prop-types";
import { CustomButton } from "../../../Components/SharedComponents/Button";
import Scaler from "../../../Utils/Scaler";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";
import Lang from "../../../Language";

function UserRoles(props) {
  const { toggleNo, toggleYes, managerSelectButton } = props;
  console.log("toggleNo", toggleNo, "toggleYes", toggleYes);
  return (
    <View style={{ height: hp(63) }}>
      <View>
        <Spacer />
        <Text style={commonStyle.tittleStyle}>{Lang.PEOPLE_MANAGER}</Text>
        <Spacer size={Scaler(30)} />
        <View style={{ justifyContent: "center" }}>
          <CustomButton
            onPress={() => managerSelectButton("yes")}
            style={[
              CommonStyle.languageButton,
              {
                backgroundColor: toggleYes ? "#5300eb" : "#fff",
                borderWidth: 0.5,
                borderColor: "grey",
              },
            ]}
            textStyle={{
              color: toggleYes ? "#fff" : "#000",
              fontSize: 20,
            }}
            status={Lang.YES}
          />
          <Spacer size={Scaler(20)} />
          <CustomButton
            onPress={() => managerSelectButton("no")}
            style={[
              CommonStyle.languageButton,
              {
                backgroundColor: toggleNo ? "#5300eb" : "#fff",
                borderWidth: 0.5,
                borderColor: "grey",
              },
            ]}
            textStyle={{
              color: toggleNo ? "#fff" : "#000",
              fontSize: 20,
            }}
            status={Lang.NO}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
}

UserRoles.propTypes = {
  toggleNo: PropTypes.bool,
  toggleYes: PropTypes.bool,
  managerSelectButton: PropTypes.func,
};

export default UserRoles;
