import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import InViewport from './InViewPort';
// importing the dependency didn't work in the snack so I just copied the file and accessed it manually

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export default class VideoPlayer extends React.Component {

    pauseVideo = () => {
        if (this.video) {
            this.video.pause();
        }
    }

    playVideo = () => {
        if (this.video) {
            this.video.play();
        }
    }

    handlePlaying = (isVisible) => {
        this.props.index === this.props.currentIndex ? this.playVideo() : this.pauseVideo();
    }

    render() {
        return (
            <View style={styles.container}>
                <InViewport onChange={this.handlePlaying}>
                    <Video
                        ref={ref => { this.video = ref }}
                        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        style={{ width: WIDTH, height: 300 }}
                    />
                </InViewport>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT,
        width: WIDTH
    }
});
