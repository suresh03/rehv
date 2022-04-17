/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  notificationIcon,
  chatIcon,
  homeheaderIcon,
  ImageUpload,
  blackClose,
} from "../../Assets/icon";
import ImageCropPicker from "react-native-image-crop-picker";
import ImagePicker from "react-native-image-crop-picker";
import { useFocusEffect } from "@react-navigation/native";
import { CustomHeader } from "../../Components/CustomHeader/Header";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import useApiServices from "../../Services/useApiServices";
import PicturePicker from "../../Constants/PicturePicker";
import PostCreationSuccessModal from "./Components/PostCreationSuccessModal";
import CreatePostModal from "./Components/CreatePostModal";
import FilePicker from "../../Constants/FilePicker";
import Scaler from "../../Utils/Scaler";
import Video from "react-native-video";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Lang from "../../Language";
import { useSetCreatePostState } from "../../Recoil/createPostAtom";

export default function CreatePostScreen({ navigation, route }) {
  const { ApiPostMethod, ApiGetMethod, ApiBasicFormDataMethod } =
    useApiServices();
  const [imageServerUrl, setImageServerUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [camera, setCamera] = useState(true);
  const [relatedData, setRelatedData] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState({});
  const [relatedToggle, setRelatedToggle] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [postDescription, setPostDescription] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const setModalVisible = useSetCreatePostState();

  useFocusEffect(
    React.useCallback(() => {
      setVisible(true);
      cleanupImages();
    }, [])
  );

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
    Alert.alert(Lang.PROFILE_PICTURE, Lang.CHOOSE_OPTION, [
      { text: Lang.CAMERA, onPress: () => onCamera() },
      { text: Lang.GALLERY, onPress: () => onGallery() },
      { text: Lang.CANCEL, onPress: () => console.log("nnnn") },
    ]);
  };

  const closeModal = () => {
    setVisible(false);
    navigation.navigate("Community");
  };

  // ******************************************toggleView***********************
  const toggleView = () => {
    setRelatedToggle(!relatedToggle);
  };

  // ******************************************selectValue***********************
  const selectValue = (item) => {
    setSelectedCommunity(item);
    setRelatedToggle(false);
  };

  const backHandler = () => {
    setVisible(false);
  };

  const processImageFromGallery = async (file) => {
    console.log("file => ", file);
    let files = [
      {
        name: file.name,
        type: file.type,
        uri: file.path ?? file.uri,
      },
    ];
    if (images.length === 3) {
      SnackbarHandler.errorToast(Lang.MESSAGE, Lang.IMAGE_ERROR);
      Alert.alert(Lang.MESSAGE, Lang.IMAGE_ERROR);
    } else if (files.length + images.length > 3) {
      SnackbarHandler.errorToast(Lang.MESSAGE, Lang.IMAGE_ERROR);
      Alert.alert(Lang.MESSAGE, Lang.IMAGE_ERROR);
      let x = 3 - images.length;
      console.log(x);
      let temp = [...images, ...files.slice(0, x)];
      setImages(temp);
    } else {
      let x = 3 - images.length;
      let temp = [...images, ...files.slice(0, x)];
      setImages(temp);
    }
  };

  const onGallery = async () => {
    setCameraOpen(true);
    // const file = await FilePicker.pickSingle();
    const file = await PicturePicker.captureFromGallery({
      cropping: false,
    });
    if (file.type.includes("image")) {
      // const item = await ImageCropPicker.openCropper({
      //   path: file.uri,
      //   // width: 259,
      //   // height: 172,
      // });
      processImageFromGallery({
        name: file.name,
        uri: file.uri,
        type: file.type,
      });
    } else {
      if (file.type.includes("video") && file?.duration > 20000) {
        Alert.alert(Lang.MESSAGE, Lang.VIDEO_ERROR);
      } else {
        processImageFromGallery(file);
      }
    }
    setCamera(false);
  };

  const onCamera = () => {
    setCameraOpen(false);
    PicturePicker.captureFromCamera({
      cropping: false,
      //  width: 259, height: 172
    }).then((res) => {
      console.log("onCamera => ", res);
      let x = [...images, ...res];
      setImages(x);
      setCamera(false);
    });
  };

  const createPost = async (imgUrl) => {
    // let urls = imgUrl.reduce((acc, item) => acc.concat(item.uri), [])
    setLoading(true);
    let data = {
      description: postDescription,
      pictureUrl: imgUrl.join(","),
      pictureUrlArray: imgUrl,
      postUrl: [postUrl],
      communityId: selectedCommunity.communityId,
    };
    ApiPostMethod("post/createPost", data)
      .then((res) => {
        if (res.statusCode === 200) {
          closeModal();
          setTimeout(() => {
            setModalVisible({ modalVisible: true });
          }, 500);
          SnackbarHandler.successToast(
            Lang.MESSAGE,
            "Post created successfully"
          );
          setPostDescription("");
          setPostUrl("");
          setImageServerUrl([]);
        } else {
          SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
          console.log("res.message =>", res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
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
      urls.push({ image: res.data.original.trim(), type: tempImage.type });
      // urls.push(res.data.original.trim());
      // }
      setImageServerUrl(urls);
      return urls;
    } else {
      SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
      console.log("res.message =>", res.message);
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
      temp.push({ image: res.data.videoLink, type: item.type });
      //temp.push(res.data.videoLink);
      setImageServerUrl(temp);
      return temp;
    } else {
      SnackbarHandler.errorToast(Lang.MESSAGE, res.message);
      console.log("res.message =>", res.message);
      return false;
    }
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

  const onCreatePost = async () => {
    setLoading(true);
    console.log("files => ", images);
    try {
      const urls = await fileUpload();
      await createPost(urls);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedCommunity = () => {
    ApiGetMethod("user/selectedCommunityList").then((res) => {
      //console.log("res => ", res);
      let temp = res?.data?.list.reduce(
        (acc, item) => acc.concat(item._id),
        []
      );
      console.log("data ", temp);
      setRelatedData(temp);
    });
  };

  useEffect(() => {
    getSelectedCommunity();
  }, []);

  const _removeAsset = (index) => {
    let tempArr = [...images];
    let x = tempArr.filter((item, ind) => ind != index);
    setImages(x);
  };

  const playerRef = useRef();
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
    }
    return renderImage(file, index);
  };

  return (
    <View style={CommonStyle.container}>
      <CustomHeader
        Right_nav={true}
        Left_nav={true}
        Center_nav={true}
        RightImage={notificationIcon}
        LeftImage={chatIcon}
        CenterImage={homeheaderIcon}
      />

      <CreatePostModal
        loading={loading}
        visible={visible}
        camera={camera}
        images={images}
        image={images}
        cameraOpen={cameraOpen}
        relatedToggle={relatedToggle}
        relatedData={relatedData}
        selectedCommunity={selectedCommunity.name}
        postDescription={postDescription}
        postUrl={postUrl}
        ImageUpload={ImageUpload}
        setPostUrl={(val) => setPostUrl(val)}
        setPostDescription={(val) => setPostDescription(val)}
        backHandler={() => backHandler()}
        closeModal={() => closeModal()}
        openPicker={() => openPicker()}
        renderAsset={(img, index) => renderAsset(img, index)}
        toggleView={() => toggleView()}
        createPost={() => onCreatePost()}
        selectValue={(item) => selectValue(item)}
      />
    </View>
  );
}
