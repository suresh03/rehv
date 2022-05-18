import React, { PureComponent } from "react";
import { ActivityIndicator } from "react-native-paper";
import Scaler from "./Scaler";
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
          bottom: Scaler(120),
          left: 0,
          right: 0,
          height: 0,
          justifyContent: 'center', alignItems: 'center'
        }}
      />
    );
  }
}
