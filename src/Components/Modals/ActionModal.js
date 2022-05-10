/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef } from "react";
import { Text, Image, Platform, TouchableOpacity } from "react-native";
import { blockIcon } from "../../Assets/icon";
import { Portal, useTheme, Modal, Provider } from "react-native-paper";
import Scaler from "../../Utils/Scaler";
import PropTypes from "prop-types";
//import Modal from "react-native-modal";
import { View } from "react-native-animatable";

const ActionModal = forwardRef((props, ref) => {
  const { visible, hideDialog, modalStyle, deletePost } = props;
  const theme = useTheme();
  return (
    <Modal
      visible={visible}
      onBackdropPress={hideDialog}
      // hasBackdrop={true}
      // // coverScreen={false}
      // backdropColor="transparent"
      // style={{
      //   backgroundColor: "transparent",
      //   height: 50,
      //   backgroundColor: "red",
      //   width: 120,
      //   position: "absolute",

      // }}
      contentContainerStyle={{
        backgroundColor: "white",
        minHeight: Scaler(40),
        width: Scaler(110),
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 5,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          width: 120,
          height: 50,
          width: "80%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        onPress={() => {
          deletePost();
          hideDialog();
        }}
      >
        <Image
          source={blockIcon}
          resizeMode={"contain"}
          style={{ height: Scaler(20) }}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins-Medium",
            fontSize: Scaler(15),

            color: "#000",
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </Modal>
  );
});

ActionModal.propTypes = {
  visible: PropTypes.bool,
  hideDialog: PropTypes.func,
  modalStyle: PropTypes.object,
  deletePost: PropTypes.func,
};
ActionModal.propTypes = {
  visible: false,
  modalStyle: {},
  hideDialog: () => {},
  deletePost: () => {},
};

export default ActionModal;
