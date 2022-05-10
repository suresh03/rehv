import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Scaler from "../../../Utils/Scaler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { profilePic } from "../../../Assets/icon";
import Lang from "../../../Language";
import { useTheme } from "react-native-paper";

export default function UserRowView(props) {
  const theme = useTheme();
  const [item] = useState(props.data);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        width: wp(94),
        height: Scaler(100),
        justifyContent: "space-between",
        borderBottomColor: "grey",
        borderBottomWidth: Scaler(0.5),
        alignSelf: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: wp(58),
        }}
      >
        {item?.profilePic?.trim() == "" ||
        item?.profilePic === null ||
        item?.profilePic === undefined ? (
          <Image
            style={{
              height: Scaler(50),
              width: Scaler(50),
              resizeMode: "cover",
              borderRadius: Scaler(25),
            }}
            source={profilePic}
          />
        ) : (
          <View
            style={{
              height: Scaler(60),
              width: Scaler(60),
              borderRadius: Scaler(30),
            }}
          >
            <Image
              style={{
                height: Scaler(50),
                width: Scaler(50),
                resizeMode: "cover",
                borderRadius: Scaler(25),
              }}
              source={{ uri: item.profilePic }}
            />
          </View>
        )}
        <View
          style={{
            width: wp(36),
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: Scaler(16),
              fontFamily: "Poppins-SemiBold",
              color: "#110D26",
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              color: "#7F8190",
              fontSize: Scaler(12),
              ...theme.fonts.medium,
            }}
          >
            {item?.department}
          </Text>
        </View>
      </View>

      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => props.onItemPress()}
          style={{
            backgroundColor: theme.colors.primary,
            width: Scaler(130),
            height: Scaler(50),
            borderRadius: Scaler(10),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: Scaler(14),
              paddingHorizontal: Scaler(10),
              textAlign: "center",
              ...theme.fonts.medium,
            }}
          >
            {Lang.SEND_MESSAGE}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
