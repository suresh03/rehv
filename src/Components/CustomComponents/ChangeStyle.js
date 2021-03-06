import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DayTheme } from "../../Constants/theme";

import Scaler from "../../Utils/Scaler";
const { width } = Dimensions.get("window");

const changeStyle = StyleSheet.create({
  textchangeStyle: {
    fontSize: 15,
    color: "#696969",
    ...DayTheme.fonts.medium,
  },
  signStyle: {
    fontSize: 15,
    color: DayTheme.colors.primary,
    ...DayTheme.fonts.medium,
  },

  countryStyle: {
    flexDirection: "row",
    borderBottomWidth: Scaler(1),
    borderBottomColor: DayTheme.colors.disabled,
    backgroundColor: "#fff",
    width: wp(92),
    alignSelf: "center",
    justifyContent: "space-between",
    minHeight: Scaler(55),
  },
  countryNameStyle: {
    fontSize: Scaler(14),
    ...DayTheme.fonts.regular,
    alignSelf: "center",
    marginVertical: Scaler(10),
    width: width - Scaler(160),
    color: "#000",
  },
  countryCodeStyle: {
    fontSize: Scaler(14),
    alignSelf: "center",
    marginVertical: Scaler(10),
    height: Scaler(20),
    color: "#000",
    paddingHorizontal: Scaler(2.5),
  },
  contentTittle: {
    alignItems: "center",
    width: wp(60),
    minHeight: Scaler(70),
    borderRadius: Scaler(10),
    zIndex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  contentStyle: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    lineHeight: 18,
    alignItems: "center",
    fontSize: Scaler(11),
    marginHorizontal: 10,
  },
  interesttextStyle: {
    lineHeight: Scaler(28),
    fontSize: Scaler(15),
    color: "#000",
    ...DayTheme.fonts.medium,
  },
  choicequestionStyle: {
    marginVertical: Scaler(10),
    borderWidth: Scaler(0.8),
    height: hp(7),
    borderRadius: Scaler(10),
    width: wp(90),
    alignSelf: "center",
  },
  interestvalueStyle: {
    alignItems: "center",
    left: Scaler(30),
    fontWeight: "500",
    fontSize: Scaler(17),
  },
  rightarrowTouchStyle: {
    flexDirection: "row",
  },
  statictextStyle: {
    color: "grey",
    alignSelf: "center",
    left: Scaler(10),
  },
  rightArrowStyle: {
    width: wp(15),
    height: hp(1),
    right: Scaler(20),
    alignSelf: "center",
  },
  congratulationViewStyle: {
    width: Scaler(120),
    height: Scaler(150),
    borderRadius: Scaler(10),
    overflow: "hidden",
    borderWidth: 0.8,
    borderColor: "lightgrey",
    marginHorizontal: 10,
    marginVertical: Scaler(10),
    padding: Scaler(10),
    alignItems: "center",
    justifyContent: "center",
  },
  sliderimgStyle: {
    width: wp(2.8),
    height: hp(1.4),
    borderRadius: 15,
    top: Scaler(-50),
  },
  lorembackgroundStyle: {
    backgroundColor: "#fff",
    height: hp(70),
    borderTopLeftRadius: Scaler(50),
    borderTopRightRadius: Scaler(50),
    top: hp(-18),
  },
  loremViewStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: Scaler(25),
  },
  boxStyle: {
    alignSelf: "center",
    minHeight: Scaler(60),
    borderWidth: 1.5,
    borderRadius: Scaler(10),
    borderColor: "#CECECE",
    width: Scaler(220),
    justifyContent: "center",
    flexDirection: "row",
  },
  secondboxStyle: {
    width: Scaler(120),
    minHeight: Scaler(60),
    alignSelf: "center",
    borderRadius: Scaler(10),
    backgroundColor: "#EEEBFF",
    alignItems: "center",
    justifyContent: "center",
  },
  loremtextStyle: {
    fontSize: 18,
    color: "#000",
    ...DayTheme.fonts.medium,
    textAlign: "center",
    alignSelf: "center",
  },
  loremnumberStyle: {
    fontSize: Scaler(20),
    color: "#4D39E9",
    ...DayTheme.fonts.medium,
    alignSelf: "center",
    top: hp(1),
  },
  loremcontentStyle: {
    alignSelf: "center",
    fontSize: Scaler(17),
    width: wp(88),
    top: Scaler(40),
    lineHeight: Scaler(30),
    ...DayTheme.fonts.medium,
    color: "#110D26",
  },
  loremMemberStyle: {
    fontSize: Scaler(14),
    color: "#110D26",
    ...DayTheme.fonts.medium,
    alignSelf: "center",
  },
  inboxcontentStyle: {
    textAlign: "center",
    left: Platform.OS == "ios" ? Scaler(38) : Scaler(44),
    top: Scaler(-35),
    color: "#7F8190",
    fontSize: Scaler(18),
    fontWeight: "500",
  },
  notiTimeStyle: {
    left: wp(20.5),
    top: hp(-2),
    color: "#7F8190",
    fontSize: Scaler(15),
    ...DayTheme.fonts.medium,
  },
});

export default changeStyle;
