import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// When the video is paused, an icon will be displayed on top of the video
const VideoPausedIcon = ({ playVideo }) => {
  return (
    <View style={styles.pausedIconContainer}>
      <TouchableWithoutFeedback onPress={() => playVideo()}>
        <MaterialCommunityIcons
          name={'play'}
          size={80}
          style={{ opacity: 0.5 }}
          color={'#000'}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  pausedIconContainer: {
    zIndex: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default VideoPausedIcon;