import React, { PureComponent } from "react";
import { ActivityIndicator } from "react-native-paper";

export default class VideoBufferIndicator extends PureComponent {
  render() {
    return (
      <ActivityIndicator
        animating
        size="large"
        color={this.props.color}
        style={{
          opacity: this.props.opacity,
          position: "absolute",
          bottom: 208,
          left: 70,
          right: 70,
          height: 50,
        }}
      />
    );
  }
}
