import React, { useState, useRef, useEffect } from "react";
import Video from "react-native-video";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import VideoPausedIcon from "./VideoPausedIcon";
const FULL_WIDTH = Dimensions.get("window").width;

// If the content is video, render this component
const VideoContent = (props) => {
  const [isPaused, setIsPaused] = useState(true);
  //const [IndexCheck, setIndexCheck] = useState(props.currentIndex);
  let videoComponent = useRef();
  console.log("currentIndex", props.currentIndex);
  // Workaround to display thumbnail in android.
  const load = ({ duration }) => {
    videoComponent.seek(0);
  };

  return (
    <View style={styles.content}>
      {isPaused && <VideoPausedIcon playVideo={() => setIsPaused(false)} />}
      <TouchableWithoutFeedback onPress={() => setIsPaused(!isPaused)}>
        <Video
          ref={(ref) => (videoComponent = ref)}
          source={props.videoSource}
          paused={isPaused}
          style={styles.video}
          repeat={true}
          onLoad={load}
          resizeMode={"cover"}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: FULL_WIDTH,
    height: 340,
    marginVertical: 8,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoContent;
