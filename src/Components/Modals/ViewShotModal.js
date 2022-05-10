import React, { forwardRef } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from "react-native-paper";
import Scaler from "../../Utils/Scaler";
import Menu, { MenuItem } from "react-native-material-menu";
import { deleteIcon, blockIcon, freezeAccIcon } from "../../Assets/icon";
import Lang from "../../Language";

const ViewShotModal = forwardRef((props, ref) => {
  const { onDelete, onFreeze, onBlock, id, options, onHide, top, right } =
    props;
  const theme = useTheme();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: right,
        bottom: 0,
        top: top,
        borderRadius: 10
      }}
    >
      <Menu ref={ref} style={{ borderRadius: 10 }}>
        {options.includes("delete") ? (
          <MenuItem
            style={{ borderRadius: 10, alignItems: "center", justifyContent: "center", paddingLeft: Scaler(10), paddingTop: Scaler(5) }}
            onPress={() => {
              onHide();
              onDelete(id);
            }}
            textStyle={{
              ...theme.fonts.regular,
              fontSize: Scaler(14),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image source={deleteIcon} />
              <Text
                style={{
                  marginLeft: Scaler(5),
                  color: theme.colors.disabledText,
                }}
              >
                {Lang.DELETE}
              </Text>
            </View>
          </MenuItem>
        ) : null}

        {options.includes("block") ? (
          <MenuItem
            onPress={() => {
              onBlock(id);
              onHide();
            }}
            textStyle={{
              ...theme.fonts.regular,
              fontSize: Scaler(14),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: Scaler(100),
                height: Scaler(20),
                borderRadius: 10,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingHorizontal: Scaler(15),
              }}
            >
              <Image
                source={blockIcon}
                resizeMode={"contain"}
                style={{ height: Scaler(20), width: Scaler(20) }}
              />
              <Text
                style={{
                  marginLeft: Scaler(15),
                  color: theme.colors.disabledText,
                }}
              >
                {Lang.BLOCK}
              </Text>
            </View>
          </MenuItem>
        ) : null}
        {options.includes("freeze") ? (
          <MenuItem
            onPress={() => {
              onFreeze(id);
              onHide();
            }}
            textStyle={{
              ...theme.fonts.regular,
              fontSize: Scaler(14),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: Scaler(100),
                height: Scaler(20),
                borderRadius: 10,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingHorizontal: Scaler(15),
              }}
            >
              <Image
                source={freezeAccIcon}
                resizeMode={"contain"}
                style={{ height: Scaler(20), width: Scaler(20) }}
              />
              <Text
                style={{
                  marginLeft: Scaler(15),
                  color: theme.colors.disabledText,
                }}
              >
                {Lang.FREEZE}
              </Text>
            </View>
          </MenuItem>
        ) : null}
      </Menu>
    </View>
  );
});

export default ViewShotModal;

ViewShotModal.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func,
  onFreeze: PropTypes.func,
  onBlock: PropTypes.func,
  onHide: PropTypes.func,
  top: PropTypes.number,
  right: PropTypes.number,
};

ViewShotModal.defaultProps = {
  options: [],
  top: 0,
  right: Scaler(1),
  onDelete: () => {},
  onFreeze: () => {},
  onBlock: () => {},
  onHide: () => {},
};
