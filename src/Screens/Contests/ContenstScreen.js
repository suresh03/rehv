import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import { HeaderBackAction } from "../../Components/CustomHeader/ContestHeader";
import { getFontSize } from "../../Components/SharedComponents/ResponsiveSize";
import Lang from "../../Language";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  arrowbackgroundBlue,
  ImageUpload,
  greyArrow,
  congratutionsIcon,
  playIcon,
  profilePic,
  likeWhite,
} from "../../Assets/icon";
import ImagePicker from "react-native-image-crop-picker";
import { Portal, Provider, Modal } from "react-native-paper";
import { CustomButton } from "../../Components/SharedComponents/Button";
import { useTheme } from "react-native-paper";
import CreateContestModal from "./Components/CreateContestModal";
import useApiServices from "../../Services/useApiServices";
import PicturePicker from "../../Constants/PicturePicker";
import ImageCropPicker from "react-native-image-crop-picker";
import Scaler from "../../Utils/Scaler";
import Video from "react-native-video";
import { isImage } from "../../Utils/Helpers";
import SnackbarHandler from "../../Utils/SnackbarHandler";
const windowWidth = Dimensions.get("window").width;

export default function ContestScreen({ navigation, route }) {
  const [topButton, settopButton] = useState(true);
  const [recentButton, setrecentButton] = useState(false);
  const [camera, setcamera] = useState(true);
  const [uploadvisible, setUploadvisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [topArray, setTopArray] = useState([]);
  const [recentArray, setRecentArray] = useState([]);
  const theme = useTheme();
  const { ApiPostMethod, ApiGetMethod, ApiBasicFormDataMethod } =
    useApiServices();

  const [imageServerUrl, setImageServerUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SuccessVisible, setSuccessVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [postDescription, setPostDescription] = useState("");
  const playerRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetTopList();
    });
    return unsubscribe;
  }, []);

  const GetTopList = async () => {
    ApiGetMethod(
      `post/contestTopAndRecentList?status=Top&postId=${route.params.postId}`
    )
      .then((res) => {
        console.log("getCommunityListById res => ", res);
        setTopArray(res.data.contestList);
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => console.log(false));
  };
  const GetRecentList = async () => {
    ApiGetMethod(
      `post/contestTopAndRecentList?status=Recent&postId=${route.params.postId}`
    )
      .then((res) => {
        console.log("getCommunityListById res => ", res);
        setRecentArray(res.data.contestList);
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
      })
      .finally(() => console.log(false));
  };

  const buttonChange = (type) => {
    if (type == "top") {
      settopButton(true);
      setrecentButton(false);
      GetTopList();
    } else {
      settopButton(false);
      setrecentButton(true);
      GetRecentList();
    }
  };

  const showDialog = () => {
    setVisible(true);
    cleanupImages();
  };

  const _renderToparray = ({ item }) => {
    console.log("itemdsada", item);
    console.log("isImage(pic)1", "isImage(pic)2");
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ContestPictureScreen", {
            item: item,
            postId: route.params.postId,
          })
        }
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          shadowOpacity: 0.1,
          elevation: 17,
          backgroundColor: "#fff",
          borderRadius: 10,
          alignSelf: "center",
          width: wp(40),
          marginHorizontal: wp(4),
          marginVertical: hp(2),
        }}
      >
        <View
          style={{
            width: Scaler(140),
            height: Scaler(120),
            alignSelf: "center",
            overflow: "hidden",
          }}
        >
          {isImage(item?.pictureUrl[0]) ? (
            <Image
              source={{
                uri: item?.pictureUrl[0],
              }}
              style={{
                width: Platform.OS === "ios" ? Scaler(140):Scaler(140),
                height: Platform.OS === "ios" ? Scaler(120):Scaler(120),
                alignSelf: "center",
                borderRadius: Scaler(10),
              }}
            />
          ) : (
            <View style={{}}>
              <View
                style={{
                  width: Scaler(140),
                  height: Scaler(110),
                  //backgroundColor: "#EEEBFF",
                  borderRadius: 10,
                  justifyContent: "center",
                  top:3,
                  backgroundColor: "#000",
                  alignItems: "center",
                  //zIndex: 1,
                  alignSelf:'center',
                }}
              >
                <Video
                  source={{
                    uri: item?.pictureUrl[0],
                  }}
                  ref={playerRef}
                  style={{
                    width: wp(35),
                    height: Platform.OS === "ios" ? hp(14):hp(12),
                    alignSelf:'center',
                  }}
                  repeat={false}
                  onLoad={load}
                  ref={(ref) => (videoComponent = ref)}
                  paused={true}
                />
              </View>
            </View>
          )}

          {item.playImg == "" ? (
            <View
              style={{
                width: wp(15),
                height: hp(3),
                top: hp(4),
                alignSelf: "center",
              }}
            />
          ) : (
            <Image
              source={item.playImg}
              style={{
                width: wp(15),
                height: hp(3),
                top: hp(4),
                alignSelf: "center",
              }}
              resizeMode={"contain"}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              top: 60,
              left: -10,
            }}
          >
            <Image
              source={likeWhite}
              style={{ width: wp(15), height: hp(3), top: hp(2) }}
              resizeMode={"contain"}
            />
            <Text
              style={{
                width: wp(10),
                height: hp(3),
                top: hp(2.2),
                color: "#ffff",
                fontFamily: "Poppins-Medium",
                right: wp(2.5),
              }}
            >
              {item.totalLikes}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            lineHeight: hp(2.5),
            top: hp(0.5),
            color: "#000",
            fontSize: 13.5,
            width: "90%",
            textAlign: "left",
            left: Scaler(7),
            height: Scaler(45),
          }}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {item.userData?.profilePic == undefined ||
          item.userData?.profilePic == null ||
          item.userData?.profilePic?.trim() == "" ? (
            <Image
              style={{
                height: Scaler(32),
                width: Scaler(32),
                borderRadius: Scaler(20),
                left: Scaler(5),
                top: Scaler(5),
              }}
              source={profilePic}
              resizeMode={"contain"}
            />
          ) : (
            <Image
              source={{
                uri: item?.userData.profilePic.trim(),
              }}
              style={{
                height: Scaler(40),
                width: Scaler(40),
                borderRadius: Scaler(20),
                resizeMode: "cover",
                left: Scaler(5),
              }}
            />
          )}
          <Text
            style={{
              top: hp(0.2),
              left: wp(2.7),
              fontFamily: "Poppins-SemiBold",
              color: "#110D26",
            }}
          >
            {(item.userData.name + "" + item.userData.lastName).substring(
              0,
              10
            )}
          </Text>
        </View>
        <Text
          style={{
            top: Platform.OS === "ios" ? Scaler(-12):Scaler(-17),
            left: Platform.OS === "ios" ? wp(13):wp(13.3),
            color: "#7F8190",
            fontSize: getFontSize(12),
            fontFamily: "Poppins-Medium",
          }}
        >
          {item.userData.role}
        </Text>
      </TouchableOpacity>
    );
  };

  const _renderRecentrray = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ContestPictureScreen", {
            item: item,
            postId: route.params.postId,
          })
        }
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          shadowOpacity: 0.1,
          elevation: 17,
          backgroundColor: "#fff",
          borderRadius: 10,
          alignSelf: "center",
          width: wp(40),
          marginHorizontal: wp(4),
          marginVertical: hp(2),
        }}
      >
        <View
          style={{
            width: Scaler(140),
            height: Scaler(120),
            alignSelf: "center",
            overflow: "hidden",
          }}
        >
          {isImage(item?.pictureUrl[0]) ? (
            <Image
              source={{
                uri: item?.pictureUrl[0],
              }}
              style={{
                width: Scaler(140),
                height: Scaler(120),
                alignSelf: "center",
                borderRadius: Scaler(10),
              }}
            />
          ) : (
            <View style={{}}>
              <View
                style={{
                  width: Scaler(140),
                  height: Scaler(110),
                  //backgroundColor: "#EEEBFF",
                  borderRadius: 10,
                  justifyContent: "center",
                  top:3,
                  backgroundColor: "#000",
                  alignItems: "center",
                  //zIndex: 1,
                  alignSelf:'center',
                }}
              >
                <Video
                  source={{
                    uri: item?.pictureUrl[0],
                  }}
                  ref={playerRef}
                  style={{
                    width: wp(35),
                    height: hp(14),
                    alignSelf: "center",
                    // borderRadius:Scaler(10)
                  }}
                  repeat={false}
                  onLoad={load}
                  ref={(ref) => (videoComponent = ref)}
                  paused={true}
                />
              </View>
            </View>
          )}

          {item.playImg == "" ? (
            <View
              style={{
                width: wp(15),
                height: hp(3),
                top: hp(4),
                alignSelf: "center",
              }}
            />
          ) : (
            <Image
              source={item.playImg}
              style={{
                width: wp(15),
                height: hp(3),
                top: hp(4),
                alignSelf: "center",
              }}
              resizeMode={"contain"}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              top: 60,
              left: -10,
            }}
          >
            <Image
              source={likeWhite}
              style={{ width: wp(15), height: hp(3), top: hp(2) }}
              resizeMode={"contain"}
            />
            <Text
              style={{
                width: wp(10),
                height: hp(3),
                top: hp(2.2),
                color: "#ffff",
                fontFamily: "Poppins-Medium",
                right: wp(2.5),
              }}
            >
              {item.totalLikes}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            lineHeight: hp(2.5),
            top: hp(0.5),
            color: "#000",
            fontSize: 13.5,
            width: "90%",
            textAlign: "left",
            left: Scaler(7),
            height: Scaler(45),
          }}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {item.userData?.profilePic == undefined ||
          item.userData?.profilePic == null ||
          item.userData?.profilePic?.trim() == "" ? (
            <Image
              style={{
                height: Scaler(32),
                width: Scaler(32),
                borderRadius: Scaler(20),
                left: Scaler(5),
                top: Scaler(5),
              }}
              source={profilePic}
              resizeMode={"contain"}
            />
          ) : (
            <Image
              source={{
                uri: item?.userData.profilePic.trim(),
              }}
              style={{
                height: Scaler(40),
                width: Scaler(40),
                borderRadius: Scaler(20),
                resizeMode: "cover",
                left: Scaler(5),
              }}
            />
          )}
          <Text
            style={{
              top: hp(0.2),
              left: wp(2.7),
              fontFamily: "Poppins-SemiBold",
              color: "#110D26",
            }}
          >
            {(item.userData.name + "" + item.userData.lastName).substring(
              0,
              10
            )}
            {/* {item.userData.name} {item.userData.lastName} */}
          </Text>
        </View>
        <Text
          style={{
            top: Scaler(-12),
            left: wp(13),
            color: "#7F8190",
            fontSize: getFontSize(12),
            fontFamily: "Poppins-Medium",
          }}
        >
          {item.userData.role}
        </Text>
      </TouchableOpacity>
    );
  };

  let videoComponent = useRef();
  const load = ({ duration }) => {
    videoComponent.seek(0);
  };
  const renderVideo = (video) => {
    return (
      <View style={{}}>
        <View
          style={{
            borderRadius: Scaler(11),
            backgroundColor: "#000",
            alignItems: "center",
            zIndex: 1,
            top: -3,
            alignSelf:'center',
            justifyContent:'center'
          }}
        >
          <Video
            source={{
              uri: video?.uri?.trim(),
            }}
            repeat={false}
            onLoad={load}
            ref={(ref) => (videoComponent = ref)}
            style={{
              width: windowWidth/1.1,
              height: Scaler(140),
              alignSelf:'center',
              alignItems:'center',
              justifyContent:'center',
              left:Scaler(115)
            }}
            paused={true}
          />
          {/* <TouchableWithoutFeedback>
              <Video
                ref={(ref) => (videoComponent = ref)}
                source={{ uri: item }}
                paused={ currentIndex === index && indexData === visibleItemIndex ? false:true}
                // paused={isPaused}
                style={styles.video}
                repeat={true}
                onLoad={load}
                resizeMode={"cover"}
              />
            </TouchableWithoutFeedback> */}
          <Image
            source={playIcon}
            style={{
              width: wp(10),
              height: hp(10),
              alignSelf: "center",
              top: 20,
              position: "absolute",
            }}
            resizeMode={"contain"}
          />
        </View>
      </View>
    );
  };

  const renderImage = (image) => {
    return (
      <View style={{ alignSelf: "center" }}>
        <ImageBackground
          style={{
            width: wp(85),
            height: Scaler(180),
            backgroundColor: "#EEEBFF",
            borderRadius: 10,
            justifyContent: "center",
            top: 13,
          }}
          imageStyle={{
            width: wp(85),
            height: Scaler(180),
            backgroundColor: "#EEEBFF",
            borderRadius: 10,
            justifyContent: "center",
          }}
          source={image}
        ></ImageBackground>
      </View>
    );
  };

  const renderAsset = (file, index) => {
    if (file.type && file.type.toLowerCase().indexOf("video/") !== -1) {
      return renderVideo(file, index);
    } else {
      return renderImage(file, index);
    }
  };

  const cleanupImages = () => {
    ImagePicker.clean()
      .then(() => {
        setImages("");
      })
      .catch((e) => {
        alert(e);
      });
  };

  // ***************************openPicker***********************
  const openPicker = () => {
    Alert.alert("Profile Picture", "Choose an option", [
      { text: "Camera", onPress: () => onCamera() },
      { text: "Gallery", onPress: () => onGallery() },
      { text: Lang.CANCEL, onPress: () => console.log("nnnn") },
    ]);
  };

  const processImageFromGallery = async (file) => {
    let files = [
      {
        name: file.name,
        type: file.type,
        uri: file.path ?? file.uri,
      },
    ];
    setImages(files);
    // if (images.length === 3) {
    //   Alert.alert(Lang.MESSAGE, "You can not choose more than three images.");
    // } else if (files.length + images.length > 3) {
    //   Alert.alert(Lang.MESSAGE, "You can not choose more than three images.");
    //   let x = 3 - images.length;
    //   console.warn(x);
    //   let temp = [...images, ...files.slice(0, x)];
    //   setImages(temp);
    //   console.log("temp", temp);
    // } else {
    //   let x = 3 - images.length;
    //   let temp = [...images, ...files.slice(0, x)];
    //   setImages(temp);
    //   console.log("temp", temp);
    // }
  };

  const onGallery = async () => {
    setCameraOpen(true);
    // const file = await FilePicker.pickSingle();
    const file = await PicturePicker.captureFromGallery({
      width: 259,
      height: 172,
    });
    console.log(file);
    if (file.type.includes("image/")) {
      console.log("hello", file.uri);
      const item = await ImageCropPicker.openCropper({
        path: file.uri,
        width: 259,
        height: 172,
      });
      console.log("item", item);
      processImageFromGallery({
        name: file.name,
        type: file.type,
        uri: "file://" + item.path,
      });
    } else {
      processImageFromGallery(file);
    }
    setCamera(false);
  };

  const onCamera = () => {
    setCameraOpen(false);
    PicturePicker.captureFromCamera().then((res) => {
      console.log("onCamera => ", res);
      
      let x = [...images, ...res];
      setImages(x);
      setCamera(false);
    });
  };

  const closeModal = () => {
    setVisible(false);
    cleanupImages();
    setPostDescription("");
  };

  const onDismiss = () => {
    console.log("hello");
    setVisible(false);
    cleanupImages();
    setPostDescription("");
  };

  const backHandler = () => {
    setPostDescription("");
    setVisible(true);
    cleanupImages();
    setSuccessVisible(false);
    GetTopList();
  };

  const createContest = async (imgUrl) => {
    setLoading(true);
    let img = imgUrl[0].uri;
    let imgUrlArray = [];
    imgUrlArray.push(img);
    console.log("hi", imgUrlArray);
    let data = {
      description: postDescription,
      pictureUrl: imgUrlArray,
      postId: route.params.postId,
    };

    console.log("hello", data);

    ApiPostMethod("post/participantsOnContest", data)
      .then((res) => {
        if (res.statusCode === 200) {
          setPostDescription("");
          setImageServerUrl([]);
          closeModal();
          setSuccessVisible(true);
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            "You are already participated in this contest"
          );
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message??'');
console.log('error?.message',error?.message)
        Lang.MESSAGE, error;
      })
      .finally(() => setLoading(false));
  };

  const onUploadImage = async (tempImage) => {
    setLoading(true);
    var formData = new FormData();
    // tempImages.map((item) => {
    formData.append("image", tempImage);
    // });
    console.log("onUploadImage", formData);
    const res = await ApiBasicFormDataMethod(
      "AdminRoute/uploadImage",
      formData
    );
    if (res.statusCode === 200) {
      let urls = [...imageServerUrl];
      // if (Array.isArray(res.data)) {
      //   res.data.map((item) => {
      //     urls.push(item.original.trim());
      //   });
      // } else {
      console.log("imageServerUrl => ", imageServerUrl);
      urls.push({ uri: res.data.original.trim(), type: tempImage.type });
      // urls.push(res.data.original.trim());
      // }
      setImageServerUrl(urls);
      return urls;
    } else {
      SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
      return false;
    }
  };

  const uploadVideo = async (item) => {
    var formData = new FormData();
    formData.append("image", item);
    console.log("uploadVideo", formData);
    const res = await ApiBasicFormDataMethod(
      "AdminRoute/uploadVideo",
      formData
    );
    if (res.statusCode === 200) {
      let temp = [...imageServerUrl];
      temp.push({ uri: res.data.videoLink, type: item.type });
      //temp.push(res.data.videoLink);
      setImageServerUrl(temp);
      return temp;
    } else {
      SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
console.log('res.message =>',res.message);
      return false;
    }
  };

  const ConhideDialog = () => {
    setVisible(false);
    setSuccessVisible(false);
    GetTopList();
  };

  const fileUpload = () => {
    let urlArray = [];
    return new Promise(async (resolve) => {
      for (let index = 0; index < images.length; index++) {
        if (images[index].type.includes("video")) {
          const videoUrls = await uploadVideo(images[index]);
          urlArray = [...urlArray, ...videoUrls];
          setTimeout(() => {
            if (index === images.length - 1) {
              resolve(urlArray);
            }
          }, 500);
        } else {
          const imgUrls = await onUploadImage(images[index]);
          urlArray = [...urlArray, ...imgUrls];
          setTimeout(() => {
            if (index === images.length - 1) {
              resolve(urlArray);
            }
          }, 500);
        }
      }
    });
  };

  const onCreateContest = async () => {
    setLoading(true);
    console.log("files => ", images);
    try {
      const urls = await fileUpload();
      await createContest(urls);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "iPhone" ? "position" : "height"}
      enabled
    >
      <SafeAreaView style={CommonStyle.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <HeaderBackAction
          back_nav={() => navigation.pop()}
          headerText={true}
          headerContain={"Contest"}
          headerViewStyle={{ backgroundColor: "#fff" }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              justifyContent: "space-between",
              borderRadius: 60,
              borderWidth: 2,
              borderColor: "#E9E5E4",
              overflow: "hidden",
              height: hp(5.7),
              width: wp(90),
            }}
          >
            <Pressable
              onPress={() => buttonChange("top")}
              style={{
                backgroundColor: !topButton ? "#fff" : "#4D39E9",
                width: "45%",
                alignItems: "center",
                justifyContent: "center",
                top: 3,
                borderRadius: 50,
                height: hp(4.5),
                left: 5,
              }}
            >
              <Text
                style={{
                  color: !topButton ? "#000000" : "#FFFFFF",
                  fontFamily: "Poppins-Medium",
                  fontSize: getFontSize(15),
                }}
              >
                {Lang.TOP}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => buttonChange("recent")}
              style={{
                backgroundColor: !recentButton ? "#fff" : "#4D39E9",
                width: "45%",
                alignItems: "center",
                justifyContent: "center",
                top: 3,
                borderRadius: 50,
                height: hp(4.5),
                right: 5,
              }}
            >
              <Text
                style={{
                  color: !recentButton ? "#000000" : "#FFFFFF",
                  fontFamily: "Poppins-Medium",
                  fontSize: getFontSize(15),
                }}
              >
                {Lang.RECENT}
              </Text>
            </Pressable>
          </View>
        </View>
        {topButton == true ? (
          <FlatList
            data={topArray}
            extraData={topArray}
            renderItem={_renderToparray}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={recentArray}
            extraData={recentArray}
            renderItem={_renderRecentrray}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        )}
        <CustomButton
          disabled={camera == false ? true : false}
          buttonIcon={camera == false ? greyArrow : arrowbackgroundBlue}
          onPress={() => showDialog()}
          style={{
            backgroundColor: camera == false ? "#F4F2F1" : "#4D39E9",
            width: wp("70%"),
            height: hp("6.5%"),
            bottom: Scaler(40),
            position: "absolute",
          }}
          textStyle={{
            color: camera == false ? "#7F8190" : "#fff",
            fontSize: getFontSize(15),
          }}
          status={"PARTICIPATE"}
        />

        <CreateContestModal
          loading={loading}
          visible={visible}
          camera={camera}
          images={images}
          image={images}
          cameraOpen={cameraOpen}
          postDescription={postDescription}
          ImageUpload={ImageUpload}
          setPostDescription={(val) => setPostDescription(val)}
          backHandler={() => backHandler()}
          closeModal={() => closeModal()}
          openPicker={() => openPicker()}
          renderAsset={(img, index) => renderAsset(img, index)}
          createContest={() => onCreateContest()}
          onDismiss={() => onDismiss()}
        />
        {SuccessVisible == true ? (
          <Provider>
            <Portal>
              <Modal
                visible={SuccessVisible}
                onDismiss={ConhideDialog}
                style={{ justifyContent: "flex-end", position: "absolute" }}
                contentContainerStyle={{
                  backgroundColor: "white",
                  padding: 20,
                  height: hp(50),
                  width: wp(100),
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}
              >
                <Image
                  style={{ width: wp(60), height: hp(18), alignSelf: "center" }}
                  source={congratutionsIcon}
                  resizeMode={"contain"}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: getFontSize(22),
                      width: wp(90),
                      paddingTop: 20,
                      color: "#110D26",
                      lineHeight: 10,
                      textAlign: "center",
                    }}
                  >
                    {Lang.CONGRATS}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: getFontSize(16),
                      width: wp(90),
                      paddingTop: 20,
                      color: "#7F8190",
                      lineHeight: 30,
                      textAlign: "center",
                    }}
                  >
                    {Lang.CONTEST_SUCCESS}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => ConhideDialog()}
                  style={{
                    width: wp(80),
                    height: hp(7),
                    backgroundColor: "#4D39E9",
                    borderRadius: 10,
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "#fff",
                      fontSize: getFontSize(20),
                      fontFamily: "Poppins-Medium",
                      top: Platform.OS == "ios" ? hp(2) : 15,
                    }}
                  >
                    {Lang.OK}
                  </Text>
                </TouchableOpacity>
              </Modal>
            </Portal>
          </Provider>
        ) : null}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
