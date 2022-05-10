import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
} from "react-native";

// When the video is paused, an icon will be displayed on top of the video
const VideoPausedIcon = ({ playVideo }) => {
  return (
    <View style={[styles.pausedIconContainer]}>
      <TouchableWithoutFeedback onPress={() => playVideo()}>
        <Image
          source={require("../../../Assets/Images/PlayPause.png")}
          style={{ width: 60, height: 60 }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  pausedIconContainer: {
    zIndex: 10,
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default VideoPausedIcon;
