import React, { Children, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
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
  threedots,
} from "../../../Assets/icon";
import Share from "react-native-share";
import Scaler from "../../../Utils/Scaler";
import Spacer from "../../../Components/SharedComponents/Space";
import { DayTheme } from "../../../Constants/theme";
import { capitalize, isImage } from "../../../Utils/Helpers";
import VideoPausedIcon from "../../Community/Components/VideoPausedIcon";
import Lang from "../../../Language";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const FULL_WIDTH = Dimensions.get("window").width;
import { useAppValue } from "../../../Recoil/appAtom";
import ViewShotModal from "../../../Components/Modals/ViewShotModal";
import dynamicLinks from "@react-native-firebase/dynamic-links";

import Icon from "react-native-vector-icons/Ionicons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import useApiServices from "../../../Services/useApiServices";
import VideoBufferIndicator from "../../../Utils/VideoBufferIndicator";

function CommunityTrendingPost(props) {
  const { user } = useAppValue();
  const { _id, companyId, department } = user;
  const {
    data,
    profileClick,
    onLike,
    onComment,
    onDeletePost,
    selectedCommunityId,
    listHeader,
    EmptyList,
  } = props;
  const theme = useTheme();
  const navigation = useNavigation();
  const _menu = [];
  const [CompName, setCompName] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const playerRef = useRef();
  const [sound, setSound] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ApiGetMethod, ApiPostMethod } = useApiServices();

  const videoError = () => {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(true);
  const [getDescStatus, setDescStatus] = useState(false);
  const [opacity, setOpacity] = useState(0);

  //const [IndexCheck, setIndexCheck] = useState(props.currentIndex);
  let videoComponent = useRef();
  console.log("currentIndex", props.currentIndex);
  // Workaround to display thumbnail in android.
  const load = ({ duration }) => {
    videoComponent?.seek(0);
  };

  const [LangType, setLangType] = useState("");

  useEffect(() => {
    getUserDetails();
  }, [LangType]);

  const getUserDetails = () => {
    ApiGetMethod(`user/getUserDetails`)
      .then((res) => {
        setLangType(res.data[0].langSymbol);
      })
      .finally(() => console.log("success"));
  };
  // const onShare = async () => {
  //   await Share.open({
  //     message: "RehvUp Application",
  //   })
  //     .then((result) => console.log("share result => ", result))
  //     .catch((errorMsg) => console.log(errorMsg));
  // };
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const [visibleItemIndex, setVisibleItemIndex] = useState();
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 });
  const onViewRef = React.useRef(({ viewableItems, changed }) => {
    console.log("Viewable", viewableItems, "changed", changed[0].index);
    if (changed[0].index !== null) {
      setVisibleItemIndex(changed[0].index);
    }
    console.log("visibleItemIndex", visibleItemIndex);
  }, []);

  const generateLink = async (item) => {
    console.log("item", item);
    let postId = item._id;
    let eventType = item.eventType;
    var companyName = item?.userData[0].companyName
      .split(" ")
      .slice(0, -1)
      .join(" ");
    let cName =
      companyName === "" ? item?.userData[0].companyName : companyName;
    console.log("companyName", companyName);
    // const map1 = item.userData.map(x => x.companyName);
    // const items = map1
    // items.forEach((item) => {
    //   setCompName(item)
    // })
    try {
      var link = await dynamicLinks().buildShortLink(
        {
          link: `https://rehvupap.page.link/d6o5/${postId}/${eventType}/${cName}`,
          domainUriPrefix: "https://rehvupap.page.link",
          social: {
            title: "RehvUp",
            imageUrl: item.pictureUrl[0],
          },
          android: {
            packageName: "com.rehvup",
            minimumVersion: "18",
          },
          ios: {
            appStoreId: "159968947",
            bundleId: "com.RehvUp",
            minimumVersion: "18",
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT
      );
      return link;
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const shareApiHit = async (item) => {
    console.log("helloitem", item);
    ApiGetMethod(`coach/sharePost?id=${item._id}`)
      .then((res) => {
        console.log("data", res);
      })
      .catch((error) => {
        console.assert(error);
      })
      .finally(() => setLoading(false));
  };

  const onShare = async (item) => {
    const getLink = await generateLink(item);
    const resData = {
      message: "Check out my Post",
      url: getLink,
    };
    Share.open(resData)
      .then((res) => {
        console.log("resData", res);
        shareApiHit(item);
      })
      .catch((err) => {
        err && console.log(err);
        shareApiHit(item);
      });
  };

  const renderIndicators = (contents) => {
    return contents.map((content, index) => {
      return (
        <View
          key={index}
          style={[
            ,
            {
              backgroundColor: index === currentIndex ? "#fff" : "gray",
              height: contents.length > 1 ? 6 : 0,
              width: contents.length > 1 ? 6 : 0,
              borderRadius: 3,
              marginHorizontal: 2,
            },
          ]}
        />
      );
    });
  };

  const onScroll = (event) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPos = event.nativeEvent.contentOffset.x;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / windowWidth);
    const current = Math.floor(xPos / totalWidth);
    setCurrentIndex(current);
    console.log("CurrentIndex", currentIndex);
    if (indexOfNextScreen !== currentIndex) {
      pausePlayVideo2();
    } else {
      pausePlayVideo();
    }
  };

  const pausePlayVideo = (indexData) => {
    if (isPaused === true) {
      setVisibleItemIndex(null);
    } else {
      setVisibleItemIndex(indexData);
    }
  };

  const pausePlayVideo2 = (indexData) => {
    setVisibleItemIndex(indexData);
  };

  const onLoadStart = () => {
    setOpacity(1);
    console.log("onLoadStart");
  };

  const onLoad = () => {
    setOpacity(0);
    videoComponent?.seek(0);
    console.log("onLoad");
  };

  const onBuffer = ({ isBuffering }) => {
    setOpacity(isBuffering ? 1 : 0);
    console.log("onBuffer");
  };

  const ItemView = (item, index, indexData, itemData) => {
    return (
      <Pressable
        onPress={() =>
          isImage(item)
            ? navigation.navigate("PostDetailScreen", {
                postId: itemData._id,
                eventType: itemData.eventType,
                creator:
                  itemData.userData[0].name +
                  " " +
                  itemData.userData[0].lastName,
                creatorRole: itemData?.role,
                pictureUrl: itemData?.pictureUrl,
                isLikes: itemData?.isLikes,
                totalLikes: itemData.totalLikes,
                totalComments: itemData.totalComments,
                questions: itemData.questions,
              })
            : null
        }
        style={styles.mediaContainer}
      >
        {isImage(item) ? (
          <Image source={{ uri: item }} style={styles.media} />
        ) : (
          <View style={styles.content}>
            {indexData != visibleItemIndex && (
              <VideoPausedIcon playVideo={() => pausePlayVideo2(indexData)} />
            )}
            {/* <TouchableWithoutFeedback onPress={() => pausePlayVideo(indexData)}> */}
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("PostDetailScreen", {
                  postId: itemData._id,
                  eventType: itemData.eventType,
                  creator: itemData?.userName + " " + itemData?.userLast,
                  creatorRole: itemData?.role,
                  pictureUrl: itemData?.pictureUrl,
                  isLikes: itemData?.isLikes,
                  totalLikes: itemData.totalLikes,
                  totalComments: itemData.totalComments,
                  questions: itemData.questions,
                })
              }
            >
              <Video
                ref={(ref) => (videoComponent = ref)}
                source={{ uri: item }}
                paused={
                  currentIndex === index && indexData === visibleItemIndex
                    ? false
                    : true
                }
                // paused={isPaused}
                style={styles.video}
                repeat={true}
                resizeMode={"cover"}
                volume={sound ? 1.0 : 0.0}
                onLoad={onLoad}
                onBuffer={onBuffer}
                onLoadStart={onLoadStart}
              />
            </TouchableWithoutFeedback>
            <VideoBufferIndicator
              opacity={opacity}
              color={theme.colors.primary}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, bottom: 240 }}
              onPress={() => setSound(!sound)}
            >
              <Icon
                name={!sound ? "volume-mute" : "volume-high-sharp"}
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    );
  };

  const renderContent = (itemData, indexData) => {
    const singleContent = Children.toArray(
      itemData?.pictureUrl?.join(",").split(",")
    );
    return (
      <View>
        <FlatList
          data={singleContent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            ItemView(item, index, indexData, itemData)
          }
          horizontal={true}
          pagingEnabled={true}
          bounces={false}
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.indicatorContainer}>
          {renderIndicators(singleContent)}
        </View>
        {itemData?.eventType.toLowerCase() == "post" ||
        itemData?.eventType.toLowerCase() == "" ? null : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PostDetailScreen", {
                postId: itemData._id,
                eventType: itemData.eventType,
                creator:
                  itemData.userData[0].name +
                  " " +
                  itemData.userData[0].lastName,
                creatorRole: itemData?.role,
                pictureUrl: itemData?.pictureUrl,
                isLikes: itemData?.isLikes,
                totalLikes: itemData.totalLikes,
                totalComments: itemData.totalComments,
                questions: itemData.questions,
              })
            }
            style={styles.rollViewStyle}
          >
            <Text style={[CommonStyle.rollTextStyle]}>
              {itemData?.eventType}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const ItemView2 = ({ item, index }) => {
    console.log("items => ", item);
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
          }}
        >
          <TouchableOpacity
            onPress={() =>
              profileClick(item, item?.postCreatedUserType, item?.createdBy)
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
            {item?.userData[0].profilePic == undefined ||
            item?.userData[0].profilePic == null ||
            item?.userData[0].profilePic?.trim() == "" ? (
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
                  uri: item.userData[0].profilePic.trim(),
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
              <Text
                style={{
                  fontSize: 14,
                  ...theme.fonts.semiBold,
                  color: theme.colors.textBlack,
                }}
              >
                {capitalize(
                  item.userData[0].name + " " + item.userData[0].lastName
                )}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  ...theme.fonts.medium,
                  color: theme.colors.disabledText,
                }}
              >
                {item?.postCreatedUserType}{" "}
                {item.userData[0].department == "H.R."
                  ? ",  " + item.userData[0].department
                  : ""}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: "82%",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  ...theme.fonts.regular,
                  color: theme.colors.disabledText,
                  alignSelf: "flex-end",
                }}
              >
                {moment(item?.createdAt).format("ll")}
              </Text>
              {item?.communitiesData?.name === "" ||
              item?.communitiesData?.name === undefined ? null : (
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
                    {/* {item?.communitiesData?.name} */}
                    {item?.communitiesData?.name.length < 25
                      ? `${
                          LangType === "en"
                            ? item?.communitiesData?.name
                            : item?.communitiesData?.frenchName
                        }`
                      : `${
                          LangType === "en"
                            ? item?.communitiesData?.name.substring(0, 25)
                            : item?.communitiesData?.frenchName.substring(0, 25)
                        }...`}
                  </Text>
                </View>
              )}
            </View>

            <ViewShotModal
              ref={(ref) => (_menu[item._id] = ref)}
              id={item._id}
              options={["delete"]}
              onDelete={(id) =>
                Alert.alert(Lang.MESSAGE, Lang.DELETE_POST, [
                  { text: Lang.YES, onPress: () => onDeletePost(id) },
                  { text: Lang.CANCEL, onPress: () => {} },
                ])
              }
              onHide={() => _menu[item._id]?.hide()}
            />
            {item.userData[0]?.role == "EXCOACH" ? null : companyId ==
                item.companyId && department === "H.R." ? (
              <TouchableOpacity
                onPress={() => _menu[item._id]?.show()}
                style={{ marginLeft: Scaler(15) }}
              >
                <Image
                  source={threedots}
                  style={{ height: Scaler(17), resizeMode: "contain" }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <Spacer size={Scaler(10)} />
        {renderContent(item, index)}
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
                onPress={() => onLike("like", item?.isLikes, item._id, index)}
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
                // onPress={() =>
                //   navigation.navigate("MemberScreen", {
                //     data: {
                //       postId: item?._id,
                //       isLikes: true,
                //     },
                //   })
                // }
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
                      eventType: item.eventType,
                      pictureUrl: item?.pictureUrl,
                      isCommented: item?.isCommented,
                      postId: item._id,
                      totalLikes: item.totalLikes,
                      totalComments: item.totalComments,
                      description: item?.description,
                      name:
                        item.userData[0].name + " " + item.userData[0].lastName,
                      postCreatedUserType: item.postCreatedUserType,
                      selectedCommunityId: item.communityId,
                    },
                    item: item,
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
                // onPress={() =>
                //   navigation.navigate("MemberScreen", {
                //     data: {
                //       postId: item?._id,
                //       isLikes: false,
                //     },
                //   })
                // }
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
          <TouchableOpacity onPress={() => onShare(item)}>
            <Image
              style={{ width: wp(13), height: hp(5.2) }}
              source={postShareIcon}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
        <Spacer />
        <TouchableOpacity
          onPress={() => setDescStatus((data) => !data)}
          style={{ paddingHorizontal: Scaler(15) }}
        >
          {/* <Text
            style={{ ...theme.fonts.regular, fontSize: Scaler(13) }}
            numberOfLines={2}
          >
            {item.description}
          </Text> */}
          {getDescStatus === false ? (
            <Text
              numberOfLines={2}
              style={{ ...theme.fonts.regular, fontSize: Scaler(13) }}
            >
              {item?.description}
            </Text>
          ) : (
            <Text style={{ ...theme.fonts.regular, fontSize: Scaler(13) }}>
              {item?.description}
            </Text>
          )}
          <Spacer size={Scaler(15)} />
        </TouchableOpacity>
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

  return (
    <View>
      {isLoading ? (
        <SkeletonPlaceholder>
          <View style={{ container: 1, flex: 1, position: "absolute" }}>
            <View
              style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}
            >
              <View style={{ borderRadius: 50, width: 60, height: 60 }} />
              <View style={{ width: 130, height: 20, left: 15, top: 10 }} />
              <View style={{ width: 100, height: 20, right: 115, top: 40 }} />
            </View>

            <View
              style={{ flexWrap: "wrap-reverse", marginLeft: 20, left: 10 }}
            >
              <View style={{ width: 80, height: 20, bottom: 50 }} />
              <View style={{ width: 110, height: 20, right: 25, bottom: 40 }} />
            </View>

            <View style={{ bottom: 20 }}>
              <View style={{ padding: 10, width: 400, height: 220 }} />
            </View>

            <View style={{ flexDirection: "row", bottom: 10 }}>
              <View
                style={{ borderRadius: 50, width: 40, height: 40, left: 20 }}
              />
              <View
                style={{ borderRadius: 50, width: 40, height: 40, left: 60 }}
              />
            </View>

            <View
              style={{ flexWrap: "wrap-reverse", marginRight: 20, bottom: 50 }}
            >
              <View style={{ borderRadius: 50, width: 40, height: 40 }} />
            </View>

            <View style={{ left: 20, bottom: 35 }}>
              <View style={{ width: 100, height: 15 }} />
            </View>

            <View>
              <View style={{ width: 360, height: 1, left: 20 }} />
            </View>

            <View
              style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}
            >
              <View style={{ borderRadius: 50, width: 60, height: 60 }} />
              <View style={{ width: 130, height: 20, left: 15, top: 10 }} />
              <View style={{ width: 100, height: 20, right: 115, top: 40 }} />
            </View>

            <View
              style={{ flexWrap: "wrap-reverse", marginLeft: 20, left: 10 }}
            >
              <View style={{ width: 80, height: 20, bottom: 50 }} />
              <View style={{ width: 110, height: 20, right: 25, bottom: 40 }} />
            </View>

            <View style={{ bottom: 20 }}>
              <View style={{ padding: 10, width: 400, height: 220 }} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          nestedScrollEnabled={true}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView2}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          // onScroll={(e) => {
          //   let offset = e.nativeEvent.contentOffset.y;
          //   const indexOfNextScreen = Math.round(offset / windowHeight);
          //   let index = parseInt(offset / 350); // your cell height
          //   const totalHeight = e.nativeEvent.layoutMeasurement.height;
          //   const current = Math.floor(offset / totalHeight);
          //   setCurrentIndex2(current);
          //   console.log("CurrentIndex", currentIndex);
          //   if (indexOfNextScreen !== totalHeight) {
          //     setIsPaused(true);
          //   } else {
          //     setIsPaused(false);
          //   }
          // }}
          ListEmptyComponent={EmptyList}
          ListHeaderComponent={listHeader}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: Scaler(125) }}
        />
      )}
    </View>
  );
}

CommunityTrendingPost.propTypes = {
  data: PropTypes.array,
  profileClick: PropTypes.func,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onDeletePost: PropTypes.func,
  listHeader: PropTypes.any,
  EmptyList: PropTypes.any,
};

CommunityTrendingPost.defaultProps = {
  data: [],
  profileClick: () => {},
  onLike: () => {},
  onComment: () => {},
  onDeletePost: () => {},
  listHeader: () => {},
  EmptyList: () => {},
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
    backgroundColor: "#000",
  },
  media: {
    height: Scaler(245),
    width: windowWidth,
    resizeMode: "contain",
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

export default CommunityTrendingPost;
