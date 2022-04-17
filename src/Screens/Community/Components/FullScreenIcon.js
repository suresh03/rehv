import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
} from "react-native";

// When the video is paused, an icon will be displayed on top of the video
const FullScreenIcon = ({ playVideo }) => {
  return (
        <Image
          source={require("../../../Assets/Images/fullscreen.jpg")}
          style={{ width: 28, height: 26 }}
        />
  );
};

const styles = StyleSheet.create({
  pausedIconContainer: {
    zIndex: 10,
    // alignSelf: "flex-end",
    justifyContent: "center",
    flex: 1,
    // top:80, 
    // right:10
  },
});

export default FullScreenIcon;
