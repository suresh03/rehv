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
import {
  blackcrossIcon,
  postUrlIcon,
  relatedIcon,
  greyArrow,
  arrowbackgroundBlue,
} from "../../../Assets/icon";
import Scaler from "../../../Utils/Scaler";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import { CustomButton } from "../../../Components/SharedComponents/Button";
import Spacer from "../../../Components/SharedComponents/Space";
import Dropdown from "../../../Components/CustomComponents/DropDownCreatePost";
import { useValidation } from "react-native-form-validator";
import ValidationConstants from "../../../Constants/ValidationConstants";
import Modal from "react-native-modal";
import Lang from "../../../Language";

function CreatePostModal(props) {
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
    relatedToggle,
    selectedCommunity,
    toggleView,
    createPost,
    selectValue,
    relatedData,
    postDescription,
    setPostDescription,
    postUrl,
    setPostUrl,
    loading,
  } = props;

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { selectedCommunity, postUrl },
    ...ValidationConstants,
  });

  useEffect(() => {
    validate({
      postUrl: { postUrl: postUrl, required: false },
    });
  }, [postUrl]);

  useEffect(() => {
    validate({
      selectedCommunity: { required: false },
    });
  }, [selectedCommunity]);

  return (
    <Modal
      animationType="slide"
      hasBackdrop
      isVisible={visible}
      backdropOpacity={0.5}
      backdropColor="#000"
      onBackdropPress={() => backHandler()}
      // onRequestClose={() => {
      //   backHandler();
      // }}
    >
      <View style={styles.modalView}>
        {/* header part */}
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
            {Lang.CREATE_POST}
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
          {camera == true || images == "" ? (
            <View
              style={{
                width: wp(90),
                height: Scaler(154),
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
            <View
              style={{
                width: wp(90),
                height: Scaler(154),
                backgroundColor: "#EEEBFF",
                borderRadius: 10,
                justifyContent: "space-around",
                padding: Scaler(10),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent:
                    images.length == 3 ? "space-between" : "flex-start",
                }}
              >
                {Children.toArray(
                  images.map((i, index) => renderAsset(i, index))
                )}
              </View>
              <Spacer />

              {images.length == 3 ? null : (
                <TouchableOpacity
                  onPress={() => openPicker()}
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    margin: Scaler(10),
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
                    }}
                  >
                    {Lang.ADD_MEDIA}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <Spacer size={Scaler(15)} />

          <TextInput
            mode="outlined"
            outlineColor={theme.colors.border}
            multiline={true}
            placeholder={Lang.POST_DESC}
            placeholderTextColor={"grey"}
            textAlignVertical={"top"}
            value={postDescription}
            onChangeText={(val) => setPostDescription(val)}
            style={{
              width: wp(90),
              paddingHorizontal: Scaler(10),
              maxHeight: Scaler(170),
              minHeight: Scaler(170),
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
            maxLength={350}
          />
          <Spacer size={Scaler(15)} />
          <OutlinedInput
            placeholder={Lang.POST_URL}
            placeholderTextColor={"grey"}
            img={postUrlIcon}
            value={postUrl}
            onChangeText={(val) => setPostUrl(val)}
            errorMessage={getErrorsInField("postUrl")}
            textInputStyle={{
              fontSize: Scaler(14),
              textAlign: "left",
              ...theme.fonts.regular,
            }}
            inputViewStyle={
              isFieldInError("postUrl") ? { borderColor: "red" } : {}
            }
          />

          <Dropdown
            opened={relatedToggle}
            onDropdownClick={toggleView}
            data={relatedData}
            selectedItem={selectedCommunity}
            placeholder={Lang.SELECT_COMMUNITY}
            onSelect={(item) => selectValue(item)}
            leftIcon={relatedIcon}
            borderColor={
              isFieldInError("selectedCommunity") ? "red" : theme.colors.border
            }
            errorMessage={getErrorsInField("selectedCommunity")}
            selectedTextStyle={{
              fontSize: Scaler(14),
              textAlign: "left",
              ...theme.fonts.regular,
            }}
          />

          <Spacer size={Scaler(30)} />

          <CustomButton
            loading={loading}
            disabled={
              images.length == 0 ||
              postDescription == "" ||
              selectedCommunity == null ||
              Object.entries(selectedCommunity).length === 0
            }
            buttonIcon={
              images.length == 0 ||
              postDescription == "" ||
              selectedCommunity == null ||
              Object.keys(selectedCommunity).length === 0 ||
              loading
                ? greyArrow
                : arrowbackgroundBlue
            }
            onPress={() => createPost()}
            status={Lang.CREATEPOST}
          />
          <Spacer size={Scaler(100)} />
        </ScrollView>
      </View>
    </Modal>
  );
}

CreatePostModal.propTypes = {
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
  createPost: PropTypes.func,
  selectValue: PropTypes.func,
  image: PropTypes.object || PropTypes.array,
  selectedCommunity: PropTypes.string,
  ImageUpload: PropTypes.any,
  postUrl: PropTypes.string,
  setPostUrl: PropTypes.func,
  postDescription: PropTypes.string,
  setPostDescription: PropTypes.func,
};

CreatePostModal.defaultProps = {
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
  createPost: () => {},
  selectValue: () => {},
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    height: hp(90),
    width: wp(100),
    alignSelf: "center",
    borderTopRightRadius: Scaler(30),
    borderTopLeftRadius: Scaler(20),
  },
});

export default CreatePostModal;
