import React from "react";
/* eslint-disable react-native/no-inline-styles */
import {
  TouchableOpacity,
  Platform,
  View,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { TextField } from "../../../Components/SharedComponents/TextField";
import Spacer from "../../../Components/SharedComponents/Space";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import { tickIcon } from "../../../Assets/icon";
import PropTypes from "prop-types";
import Scaler from "../../../Utils/Scaler";
import Lang from "../../../Language";

function GenderSelection(props) {
  const { selectGender, genderDiverse, maleToggle, WouldRather, femaleToggle } =
    props;

  return (
    <View style={{ height: Platform.OS === "ios" ? hp(65) : hp(64) }}>
      <View>
        <TextField
          textStyle={[
            CommonStyle.tittleStyle,
            { top: Platform.OS == "ios" ? hp(0.5) : hp(1) },
          ]}
          status={Lang.SELECT_GENDER}
        />

        <Spacer size={30} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: wp(75),
            alignSelf: "center",
          }}
        >
          <View>
            {femaleToggle == true ? (
              <Image source={tickIcon} style={styles.tick} />
            ) : null}
            <TouchableOpacity
              onPress={() => selectGender("female")}
              style={{
                ...styles.touch,
                borderColor: femaleToggle == false ? "lightgrey" : "#4D39E9",
              }}
            >
              {/* <Image
            source={femaleToggle == true ? femaleFocus : femaleUnfocus}
            resizeMode={"contain"}
            style={{
              alignSelf: "center",
              width: wp(10),
              height: hp(6),
              top: -5,
            }}
          /> */}
              {/* <TextField
            textStyle={{
              fontSize: Scaler(13),
              color: "#000",
              fontFamily: "Poppins-Medium",
              alignSelf: "center",
            }}
            status={Lang.FEMALE}
          /> */}
              <Text
                style={[
                  {
                    fontSize: Scaler(10),
                    fontSize: Scaler(13),
                    color: "#000",
                    fontFamily: "Poppins-Medium",
                    alignSelf: "center",
                    textAlign: "center",
                    padding: 15,
                  },
                ]}
              >
                {Lang.FEMALE}
              </Text>
            </TouchableOpacity>
          </View>
          <Spacer size={20} />
          <View>
            {maleToggle == true ? (
              <Image
                source={tickIcon}
                style={{
                  position: "absolute",
                  width: wp(13),
                  height: hp(9),
                  top: hp(-2),
                  alignSelf: "center",
                  right: -wp(4),
                  zIndex: 1,
                }}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => selectGender("male")}
              style={{
                ...styles.touch,
                borderColor: maleToggle == false ? "lightgrey" : "#4D39E9",
              }}
            >
              {/* <Image
            source={maleToggle == true ? maleFocus : maleUnfocus}
            resizeMode={"contain"}
            style={{
              alignSelf: "center",
              width: wp(8),
              height: hp(5),
              top: -5,
            }}
          /> */}
              {/* <TextField
            textStyle={{
              fontSize:Scaler(13),
              color: "#000",
              fontFamily: "Poppins-Medium",
              alignSelf: "center",
              top: 5,
            }}
            status={Lang.MALE}
          /> */}
              <Text
                style={[
                  {
                    fontSize: Scaler(10),
                    fontSize: Scaler(13),
                    color: "#000",
                    fontFamily: "Poppins-Medium",
                    alignSelf: "center",
                    textAlign: "center",
                    padding: 15,
                  },
                ]}
              >
                {Lang.MALE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Spacer size={20} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: wp(75),
            alignSelf: "center",
          }}
        >
          <View>
            {genderDiverse == true ? (
              <Image source={tickIcon} style={styles.tick} />
            ) : null}
            <TouchableOpacity
              onPress={() => selectGender("Gender Diverse")}
              style={{
                ...styles.touch,
                borderColor: genderDiverse == false ? "lightgrey" : "#4D39E9",
              }}
            >
              {/* <Image
            source={genderDiverse == true ? otherFocus : otherUnfocus}
            resizeMode={"contain"}
            style={{
              alignSelf: "center",
              width: wp(10),
              height: hp(6),
              top: -5,
            }}
          /> */}
              {/* <TextField
            textStyle={{
              fontSize: Scaler(13),
              color: "#000",
              fontFamily: "Poppins-Medium",
              alignSelf: "center",
            }}
            status={Lang.GENDER_DIVERSE}
          /> */}
              <Text
                style={[
                  {
                    fontSize: Scaler(10),
                    fontSize: Scaler(13),
                    color: "#000",
                    fontFamily: "Poppins-Medium",
                    alignSelf: "center",
                    textAlign: "center",
                    padding: 15,
                  },
                ]}
              >
                {Lang.GENDER_DIVERSE}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {WouldRather == true ? (
              <Image source={tickIcon} style={styles.tick} />
            ) : null}
            <TouchableOpacity
              onPress={() => selectGender("Would Rather Not Say")}
              style={{
                ...styles.touch,
                borderColor: WouldRather == false ? "lightgrey" : "#4D39E9",
              }}
            >
              {/* <Image
            source={genderDiverse == true ? otherFocus : otherUnfocus}
            resizeMode={"contain"}
            style={{
              alignSelf: "center",
              width: wp(10),
              height: hp(6),
              top: -5,
            }}
          /> */}
              {/* <TextField
            textStyle={{
              fontSize: Scaler(13),
              color: "#000",
              fontFamily: "Poppins-Medium",
              alignSelf: "center",
              textAlign:'center',
              padding:15
            }}
            status={Lang.WouldRather}
          /> */}
              <Text
                style={[
                  {
                    fontSize: Scaler(10),
                    fontSize: Scaler(13),
                    color: "#000",
                    fontFamily: "Poppins-Medium",
                    alignSelf: "center",
                    textAlign: "center",
                    padding: 15,
                  },
                ]}
              >
                {Lang.WouldRather}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

GenderSelection.propTypes = {
  selectGender: PropTypes.func,
  genderDiverse: PropTypes.bool,
  maleToggle: PropTypes.bool,
  femaleToggle: PropTypes.bool,
};

const styles = StyleSheet.create({
  tick: {
    position: "absolute",
    width: wp(13),
    height: hp(9),
    top: hp(-2),
    alignSelf: "center",
    right: -wp(4),
    zIndex: 1,
  },
  touch: {
    width: Scaler(125),
    height: Scaler(125),
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 0.8,
    justifyContent: "center",
    alignSelf: "center",
    top: hp(-1),
  },
});

export default GenderSelection;
