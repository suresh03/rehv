/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useValidation } from "react-native-form-validator";

import CommonStyle from "../../Components/CustomComponents/CommonStyle";
import OutlinedInput from "../../Components/SharedComponents/OutlineTextInput";
import StartMonth from "../../Components/SharedComponents/StartMonth";
import StartYear from "../../Components/SharedComponents/StartYear";

import Spacer from "../../Components/SharedComponents/Space";
import {
  email_icon,
  profilePic,
  textShowIcon,
  arrowbackgroundBlue,
  greyArrow,
  balckCamera,
  nameIcon,
  CalendarSqure,
  companyIcon,
  marketingIcon,
  desigantionIcon,
  linkdingIcon,
  empolyeeId,
  twitterIcon,
  locationIcon,
} from "../../Assets/icon";
import { CustomButton } from "../../Components/SharedComponents/Button";
import moment from "moment";
import Lang from "../../Language";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeaderBackAction } from "../../Components/CustomHeader/Header";
import DatePicker from "react-native-date-picker";
import {
  CountryCode,
  GlobalInput,
} from "../../Components/SharedComponents/CountryCodeModal";
import { country_Code } from "../../Components/CustomComponents/CountryCode";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import {
  getFromLocal,
  removeFromLocal,
  storeToLocal,
} from "../../Utils/LocalStorage";
import PicturePicker from "../../Constants/PicturePicker";
import Scaler from "../../Utils/Scaler";
import SnackbarHandler from "../../Utils/SnackbarHandler";
import Dropdown from "../../Components/CustomComponents/Dropdown";
import OutlinedInputDescription from "../../Components/SharedComponents/OutlinedInputDescription";

let date = new Date();
let maximumBirthDate = new Date(
  date.getFullYear() - 14,
  date.getMonth(),
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
  date.getMilliseconds()
);
import { DeptJson } from "../../Utils/DepartmentData";
import ValidationConstants from "../../Constants/ValidationConstants";
import { useTheme } from "react-native-paper";
import useApiServices from "../../Services/useApiServices";
import countryJson from "../../Constants/CountryStateCity/country.json";
import stateJson from "../../Constants/CountryStateCity/states.json";
import cityJson from "../../Constants/CountryStateCity/city.json";
import { useAppValue, useSetAppState } from "../../Recoil/appAtom";

export default function EditProfileScreen({ navigation, route }) {
  const { ApiPostMethod, ApiGetMethod, ApiBasicFormDataMethod } =
    useApiServices();
  const setAppState = useSetAppState();
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailEditable, setEmailEditable] = useState(true);
  const [phoneEditable, setPhoneEditable] = useState(false);
  const [country, setCountry] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [modalVisibleCountryOpen, setModalVisibleCountryOpen] = useState(false);
  const [date, setDate] = useState(maximumBirthDate);
  const [dateToggle, setDateToggle] = useState(false);
  const [confirmDate, setConfirmDate] = useState("");
  const [defaultText, setDefaultText] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [iconToggle, setIconToggle] = useState(false);
  const [deptArr, setDeptArr] = useState(DeptJson);
  const [departmentField, setDepartmentField] = useState("");
  const [departmentDataAdd, setDepartmentDataAdd] = useState("");
  const [departmentToggle, setDepartmentToggle] = useState(false);
  const [designationField, setDesignationField] = useState("");
  const [designationAdd, setDesignationAdd] = useState("");
  const [designationToggle, setDesignationToggle] = useState(false);
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [profileDescriptionField, setProfileDescriptionField] = useState("");
  const [linkedinValue, setLinkedinValue] = useState("");
  const [twitterValue, setTwitterValue] = useState("");
  const [camera, setCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageServerUrl, setImageServerUrl] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState([]);
  const [token, setToken] = useState("");
  const [provinceToggle, setProvinceToggle] = useState(false);
  const [cityToggle, setCityToggle] = useState(false);
  const [countryToggle, setCountryToggle] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");

  const [provinceField, setProvinceField] = useState("");
  const [cityField, setCityField] = useState("");
  const [imageSourceData, setImageSourceData] = useState({});
  const [designationData, setDesignationData] = useState([]);
  const [employmentDate, setEmploymentDate] = useState("");
  const { languageId } = useAppValue();
  const _logout = async () => {
    try {
      await storeToLocal("user", JSON.stringify({}));
      await storeToLocal("token", "");
      await removeFromLocal("token");
      setTimeout(() => {
        navigation.navigate("SignInScreen");
      }, 100);
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
  };

  const getProfile = async () => {
    try {
      const profile = await getFromLocal("user");
      console.log("profile", profile);
      // var check = moment(profile.employeeStartFrom, 'YYYY/MM/DD');
      let month = profile.employeeStartFrom.split(":")[0];
      let year = profile.employeeStartFrom.split(":")[1];
      console.log("check", profile.department);
      setCompanyCode(String(profile.companyCode));
      setProfilePicUrl(profile.profilePic);
      setFirstName(profile.name);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setMobileNo(profile.phoneNo);
      setEmailEditable(profile.email === undefined || profile.email == "");
      setPhoneEditable(profile.phoneNo === undefined || profile.phoneNo == "");
      setCountry(profile.country);
      setSelectedCode(profile.countryCode);
      setConfirmDate(profile.dateOfBirth);
      setEmployeeId(profile.employeeId);
      setDepartmentField(profile.department);
      setDepartmentDataAdd(profile.department);
      setDesignationField(profile.designation);
      setDesignationAdd(profile.designation);
      setStartMonth(month);
      setStartYear(year);
      setProvinceField(profile.state);
      setCityField(profile.city);
      setManagerEmail(profile.managerEmailId);
      setProfileDescriptionField(profile.profileDescription);
      setLinkedinValue(profile.linkedInUrl);
      setTwitterValue(profile.twitterUrl);
      setToken(profile.accessToken);
      DeptJson?.forEach((item) => {
        // console.log("item", item, profile.department);
        if (item.department === profile.department) {
          setDesignationData(item.designation);
        }
      });

      let arr = DeptJson.reduce((acc, crr, index) => {
        let obj = {
          id: index.toString(),
          name: crr.department,
        };
        return acc.concat(obj);
      }, []);
      setDeptArr(arr);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const setCountryFlag = (dialcode, icon) => {
    setSelectedCode(dialcode);
    setSelectedImage(icon);
    setModalVisibleCountryOpen(false);
  };

  const countryModal = () => {
    modalVisibleCountryOpen == false
      ? setModalVisibleCountryOpen(true)
      : setModalVisibleCountryOpen(false);
  };

  const datePop = () => {
    setDateToggle(!dateToggle);
  };

  const iconViewToggle = () => {
    setIconToggle(!iconToggle);
  };

  const dateset = (selectItem) => {
    setConfirmDate(selectItem);
    setDateToggle(false);
  };

  const departmentToggleView = () => {
    setDepartmentToggle(!departmentToggle);
    setDesignationToggle(false);
  };

  const selectDepartmentValue = (item) => {
    setDesignationAdd("");
    setDepartmentDataAdd(item.name);
    setDepartmentToggle(false);
    DeptJson.forEach((item) => {
      if (item.department === departmentDataAdd) {
        setDesignationData(item.designation);
      }
    });
  };

  const designation_toggleView = () => {
    setDesignationToggle(!designationToggle);
    setDepartmentToggle(false);
  };

  const provinceToggleView = () => {
    setProvinceToggle(!provinceToggle);
    setCityToggle(false);
  };

  const countryToggleView = () => {
    setCountryToggle(!provinceToggle);
    setCityToggle(false);
    setProvinceToggle(false);
  };

  const cityToggleView = () => {
    setCityToggle(!cityToggle);
    setDepartmentToggle(false);
    setProvinceToggle(false);
  };

  const selectDesignationValue = (item) => {
    setDesignationAdd(item.name);
    setDesignationToggle(false);
  };

  const selectProvinceValue = (item) => {
    setCityField("");
    setProvinceField(item.name);
    setProvinceToggle(false);
    setSelectedProvinceId(item.id);
  };
  const selectCountryValue = (item) => {
    setCityField("");
    setProvinceField("");
    setCountry(item.name);
    setCountryToggle(false);
    setSelectedCountryId(item.id);
  };

  setSelectedCountryId;

  const selectCityValue = (nameKey) => {
    setCityField(nameKey);
    setCityToggle(false);
  };

  const openPicker = () => {
    Alert.alert(Lang.PROFILE_PICTURE, Lang.CHOOSE_OPTION, [
      { text: Lang.CAMERA, onPress: () => onCamera() },
      { text: Lang.GALLERY, onPress: () => onGallery() },
      { text: Lang.CANCEL, onPress: () => console.log("nnnn") },
    ]);
  };

  const onGallery = async () => {
    // const file = await FilePicker.pickSingle();
    const file = await PicturePicker.captureFromGallery({
      cropping: true,
    });
    console.log("image captured => ", file);
    setCamera(false);
    setProfilePicUrl(file.uri);
    setImageSourceData(file);
    onUploadProfilePicture(file);
  };

  const onCamera = () => {
    PicturePicker.captureFromCamera().then((res) => {
      console.log("onCamera => ", res);
      setCamera(false);
      setProfilePicUrl(res[0].uri);
      setImageSourceData(res[0]);
      onUploadProfilePicture(res[0]);
    });
  };

  const onUploadProfilePicture = async (imageData) => {
    console.log("imageSourceData", imageSourceData);
    var formData = new FormData();
    formData.append("image", imageData);
    try {
      const res = await ApiBasicFormDataMethod(
        "AdminRoute/uploadImage",
        formData
      );
      if (res.statusCode === 402) {
        _logout();
        return;
      } else {
        if (res.statusCode === 200) {
          setLoading(false);
          setProfilePicUrl(res.data.original.trim());
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCountries(countryJson);
  }, []);

  useEffect(() => {
    let temp = [...stateJson];
    const tempState = temp.filter(
      (item) => item.countryId == selectedCountryId
    );
    console.log("temp => ", selectedCountryId);
    setStates(tempState);
  }, [selectedCountryId]);

  useEffect(() => {
    let temp = [...cityJson];
    const tempCity = temp.filter((item) => item.stateId == selectedProvinceId);
    setCity(tempCity);
  }, [selectedProvinceId]);

  const saveProfile = async () => {
    if (firstName === "") {
      Alert.alert(Lang.FILL_NAME);
    } else if (lastName === "") {
      Alert.alert(Lang.FILL_LNAME);
    } else if (startMonth === "") {
      Alert.alert(Lang.EMP_SDATE_FILL);
    } else if (startYear === "") {
      Alert.alert(Lang.EMP_EDATE_FILL);
    } else {
      setLoading(true);
      let data = {
        profilePic: profilePicUrl,
        name: firstName,
        lastName: lastName,
        emailId: email,
        phoneNo: mobileNo,
        countryCode: selectedCode,
        dateOfBirth: confirmDate,
        employeeId: employeeId,
        department: departmentDataAdd,
        designation: designationAdd,
        employeeStartFrom: startMonth + ":" + startYear,
        state: provinceField,
        city: cityField,
        managerEmailId: managerEmail,
        profileDescription: profileDescriptionField,
        linkedInUrl: linkedinValue,
        twitterUrl: twitterValue,
        companyCode: companyCode,
        country: country,
      //  languageId: languageId,
      };
      console.log("data", data);
      try {
        const res = await ApiPostMethod("user/editProfile", data);
        console.log("res ", res);
        if (res.statusCode === 402) {
          _logout();
          return;
        } else {
          if (res.statusCode === 200) {
            storeToLocal("user", res.data);
            setAppState((s) => ({
              ...s,
              user: res?.data,
            }));
            setPhoneEditable(
              res.data?.phoneNo === undefined ||
                res.data?.emailId?.phoneNo == ""
                ? true
                : false
            );
            setEmailEditable(
              res.data?.emailId === undefined || res.data?.emailId?.email == ""
                ? true
                : false
            );

            navigation.navigate("Dashboard");
          } else {
            SnackbarHandler.errorToast(
              Lang.MESSAGE,
              res.message ?? res.responseType
            );
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  };

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { twitterValue, linkedinValue, startMonth, startYear },
    ...ValidationConstants,
  });

  useEffect(() => {
    setEmploymentDate(startMonth + "/" + startYear);
  }, [startMonth, startYear]);

  useEffect(() => {
    let arr = DeptJson.reduce((acc, crr, index) => {
      let obj = {
        id: index.toString(),
        name: crr.department,
      };
      return acc.concat(obj);
    }, []);
    setDeptArr(arr);
  }, []);

  useEffect(() => {
    DeptJson.forEach((item) => {
      if (item.department.toLowerCase() === departmentDataAdd.toLowerCase()) {
        // console.log(item, departmentDataAdd);
        setDesignationData(item.designation);
      }
    });
  }, [departmentDataAdd]);

  useEffect(() => {
    validate({
      linkedinValue: { linkedin: true, required: false },
    });
  }, [linkedinValue]);

  useEffect(() => {
    validate({
      twitterValue: {
        twitter: true,
        required: false,
      },
    });
  }, [twitterValue]);
  useEffect(() => {
    validate({
      startMonth: {
        empStartMonth: startYear,
        minlength: 1,
        maxlength: 2,
        month: true,
        required: true,
      },
    });
  }, [startMonth]);

  useEffect(() => {
    validate({
      startYear: {
        empStartYear: startMonth,
        minlength: 4,
        maxlength: 4,
        year: true,
        required: true,
      },
    });
  }, [startYear]);

  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={() => setIconToggle(false)}>
      <KeyboardAvoidingView style={CommonStyle.container} behavior="height">
        <SafeAreaView>
          <HeaderBackAction
            // back_nav={() => navigation.pop()}
            back_nav={() =>
              Alert.alert("", Lang.SURE, [
                { text: Lang.YES, onPress: () => saveProfile() },
                {
                  text: Lang.CANCEL,
                  onPress: () => {
                    navigation.navigate("Dashboard");
                  },
                },
              ])
            }
            headerText={true}
            headerContain={Lang.EDIT_PROFILE}
            headerViewStyle={{ backgroundColor: "#fff" }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginVertical: hp(2),
                left: wp(5),
              }}
            >
              {profilePicUrl === "" ? (
                <Image
                  style={{
                    overflow: "hidden",
                    width: Scaler(110),
                    height: Scaler(110),
                    left: wp(5),
                    borderRadius: Scaler(60),
                  }}
                  source={profilePic}
                />
              ) : (
                <Image
                  style={{
                    overflow: "hidden",
                    width: Scaler(110),
                    height: Scaler(110),
                    left: wp(5),
                    borderRadius: Scaler(60),
                  }}
                  source={{ uri: profilePicUrl }}
                />
              )}

              <TouchableOpacity onPress={() => openPicker()}>
                <Image
                  style={{
                    width: wp(25),
                    height: hp(15),
                    alignSelf: "flex-start",
                    zIndex: 1,
                    right: wp(10),
                    top: 50,
                  }}
                  source={balckCamera}
                />
              </TouchableOpacity>
            </View>
            <OutlinedInput
              img={nameIcon}
              inputViewStyle={{ alignSelf: "center" }}
              placeholder={Lang.F_NAME}
              value={firstName}
              handleChange={(text) => setFirstName(text)}
              nameMaxLength={30}
            />

            <OutlinedInput
              img={nameIcon}
              inputViewStyle={{ alignSelf: "center" }}
              placeholder={Lang.L_NAME}
              value={lastName}
              handleChange={(text) => setLastName(text)}
              nameMaxLength={30}
            />

            <OutlinedInput
              placeholder={Lang.EMAIL}
              placeholderTextColor={"grey"}
              img={email_icon}
              editable={emailEditable}
              inputViewStyle={{ alignSelf: "center" }}
              value={email}
              //handleChange={(text) => setState({ email: text })}
            />

            <View
              style={{
                justifyContent: "center",
                flex: 1,
                alignSelf: "center",
              }}
            >
              <View>
                <CountryCode
                  data={country_Code}
                  visible={modalVisibleCountryOpen}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => setCountryFlag(item.dialCode, item.icon)}
                      style={ChangeStyle.counteryStyle}
                    >
                      <Text style={ChangeStyle.counternameStyle}>
                        {item.name}
                      </Text>
                      <Text style={ChangeStyle.countercodeStyle}>
                        {item.dialCode}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index}
                  CancelModal={() => setModalVisibleCountryOpen(false)}
                />
                <GlobalInput
                  placeholder={Lang.NUMBER}
                  placeholderTextColor={"grey"}
                  dropDown={true}
                  onPress={() => (mobileNo == "" ? countryModal() : {})}
                  data={selectedCode}
                  editable={phoneEditable}
                  value={mobileNo}
                  //onChangeText={(text) => setState({ mobileNo: text })}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: wp(88),
                  height: Scaler(65),
                  borderColor: "#a9a9a9",
                  borderWidth: 0.8,
                  borderRadius: Scaler(10),
                  overflow: "hidden",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: Scaler(10),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => datePop()}
                    style={{
                      width: "85%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Image
                      source={CalendarSqure}
                      style={{
                        width: Scaler(35),
                        height: Scaler(35),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        color: confirmDate == "" ? "grey" : "#000",
                        fontSize: Scaler(14),
                        left: Scaler(10),
                      }}
                    >
                      {confirmDate == ""
                        ? defaultText
                        : moment(confirmDate).format("MMMM D YYYY")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: Scaler(40),
                      height: Scaler(40),
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => iconViewToggle()}
                  >
                    <Image
                      source={textShowIcon}
                      style={{
                        width: Scaler(20),
                        height: Scaler(20),
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {iconToggle == false ? null : (
                <View
                  style={{
                    position: "absolute",
                    top: Scaler(48),
                    zIndex: 10,
                    alignSelf: "flex-end",
                    right: Scaler(25),
                  }}
                >
                  <View style={[ChangeStyle.contentTittle]}>
                    <Text style={[ChangeStyle.contentStyle]}>
                      {Lang.PRIVACY_DESC}
                    </Text>
                  </View>
                </View>
              )}
              {dateToggle == false ? null : (
                <View>
                  <DatePicker
                    modal
                    open={dateToggle}
                    date={date}
                    maximumDate={maximumBirthDate}
                    onConfirm={(date) => {
                      dateset(date);
                    }}
                    onCancel={() => {
                      setDateToggle(false);
                    }}
                    mode="date"
                  />
                </View>
              )}
            </View>
            <Spacer size={Scaler(15)} />
            <Text
              style={{
                width: wp(98),
                height: hp("4"),
                fontSize: Scaler(15),
                fontFamily: "Poppins-Medium",
                left: wp(5),
                marginTop: Scaler(5),
                alignSelf: "center",
              }}
            >
              {Lang.JOB_DETAILS}
            </Text>

            <Spacer size={5} />

            <OutlinedInput
              img={companyIcon}
              inputViewStyle={{ alignSelf: "center" }}
              placeholder={Lang.COMPANY_CODE}
              value={companyCode}
              handleChange={(text) => setCompanyCode(text)}
              editable={false}
            />

            <OutlinedInput
              img={empolyeeId}
              inputViewStyle={{ alignSelf: "center" }}
              placeholder={Lang.Employeecode}
              value={employeeId}
              handleChange={(text) => setEmployeeId(text)}
            />

            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Dropdown
                opened={departmentToggle}
                onDropdownClick={() => departmentToggleView()}
                data={deptArr}
                selectedItem={departmentDataAdd}
                placeholder={Lang.DEPT}
                onSelect={(item) => selectDepartmentValue(item)}
                leftIcon={marketingIcon}
                borderColor={
                  isFieldInError("departmentDataAdd")
                    ? "red"
                    : theme.colors.border
                }
                errorMessage={getErrorsInField("departmentDataAdd")}
              />
            </View>
            <Spacer size={15} />

            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Dropdown
                opened={designationToggle}
                onDropdownClick={() => designation_toggleView()}
                data={designationData}
                selectedItem={designationAdd}
                placeholder={Lang.DESIGNATION}
                onSelect={(item) => selectDesignationValue(item)}
                leftIcon={desigantionIcon}
                borderColor={
                  isFieldInError("designationAdd") ? "red" : theme.colors.border
                }
                errorMessage={getErrorsInField("designationAdd")}
              />
            </View>

            <Spacer size={15} />
            <View style={{ left: Scaler(25) }}>
              <Text
                style={{
                  width: wp(99),
                  height: hp(4),
                  fontSize: Scaler(15),
                  fontFamily: "Poppins-Medium",
                }}
              >
                {Lang.EMP_SDATE}
              </Text>
              <Spacer />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(100) - 44,
                }}
              >
                <StartMonth
                  placeholder={Lang.MONTH}
                  placeholderTextColor={"grey"}
                  img={CalendarSqure}
                  customStyle={{}}
                  value={startMonth}
                  handleChange={(text) =>
                    setStartMonth(text.replace(/[^0-9]/g, ""))
                  }
                  inputViewStyle={{
                    width: wp("43%"),
                    borderColor: isFieldInError("startMonth")
                      ? "red"
                      : theme.colors.border,
                  }}
                  errorMessage={getErrorsInField("startMonth")}
                />

                <StartYear
                  inputViewStyle={{
                    width: wp("43%"),
                    borderColor: isFieldInError("startYear")
                      ? "red"
                      : theme.colors.border,
                  }}
                  errorMessage={getErrorsInField("startYear")}
                  placeholder={Lang.JOB_YEAR}
                  placeholderTextColor={"grey"}
                  img={CalendarSqure}
                  //value={startYear}
                  value={startYear}
                  handleChange={(text) =>
                    setStartYear(text.replace(/[^0-9]/g, ""))
                  }
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Dropdown
                opened={countryToggle}
                onDropdownClick={() => countryToggleView()}
                data={countries}
                selectedItem={country}
                placeholder={Lang.COUNTRY}
                onSelect={(item) => selectCountryValue(item)}
                leftIcon={locationIcon}
              />
            </View>

            <Spacer size={15} />
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Dropdown
                opened={provinceToggle}
                onDropdownClick={() => provinceToggleView()}
                data={states}
                selectedItem={provinceField}
                placeholder={Lang.PROVINCE}
                onSelect={(item) => selectProvinceValue(item)}
                leftIcon={locationIcon}
              />
            </View>

            <Spacer size={15} />
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Dropdown
                opened={cityToggle}
                onDropdownClick={() => cityToggleView()}
                data={city}
                selectedItem={cityField}
                placeholder={Lang.CITY}
                onSelect={(item) => selectCityValue(item.name)}
                leftIcon={locationIcon}
              />
            </View>

            <Spacer size={15} />
            <Text
              style={{
                fontSize: Scaler(15),
                fontFamily: "Poppins-Medium",
                left: wp(6.2),
              }}
            >
              {Lang.MANAGER_EMAIL}
            </Text>
            <Spacer />
            <OutlinedInput
              placeholder={Lang.EMAIL}
              placeholderTextColor={"grey"}
              img={email_icon}
              inputViewStyle={{ alignSelf: "center" }}
              value={managerEmail}
              handleChange={(text) => setManagerEmail(text)}
            />
            <Text
              style={{
                fontSize: Scaler(15),
                fontFamily: "Poppins-Medium",
                left: wp(6.2),
              }}
            >
              {Lang.PROFILE_DESC}
            </Text>
            <Spacer size={10} />
            <OutlinedInputDescription
              img={email_icon}
              placeholder={Lang.PROFILE_DESC}
              placeholderTextColor={"grey"}
              inputViewStyle={{
                height: hp(25),
                alignSelf: "center",
              }}
              customStyle={{
                height: hp(25),
                fontFamily: "Poppins-Regular",
              }}
              textInputStyle={{ height: hp(25) }}
              multiline={true}
              value={profileDescriptionField}
              handleChange={(text) => setProfileDescriptionField(text)}
              textAlignVertical={"top"}
              onSubmitEditing={() => Keyboard.dismiss()}
              maxLength={350}
            />

            <Text
              style={{
                fontSize: Scaler(15),
                fontFamily: "Poppins-Medium",
                left: wp(6.2),
              }}
            >
              {Lang.SOCIAL_MEDIA1}
            </Text>

            <Spacer />
            <View style={{ alignSelf: "center" }}>
              <OutlinedInput
                placeholder={Lang.LINKEDIN}
                placeholderTextColor={"grey"}
                img={linkdingIcon}
                value={linkedinValue}
                handleChange={(text) => setLinkedinValue(text)}
                textInputStyle={{
                  height: Platform.OS === "android" ? hp(7) : hp(5),
                }}
                inputViewStyle={
                  isFieldInError("linkedinValue")
                    ? { borderColor: "red", alignSelf: "center" }
                    : { alignSelf: "center" }
                }
                errorMessage={getErrorsInField("linkedinValue")}
              />
            </View>
            <View style={{ alignSelf: "center" }}>
              <OutlinedInput
                placeholder={Lang.TWITTER}
                placeholderTextColor={"grey"}
                img={twitterIcon}
                value={twitterValue}
                handleChange={(text) => setTwitterValue(text)}
                textInputStyle={{
                  height: Platform.OS === "android" ? hp(7) : hp(5),
                }}
                errorMessage={getErrorsInField("twitterValue")}
                inputViewStyle={
                  isFieldInError("twitterValue")
                    ? { borderColor: "red", alignSelf: "center" }
                    : { alignSelf: "center" }
                }
              />
            </View>
            <Spacer size={20} />
            <CustomButton
              // onPress={() => navigation.navigate("Dashboard")}
              loading={loading}
              onPress={() => saveProfile()}
              buttonIcon={loading ? greyArrow : arrowbackgroundBlue}
              textStyle={{ color: "#fff", fontSize: Scaler(15) }}
              status={Lang.SAVE}
            />
            <View style={{ marginVertical: hp(4) }} />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
