/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
const { width } = Dimensions.get("window");
import { backblack, whiteback } from "../../../src/Assets/icon";
import { DayTheme } from "../../Constants/theme";
import Scaler from "../../Utils/Scaler";

export const HeaderWithBackAction = (props) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, props.headerViewStyle]}>
      {props.back_nav ? (
        <TouchableOpacity onPress={props.back_nav}>
          <Image
            style={styles.all_image}
            source={whiteback}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.all_image}></View>
      )}

      {props.tittle_nav ? (
        <View>
          <Text
            style={[
              {
                color: "#fff",
                fontSize: Scaler(18),
                ...theme.fonts.medium,
              },
              props.textStyle,
            ]}
          >
            {props.tittle}
          </Text>
        </View>
      ) : (
        <View></View>
      )}

      {props.leftNav ? (
        <TouchableOpacity onPress={props.onPress}>
          <Image
            style={[styles.left_image, props.backstyle]}
            source={props.leftImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <View styles={styles.left_image}></View>
      )}
    </View>
  );
};

export const HeaderBackAction = (props) => {
  return (
    <View style={[styles.backContainer, props.headerViewStyle]}>
      <View>
        {props.back_nav ? (
          <TouchableOpacity onPress={props.back_nav}>
            <Image
              style={[styles.all_image, props.back_navstyle]}
              source={backblack}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          marginLeft: props.alignTitle ? 0 : Scaler(20),
          alignItems: props.alignTitle ? "center" : "flex-start",
          flex: 1,
        }}
      >
        {props.headerText ? (
          <View>
            <Text
              style={[
                {
                  fontSize: props.titleSize ? props.titleSize : Scaler(22.5),
                  fontFamily: "Poppins-SemiBold",
                  color: "#000",
                },
                props.headerTextStyle,
              ]}
            >
              {props.headerContain}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={{}}>
        {props.iconView ? (
          <TouchableOpacity onPress={props.iconClick}>
            <Image
              style={[styles.all_image, props.iconStyle]}
              source={props.iconVisible}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export const CustomHeader = (props) => {
  return (
    <View style={[styles.container, props.headerViewStyle]}>
      {props.Right_nav ? (
        <TouchableOpacity onPress={props.rightImg}>
          <Image
            style={[styles.right_image, props.back_navstyle]}
            source={props.RightImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}

      {props.Center_nav ? (
        <View onPress={props.centerImg}>
          <Image
            style={[styles.center_image, props.backstyle]}
            source={props.CenterImage}
          />
        </View>
      ) : null}

      {props.Left_nav ? (
        <TouchableOpacity onPress={props.leftImg} style={props.leftStyle}>
          <Image
            style={[styles.left_image, props.backstyle]}
            source={props.LeftImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const HeaderCustom = (props) => {
  return (
    <View style={[styles.backContainer, props.headerViewStyle]}>
      <View style={styles.back_icon_view}>
        {props.back_whiteColor ? (
          <TouchableOpacity onPress={props.back_whiteColor}>
            <Image
              style={[styles.all_image, props.back_navstyle]}
              source={backblack}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export const HeaderCustomLearn = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onBackPress()}
      style={[{ padding: 15 }, props.headerViewStyle]}
    >
      <View>
        <Image
          style={[props.backButtonStyle]}
          source={backblack}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: Scaler(60),
    borderBottomRightRadius: Scaler(22),
    borderBottomLeftRadius: Scaler(22),
    paddingHorizontal: Scaler(15),
    backgroundColor: DayTheme.colors.primary,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backContainer: {
    width: width,
    height: Scaler(60),
    paddingHorizontal: Scaler(15),
    backgroundColor: DayTheme.colors.primary,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomRightRadius: Scaler(22),
    borderBottomLeftRadius: Scaler(22),
  },

  back_icon_view: {
    position: "absolute",
    zIndex: 1,
    left: Scaler(20),
    alignSelf: "center",
  },
  all_image: {
    height: Scaler(25),
    width: Scaler(25),
  },
  right_icon_view: {
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  left_icon_view: {
    alignSelf: "flex-end",
  },
  right_image: {
    width: Scaler(37),
    alignSelf: "center",
    height: Scaler(37),
  },
  left_image: {
    width: Scaler(40),
    height: Scaler(40),
    alignSelf: "center",
  },
  center_image: {
    width: Scaler(40),
    height: Scaler(67),
    resizeMode: "contain",
    alignSelf: "center",
  },
});
