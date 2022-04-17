import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "react-native-paper";
import { View, TextInput, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Scaler from "../../../Utils/Scaler";
import { useAppValue } from "../../../Recoil/appAtom";
import { messageSendIcon, profilePic } from "../../../Assets/icon";
import FastImage from "react-native-fast-image";

function ChatToolBar(props) {
  const theme = useTheme();
  const { user } = useAppValue();
  const { loading, sendChat, draftMessage, setDraftMessage } = props;
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: wp(100),
        height: hp(10),
        elevation: 5,
        borderTopWidth: 0.5,
        borderTopColor: "#ffff",
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1,
        },
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: Scaler(5),
        }}
      >
        {user.profilePic.trim() === "" ||
        user.profilePic === undefined ||
        user.profilePic === null ? (
          <FastImage
            style={{
              height: Scaler(50),
              width: Scaler(50),
              resizeMode: "cover",
              borderRadius: Scaler(25),
            }}
            source={profilePic}
          />
        ) : (
          <FastImage
            source={{ uri: user.profilePic }}
            resizeMode={"contain"}
            style={{
              height: Scaler(50),
              width: Scaler(50),
              borderRadius: Scaler(25),
              resizeMode: "contain",
              alignItems: "center",
            }}
          />
        )}
        <TextInput
          style={{
            backgroundColor: theme.colors.disabled,
            width: wp(65),
            borderRadius: 10,
            left: wp(2),
            padding: 10,
          }}
          editable={!loading}
          placeholder="Type here"
          placeholderTextColor="#7F8190"
          value={draftMessage}
          onChangeText={(text) => setDraftMessage(text)}
          returnKeyType="done"
        />
        <TouchableOpacity disabled={loading} onPress={() => sendChat()}>
          <FastImage
            source={messageSendIcon}
            resizeMode={"contain"}
            style={{
              height: hp(5.5),
              width: wp(15),
              alignItems: "center",
              left: wp(3),
              top: hp(1),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

ChatToolBar.propTypes = {
  sendChat: PropTypes.func,
  setDraftMessage: PropTypes.func,
  loading: PropTypes.bool,
  draftMessage: PropTypes.string,
};

ChatToolBar.defaultProps = {
  sendChat: () => {},
  setDraftMessage: () => {},
  loading: false,
  draftMessage: "",
};

export default ChatToolBar;
