/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  Modal,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useTheme } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width } = Dimensions.get("window");
import { drop_dwon, phone_icon } from "../../Assets/icon";
import { DayTheme } from "../../Constants/theme";
import Scaler from "../../Utils/Scaler";
import ChangeStyle from "../CustomComponents/ChangeStyle";
import { countryCode } from "../CustomComponents/CountryCode";
import Spacer from "./Space";

export const GlobalInput = (props) => {
  return (
    <>
      <View style={[styles.container, props.inputViewStyle]}>
        <Image
          source={phone_icon}
          style={styles.ImageStyle}
          resizeMode="contain"
        />
        {props.dropDown ? (
          <TouchableOpacity
            onPress={props.onPress}
            style={{height:Scaler(65), alignItems:'center', justifyContent:'center', flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={[
                props.textStyle,
                {
                  fontSize: Scaler(15),
                  textAlign: "center",
                  right: 0,
                  color: "#000",
                },
              ]}
            >
              {props.data}
            </Text>
            <Image
              source={drop_dwon}
              style={{
                width: Scaler(16),
                resizeMode: "contain",
                left: Scaler(5),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}

        <TextInput
          {...props}
          style={[styles.textInputStyle, props.textInputStyle]}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={props.keyboardType ?? "default"}
        />
      </View>
      {props.errorMessage?.length > 0 && <Spacer size={5} />}
      {props.errorMessage?.length > 0 &&
        props.errorMessage.reverse()?.map((message) => (
          <Text
            key={message}
            style={[styles.errorText, props.ValidationErrorStyle]}
          >
            {message}
          </Text>
        ))}

      <Text style={[styles.inputTitleStyle, props.inputTitle]}>
        {props.inputTitle}
      </Text>
    </>
  );
};

export const CountryCode = (props) => {
  const [searchText, setSearchText] = useState();
  const theme = useTheme();
  const [list, setList] = useState(countryCode);
  const [noData, setNoData] = useState(false);

  const searchCountry = (e) => {
    setSearchText(e);
    let text = e.toLowerCase();
    let codeJson = [...countryCode];
    let filteredJson = codeJson.filter((item) => {
      return (
        item?.name?.toLowerCase()?.match(text) ||
        item?.dialCode?.toLowerCase()?.match(text)
      );
    });
    if (!text || text === "") {
      setList(countryCode);
    } else if (!Array.isArray(filteredJson) && !filteredJson.length) {
      // set no data flag to true so as to render flatlist conditionally
      setNoData(true);
    } else if (Array.isArray(filteredJson)) {
      setNoData(false);
      setList(filteredJson);
    }
  };

  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <View style={{ backgroundColor: "#fff", alignSelf: "center" }}>
        <Spacer size={Scaler(50)} />
        <View
          style={{
            borderBottomWidth: Scaler(1),
            width: wp(92),
            borderBottomColor: theme.colors.primary,
            alignSelf: "center",
          }}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Search country"
            value={searchText}
            onChangeText={searchCountry}
            placeholderTextColor={'gray'}
          />
        </View>
        <Spacer />
        <FlatList
          {...props}
          data={list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                props.onCodeSelection(
                  item.dialCode,
                  item.name.replace(/\([^()]*\)/g, "").trim()
                )
              }
              style={ChangeStyle.countryStyle}
            >
              <Text style={ChangeStyle.countryNameStyle}>
                {item.name.replace(/\([^()]*\)/g, "").trim()}
              </Text>
              <Text style={ChangeStyle.countryCodeStyle}>{item.dialCode}</Text>
            </Pressable>
          )}
          style={{
            height: hp(100) - Scaler(100),
            backgroundColor: "#fff",
          }}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />

        <Pressable
          onPress={props.CancelModal}
          style={{
            backgroundColor: theme.colors.primary,
            width: width,
            height: Scaler(60),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: Scaler(18),
              color: "#ffffff",
            }}
          >
            CANCEL
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: width - 44,
    height: Scaler(65),
    borderColor: DayTheme.colors.border,
    borderWidth: Scaler(1),
    borderRadius: Scaler(10),
    paddingHorizontal: Scaler(5),
  },
  searchInput: {
    color: DayTheme.colors.text,
    ...DayTheme.fonts.regular,
    fontSize: Scaler(14),
    alignItems: "center",
    alignSelf: "center",
    width: wp(92),
    height: Scaler(55),
  },
  textInputStyle: {
    flexDirection: "row",
    color: "#000",
    left: Scaler(20),
    alignItems: "center",
    fontSize: Scaler(15),
    fontFamily: "Poppins-Regular",
    width: "70%",
    height: Scaler(65),
  },
  ImageStyle: {
    width: Scaler(40),
    resizeMode: "contain",
    marginHorizontal: Scaler(5),
  },
  errorText: {
    color: "red",
    fontSize: Scaler(14),
    textAlign: "justify",
  },
  modalContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
