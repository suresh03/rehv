import React, { Children, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Divider, useTheme } from "react-native-paper";
import moment from "moment";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import {
  likeIcon,
  likeBlackIcon,
  commentIcon,
  commentBlue,
  postShareIcon,
  profilePic,
} from "../../../Assets/icon";
import Share from "react-native-share";
import Scaler from "../../../Utils/Scaler";
import Spacer from "../../../Components/SharedComponents/Space";
import { DayTheme } from "../../../Constants/theme";
import { isImage } from "../../../Utils/Helpers";
import VideoContent from "../../Community/Components/VideoContent";
import Lang from "../../../Language";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const FULL_WIDTH = Dimensions.get("window").width;

function HomePostcard(props) {
  const { data, profileClick, onLike, onComment, selectedCommunityId } = props;
  const theme = useTheme();
  const navigation = useNavigation();
  const playerRef = useRef();
  const onBuffer = () => {};
  const videoError = () => {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();
  const [isPaused, setIsPaused] = useState(true);
  const onShare = async () => {
    await Share.open({
      message: "RehvUp Application",
    })
      .then((result) => console.log("share result => ", result))
      .catch((errorMsg) => console.log(errorMsg));
  };

  const renderIndicators = (contents) => {
    return contents.map((content, index) => {
      return (
        <View
          key={index}
          style={[
            styles.indicator,
            {
              backgroundColor: index === currentIndex ? "#fff" : "gray",
            },
          ]}
        />
      );
    });
  };

  const onScroll = (event) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPos = event.nativeEvent.contentOffset.x;
    const current = Math.floor(xPos / totalWidth);
    setCurrentIndex(current);
  };

  const renderImageContent = (imageSource, optionData) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PostDetailScreen", {
            postId: optionData?._id,
            eventType: optionData?.eventType,
            creator: optionData?.userName + " " + optionData?.userLast,
            creatorRole: optionData?.role,
            pictureUrl: optionData?.pictureUrl,
            isLikes: optionData?.isLikes,
            totalLikes: optionData.totalLikes,
            totalComments: optionData.totalComments,
            selectedCommunityId: selectedCommunityId,
          })
        }
      >
        <Image
          style={{
            height: Scaler(245),
            width: FULL_WIDTH,
            alignSelf: "center",
          }}
          resizeMode="cover"
          source={imageSource}
        />
        {optionData?.eventType.toLowerCase() == "post" ||
        optionData?.eventType.toLowerCase() == "" ? null : (
          <View style={styles.rollViewStyle}>
            <Text
              style={{
                color: "#fff",
                fontSize: Scaler(12),
                textAlign: "center",
                ...theme.fonts.regular,
              }}
            >
              {optionData.eventType}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const ItemView = (item) => {
    console.log("items,", item);
    return (
      <View></View>
      // <Pressable
      //               onPress={() =>
      //                 isImage(pic)
      //                   ? navigation.navigate("PostDetailScreen", {
      //                       postId: item._id,
      //                       eventType: item.eventType,
      //                       creator:
      //                         item.userData[0].name +
      //                         " " +
      //                         item.userData[0].lastName,
      //                       creatorRole: item?.role,
      //                       pictureUrl: item?.pictureUrl,
      //                       isLikes: item?.isLikes,
      //                       totalLikes: item.totalLikes,
      //                       totalComments: item.totalComments,
      //                       questions: item.questions,
      //                     })
      //                   : null
      //               }
      //               style={styles.mediaContainer}
      //             >
      //               {isImage(pic) ? (
      //                 <Image
      //                   source={{ uri: pic?.trim() }}
      //                   style={styles.media}
      //                 />
      //               ) : (
      //                 <VideoContent videoSource={{ uri: pic?.trim() }} />
      //               )}
      //               </Pressable>
    );
  };

  const renderContent = (item) => {
    console.log("renderContent", item)
    const singleContent = Children.toArray(
      item?.pictureUrl?.join(",").split(",")
    );
    var optionButton = item;
    <View>
      <FlatList
        data={singleContent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        horizontal={true}
        pagingEnabled={true}
        bounces={false}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.indicatorContainer}>
        {renderIndicators(singleContent)}
      </View>
    </View>;
    // if (singleContent.length > 1 === false) {
    //   // const singleContents = singleContent[0];
    //   console.log("singleContents", singleContent);
    //   // return renderImageContent(singleContent, optionButton);
    //   return null
    // } else {
    //   return (
    //     <View>
    //       <FlatList
    //         horizontal={true}
    //         pagingEnabled={true}
    //         bounces={false}
    //         onScroll={onScroll}
    //         keyExtractor={(item, index) => index}
    //         showsHorizontalScrollIndicator={false}
    //         data={singleContent}
    //         // renderItem={({ item }) =>
    //         //   isImage(item)
    //         //     ? renderImageContent(singleContent, optionButton)
    //         //     : renderImageContent(singleContent, optionButton)
    //         // }
    //         renderItem={ItemView}
    //       />
    //       <View style={styles.indicatorContainer}>
    //         {renderIndicators(singleContent)}
    //       </View>
    //     </View>
    //   );
    // }
  };

  const renderCard = (item) => {
    console.log("itemsdcsd", item);
    return (
      <View style={styles.outerBoundary}>
        <View
          style={{
            height: Scaler(40),
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "center",
            //paddingHorizontal: Scaler(18),
          }}
        >
          <TouchableOpacity
            onPress={() =>
              profileClick(item?.postCreatedUserType, item?.createdBy)
            }
            style={[
              {
                width: "50%",
                alignItems: "center",
                height: "100%",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
              },
            ]}
          >
            {item?.profilePic == undefined ||
            item?.profilePic == null ||
            item?.profilePic?.trim() == "" ? (
              <Image
                style={{
                  height: Scaler(40),
                  width: Scaler(40),
                  borderRadius: Scaler(20),
                }}
                source={profilePic}
                resizeMode={"contain"}
              />
            ) : (
              <Image
                source={{
                  uri: item.profilePic.trim(),
                }}
                style={{
                  height: Scaler(40),
                  width: Scaler(40),
                  borderRadius: Scaler(20),
                  resizeMode: "cover",
                }}
              />
            )}
            <View
              style={{
                marginLeft: Scaler(10),
                height: "100%",
                width: "80%",
                alignSelf: "center",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#000" }}>
                {item.userData[0].name + " " + item.userData[0].lastName}
              </Text>
              <Text>{item?.postCreatedUserType}</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: "82%",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  ...theme.fonts.regular,
                  color: theme.colors.disabledText,
                }}
              >
                {moment(item?.createdAt).format("ll")}
              </Text>
              <View
                style={{
                  backgroundColor: "#EEEBFF",
                  padding: Scaler(4),
                  borderRadius: Scaler(5),
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: theme.colors.primary,
                    ...theme.fonts.regular,
                  }}
                >
                  {item?.communitiesData?.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Spacer size={Scaler(10)} />
        {renderContent(item)}
        {/* <ScrollView
          contentContainerStyle={styles.mediaContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={item?.pictureUrl?.join(",").split(",").length > 1}
          style={{ flexGrow: 1 }}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {Children.toArray(
            item?.pictureUrl
              ?.join(",")
              .split(",")
              ?.map((pic) => {
                return (
                  <Pressable
                    onPress={() =>
                      isImage(pic)
                        ? navigation.navigate("PostDetailScreen", {
                            postId: item._id,
                            eventType: item.eventType,
                            creator:
                              item.userData[0].name +
                              " " +
                              item.userData[0].lastName,
                            creatorRole: item?.role,
                            pictureUrl: item?.pictureUrl,
                            isLikes: item?.isLikes,
                            totalLikes: item.totalLikes,
                            totalComments: item.totalComments,
                            questions: item.questions,
                          })
                        : null
                    }
                    style={styles.mediaContainer}
                  >
                    {isImage(pic) ? (
                      <Image
                        source={{ uri: pic?.trim() }}
                        style={styles.media}
                      />
                    ) : (
                      <VideoContent videoSource={{ uri: pic?.trim() }} />
                    )}
                    {item?.eventType.toLowerCase() == "post" ||
                    item?.eventType.toLowerCase() == "" ? null : (
                      <View style={styles.rollViewStyle}>
                        <Text style={[CommonStyle.rollTextStyle]}>
                          {item?.eventType}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                );
              })
          )}
        </ScrollView> */}
        {/* <View style={styles.indicatorContainer}>
          {item?.pictureUrl.length > 1
            ? renderIndicators(item?.pictureUrl?.join(",").split(","))
            : null}
        </View> */}
        {/* {renderContent(item)} */}
        <Spacer size={Scaler(10)} />
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: Scaler(140),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => onLike("like", item?.isLikes, item._id)}
              >
                <Image
                  style={{
                    width: Scaler(40),
                    height: Scaler(40),
                    borderRadius: Scaler(20),
                  }}
                  source={item?.isLikes ? likeIcon : likeBlackIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <Spacer horizontal size={Scaler(5)} />
              <TouchableOpacity
                style={{
                  width: Scaler(25),
                  height: Scaler(30),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("MemberScreen", {
                    data: {
                      postId: item?._id,
                      isLikes: true,
                    },
                  })
                }
              >
                <Text
                  style={[
                    CommonStyle.likeTextStyle,
                    {
                      color: item?.isLikes
                        ? theme.colors.primary
                        : theme.colors.disabledText,
                    },
                  ]}
                >
                  {item.totalLikes}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: Scaler(15),
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CommentScreen", {
                    data: {
                      isLikes: item?.isLikes,
                      isCommented: item?.isCommented,
                      postId: item._id,
                      totalLikes: item.totalLikes,
                      totalComments: item.totalComments,
                      description: item?.description,
                      pictureUrl: item?.pictureUrl,
                      name:
                        item.userData[0].name + " " + item.userData[0].lastName,
                      postCreatedUserType: item.postCreatedUserType,
                      selectedCommunityId: item.communityId,
                    },
                  })
                }
              >
                <Image
                  style={{
                    width: Scaler(40),
                    height: Scaler(40),
                    borderRadius: Scaler(20),
                  }}
                  source={item?.isCommented ? commentBlue : commentIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <Spacer horizontal size={Scaler(5)} />
              <TouchableOpacity
                style={{
                  width: Scaler(25),
                  height: Scaler(30),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() =>
                  navigation.navigate("MemberScreen", {
                    data: {
                      postId: item?._id,
                      isLikes: false,
                    },
                  })
                }
              >
                <Text
                  style={[
                    CommonStyle.commentTextStyle,
                    {
                      color: item?.isCommented
                        ? theme.colors.primary
                        : theme.colors.disabledText,
                    },
                  ]}
                >
                  {item.totalComments}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => onShare()}>
            <Image
              style={{ width: wp(13), height: hp(5.2) }}
              source={postShareIcon}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
        <Spacer />
        <View style={{ paddingHorizontal: Scaler(15) }}>
          <Text style={{ ...theme.fonts.regular, fontSize: Scaler(13) }}>
            {item.description}
          </Text>
          <Spacer size={Scaler(15)} />
        </View>
        <Divider
          style={{
            width: wp(100) - Scaler(30),
            height: Scaler(1),
            alignSelf: "center",
          }}
        />
      </View>
    );
  };
  return <View>{Children.toArray(data.map((item) => renderCard(item)))}</View>;
}

HomePostcard.propTypes = {
  data: PropTypes.array,
  profileClick: PropTypes.func,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
};

HomePostcard.defaultProps = {
  data: [],
  profileClick: () => {},
  onLike: () => {},
  onComment: () => {},
};

const styles = StyleSheet.create({
  outerBoundary: {
    minHeight: Scaler(400),
    width: wp(100),
    marginTop: Scaler(10),
  },
  header: {
    height: Scaler(50),
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Scaler(15),
  },
  headerLeft: {
    height: "100%",
    minWidth: Scaler(115),
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  mediaContainer: {
    flexGrow: 1,
    height: Scaler(240),
    alignItems: "center",
    justifyContent: "center",
  },
  media: {
    height: Scaler(245),
    width: windowWidth,
    // resizeMode: "contain",
    alignSelf: "center",
  },
  backgroundVideo: {
    height: Scaler(240),
    width: wp(100),
    alignSelf: "center",
  },
  footer: {
    width: "100%",
    paddingHorizontal: Scaler(15),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  rollViewStyle: {
    backgroundColor: DayTheme.colors.primary,
    width: Scaler(110),
    height: Scaler(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Scaler(10),
    zIndex: 2,
    bottom: Scaler(10),
    right: Scaler(10),
    position: "absolute",
  },
  indicatorContainer: {
    top: -Scaler(15),
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  content: {
    width: windowWidth,
    height: 450,
    marginVertical: 8,
  },
});

export default HomePostcard;
