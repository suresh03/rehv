import { configureFonts, DarkTheme, DefaultTheme } from "react-native-paper";

const fonts = {
  regular: {
    fontFamily: "Poppins-Regular",
    fontWeight: "normal",
  },
  medium: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
  },
  semiBold: {
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
  },
  bold: {
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
};

const fontConfig = {
  ios: fonts,
  android: fonts,
};

export const DayTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4D39E9",
    background: "#FFFFFF",
    disabled: "#E9E5E4",
    textBlack: "#110D26",
    disabledText: "#7F8190",
    border: "#a9a9a9",
    panelRed: "#F0635A",
  },
  fonts: configureFonts(fontConfig),
};

export const NightTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#4D39E9",
    background: "#FFFFFF",
    disabled: "#E9E5E4",
    textBlack: "#110D26",
    disabledText: "#7F8190",
    border: "#a9a9a9",
    panelRed: "#F0635A",
  },
  fonts: configureFonts(fontConfig),
};
