import React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Spacer from "../../../Components/SharedComponents/Space";
import { textShowIcon, CalendarSqure } from "../../../Assets/icon";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import ChangeStyle from "../../../Components/CustomComponents/ChangeStyle";
import PropTypes from "prop-types";
import Scaler from "../../../Utils/Scaler";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";
import Lang from "../../../Language";

function EnterBirthday(props) {
  const {
    datePop,
    iconToggle,
    onIconToggle,
    iconViewToggle,
    dateToggle,
    setDate,
    setDateToggle,
    confirmDate,
    defaultText,
    maximumBirthDate,
  } = props;
  return (
    <TouchableWithoutFeedback onPress={() => onIconToggle()}>
      <View style={{ height: Platform.OS === "ios" ? hp(58.5) : hp(60) }}>
        <View style={{ alignItems: "center", height: hp(25) }}>
          <View>
            <Spacer />
            <Text style={commonStyle.tittleStyle}>{Lang.DOB}</Text>
            <Spacer size={40} />
            <TouchableOpacity onPress={() => datePop()} style={{ flex: 1 }}>
              <View
                style={{
                  width: wp(90),
                  height: Scaler(65),
                  borderColor: "#a9a9a9",
                  borderWidth: 0.8,
                  borderRadius: Scaler(10),
                  overflow: "hidden",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: Scaler(10),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => datePop()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Image
                      source={CalendarSqure}
                      style={{
                        width: Scaler(35),
                        height: Scaler(35),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        color: confirmDate == "" ? "grey" : "#000",
                        fontSize: Scaler(14),
                        marginLeft: Scaler(10),
                      }}
                    >
                      {confirmDate == ""
                        ? defaultText
                        : moment(confirmDate).format("MMMM D YYYY")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => iconViewToggle()}>
                    <Image
                      source={textShowIcon}
                      style={{
                        width: Scaler(20),
                        height: Scaler(20),
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {iconToggle == false ? null : (
                <View style={{ top: hp(-2), alignSelf: "flex-end" }}>
                  <View style={[ChangeStyle.contentTittle]}>
                    <Text style={[ChangeStyle.contentStyle]}>
                      {Lang.PRIVACY_DESC}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <DatePicker
            modal
            open={dateToggle}
            date={confirmDate}
            //maximumDate={maximumBirthDate}
            onConfirm={(d) => {
              setDateToggle(false);
              setDate(d);
            }}
            onCancel={() => {
              setDateToggle(false);
            }}
            mode="date"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

EnterBirthday.propTypes = {
  datePop: PropTypes.func,
  iconToggle: PropTypes.bool,
  iconViewToggle: PropTypes.func,
  dateToggle: PropTypes.bool,
  setDate: PropTypes.func,
  setDateToggle: PropTypes.func,
  date: PropTypes.any,
  confirmDate: PropTypes.any,
  maximumBirthDate: PropTypes.any,
  defaultText: PropTypes.string,
};

export default EnterBirthday;
