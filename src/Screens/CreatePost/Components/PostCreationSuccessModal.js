import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, Image, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import Modal from "react-native-modal";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { congratutionsIcon } from "../../../Assets/icon";
import Scaler from "../../../Utils/Scaler";
import Lang from "../../../Language";

function PostCreationSuccessModal(props) {
  const { visible, hideModal } = props;
  const theme = useTheme();
  return (
    <Modal
      animationType="slide"
      hasBackdrop
      isVisible={visible}
      backdropOpacity={0.5}
      backdropColor="#000"
      onBackdropPress={() => hideModal()}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            top: hp(5),
            alignItems: "center",
            height: hp(50),
            width: wp(100),
            borderTopRightRadius: Scaler(30),
            borderTopLeftRadius: Scaler(20),
          }}
        >
          <Image
            style={{
              width: wp(60),
              height: hp(18),
              alignSelf: "center",
            }}
            source={congratutionsIcon}
            resizeMode={"contain"}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: Scaler(22),
                width: wp(90),
                paddingTop: 20,
                color: "#110D26",
                lineHeight: 10,
                textAlign: "center",
                ...theme.fonts.medium,
              }}
            >
              {Lang.CONGRATS}
            </Text>
            <Text
              style={{
                fontSize: Scaler(16),
                width: wp(90),
                paddingTop: 20,
                color: "#7F8190",
                lineHeight: 30,
                textAlign: "center",
                ...theme.fonts.medium,
              }}
            >
              {Lang.POST_CREATED}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => hideModal()}
            style={{
              width: wp(80),
              height: hp(7),
              backgroundColor: theme.colors.primary,
              borderRadius: 10,
              alignSelf: "center",
              top: hp(-10),
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: Scaler(20),
                ...theme.fonts.medium,
                top: Platform.OS === "ios" ? hp(2) : 15,
              }}
            >
              {Lang.OK}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

PostCreationSuccessModal.propTypes = {
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
};
PostCreationSuccessModal.defaultProps = {
  visible: false,
  hideModal: () => console.log("modal hided"),
};

export default PostCreationSuccessModal;
