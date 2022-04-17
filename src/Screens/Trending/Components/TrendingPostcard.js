import React, { Children, useRef, useState } from "react";
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
  TextInput,
  RefreshControl,
  Linking
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
import useApiServices from "../../../Services/useApiServices";
import Share from "react-native-share";
import Scaler from "../../../Utils/Scaler";
import Spacer from "../../../Components/SharedComponents/Space";
import { DayTheme } from "../../../Constants/theme";
import { capitalize, isImage } from "../../../Utils/Helpers";
import VideoPausedIcon from "../../Community/Components/VideoPausedIcon";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Lang from "../../../Language";
const FULL_WIDTH = Dimensions.get("window").width;
import { useAppValue } from "../../../Recoil/appAtom";
import ViewShotModal from "../../../Components/Modals/ViewShotModal";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import Icon from "react-native-vector-icons/Ionicons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function TrendingPostcard(props) {
  // const { data, profileClick, onLike, onComment, selectedCommunityId } = props;
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
    refReshData
  } = props;
  const theme = useTheme();
  const navigation = useNavigation();
  const _menu = [];
  const [CompName, setCompName] = useState("");
  const [sound, setSound] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false);
  const playerRef = useRef();
  const onBuffer = () => {};
  const videoError = () => {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { ApiPostMethod, ApiGetMethod } = useApiServices();
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const scrollViewRef = useRef();
  const [isPaused, setIsPaused] = useState(true);
  //const [IndexCheck, setIndexCheck] = useState(props.currentIndex);
  let videoComponent = useRef();
  const [getDescStatus, setDescStatus] = useState(false);
  console.log("currentIndex", props.currentIndex);
  // Workaround to display thumbnail in android.
  const load = ({ duration }) => {
    videoComponent?.seek(0);
  };
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  // const onShare = async () => {
  //   await Share.open({
  //     message: "RehvUp Application",
  //   })
  //     .then((result) => console.log("share result => ", result))
  //     .catch((errorMsg) => console.log(errorMsg));
  // };

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
    // const map1 = item.userData.map((x) => x.companyName);
    // const items = map1;
    // items.forEach((item) => {
    //   setCompName(item);
    // });
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

  const shareApiHit = async(item)=>{
    console.log("helloitem", item)
    ApiGetMethod(`coach/sharePost?id=${item._id}`)
    .then((res) => {
      console.log("data", res);
    })
    .catch((error) => {
      console.assert(error);
    })
    .finally(() => setLoading(false));
  }

  const onShare = async (item) => {
    const getLink = await generateLink(item);
    const resData ={
      message: "Check out my Post",
      url: getLink,
    }
    Share.open(resData)
    .then((res) => {
      console.log("resData",res);
      shareApiHit(item)
    })
    .catch((err) => {
      err && console.log(err);
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
      // setIsPaused(true);

      pausePlayVideo2();
    } else {
      // setIsPaused(false);
      pausePlayVideo();
    }
  };

  const pausePlayVideo = (indexData) => {
    console.log("Hello", isPaused, indexData);
    if (isPaused === true) {
      setVisibleItemIndex(null);
    } else {
      setVisibleItemIndex(indexData);
    }
  };

  const pausePlayVideo2 = (indexData) => {
    setVisibleItemIndex(indexData);
  };

  const ItemView = (item, index, indexData, itemData) => {
    // console.log("items,", item, "itemData", itemData);
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
                onLoad={load}
                resizeMode={"contain"}
                volume={sound ? 1.0 : 0.0}
              />
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={{ position: "absolute", right: 10, bottom: 240 }}
              onPress={() => setSound(!sound)}
            >
              <Icon
                name={!sound ? "volume-mute" : "volume-high-sharp"}
                size={25}
                color="white"
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
  // const renderCard = (item, index ) => {
  //   console.log("itemsdcsd", item);
  //   return (
  //     <View style={styles.outerBoundary}>
  //       <View
  //         style={{
  //           height: Scaler(40),
  //           width: "90%",
  //           flexDirection: "row",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //           alignSelf: "center",
  //           //paddingHorizontal: Scaler(18),
  //         }}
  //       >
  //         <TouchableOpacity
  //           onPress={() =>
  //             profileClick(item?.postCreatedUserType, item?.createdBy)
  //           }
  //           style={[
  //             {
  //               width: "50%",
  //               alignItems: "center",
  //               height: "100%",
  //               flexDirection: "row",
  //               alignItems: "flex-end",
  //               justifyContent: "space-between",
  //             },
  //           ]}
  //         >
  //           {item?.profilePic == undefined ||
  //           item?.profilePic == null ||
  //           item?.profilePic?.trim() == "" ? (
  //             <Image
  //               style={{
  //                 height: Scaler(40),
  //                 width: Scaler(40),
  //                 borderRadius: Scaler(20),
  //               }}
  //               source={profilePic}
  //               resizeMode={"contain"}
  //             />
  //           ) : (
  //             <Image
  //               source={{
  //                 uri: item.profilePic.trim(),
  //               }}
  //               style={{
  //                 height: Scaler(40),
  //                 width: Scaler(40),
  //                 borderRadius: Scaler(20),
  //                 resizeMode: "cover",
  //               }}
  //             />
  //           )}
  //           <View
  //             style={{
  //               marginLeft: Scaler(10),
  //               height: "100%",
  //               width: "80%",
  //               alignSelf: "center",
  //               alignItems: "flex-start",
  //               justifyContent: "space-between",
  //             }}
  //           >
  //             <Text style={{ color: "#000" }}>
  //               {item.userData[0].name + " " + item.userData[0].lastName}
  //             </Text>
  //             <Text>
  //               {item?.postCreatedUserType}{" "}
  //               {item.userData[0].department == "H.R."
  //                 ? ",  " + item.userData[0].department
  //                 : ""}
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "flex-end",
  //             justifyContent: "space-between",
  //           }}
  //         >
  //           <View
  //             style={{
  //               height: "82%",
  //               alignItems: "flex-end",
  //               justifyContent: "space-between",
  //             }}
  //           >
  //             <Text
  //               style={{
  //                 fontSize: 10,
  //                 ...theme.fonts.regular,
  //                 color: theme.colors.disabledText,
  //               }}
  //             >
  //               {moment(item?.createdAt).format("ll")}
  //             </Text>
  //             <View
  //               style={{
  //                 backgroundColor: "#EEEBFF",
  //                 padding: Scaler(4),
  //                 borderRadius: Scaler(5),
  //               }}
  //             >
  //               <Text
  //                 style={{
  //                   fontSize: 10,
  //                   color: theme.colors.primary,
  //                   ...theme.fonts.regular,
  //                 }}
  //               >
  //                 {item?.communitiesData?.name}
  //               </Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //       <Spacer size={Scaler(10)} />
  //       <ScrollView
  //         contentContainerStyle={styles.mediaContainer}
  //         horizontal
  //         showsHorizontalScrollIndicator={false}
  //         scrollEnabled={item?.pictureUrl?.join(",").split(",").length > 1}
  //         style={{ flexGrow: 1 }}
  //         onScroll={onScroll}
  //         scrollEventThrottle={16}
  //       >
  //         {Children.toArray(
  //           item?.pictureUrl
  //             ?.join(",")
  //             .split(",")
  //             ?.map((pic) => {
  //               return (
  //                 <Pressable
  //                   onPress={() =>
  //                     isImage(pic)
  //                       ? navigation.navigate("PostDetailScreen", {
  //                           postId: item._id,
  //                           eventType: item.eventType,
  //                           creator:
  //                             item.userData[0].name +
  //                             " " +
  //                             item.userData[0].lastName,
  //                           creatorRole: item?.role,
  //                           pictureUrl: item?.pictureUrl,
  //                           isLikes: item?.isLikes,
  //                           totalLikes: item.totalLikes,
  //                           totalComments: item.totalComments,
  //                           questions: item.questions,
  //                         })
  //                       : null
  //                   }
  //                   style={styles.mediaContainer}
  //                 >
  //                   {isImage(pic) ? (
  //                     <Image
  //                       source={{ uri: pic?.trim() }}
  //                       style={styles.media}
  //                     />
  //                   ) : (
  //                     <VideoContent videoSource={{ uri: pic?.trim() }} />
  //                   )}
  //                   {/*
  //                     <InViewport onChange={(e)=>handlePlaying(e)}>
  //                     <VideoPlayer key={index.toString()} index={index} currentIndex={currentIndex} />
  //                     <Video
  //                           source={{
  //                             uri: pic?.trim(),
  //                           }} // Can be a URL or a local file.
  //                           ref={playerRef} // Store reference
  //                           onBuffer={onBuffer} // Callback when remote video is buffering
  //                           onError={videoError} // Callback when video cannot be loaded
  //                           style={styles.backgroundVideo}
  //                           paused={isPaused}
  //                           controls={Platform.OS == "ios"}
  //                           resizeMode="cover"
  //                         />
  //                    */}
  //                   {item?.eventType.toLowerCase() == "post" ||
  //                   item?.eventType.toLowerCase() == "" ? null : (
  //                     <View style={styles.rollViewStyle}>
  //                       <Text style={[CommonStyle.rollTextStyle]}>
  //                         {item?.eventType}
  //                       </Text>
  //                     </View>
  //                   )}
  //                 </Pressable>
  //               );
  //             })
  //         )}
  //       </ScrollView>
  //       <View style={styles.indicatorContainer}>
  //         {item?.pictureUrl.length > 1
  //           ? renderIndicators(item?.pictureUrl?.join(",").split(","))
  //           : null}
  //       </View>
  //       {/* {renderContent(item)} */}
  //       <Spacer size={Scaler(10)} />
  //       <View style={styles.footer}>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "space-between",
  //             width: Scaler(140),
  //           }}
  //         >
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <TouchableOpacity
  //               onPress={() => onLike("like", item?.isLikes, item._id, index)}
  //             >
  //               <Image
  //                 style={{
  //                   width: Scaler(40),
  //                   height: Scaler(40),
  //                   borderRadius: Scaler(20),
  //                 }}
  //                 source={item?.isLikes ? likeIcon : likeBlackIcon}
  //                 resizeMode={"contain"}
  //               />
  //             </TouchableOpacity>
  //             <Spacer horizontal size={Scaler(5)} />
  //             <TouchableOpacity
  //               style={{
  //                 width: Scaler(25),
  //                 height: Scaler(30),
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //               }}
  //               onPress={() =>
  //                 navigation.navigate("MemberScreen", {
  //                   data: {
  //                     postId: item?._id,
  //                     isLikes: true,
  //                   },
  //                 })
  //               }
  //             >
  //               <Text
  //                 style={[
  //                   CommonStyle.likeTextStyle,
  //                   {
  //                     color: item?.isLikes
  //                       ? theme.colors.primary
  //                       : theme.colors.disabledText,
  //                   },
  //                 ]}
  //               >
  //                 {item.totalLikes}
  //               </Text>
  //             </TouchableOpacity>
  //           </View>

  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "center",
  //               marginLeft: Scaler(15),
  //             }}
  //           >
  //             <TouchableOpacity
  //               onPress={() =>
  //                 navigation.navigate("CommentScreen", {
  //                   data: {
  //                     isLikes: item?.isLikes,
  //                     isCommented: item?.isCommented,
  //                     postId: item._id,
  //                     totalLikes: item.totalLikes,
  //                     totalComments: item.totalComments,
  //                     description: item?.description,
  //                     pictureUrl: item?.pictureUrl,
  //                     name: item.userName + " " + item.userLast,
  //                     postCreatedUserType: item.postCreatedUserType,
  //                     selectedCommunityId: selectedCommunityId,
  //                   },
  //                 })
  //               }
  //             >
  //               <Image
  //                 style={{
  //                   width: Scaler(40),
  //                   height: Scaler(40),
  //                   borderRadius: Scaler(20),
  //                 }}
  //                 source={item?.isCommented ? commentBlue : commentIcon}
  //                 resizeMode={"contain"}
  //               />
  //             </TouchableOpacity>
  //             <Spacer horizontal size={Scaler(5)} />
  //             <TouchableOpacity
  //               style={{
  //                 width: Scaler(25),
  //                 height: Scaler(30),
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //               }}
  //               onPress={() =>
  //                 navigation.navigate("MemberScreen", {
  //                   data: {
  //                     postId: item?._id,
  //                     isLikes: false,
  //                   },
  //                 })
  //               }
  //             >
  //               <Text
  //                 style={[
  //                   CommonStyle.commentTextStyle,
  //                   {
  //                     color: item?.isCommented
  //                       ? theme.colors.primary
  //                       : theme.colors.disabledText,
  //                   },
  //                 ]}
  //               >
  //                 {item.totalComments}
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //         <TouchableOpacity onPress={() => onShare()}>
  //           <Image
  //             style={{ width: wp(13), height: hp(5.2) }}
  //             source={postShareIcon}
  //             resizeMode={"contain"}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //       <Spacer />
  //       <View style={{ paddingHorizontal: Scaler(15) }}>
  //         <Text style={{ ...theme.fonts.regular, fontSize: Scaler(13) }}>
  //           {item.description}
  //         </Text>
  //         <Spacer size={Scaler(15)} />
  //       </View>
  //       <Divider
  //         style={{
  //           width: wp(100) - Scaler(30),
  //           height: Scaler(1),
  //           alignSelf: "center",
  //         }}
  //       />
  //     </View>
  //   );
  // };

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
                    {item?.communitiesData?.name}
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
          <TouchableOpacity onPress={() => onShare(item)}>
            <Image
              style={{ width: wp(13), height: hp(5.2) }}
              source={postShareIcon}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
        <Spacer />
        <TouchableOpacity onPress={() => setDescStatus((data) => !data)} style={{ paddingHorizontal: Scaler(15) }}>
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
        </TouchableOpacity>
        {item?.postUrl === "" ||
        item?.postUrl == null ||
        item?.postUrl == undefined ? null : (
          <View style={{ marginLeft: 15 }}>
            <TouchableOpacity onPress={() => Linking.openURL(item?.postUrl)}>
              <Text
                style={{
                  ...theme.fonts.regular,
                  fontSize: Scaler(14),
                  //  textDecorationLine: "underline",
                  color: theme.colors.primary,
                }}
                numberOfLines={2}
              >
                {Lang.knowMore}
                {/* <Text
                onPress={() => Linking.openURL(item?.postUrl)}
                style={{
                  ...theme.fonts.regular,
                  fontSize: Scaler(14),
                  //  textDecorationLine: "underline",
                  color: theme.colors.primary,
                }}
                numberOfLines={2}
              >
                {item?.postUrl}
              </Text> */}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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

  const _onRefresh = () => {
    console.log('_onRefresh')
    refReshData()
};

  //return <View>{Children.toArray(data.map((item, index) => renderCard(item, index)))}</View>;
  return (
    <View>
      {isLoading ? (
        <SkeletonPlaceholder>
          <View
            style={{
              container: 1,
              alignItems: "center",
              position: "absolute",
              right: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", marginLeft: 20, marginTop: 30 }}
            >
              <View
                style={{ width: 120, height: 20, borderRadius: 4, right: 35 }}
              />
              <View style={{ left: 80, bottom: 5 }}>
                <View style={{ width: 120, height: 30, borderRadius: 4 }} />
              </View>
            </View>

            <View style={{ top: 40, flexDirection: "row" }}>
              <TextInput
                style={{ borderRadius: 1, width: 180, height: 160, left: 20 }}
              />
              <TextInput
                style={{ borderRadius: 1, width: 160, height: 160, left: 40 }}
              />
            </View>

            <View style={{ top: 80, right: 90 }}>
              <View style={{ width: 120, height: 30, borderRadius: 4 }} />
            </View>

            <View style={{ flexDirection: "row", marginRight: 10, top: 120 }}>
              <View style={{ borderRadius: 50, width: 60, height: 60 }} />
              <View style={{ width: 130, height: 20, left: 15, top: 10 }} />
              <View style={{ width: 100, height: 20, right: 115, top: 40 }} />
            </View>

            <View
              style={{
                flexWrap: "wrap-reverse",
                marginLeft: 20,
                left: 170,
                top: 75,
              }}
            >
              <View style={{ width: 80, height: 20 }} />
              <View style={{ width: 110, height: 20, right: 25, top: 5 }} />
            </View>

            <View style={{ top: 100, left: 20 }}>
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
          ListHeaderComponent={listHeader}
          ListEmptyComponent={EmptyList}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: Scaler(125) }}
          refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={_onRefresh}
          />
        }
        />
      )}
    </View>
  );
}

TrendingPostcard.propTypes = {
  data: PropTypes.array,
  profileClick: PropTypes.func,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  listHeader: PropTypes.any,
  EmptyList: PropTypes.any,
  refReshData: PropTypes.func
};

TrendingPostcard.defaultProps = {
  data: [],
  profileClick: () => {},
  onLike: () => {},
  onComment: () => {},
  listHeader: () => {},
  EmptyList: () => {},
  refReshData: () => {}
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
    height: Scaler(450),
    marginVertical: 8,
  },
});

export default TrendingPostcard;
