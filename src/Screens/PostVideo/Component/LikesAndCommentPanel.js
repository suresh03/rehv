import React, { useMemo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  greyshareIcon,
  commentBlue,
  commentwhite,
  likeWhite,
  postlike,
  postShare,
} from "../../../Assets/icon";
import Scaler from "../../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";

function LikesAndCommentPanel(props) {
  const theme = useTheme();
  const {
    totalLikes,
    isLikes,
    isCommented,
    totalComments,
    eventType,
    onLike,
    onComment,
    onShare,
  } = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        icons: { width: Scaler(40), height: Scaler(40), resizeMode: "contain" },
      }),
    []
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: Scaler(15),
        marginTop: Scaler(5),
      }}
    >
      <View
        style={{
          width: Scaler(150),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: Scaler(60),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => onLike()}>
            <Image
              style={styles.icons}
              source={isLikes ? postlike : likeWhite}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                commonStyle.likeTextStyle,
                {
                  color: isLikes
                    ? theme.colors.primary
                    : theme.colors.disabledText,
                },
              ]}
            >
              {totalLikes}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: Scaler(60),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => onComment()}>
            <Image
              style={styles.icons}
              source={isCommented ? commentBlue : commentwhite}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                commonStyle.commentTextStyle,
                {
                  color: isCommented
                    ? theme.colors.primary
                    : theme.colors.disabledText,
                },
              ]}
            >
              {totalComments}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onShare()}
        style={{ alignSelf: "flex-end" }}
      >
        <Image
          style={styles.icons}
          source={
            eventType === "survey" || eventType === "poll"
              ? postShare
              : greyshareIcon
          }
        />
      </TouchableOpacity>
    </View>
  );
}

LikesAndCommentPanel.propTypes = {};

export default LikesAndCommentPanel;
