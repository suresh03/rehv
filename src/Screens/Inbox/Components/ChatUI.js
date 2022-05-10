import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Scaler from "../../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import { profilePic } from "../../../Assets/icon";
import FastImage from "react-native-fast-image";
//import { LinkPreview } from "@flyerhq/react-native-link-preview";

function ChatUI(props) {
  const { item, index, secondPerson } = props;
  // console.warn(secondPerson)
  const theme = useTheme();
  return (
    <View style={{ flex: 1, marginVertical: Scaler(7) }}>
      {item.status == false ? (
        <View
          style={{
            alignSelf: "flex-start",
            width: wp(80),
            flexDirection: "row",
            justifyContent: "space-between",
            // right: Scaler(50),
          }}
        >
          <View
            style={{
              height: Scaler(50),
              width: Scaler(50),
              borderRadius: Scaler(25),
            }}
          >
            {secondPerson?.profilePic?.trim() === "" ||
            secondPerson?.profilePic === undefined ||
            secondPerson?.profilePic === null ? (
              <FastImage
                style={{
                  height: Scaler(40),
                  width: Scaler(40),
                  resizeMode: "cover",
                  borderRadius: Scaler(20),
                }}
                source={profilePic}
              />
            ) : (
              <FastImage
                source={{ uri: secondPerson?.profilePic }}
                resizeMode={"cover"}
                style={{
                  height: Scaler(40),
                  width: Scaler(40),
                  resizeMode: "cover",
                  borderRadius: Scaler(20),
                }}
              />
            )}
          </View>

          <View
            style={{
              backgroundColor: "#0000000D",
              borderRadius: 10,
              width: wp(65),
              justifyContent: "center",
              padding: Scaler(10),
            }}
          >
            <Text
              style={{
                color: "#fff",
                width: wp(60),
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
            {/* <LinkPreview
              text={item.message}
              style={{
                color: "#fff",
                width: wp(60),
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            /> */}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            alignSelf: "flex-end",
            width: wp(80),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              width: wp(65),
              justifyContent: "center",
              padding: Scaler(10),
            }}
          >
            {/* <Text
              style={{
                color: "#fff",
                width: wp(60),
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            > */}
            {/* <LinkPreview
              text={item.message}
              style={{
                color: "#fff",
                width: wp(60),
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            /> */}
            {/* </Text> */}
          </View>

          <View
            style={{
              height: Scaler(50),
              width: Scaler(50),
              borderRadius: Scaler(25),
            }}
          >
            {item?.user?.profilePic.trim() === "" ||
            item?.user?.profilePic === undefined ||
            item?.user?.profilePic === null ? (
              <FastImage
                style={{
                  height: Scaler(40),
                  width: Scaler(40),
                  resizeMode: "cover",
                  borderRadius: Scaler(20),
                }}
                source={profilePic}
              />
            ) : (
              <FastImage
                source={{ uri: item?.user?.profilePic }}
                resizeMode={"cover"}
                style={{
                  height: Scaler(40),
                  width: Scaler(40),
                  resizeMode: "cover",
                  borderRadius: Scaler(20),
                }}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

ChatUI.propTypes = {};

export default ChatUI;
