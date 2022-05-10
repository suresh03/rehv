/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
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
import UltimateConfig from "react-native-ultimate-config";

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
  empolyeeId,
  dropdwon,
  marketingIcon,
  desigantionIcon,
  linkdingIcon,
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
import ValidationComponent from "react-native-form-validator";

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

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: "",
      imageSource: "",
      fristname: "",
      lastname: "",
      email: "",
      mobaileNo: "",
      emailEditable: true,
      phoneEditable: false,
      Country: false,
      selectedCode: "",
      modalVisible_Country_Open: false,
      date: maximumBirthDate,
      datetoggle: false,
      confirmDate: "",
      defaulttext: "",
      companycode: "",
      empolyeeId: "",
      icontoggle: false,
      deptArr: DeptJson,
      depertmentfield: "",
      departmentdataAdd: "",
      departmentToggle: false,
      desigantionfield: "",
      desigantionAdd: "",
      desigantionToggle: false,
      startmonth: "",
      startyear: "",
      provincefiled: "",
      cityfiled: "",
      manegeremail: "",
      profileDescriotionfield: "",
      linkdingValue: "",
      twitterValue: "",
      camera: false,
      loading: false,
      imageServerUrl: [],
      states: [],
      city: [],
      token: "",
      provinceToggle: false,
      cityToggle: false,
      selectedProvinceId: "",
      imageSourceData: {},
      desigantionData: [],
    };
  }

  _logout = async () => {
    try {
      await storeToLocal("user", JSON.stringify({}));
      await storeToLocal("token", "");
      await removeFromLocal("token");
      setTimeout(() => {
        this._logout.props.navigation.navigate("SignInScreen");
      }, 100);
    } catch (error) {
      console.log(error);
      this.props.navigation.goBack();
    }
  };

  componentDidMount = async () => {
    getFromLocal("user").then((profile) => {
      console.log("profile", profile);
      // var check = moment(profile.employeeStartFrom, 'YYYY/MM/DD');
      var month = profile.employeeStartFrom.split(":")[0];
      var year = profile.employeeStartFrom.split(":")[1];
      console.log("check", profile.department);
      this.setState(
        {
          profilePic: profile.profilePic,
          fristname: profile.name,
          lastname: profile.lastName,
          email: profile.email,
          mobaileNo: profile.phoneNo,
          emailEditable: profile.email === undefined || profile.email == "",
          phoneEditable: profile.phoneNo === undefined || profile.phoneNo == "",
          Country: profile.country,
          selectedCode: profile.countryCode,
          confirmDate: profile.dateOfBirth,
          empolyeeId: profile.employeeId,
          cameraOpen: false,
          depertmentfield: profile.department,
          departmentdataAdd: profile.department,
          desigantionfield: profile.designation,
          desigantionAdd: profile.designation,
          startmonth: month,
          startyear: year,
          provincefiled: profile.state,
          cityfiled: profile.city,
          manegeremail: profile.managerEmailId,
          profileDescriotionfield: profile.profileDescription,
          linkdingValue: profile.linkedInUrl,
          twitterValue: profile.twitterUrl,
          companycode: profile.companyCode.toString(),
          token: profile.accessToken,
          languageId: "5afeb323e17292bad4f89825",
        },
        () => {
          DeptJson?.forEach((item) => {
            console.log("item", item, profile.department);
            if (item.department === profile.department) {
              this.setState({
                desigantionData: item.designation,
              });
              console.log("lone", this.state.desigantionData);
            }
          });
        }
      );
    });
    this.provinceList();
    this.stateList();

    let arr = DeptJson.reduce((acc, crr, index) => {
      let obj = {
        id: index.toString(),
        name: crr.department,
      };
      return acc.concat(obj);
    }, []);
    this.setState({
      deptArr: arr,
    });
  };
  setCountryflag(dialcode, icon) {
    this.setState({
      selectedCode: dialcode,
      selectedImage: icon,
      modalVisible_Country_Open: false,
    });

    // AsyncStorage.setItem("countryIcon", dialcode);
  }
  countryModal() {
    this.state.modalVisible_Country_Open == false
      ? this.setState({ modalVisible_Country_Open: true })
      : this.setState({ modalVisible_Country_Open: false });
  }
  // ******************************************datePop***********************
  datePop = () => {
    this.setState({ datetoggle: !this.state.datetoggle });
  };
  // ******************************************iconViewtoglle***********************
  iconViewtoglle = () => {
    this.setState({ icontoggle: !this.state.icontoggle });
  };
  // ******************************************dateset***********************
  dateset = (selcetitem) => {
    this.setState({ confirmDate: selcetitem, datetoggle: false });
  };
  // ******************************************depertment_toggleView***********************
  depertment_toggleView = () => {
    this.setState({
      departmentToggle: !this.state.departmentToggle,
      desigantionToggle: false,
    });
  };
  // ******************************************selectderpenetValue***********************
  selectderpenetValue = (item) => {
    console.log("item===>", item);
    this.setState({
      desigantionAdd: "",
      departmentdataAdd: item.name,
      departmentToggle: false,
    });
    DeptJson.forEach((item) => {
      if (item.department === this.state.departmentdataAdd) {
        this.setState({
          desigantionData: item.designation,
        });
        console.log("lone", this.state.desigantionData);
      }
    });
  };

  designation_toggleView = () => {
    this.setState({
      desigantionToggle: !this.state.desigantionToggle,
      departmentToggle: false,
    });
  };

  province_toggleView = () => {
    this.setState({
      provinceToggle: !this.state.provinceToggle,
      // departmentToggle: false,
      cityToggle: false,
    });
  };

  city_toggleView = () => {
    this.setState({
      cityToggle: !this.state.cityToggle,
      departmentToggle: false,
      provinceToggle: false,
    });
  };
  selectDesignationValue = (item) => {
    console.log("desigantion Add item===>", item);
    this.setState({
      desigantionAdd: item.name,
      desigantionToggle: false,
    });
  };

  selectProvinceValue = (item) => {
    console.log("item.abbreviation===>", item.abbreviation);
    this.setState({
      cityfiled: "",
      provincefiled: item.name,
      provinceToggle: false,
      selectedProvinceId: item.abbreviation,
    });
    this.stateList(item.abbreviation);
  };

  selectCityValue = (nameKey) => {
    console.log("desigantionAdditem===>", nameKey);
    this.setState({
      cityfiled: nameKey,
      cityToggle: false,
    });
  };

  // ****openPicker
  openPicker = () => {
    Alert.alert(Lang.PROFILE_PICTURE, Lang.CHOOSE_OPTION, [
      { text: Lang.CAMERA, onPress: () => this.onCamera() },
      { text: Lang.GALLERY, onPress: () => this.onGallery() },
      { text: Lang.CANCEL, onPress: () => console.log("nnnn") },
    ]);
  };
  onGallery = async () => {
    // const file = await FilePicker.pickSingle();
    const file = await PicturePicker.captureFromGallery({
      cropping: true,
    });
    console.log("image captured => ", file);
    // setImageSource(file);
    // setCamera(false);
    this.setState({
      camera: false,
      profilePic: file.uri,
      imageSourceData: file,
    });
    this.onUploadProfilePicture();
  };

  onCamera = () => {
    PicturePicker.captureFromCamera().then((res) => {
      console.log("onCamera => ", res);

      // setImageSource(res[0]);
      // setCamera(false);
      this.setState({
        camera: false,
        profilePic: res[0].uri,
        imageSourceData: res[0],
      });
      this.onUploadProfilePicture();
    });
  };

  onUploadProfilePicture = async () => {
    // this.setState({
    //   loading: true,
    // });
    var formData = new FormData();
    formData.append("image", this.state.imageSourceData);
    console.log("onUploadProfilePicture", JSON.stringify(formData));
    try {
      const response = await fetch(
        `${UltimateConfig.API_URL}AdminRoute/uploadImage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.state.token,
          },
          body: formData,
          redirect: "follow",
        }
      );
      const res = await response.json();
      console.log("hello", res);
      if (res.statusCode === 402) {
        this._logout();
        return;
      } else {
        if (res.statusCode === 200) {
          this.setState({
            loading: false,
            profilePic: res.data.original.trim(),
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  async provinceList() {
    // getFromLocal("token").then((token) => {
    //   console.log("token", token);
    //   this.setState({
    //     token: token,
    //   });
    // });
    try {
      const response = await fetch(
        `${UltimateConfig.API_URL}user/getStatesList`,
        {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.state.token,
          },
        }
      );
      const res = await response.json();
      if (res.statusCode === 402) {
        this._logout();
        return;
      } else {
        if (res.statusCode === 200) {
          let states = res.data.list.map(
            ({ createdAt, updatedAt, __v, ...rest }) => {
              return rest;
            }
          );
          console.log("stateliest ", states);
          this.setState({
            states: states,
          });
          console.log("provinceToggle", this.state.states);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async stateList(id) {
    console.log("province_id", id);
    try {
      const response = await fetch(
        `${UltimateConfig.API_URL}user/getProvincesList?province_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.state.token,
          },
        }
      );
      const res = await response.json();
      console.log("res", res);
      if (res.statusCode === 402) {
        this._logout();
        return;
      } else {
        if (res.statusCode === 200) {
          let city = res.data.list.map(({ _id, city }) => {
            let obj = {
              _id: _id,
              name: city,
            };
            return obj;
          });
          this.setState({
            city: city,
          });
          console.log("city", this.state.city);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  saveProfile = async () => {
    console.log("this.state.fristname", this.state.fristname);
    if (this.state.fristname === "") {
      Alert.alert(Lang.FILL_NAME);
    } else if (this.state.lastname === "") {
      Alert.alert(Lang.FILL_LNAME);
    } else if (this.state.startmonth === "") {
      Alert.alert(Lang.EMP_SDATE_FILL);
    } else if (this.state.startyear === "") {
      Alert.alert(Lang.EMP_EDATE_FILL);
    } else {
      this.setState({
        loading: true,
      });
      let data = {
        profilePic: this.state.profilePic,
        name: this.state.fristname,
        lastName: this.state.lastname,
        emailId: this.state.email,
        phoneNo: this.state.mobaileNo,
        countryCode: this.state.selectedCode,
        dateOfBirth: this.state.confirmDate,
        employeeId: this.state.empolyeeId,
        department: this.state.departmentdataAdd,
        designation: this.state.desigantionAdd,
        employeeStartFrom: this.state.startmonth + ":" + this.state.startyear,
        state: this.state.provincefiled,
        city: this.state.cityfiled,
        managerEmailId: this.state.manegeremail,
        profileDescription: this.state.profileDescriotionfield,
        linkedInUrl: this.state.linkdingValue,
        twitterUrl: this.state.twitterValue,
        companyCode: this.state.companycode,
      };
      console.log("data", data);
      try {
        const response = await fetch(
          `${UltimateConfig.API_URL}user/editProfile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.state.token,
            },
            body: JSON.stringify(data),
          }
        );
        const res = await response.json();
        console.log("res ", res);
        if (res.statusCode === 402) {
          this._logout();
          return;
        } else {
          if (res.statusCode === 200) {
            console.log("stateliest ", res);
            storeToLocal("user", res.data);
            this.setState({
              emailEditable:
                res.data?.emailId === undefined ||
                res.data?.emailId?.email == ""
                  ? true
                  : false,
              phoneEditable:
                res.data?.phoneNo === undefined ||
                res.data?.emailId?.phoneNo == ""
                  ? true
                  : false,
            });
            this.props.navigation.navigate("Dashboard");
          } else {
            SnackbarHandler.errorToast(
              Lang.MESSAGE,
              res.message ?? res.responseType
            );
          }
        }
        this.setState({
          loading: false,
        });
      } catch (error) {
        this.setState({
          loading: false,
        });
        console.error(error);
      }
    }
  };

  render() {
    console.log("this.state.profilePic", this.state.profilePic);
    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ icontoggle: false })}
      >
        <KeyboardAvoidingView style={CommonStyle.container} behavior="height">
          <SafeAreaView>
            <HeaderBackAction
              // back_nav={() => this.props.navigation.pop()}
              back_nav={() =>
                Alert.alert("", Lang.SURE, [
                  { text: Lang.YES, onPress: () => this.saveProfile() },
                  {
                    text: Lang.CANCEL,
                    onPress: () => {
                      this.props.navigation.navigate("Dashboard");
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
                {this.state.profilePic === "" ? (
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
                    source={{ uri: this.state.profilePic }}
                  />
                )}

                <TouchableOpacity onPress={() => this.openPicker()}>
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
                value={this.state.fristname}
                handleChange={(text) => this.setState({ fristname: text })}
                nameMaxLength={30}
              />

              <OutlinedInput
                img={nameIcon}
                inputViewStyle={{ alignSelf: "center" }}
                placeholder={Lang.L_NAME}
                value={this.state.lastname}
                handleChange={(text) => this.setState({ lastname: text })}
                nameMaxLength={30}
              />

              <OutlinedInput
                placeholder={Lang.EMAIL}
                placeholderTextColor={"grey"}
                img={email_icon}
                editable={this.state.emailEditable}
                inputViewStyle={{ alignSelf: "center" }}
                value={this.state.email}
                //handleChange={(text) => this.setState({ email: text })}
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
                    visible={this.state.modalVisible_Country_Open}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.setCountryflag(item.dialCode, item.icon)
                        }
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
                    CancelModal={() =>
                      this.setState({ modalVisible_Country_Open: false })
                    }
                  />
                  <GlobalInput
                    placeholder={Lang.NUMBER}
                    placeholderTextColor={"grey"}
                    dropDown={true}
                    onPress={() =>
                      this.state.mobaileNo == "" ? this.countryModal() : {}
                    }
                    data={this.state.selectedCode}
                    editable={this.state.phoneEditable}
                    value={this.state.mobaileNo}
                    //onChangeText={(text) => this.setState({ mobaileNo: text })}
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
                      onPress={() => this.datePop()}
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
                          color: this.state.confirmDate == "" ? "grey" : "#000",
                          fontSize: Scaler(14),
                          left: Scaler(10),
                        }}
                      >
                        {this.state.confirmDate == ""
                          ? this.state.defaulttext
                          : moment(this.state.confirmDate).format(
                              "MMMM D YYYY"
                            )}
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
                      onPress={() => this.iconViewtoglle()}
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
                {this.state.icontoggle == false ? null : (
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
                {this.state.datetoggle == false ? null : (
                  <View>
                    <DatePicker
                      modal
                      open={this.state.datetoggle}
                      date={this.state.date}
                      //  maximumDate={maximumBirthDate}
                      onConfirm={(date) => {
                        this.dateset(date);
                      }}
                      onCancel={() => {
                        this.setState({ datetoggle: false });
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
                value={this.state.companycode.toString()}
                handleChange={(text) => this.setState({ companycode: text })}
                editable={false}
              />

              <OutlinedInput
                img={empolyeeId}
                inputViewStyle={{ alignSelf: "center" }}
                placeholder={Lang.Employeecode}
                value={this.state.empolyeeId}
                handleChange={(text) => this.setState({ empolyeeId: text })}
              />

              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <Dropdown
                  opened={this.state.departmentToggle}
                  onDropdownClick={() => this.depertment_toggleView()}
                  data={this.state.deptArr}
                  selectedItem={this.state.departmentdataAdd}
                  placeholder={Lang.DEPT}
                  onSelect={(item) => this.selectderpenetValue(item)}
                  leftIcon={marketingIcon}
                  // borderColor={
                  //   isFieldInError("departmentDataAdd")
                  //     ? "red"
                  //     : theme.colors.border
                  // }
                  // errorMessage={getErrorsInField("departmentDataAdd")}
                />
              </View>
              <Spacer size={15} />

              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <Dropdown
                  opened={this.state.desigantionToggle}
                  onDropdownClick={() => this.designation_toggleView()}
                  data={this.state.desigantionData}
                  selectedItem={this.state.desigantionAdd}
                  placeholder={Lang.DESIGNATION}
                  onSelect={(item) => this.selectDesignationValue(item)}
                  leftIcon={desigantionIcon}
                  // borderColor={
                  //   isFieldInError("designationAdd") ? "red" : theme.colors.border
                  // }
                  // errorMessage={getErrorsInField("designationAdd")}
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
                    inputViewStyle={{ width: wp("43%") }}
                    placeholder={Lang.MONTH}
                    placeholderTextColor={"grey"}
                    img={CalendarSqure}
                    customStyle={{}}
                    value={this.state.startmonth}
                    handleChange={(text) =>
                      this.setState({ startmonth: text.replace(/[^0-9]/g, "") })
                    }
                  />
                  <StartYear
                    inputViewStyle={{
                      width: wp("43%"),
                    }}
                    placeholder={Lang.JOB_YEAR}
                    placeholderTextColor={"grey"}
                    img={CalendarSqure}
                    //value={this.state.startyear}
                    value={this.state.startyear}
                    handleChange={(text) =>
                      this.setState({ startyear: text.replace(/[^0-9]/g, "") })
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
                  opened={this.state.provinceToggle}
                  onDropdownClick={() => this.province_toggleView()}
                  data={this.state.states}
                  selectedItem={this.state.provincefiled}
                  placeholder={Lang.PROVINCE}
                  onSelect={(item) => this.selectProvinceValue(item)}
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
                  opened={this.state.cityToggle}
                  onDropdownClick={() => this.city_toggleView()}
                  data={this.state.city}
                  selectedItem={this.state.cityfiled}
                  placeholder={Lang.CITY}
                  onSelect={(item) => this.selectCityValue(item.name)}
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
                value={this.state.manegeremail}
                handleChange={(text) => this.setState({ manegeremail: text })}
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
                value={this.state.profileDescriotionfield}
                handleChange={(text) =>
                  this.setState({ profileDescriotionfield: text })
                }
                textAlignVertical={"top"}
                onSubmitEditing={() => Keyboard.dismiss()}
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
              <OutlinedInput
                inputViewStyle={{ alignSelf: "center" }}
                placeholder={Lang.LINKEDIN}
                placeholderTextColor={"grey"}
                img={linkdingIcon}
                value={this.state.linkdingValue}
                handleChange={(text) => this.setState({ linkdingValue: text })}
                textInputStyle={{
                  height: Platform.OS === "android" ? hp(7) : hp(5),
                }}
              />
              <OutlinedInput
                inputViewStyle={{ alignSelf: "center" }}
                placeholder={Lang.TWITTER}
                placeholderTextColor={"grey"}
                img={twitterIcon}
                value={this.state.twitterValue}
                handleChange={(text) => this.setState({ twitterValue: text })}
                textInputStyle={{
                  height: Platform.OS === "android" ? hp(7) : hp(5),
                }}
              />
              <Spacer size={20} />
              <CustomButton
                // onPress={() => this.props.navigation.navigate("Dashboard")}
                loading={this.state.loading}
                onPress={() => this.saveProfile()}
                buttonIcon={
                  this.state.loading ? greyArrow : arrowbackgroundBlue
                }
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
}
