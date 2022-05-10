import React, { Children, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PropTypes from "prop-types";
import { leftIcon, dropdwon } from "../../Assets/icon";
import Scaler from "../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import { DayTheme } from "../../Constants/theme";
import Spacer from "../SharedComponents/Space";
const { width } = Dimensions.get("window");
import useApiServices from "../../Services/useApiServices";

function Dropdown(props) {
  const {
    opened,
    onDropdownClick,
    data,
    selectedItem,
    placeholder,
    onSelect,
    leftIcon,
    borderColor,
    errorMessage,
    ValidationErrorStyle,
    selectedTextStyle,
  } = props;
  const { ApiPostMethod, ApiGetMethod, ApiBasicFormDataMethod } =
  useApiServices();

  const [LangType, setLangType] = useState("")

  useEffect(() => {
    getUserDetails();
  }, [LangType]);

  const getUserDetails = () => {
    ApiGetMethod(`user/getUserDetails`)
      .then((res) => {
        setLangType(res.data[0].langSymbol)
      })
      .finally(() => console.log("success"));
  };

  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        main: {
          borderColor: borderColor ?? theme.colors.border,
          borderBottomWidth: !opened ? Scaler(1) : 0,
          borderTopWidth: opened ? Scaler(1) : Scaler(1),
          borderRightWidth: opened ? Scaler(1) : Scaler(1),
          borderLeftWidth: opened ? Scaler(1) : Scaler(1),
          borderTopLeftRadius: Scaler(10),
          borderTopRightRadius: Scaler(10),
          borderBottomLeftRadius: !opened ? Scaler(10) : 0,
          borderBottomRightRadius: !opened ? Scaler(10) : 0,
          width: width - 44,
          height: Scaler(65),
          overflow: "hidden",
          justifyContent: "space-between",
          flexDirection: "row",
        },
      }),
    [opened, borderColor, width]
  );

  return (
    <>
      <Pressable onPress={() => onDropdownClick()} style={styles.main}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: Scaler(10),
            width: wp(74),
          }}
        >
          <Image
            source={leftIcon}
            style={{
              width: Scaler(40),
              height: Scaler(40),
              resizeMode: "contain",
            }}
          />
          <View style={{ width: wp(65) }}>
            <Text
              style={[
                {
                  left: Scaler(10),
                  color: selectedItem == "" ? "grey" : "#000",
                  fontSize: Scaler(16),
                  ...theme.fonts.regular,
                  ...selectedTextStyle,
                },
              ]}
            >
              {selectedItem == "" ? placeholder : selectedItem}
            </Text>
          </View>
        </View>

        <View style={{ width: Scaler(60), alignSelf: "center" }}>
          <Image
            source={dropdwon}
            style={{
              height: Scaler(20),
              alignSelf: "center",
              transform: [{ rotate: opened ? "180deg" : "0deg" }],
            }}
            resizeMode="contain"
          />
        </View>
      </Pressable>
      {opened && (
        <View
          onPress={() => onSelect(item)}
          style={{
            width: width - 44,
            borderColor: theme.colors.border,
            borderLeftWidth: Scaler(1),
            borderRightWidth: Scaler(1),
            borderBottomWidth: Scaler(1),
            borderTopWidth: 0,
            borderTopLeftRadius: !opened ? Scaler(10) : 0,
            borderTopRightRadius: !opened ? Scaler(10) : 0,
            borderBottomLeftRadius: Scaler(10),
            borderBottomRightRadius: Scaler(10),
          }}
        >
          <Spacer size={Scaler(20)} />
          {Children.toArray(
            data.map((item, Index) => {
              return (
                <Pressable onPress={() => onSelect(item)} key={Index}>
                  <View
                    style={{
                      marginVertical: Scaler(10),
                      marginHorizontal: Scaler(20),
                    }}
                  >
                    <Text
                      style={{
                        left: wp(10.8),
                        top: hp(-2),
                        color: "#110D26",
                      }}
                    >
                      {LangType === "fr" ? item.frenchName:item.name}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      )}
      {errorMessage?.length > 0 &&
        errorMessage?.map((message) => (
          <Text key={message} style={[styles.errorText, ValidationErrorStyle]}>
            {message}
          </Text>
        ))}
    </>
  );
}

Dropdown.propTypes = {
  opened: PropTypes.bool,
  onDropdownClick: PropTypes.func,
  selectedItem: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  onSelect: PropTypes.func,
  leftIcon: PropTypes.any,
  borderColor: PropTypes.string,
  errorMessage: PropTypes.arrayOf(PropTypes.string),
  ValidationErrorStyle: PropTypes.object,
  selectedTextStyle: PropTypes.object,
};
Dropdown.defaultProps = {
  selectedItem: "",
  placeholder: "",
  opened: false,
  data: [],
  leftIcon: leftIcon,
  borderColor: DayTheme.colors.border,
  errorMessage: [],
  ValidationErrorStyle: {},
  selectedTextStyle: {},
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: Scaler(14),
    textAlign: "justify",
  },
});

export default Dropdown;
