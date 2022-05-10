import React, { useState } from "react";
/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity, Platform, View, Image, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Padding from "../../../Components/SharedComponents/Padding";
import { TextField } from "../../../Components/SharedComponents/TextField";
import Spacer from "../../../Components/SharedComponents/Space";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import { cemeraProfileIcon } from "../../../Assets/icon";
import PropTypes from "prop-types";
import Scaler from "../../../Utils/Scaler";
import FilePicker from "../../../Constants/FilePicker";
import PicturePicker from "../../../Constants/PicturePicker";
import Lang from "../../../Language";

function UpdateProfilePicture(props) {
  const {
    uploadImageToServer,
    placeHolder,
    imageSource,
    setImageSource,
    imageServerUrl,
    camera,
    setCamera,
  } = props;

  // ****openPicker
  const openPicker = () => {
    Alert.alert("Profile Picture", "Choose an option", [
      { text: "CAMERA", onPress: () => onCamera() },
      { text: "GALLERY", onPress: () => onGallery() },
      { text: Lang.CANCEL, onPress: () => console.log("nnnn") },
    ]);
  };
  const onGallery = async () => {
    // const file = await FilePicker.pickSingle();
    const file = await PicturePicker.captureFromGallery({
      cropping: true
    })
    console.log('image captured => ', file);
    setImageSource(file);
    setCamera(false);
  };

  const onCamera = () => {
    PicturePicker.captureFromCamera().then((res) => {
      console.log("onCamera => ", res);
      setImageSource(res[0]);
      setCamera(false);
    });
  };

  return (
    <View style={{ height: Platform.OS === "ios" ? hp(81) : hp(84) }}>
      <View>
        <TextField
          textStyle={[
            CommonStyle.tittleStyle,
            { top: Platform.OS == "ios" ? hp(0.5) : hp(1) },
          ]}
          status={Lang.UPLOAD_PROFILE}
        />
        <Spacer size={20} />
        <TouchableOpacity
          onPress={() => openPicker()}
          style={{
            alignSelf: "center",
            width: Scaler(250),
            height: Scaler(270),
          }}
        >
          {camera === true ? (
            <View>
              <View
                style={{
                  width: Scaler(250),
                  height: Scaler(250),
                  borderRadius: Scaler(250) / 2,
                  overflow: "hidden",
                  borderWidth: 0.8,
                  borderColor: "lightgrey",
                  justifyContent: "center",
                }}
              >
                <TextField
                  textStyle={{
                    fontSize: Scaler(70),
                    color: "#000",
                    fontFamily: "Poppins-Regular",
                    alignSelf: "center",
                  }}
                  status={placeHolder.toUpperCase()}
                />
              </View>
              <Image
                source={cemeraProfileIcon}
                style={{
                  width: wp(40),
                  height: hp(20),
                  alignSelf: "center",
                  top: Scaler(-75),
                }}
                resizeMode={"contain"}
              />
            </View>
          ) : (
            <View>
              <Image
                style={{
                  width: Scaler(250),
                  height: Scaler(250),
                  borderRadius: Scaler(250) / 2,
                  overflow: "hidden",
                  borderWidth: 0.8,
                  borderColor: "lightgrey",
                  justifyContent: "center",
                }}
                source={{
                  uri: imageServerUrl != "" ? imageServerUrl : imageSource.uri,
                }}
              />

              <Image
                source={cemeraProfileIcon}
                style={{
                  width: wp(40),
                  height: hp(20),
                  alignSelf: "center",
                  top: Scaler(-75),
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

UpdateProfilePicture.propTypes = {
  camera: PropTypes.bool,
  openPicker: PropTypes.func,
  imageSource: PropTypes.any,
};
UpdateProfilePicture.defaultProps = {
  camera: false,
};

export default UpdateProfilePicture;
