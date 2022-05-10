import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

function Padding(props) {
  const {
    children,
    left,
    right,
    top,
    bottom,
    horizontal,
    vertical,
    size = 10,
    style,
    flex,
  } = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        paddingHorizontalStyle: horizontal
          ? {
              paddingLeft: size,
              paddingRight: size,
            }
          : {},
        paddingVerticalStyle: vertical
          ? {
              paddingTop: size,
              paddingBottom: size,
            }
          : {},
        paddingRightStyle: right
          ? {
              paddingRight: size,
            }
          : {},
        paddingLeftStyle: left
          ? {
              paddingLeft: size,
            }
          : {},
        paddingTopStyle: top
          ? {
              paddingTop: size,
            }
          : {},
        paddingBottomStyle: bottom
          ? {
              paddingBottom: size,
            }
          : {},
        paddingContainerStyle: {
          flex: flex ?? 0,
          ...style,
        },
      }),
    [vertical, horizontal, size, right, left, top, bottom, flex, style],
  );

  return (
    <View
      style={[
        styles.paddingHorizontalStyle,
        styles.paddingVerticalStyle,
        styles.paddingLeftStyle,
        styles.paddingRightStyle,
        styles.paddingTopStyle,
        styles.paddingBottomStyle,
        styles.paddingContainerStyle,
      ]}>
      {children}
    </View>
  );
}

export default Padding;
