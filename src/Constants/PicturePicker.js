import { PermissionsAndroid, Platform } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { launchCamera } from "react-native-image-picker";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message: "App needs access to your camera ",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission given");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.log(err);
  }
};

class PicturePicker {
  captureFromCamera = async (imgConstants = {}) =>
    new Promise((resolve, reject) => {
      ImageCropPicker.openCamera({
        cropping: true,
        ...imgConstants
      })
        .then((item) => {
          console.log("image source => ", item?.path);
          let tempName = item?.path?.split("/");
          let name = tempName[tempName.length - 1];

          let file = [
            {
              name: name,
              type: item?.mime,
              uri: Platform.OS == "ios" ? "file://" + item.path : item.path,
            },
          ];
          resolve(file);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });

      // launchCamera()
      //   .then((source) => {
      //     console.log("image source => ", source);
      //     ImageCropPicker.openCropper({
      //       path: source.assets[0].uri,
      //       // width: 300,
      //       // height: 400,
      //     }).then((item) => {
      //       console.log(item);
      //       let file = {
      //         name: source.assets[0].fileName,
      //         type: source.assets[0].type,
      //         uri: item.path,
      //       };
      //       resolve([file]);
      //     });
      //     // let file = source.assets?.map((item) => {
      //     //   return {
      //     //     name: item.fileName,
      //     //     type: item.type,
      //     //     uri: item.uri,
      //     //   };
      //     // });
      //     // resolve(file);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //     reject(e);
      //   });
    });
  captureFromGallery = (imgConstants = {}) =>
    new Promise((resolve, reject) => {
      ImageCropPicker.openPicker({
        ...imgConstants,
      })
        .then((source) => {
          console.log("image source => ", source);
          let temp = source.path.split("/");
          let tempName = temp[temp.length - 1];
          let file = {
            name: Platform.OS === "android" ? tempName : source.filename,
            type: source.mime,
            uri: Platform.OS == "ios" ? "file://" + source.path : source.path,
            duration: source.duration ?? 0,
          };
          resolve(file);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
}

export default new PicturePicker();
