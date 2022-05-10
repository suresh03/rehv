import React, { Children, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blackcrossIcon, greyArrow } from "../../../Assets/icon";
import Scaler from "../../../Utils/Scaler";
import { CustomButton } from "../../../Components/SharedComponents/Button";
import Spacer from "../../../Components/SharedComponents/Space";
import { useValidation } from "react-native-form-validator";
import ValidationConstants from "../../../Constants/ValidationConstants";
import { Portal, Provider, Modal } from "react-native-paper";
import Lang from "../../../Language";

function createContestModal(props) {
  const theme = useTheme();
  const {
    visible,
    backHandler,
    closeModal,
    images,
    camera,
    openPicker,
    ImageUpload,
    renderAsset,
    selectedCommunity,
    createContest,
    postDescription,
    setPostDescription,
    loading,
    onDismiss,
  } = props;

  console.log("camera", camera, "images", images);
  const { validate, isFieldInError } = useValidation({
    state: { selectedCommunity },
    ...ValidationConstants,
  });

  useEffect(() => {
    validate({
      selectedCommunity: { required: false },
    });
  }, [selectedCommunity]);

  return (
    <Provider>
      <Portal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            backHandler();
          }}
          onDismiss={onDismiss}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: wp(90),
                  paddingHorizontal: Scaler(5),
                  marginVertical: hp(3),
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 26,
                    ...theme.fonts.semiBold,
                  }}
                >
                  {Lang.PARTICIPATE}
                </Text>
                <TouchableOpacity onPress={() => closeModal()}>
                  <Image
                    source={blackcrossIcon}
                    resizeMode={"contain"}
                    style={{
                      height: Scaler(17),
                      width: Scaler(17),
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {camera == true && images == "" ? (
                  <View
                    style={{
                      width: wp(90),
                      height: Scaler(200),
                      backgroundColor: "#EEEBFF",
                      borderRadius: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity onPress={() => openPicker()}>
                      <Image
                        source={ImageUpload}
                        resizeMode={"contain"}
                        style={{
                          alignSelf: "center",
                          resizeMode: "contain",
                          height: Scaler(50),
                        }}
                      />
                      <Text
                        style={{
                          alignSelf: "center",
                          marginTop: Scaler(8),
                          color: theme.colors.primary,
                          ...theme.fonts.regular,
                          fontSize: 14,
                        }}
                      >
                        {Lang.ADD_MEDIA}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{}}>
                    <View>
                      {Children.toArray(
                        images.map((i, index) => renderAsset(i, index))
                      )}
                    </View>

                    <TouchableOpacity
                      onPress={() => openPicker()}
                      style={{
                        alignSelf: "flex-end",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        zIndex: 2,
                        position: "absolute",
                        bottom: Scaler(10),
                      }}
                    >
                      <Image
                        source={ImageUpload}
                        style={{
                          alignSelf: "center",
                          resizeMode: "contain",
                          height: Scaler(24),
                          width: Scaler(24),
                          marginRight: Scaler(5),
                        }}
                      />
                      <Text
                        style={{
                          alignSelf: "center",
                          color: theme.colors.primary,
                          ...theme.fonts.regular,
                          fontSize: 14,
                          marginRight: Scaler(15),
                        }}
                      >
                        {Lang.EDIT_MEDIA}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Spacer size={Scaler(15)} />

                <TextInput
                  returnKeyType="done"
                  mode="outlined"
                  outlineColor={theme.colors.border}
                  multiline={true}
                  placeholder={Lang.DESCRIPTION}
                  placeholderTextColor={"grey"}
                  multiline={true}
                  textAlignVertical={"top"}
                  value={postDescription}
                  onChangeText={(val) => setPostDescription(val)}
                  style={{
                    width: wp(90),
                    paddingHorizontal: Scaler(10),
                    // maxHeight: Scaler(150),
                    // minHeight: Scaler(150),
                    height: Scaler(150),
                    fontSize: Scaler(14),
                    textAlign: "left",
                    ...theme.fonts.regular,
                    ...(isFieldInError("postDescription")
                      ? { borderColor: "red" }
                      : {}),
                  }}
                  theme={(theme, { roundness: Scaler(10) })}
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <Spacer size={Scaler(30)} />

                <CustomButton
                  loading={loading}
                  disabled={images.length == 0 || postDescription == ""}
                  buttonIcon={
                    images.length == 0 || postDescription == "" || loading
                      ? greyArrow
                      : "#4d39e9"
                  }
                  // style={{backgroundColor:'#F4F2F1'}}
                  onPress={() => createContest()}
                  status={Lang.UPLOAD}
                />
                <Spacer size={Scaler(100)} />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}

createContestModal.propTypes = {
  visible: PropTypes.bool,
  camera: PropTypes.bool,
  cameraOpen: PropTypes.bool,
  relatedToggle: PropTypes.bool,
  images: PropTypes.array,
  relatedData: PropTypes.array,
  backHandler: PropTypes.func,
  closeModal: PropTypes.func,
  openPicker: PropTypes.func,
  renderAsset: PropTypes.func,
  toggleView: PropTypes.func,
  createContest: PropTypes.func,
  selectValue: PropTypes.func,
  image: PropTypes.object || PropTypes.array,
  selectedCommunity: PropTypes.string,
  ImageUpload: PropTypes.any,
  postUrl: PropTypes.string,
  setPostUrl: PropTypes.func,
  postDescription: PropTypes.string,
  setPostDescription: PropTypes.func,
  onDismiss: PropTypes.func,
};

createContestModal.defaultProps = {
  visible: false,
  camera: false,
  cameraOpen: false,
  relatedToggle: false,
  images: [],
  relatedData: [],
  image: {},
  selectedCommunity: "",
  postUrl: "",
  postDescription: "",
  setPostDescription: () => {},
  setPostUrl: () => {},
  backHandler: () => {},
  closeModal: () => {},
  openPicker: () => {},
  renderAsset: () => {},
  toggleView: () => {},
  createContest: () => {},
  selectValue: () => {},
  onDismiss: () => {},
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    top: hp(12),
    alignItems: "center",
    height: Platform.OS === "ios" ? hp(75) : hp(75),
    width: wp(100),
    borderTopRightRadius: Scaler(30),
    borderTopLeftRadius: Scaler(20),
  },
});

export default createContestModal;
