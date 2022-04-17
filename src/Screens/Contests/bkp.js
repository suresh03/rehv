/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
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
  wwwee,
  greylogoIcon,
  rehvupIcon,
  blackcrossIcon,
  ImageUpload,
  greyArrow,
  congratutionsIcon,
  catIcon,
  playIcon,
  likeIcon,
  likeBlackIcon,
  blackClose,
} from "../../Assets/icon";
import ImagePicker from "react-native-image-crop-picker";
import { Portal, Provider, Modal } from "react-native-paper";
import { CustomButton } from "../../Components/SharedComponents/Button";
import OutlinedInput from "../../Components/SharedComponents/OutlinedInput";
import { useTheme } from "react-native-paper";
import CreateContestModal from "./Components/CreateContestModal";
import { useFocusEffect } from "@react-navigation/native";
import useApiServices from "../../Services/useApiServices";
import PicturePicker from "../../Constants/PicturePicker";
import ImageCropPicker from "react-native-image-crop-picker";
import FilePicker from "../../Constants/FilePicker";
import Scaler from "../../Utils/Scaler";
import Video from "react-native-video";
import { types } from "react-native-document-picker";
import SnackbarHandler from "../../Utils/SnackbarHandler";

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
    GetTopList();
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
    console.log("item", item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ContestPictureScreen", { item: item })
        }
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          shadowOpacity: 0.1,
          elevation: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          alignSelf: "center",
          width: wp(40),
          marginHorizontal: wp(4),
          marginVertical: hp(2),
        }}
      >
        {/* <ImageBackground
          source={{ uri: item.pictureUrl[0] }}
          style={{
            marginVertical: hp(1),
            width: wp(37),
            height: hp(13),
            alignSelf: "center",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
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
          <View style={{ flexDirection: "row", top: hp(3), right: wp(2) }}>
            <Image
              source={item?.isLikes ? likeIcon : likeBlackIcon}
              style={{ width: wp(15), height: hp(3), top: hp(2) }}
              resizeMode={"contain"}
            />
            <Text
              style={{
                width: wp(10),
                height: hp(3),
                top: hp(2.5),
                color: "#ffff",
                fontFamily: "Poppins-Medium",
                right: wp(2.5),
              }}
            >
              {item.totalLikes}
            </Text>
          </View>
        </ImageBackground> */}
        <View
          style={{
            width: wp(37),
            height: hp(13),
            alignSelf: "center",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {item?.pictureUrl[0] ? (
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
              }}
              style={{
                width: wp(37),
                height: hp(13),
                alignSelf: "center",
              }}
              resizeMode={"contain"}
            />
          ) : null}

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
          <View style={{ flexDirection: "row", top: hp(3), right: wp(2) }}>
            <Image
              source={item?.isLikes ? likeIcon : likeBlackIcon}
              style={{ width: wp(15), height: hp(3), top: hp(2) }}
              resizeMode={"contain"}
            />
            <Text
              style={{
                width: wp(10),
                height: hp(3),
                top: hp(2.5),
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
            left: wp(2),
            lineHeight: hp(2.5),
            top: hp(0.5),
            color: "#000",
            fontSize: 13.5,
          }}
        >
          {item.description}
        </Text>
        <View style={{ flexDirection: "row", marginVertical: hp(1) }}>
          <Image
            source={{ uri: item.userData.profilePic }}
            resizeMode={"contain"}
            style={{ top: hp(1), width: wp(9), height: hp(4), left: wp(1.5) }}
          />
          <Text
            style={{
              top: hp(0.8),
              left: wp(4),
              fontFamily: "Poppins-SemiBold",
              color: "#110D26",
            }}
          >
            {item.userData.name} {item.userData.lastName}
          </Text>
        </View>
        <Text
          style={{
            top: hp(-2.2),
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

  const _renderRecentrray = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ContestPictureScreen", { item: item })
        }
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          shadowOpacity: 0.1,
          elevation: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          alignSelf: "center",
          width: wp(40),
          marginHorizontal: wp(4),
          marginVertical: hp(2),
        }}
      >
        <ImageBackground
          source={{ uri: item.pictureUrl[0] }}
          style={{
            marginVertical: hp(1),
            width: wp(37),
            height: hp(13),
            alignSelf: "center",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {item.pictureUrl[0] == "" ? (
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
              source={item.pictureUrl[0]}
              style={{
                width: wp(15),
                height: hp(3),
                top: hp(4),
                alignSelf: "center",
              }}
              resizeMode={"contain"}
            />
          )}
          <View style={{ flexDirection: "row", top: hp(3), right: wp(2) }}>
            <Image
              source={item?.isLikes ? likeIcon : likeBlackIcon}
              style={{ width: wp(15), height: hp(3), top: hp(2) }}
              resizeMode={"contain"}
            />
            <Text
              style={{
                width: wp(10),
                height: hp(3),
                top: hp(2.5),
                color: "#ffff",
                fontFamily: "Poppins-Medium",
                right: wp(2.5),
              }}
            >
              {item.totalLikes}
            </Text>
          </View>
        </ImageBackground>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            left: wp(2),
            lineHeight: hp(2.5),
            top: hp(0.5),
            color: "#000",
            fontSize: 13.5,
          }}
        >
          {item.description}
        </Text>
        <View style={{ flexDirection: "row", marginVertical: hp(1) }}>
          <Image
            source={{ uri: item.userData.profilePic }}
            resizeMode={"contain"}
            style={{ top: hp(1), width: wp(9), height: hp(4), left: wp(1.5) }}
          />
          <Text
            style={{
              top: hp(0.8),
              left: wp(4),
              fontFamily: "Poppins-SemiBold",
              color: "#110D26",
            }}
          >
            {item.userData.name} {item.userData.lastName}
          </Text>
        </View>
        <Text
          style={{
            top: hp(-2.2),
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

  const _removeAsset = (index) => {
    let tempArr = [...images];
    let x = tempArr.filter((item, ind) => ind != index);
    setImages(x);
  };

  const renderVideo = (video, index) => {
    return (
      <View
        style={{
          alignSelf: "center",
          width: Scaler(70),
          height: Scaler(70),
          borderRadius: Scaler(11),
          alignItems: "center",
          margin: Scaler(15),
        }}
      >
        <View
          style={{
            alignSelf: "center",
            width: Scaler(70),
            height: Scaler(70),
            borderRadius: Scaler(11),
            borderRadius: Scaler(10),
            backgroundColor: "#000",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Video
            source={{
              uri: video?.uri?.trim(),
            }}
            ref={playerRef}
            style={{
              height: Scaler(70),
              width: Scaler(70),
              borderRadius: Scaler(10),
            }}
            paused={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => _removeAsset(index)}
          style={{
            alignSelf: "flex-start",
            position: "absolute",
            top: -6,
            right: -8,
            zIndex: 2,
          }}
        >
          <Image
            source={blackClose}
            resizeMode={"contain"}
            style={{
              height: Scaler(20),
              width: Scaler(20),
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderImage = (image, index) => {
    return (
      <View style={{ alignSelf: "center" }}>
        <ImageBackground
          style={{
            width: Scaler(70),
            height: Scaler(70),
            borderRadius: Scaler(11),
            alignItems: "center",
            justifyContent: "space-between",
            margin: Scaler(15),
          }}
          imageStyle={{
            width: Scaler(70),
            height: Scaler(70),
            borderRadius: Scaler(11),
            resizeMode: "cover",
          }}
          source={image}
        >
          <TouchableOpacity onPress={() => _removeAsset(index)}>
            <Image
              source={blackClose}
              resizeMode={"contain"}
              style={{
                height: Scaler(20),
                width: Scaler(20),
                alignSelf: "flex-end",
                top: Scaler(-6),
                right: Scaler(-30),
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
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
    const file = await FilePicker.pickSingle();
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

  const backHandler = () => {
    setVisible(false);
    cleanupImages();
    setPostDescription("");
  };

  const createContest = async (imgUrl) => {
    setLoading(true);
    let data = {
      description: postDescription,
      pictureUrl: imgUrl,
      postId: route.params.postId,
    };

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
  };

  const fileUpload = () => {
    let urlArray = [];
    return new Promise(async (resolve, reject) => {
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
          headerContain={"Contest Title"}
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
