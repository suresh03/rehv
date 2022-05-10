/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Platform,
} from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Lang from "../../Language";
import {
  giftIcon,
  teaCupIcon,
  handIcon,
  cupIcon,
  fingerIcon,
  starIcon,
  treeIcon,
  kingIcon,
  thum,
  openGiftIcon,
  roketIcon,
  calender,
  blubIcon,
  bodyIcon,
} from "../../Assets/icon";
import CompanyCodeStep from "./Component/CompanyCodeStep";
import NameInputStep from "./Component/NameInputStep";
import UpdateProfilePicture from "./Component/UpdateProfilePicture";
import GenderSelection from "./Component/GenderSelection";
import EnterBirthday from "./Component/EnterBirthdate";
import JobDetails from "./Component/JobDetails";
import ManagerDetail from "./Component/ManagerDetail";
import ProfileDescription from "./Component/ProfileDescription";
import SocialDetails from "./Component/SocialDetails";
import UserRoles from "./Component/UserRoles";
import ChoiceManagement from "./Component/ChoiceManagement";
import FeedManagement from "./Component/FeedManagement";
import useApiServices from "../../Services/useApiServices";
import { useTheme } from "react-native-paper";
import Spacer from "../../Components/SharedComponents/Space";
import ChoiceInterest from "./Component/ChoiceInterest";
import Scaler from "../../Utils/Scaler";
import { useValidation } from "react-native-form-validator";
import ValidationConstants from "../../Constants/ValidationConstants";
import { CustomButton } from "../../Components/SharedComponents/Button";
import { storeToLocal } from "../../Utils/LocalStorage";
import { useAppValue, useSetAppState } from "../../Recoil/appAtom";
import SnackbarHandler from "../../Utils/SnackbarHandler";

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

function CompanyName({ navigation, route }) {
  const { ApiPostMethod, ApiBasicFormDataMethod, ApiGetMethod } =
    useApiServices();

  const setAppState = useSetAppState();
  const appValue = useAppValue();
  const { user } = appValue;
  const [step, setStep] = useState(0);
  const [companyCode, setCompanyCode] = useState(
    user.companyCode === null || user.companyCode === undefined
      ? ""
      : String(user.companyCode)
  );
  const [companyCodeFocus, setCompanyCodeFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [gender, selectedGender] = useState("");
  const [imageSource, setImageSource] = useState({});
  const [imageServerUrl, setImageServerUrl] = useState("");
  const [femaleToggle, setFemaleToggle] = useState(false);
  const [maleToggle, setMaleToggle] = useState(false);
  const [genderDiverse, setgenderDiverse] = useState(false);
  const [WouldRather, setWouldRather] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);
  const [confirmDate, setConfirmDate] = useState(maximumBirthDate);
  const [empId, setEmpId] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [defaultText, setDefaultText] = useState("Month Day Year");
  const [iconToggle, setIconToggle] = useState(false);
  const [departmentDataAdd, setDepartmentDataAdd] = useState("");
  const [departmentToggle, setDepartmentToggle] = useState(false);
  const [designationAdd, setDesignationAdd] = useState("");
  const [designationToggle, setDesignationToggle] = useState(false);
  const [provinceToggle, setProvinceToggle] = useState(false);
  const [provinceAdd, setProvinceAdd] = useState("");
  const [countryAdd, setCountryAdd] = useState("Canada");
  const [countryToggle, setCountryToggle] = useState(false);
  const [cityToggle, setCityToggle] = useState(false);
  const [cityAdd, setCityAdd] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [profileDescriptionField, setProfileDescriptionField] = useState("");
  const [describeIconToggle, setDescribeIconToggle] = useState(false);
  const [toggleYes, setToggleYes] = useState(false);
  const [toggleNo, setToggleNo] = useState(false);
  const [linkedinValue, setLinkedinValue] = useState("");
  const [twitterValue, setTwitterValue] = useState("");
  const [twitterFocus, setTwitterFocus] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [firstNameBorderColorChange, setFirstNameBorderColorChange] =
    useState(true);
  const [lastNameBorderColorChange, setLastNameBorderColorChange] =
    useState(false);
  const [manegerFocus, setManegerFocus] = useState(false);
  const [descriotionFocus, setDescriptionFocus] = useState(false);
  const [linkdingFocus, setLinkedinFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [communityList, setCommunityList] = useState([]);
  const [choiceCommunities, setChoiceCommunities] = useState([
    {
      img: giftIcon,
      value: "Having Fun",
      status: false,
    },
    {
      img: thum,
      value: "Doing the Right Thing",
      status: false,
    },
    {
      img: calender,
      value: "Current Events",
      status: false,
    },
    {
      img: handIcon,
      value: "Making Things Better",
      status: false,
    },
    {
      img: fingerIcon,
      value: "Doing a Great Job",
      status: false,
    },
    {
      img: blubIcon,
      value: "Sparking Innovation",
      status: false,
    },
    {
      img: roketIcon,
      value: "Inspiring & Motivating",
      status: false,
    },
    {
      img: teaCupIcon,
      value: "Amazing Food",
      status: false,
    },
    {
      img: kingIcon,
      value: "Great Leadership",
      status: false,
    },
    {
      img: cupIcon,
      value: "Getting Involved",
      status: false,
    },
    {
      img: openGiftIcon,
      value: "Learning Insights",
      status: false,
    },
    {
      img: bodyIcon,
      value: "Exercise & Wellbeing",
      status: false,
    },
    {
      img: treeIcon,
      value: "Eco-Friendly",
      status: false,
    },
    {
      img: starIcon,
      value: "Enhancing Our Culture",
      status: false,
    },
  ]);

  const [counter, setCounter] = useState(0);
  const [checkNav, setCheckNav] = useState("");
  const [choiceManagement, setChoiceManagement] = useState([]);
  const [managementCounter, setManagementCounter] = useState(0);

  const [camera, setCamera] = useState(true);
  // ****selectGender
  const selectGender = (type) => {
    selectedGender(type);
    console.log("type===>", type);
    if (type == "female") {
      setFemaleToggle(true);
      setMaleToggle(false);
      setgenderDiverse(false);
      setWouldRather(false)
    } else if (type == "male") {
      setFemaleToggle(false);
      setMaleToggle(true);
      setgenderDiverse(false);
      setWouldRather(false)
    }
    else if (type == "Gender Diverse") {
      setFemaleToggle(false);
      setMaleToggle(false);
      setgenderDiverse(true);
      setWouldRather(false)
    }
    else if (type == "Would Rather Not Say") {
      setFemaleToggle(false);
      setMaleToggle(false);
      setgenderDiverse(false);
      setWouldRather(true)
    }
  };

  // datePop
  const datePop = (dateindex) => {
    setDateToggle(!dateToggle);
  };

  // iconViewToggle
  const iconViewToggle = () => {
    setIconToggle(!iconToggle);
  };
  // onDepartmentToggle
  const onDepartmentToggle = () => {
    setDepartmentToggle(!departmentToggle);
    setDesignationToggle(false);
    setDesignationAdd("");
  };

  // onDesignationToggle
  const onDesignationToggle = () => {
    setDesignationToggle(!designationToggle);
    setDepartmentToggle(false);
  };

  const onProvinceToggle = () => {
    setProvinceToggle(!provinceToggle);
    setDepartmentToggle(false);
    setDesignationToggle(false);
  };
  const onCountryToggle = () => {
    setCountryToggle(!countryToggle);
    setDepartmentToggle(false);
    setDesignationToggle(false);
    setProvinceToggle(false);
  };
  const onCityToggle = () => {
    setCityToggle(!cityToggle);
    setDepartmentToggle(false);
    setDesignationToggle(false);
    setProvinceToggle(false);
  };

  // selectDepartmentValue
  const selectDepartmentValue = (item) => {
    setDepartmentDataAdd(item);
    setDepartmentToggle(false);
  };

  // selectCityValue
  const selectCityValue = (item) => {
    setCityAdd(item);
    setCityToggle(false);
    
  };

  // selectProvinceValue
  const selectProvinceValue = (item) => {
    setProvinceAdd(item);
    setCityAdd("");
    setProvinceToggle(false);
    setCityToggle(false);
  };
  //country select value

  const selectCountryValue = (item) => {
    setCountryAdd(item);
    setProvinceAdd("");
    setCityAdd("");
    setCountryToggle(false)
    setProvinceToggle(false);
    setCityToggle(false);
  };
  // selectDesignationValue
  const selectDesignationValue = (item) => {
    setDesignationAdd(item);
    setDesignationToggle(false);
  };

  // managerSelectButton
  const managerSelectButton = (type) => {
    console.log("type", type);
    setCheckNav(type);
    if (type == "yes") {
      setToggleYes(true);
      setToggleNo(false);
    } else {
      setToggleYes(false);
      setToggleNo(true);
    }
  };

  const onFocus = () => {
    setFirstNameBorderColorChange(true);
    setLastNameBorderColorChange(false);
    setLastNameFocus(true);
  };

  const onBlur = () => {
    setFirstNameBorderColorChange(false);
    setLastNameBorderColorChange(true);
    setLastNameFocus(true);
  };
  const onFocusSec = () => {
    setFirstNameBorderColorChange(false);
    setLastNameBorderColorChange(true);
    setLastNameFocus(true);
  };

  const onBlurSec = () => {
    setFirstNameBorderColorChange(false);
    setLastNameBorderColorChange(true);
    setLastNameFocus(true);
  };
  const onFocusManagerEmail = () => {
    setManegerFocus(true);
  };

  const onBlurManagerEmail = () => {
    setManegerFocus(false);
  };
  const onFocusDescribe = () => {
    setDescriptionFocus(true);
  };
  const onBlurDescribe = () => {
    setDescriptionFocus(false);
  };

  const onFocusLinkedin = () => {
    setLinkedinFocus(true);
  };

  const onBlurLinkedin = () => {
    setLinkedinFocus(false);
  };

  const onFocusTwitter = () => {
    setTwitterFocus(true);
  };

  const onBlurTwitter = () => {
    setTwitterFocus(false);
  };

  // onDepartmentToggle
  const onPrevStep = (submit) => {
    setStep(step - 1);
    console.log("called previous step");
  };

  // onPrevStepCompany
  const onPrevStepCompany = () => {
    setStep(0);
    navigation.goBack();
  };

  // handleItemClick
  const handleItemClick = (index) => {
    if (
      counter === (toggleYes ? 2 : 3) &&
      choiceCommunities[index].status == false
    ) {
      alert(
        `You can't select more than ${toggleYes ? "two" : "three"} communities`
      );
      return;
    }
    let choiceCommunitiesArr = [...choiceCommunities];
    choiceCommunitiesArr[index].status = !choiceCommunitiesArr[index].status;
    setChoiceCommunities(choiceCommunitiesArr);
    let count = choiceCommunitiesArr.reduce((a, b) => {
      if (b.status) {
        a = a + 1;
      }
      return a;
    }, 0);
    setCounter(count);
  };

  // handleManegementItemClick
  const handleManagementItemClick = (index) => {
    //alert("abc");
    if (managementCounter === 2 && choiceManagement[index].status == false) {
      alert(`${Lang.alertCommunities}`);
      return;
    }
    let choiceManagementArr = [...choiceManagement];
    choiceManagementArr[index].status = !choiceManagementArr[index].status;
    setChoiceManagement(choiceManagementArr);
    let count = choiceManagementArr.reduce((a, b) => {
      if (b.status) {
        a = a + 1;
      }
      return a;
    }, 0);
    setManagementCounter(count);
  };

  useEffect(() => {
    const getCommunityList = async () => {
      ["Manager", "Employee"].map(async (empType) => {
        let resp = await ApiGetMethod(`post/getCommunityList?type=${empType}`);
        let data = resp.data.list.map((item) => {
          item.status = false;
          return item;
        });
        console.log(data);
        if (empType == "Manager") {
          setChoiceManagement(data);
        } else {
          setChoiceCommunities(data);
        }
      });
    };
    getCommunityList();
    setManagementCounter(0);
    setCounter(0);
  }, [toggleYes]);

  const _getCommunityIds = () => {
    let idArr = [];
    let temp = [...choiceCommunities];
    let tempMmt = [...choiceManagement];
    if (toggleYes) {
      tempMmt.forEach((item) => {
        if (item.status) {
          idArr.push(item._id);
        }
      });
    }
    temp.forEach((item) => {
      if (item.status) {
        idArr.push(item._id);
      }
    });
    return idArr;
  };

  const getSelectedCommunity = async () => {
    ApiGetMethod("user/selectedCommunityList")
      .then((res) => {
        console.log("selectedCommunityList res ", res);
        if (res.statusCode == 200) {
          choiceManagementRef?.current?.scrollTo({
            x: 0,
            y: 0,
            animated: true,
          });
          let temp = res?.data?.list.reduce((acc, item, currIndex) => {
            let { name, picture } = item.data[0].communityData;
            let users = item.data.reduce((initial, item) => {
              const { userData } = item;
              const { _id, name, lastName, profilePic } = userData;
              let obj = {
                _id,
                name,
                lastName,
                profilePic,
              };
              return initial.concat(obj);
            }, []);
            let userWiseData = {
              name,
              picture,
              users,
            };
            return acc.concat(userWiseData);
          }, []);
          setCommunityList(temp);
          setStep(12);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => setLoading(false));
  };

  const onSubmitSteps = () => {
    setAppState({
      ...appValue,
      loggedIn: true,
    });
  };

  const onSubmit = () => {
    setLoading(true);
    let data = {
      name: firstName,
      lastName: lastName,
      department: departmentDataAdd,
      designation: designationAdd,
      gender: gender,
      dateOfBirth: confirmDate,
      employeeStartFrom: startMonth + ":" + startYear,
      state: provinceAdd,
      city: cityAdd,
      profileDescription: profileDescriptionField,
      linkedInUrl: linkedinValue,
      twitterUrl: twitterValue,
      profilePic: imageServerUrl,
      areYouManager: toggleYes ? true : false,
      role: toggleYes ? "MANAGER" : "EMPLOYEE",
      communityId: _getCommunityIds(),
      companyCode: companyCode,
      employeeId: empId,
      managerEmailId: managerEmail,
      country:countryAdd
    };
    console.log("data", data);
    ApiPostMethod("user/editProfile", data)
      .then((res) => {
        console.log("editProfile res ", res);
        setAppState({
          ...appValue,
          user: res.data,
          token: res.data.accessToken,
        });
        storeToLocal("user", res.data);
        storeToLocal("token", res.data.accessToken);
        if (res.statusCode === 200) {
          setTimeout(() => {
            getSelectedCommunity();
          }, 2000);
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      });
  };

  const updateCompanyCode = () => {
    setLoading(true);
    let data = {
      companyCode: companyCode,
    };
    ApiPostMethod("user/editProfile", data)
      .then((res) => {
        console.log("editProfile res ", res);
        if (res.statusCode === 200) {
          setStep(1);
        } else {
          SnackbarHandler.errorToast(
            Lang.MESSAGE,
            res.message ?? res.responseType
          );

          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => setLoading(false));
  };

  const onUploadProfilePicture = () => {
    setLoading(true);
    var formData = new FormData();
    formData.append("image", imageSource);
    console.log("onUploadProfilePicture", JSON.stringify(formData));
    ApiBasicFormDataMethod("AdminRoute/uploadImage", formData)
      .then((res) => {
        console.log("res", res);
        if (res.statusCode === 200) {
          setStep(3);
          setImageServerUrl(res.data.original.trim());
        } else {
          SnackbarHandler.errorToastt(Lang.MESSAGE, res.message);
        }
      })
      .catch((error) => {
        SnackbarHandler.errorToast(Lang.MESSAGE, error?.message ?? "");
        console.log("error?.message", error?.message);
      })
      .finally(() => setLoading(false));
  };

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { managerEmail, twitterValue, linkedinValue },
    ...ValidationConstants,
  });

  useEffect(() => {
    validate({
      managerEmail: { email: true, required: false },
    });
  }, [managerEmail]);

  useEffect(() => {
    validate({
      linkedinValue: { linkedin: true, required: false },
      twitterValue: {
        twitter: true,
        required: false,
      },
    });
  }, [twitterValue, linkedinValue]);

  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        nextButton: {
          height: Scaler(55),
          width: wp(73.33),
          borderRadius: Scaler(11),
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          alignSelf: "center",
        },
        nextButtonText: {
          color: theme.colors.backgroundColor,
          textAlign: "center",
          fontSize: Scaler(15),
          ...theme.fonts.medium,
        },
        skipText: {
          fontSize: 20,
          color: "#7F8190",
          right: wp(3),
        },
        previousBtnStyle: { height: 0, width: 0, marginLeft: -Scaler(25) },
      }),
    [theme.colors.primary]
  );

  const choiceCommunitiesScrollRef = useRef();
  const jobDetailsRef = useRef();
  const choiceManagementRef = useRef();

  useEffect(() => {
    if (step == 10) {
      choiceManagementRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [step]);
  useLayoutEffect(() => {
    choiceCommunitiesScrollRef?.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }, [step]);

  useEffect(() => {
    jobDetailsRef?.current?.scrollTo({ x: 0, y: 550, animated: true });
  }, [cityToggle, provinceToggle]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <Body> */}
      <View
        style={{
          flex: 0.99,
          paddingHorizontal: Scaler(15),
          alignItems: "center",
        }}
      >
        <ProgressSteps activeStep={step}>
          <ProgressStep
            // removeBtnRow
            activeStepIconColor="red"
            // onNext={() => setStep(0)}
            onPrevious={() => onPrevStepCompany()}
            nextBtnStyle={{
              height: 0,
              width: 0,
            }}
            removeBtnRow={true}
            skipremoveBtnRow={true}
            previousBtnStyle={{ height: 0, width: 0, marginLeft: -Scaler(25) }}
            scrollable={false}
          >
            <ScrollView
              style={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <CompanyCodeStep
                disabled={companyCode == ""}
                companyCode={companyCode}
                setCompanyCode={(val) => setCompanyCode(val)}
                companyCodeFocus={companyCodeFocus}
                setCompanyCodeFocus={(val) => setCompanyCodeFocus(val)}
              />
            </ScrollView>
            <CustomButton
              loading={loading}
              disabled={companyCode == "" ? true : false}
              style={{
                position: "absolute",
                bottom: Platform.OS == "ios" ? Scaler(10) : -Scaler(24),
              }}
              onPress={() => updateCompanyCode()}
              //
              status={Lang.CONTINUE}
            />
          </ProgressStep>

          <ProgressStep
            onNext={() => setStep(1)}
            onPrevious={() => setStep(0)}
            nextBtnText={Lang.NEXT}
            skipremoveBtnRow={true}
            previousBtnStyle={styles.previousBtnStyle}
            nextBtnDisabled={firstName == "" || lastName == ""}
            nextBtnStyle={{
              ...styles.nextButton,
              backgroundColor:
                firstName == "" || lastName == ""
                  ? theme.colors.disabled
                  : theme.colors.primary,
              alignSelf: "center",
            }}
            nextBtnTextStyle={{
              ...styles.nextButtonText,
              color:
                firstName == "" || lastName == ""
                  ? theme.colors.disabledText
                  : theme.colors.background,
            }}
          >
            <NameInputStep
              onBlurSec={onBlurSec}
              onFocusSec={onFocusSec}
              onBlur={onBlur}
              onFocus={onFocus}
              lastNameFocus={lastNameFocus}
              firstName={firstName}
              lastName={lastName}
              setFirstName={(val) => setFirstName(val)}
              setLastName={(val) => setLastName(val)}
              lastNameBorderColorChange={lastNameBorderColorChange}
              firstNameBorderColorChange={firstNameBorderColorChange}
            />
          </ProgressStep>

          <ProgressStep
            //onNext={() => setStep(2)}
            onPrevious={() => setStep(1)}
            nextBtnStyle={{ ...styles.nextButton }}
            nextBtnTextStyle={{ ...styles.nextButtonText, color: "#fff" }}
            skipBtnText={Lang.SKIP}
            skipBtnTextStyle={styles.skipText}
            previousBtnStyle={styles.previousBtnStyle}
            nextBtnStyle={{
              height: 0,
              width: 0,
            }}
          >
            <UpdateProfilePicture
              imageSource={imageSource}
              setImageSource={(img) => setImageSource(img)}
              imageServerUrl={imageServerUrl}
              camera={camera}
              setCamera={setCamera}
              placeHolder={firstName[0] + lastName[0]}
            />

            <CustomButton
              loading={loading}
              disabled={loading || Object.keys(imageSource)?.length == 0}
              style={{
                position: "absolute",
                bottom: Platform.OS === "ios" ? Scaler(20) : Scaler(10),
              }}
              onPress={() => onUploadProfilePicture()}
              status={Lang.NEXT}
            />
          </ProgressStep>

          <ProgressStep
            onNext={() => setStep(3)}
            onPrevious={() => setStep(2)}
            nextBtnText={Lang.NEXT}
            previousBtnStyle={styles.previousBtnStyle}
            nextBtnTextStyle={{
              ...styles.nextButtonText,

              color:
                femaleToggle || maleToggle || genderDiverse || WouldRather == true
                  ? "#fff"
                  : "#000",
            }}
            nextBtnDisabled={
              femaleToggle || maleToggle || genderDiverse || WouldRather == true ? false : true
            }
            nextBtnStyle={{
              top: Scaler(-25),
              ...styles.nextButton,
              backgroundColor:
                femaleToggle || maleToggle || genderDiverse || WouldRather == true
                  ? theme.colors.primary
                  : "#eaeaea",
              justifyContent: "center",
            }}
            skipremoveBtnRow={true}
          >
            <GenderSelection
              selectGender={(val) => selectGender(val)}
              WouldRather={WouldRather}
              genderDiverse={genderDiverse}
              maleToggle={maleToggle}
              femaleToggle={femaleToggle}
            />
          </ProgressStep>

          <ProgressStep
            onNext={() => setStep(4)}
            onPrevious={() => setStep(3)}
            nextBtnText={Lang.NEXT}
            previousBtnStyle={styles.previousBtnStyle}
            nextBtnStyle={{
              ...styles.nextButton,
              backgroundColor:
                confirmDate == ""
                  ? theme.colors.disabled
                  : theme.colors.primary,
            }}
            nextBtnTextStyle={{
              ...styles.nextButtonText,
              color: confirmDate == "" ? theme.colors.disabledText : "#fff",
            }}
            nextBtnDisabled={confirmDate == "" ? true : false}
            skipremoveBtnRow={true}
          >
            <EnterBirthday
              datePop={() => datePop()}
              iconToggle={iconToggle}
              iconViewToggle={() => iconViewToggle()}
              dateToggle={dateToggle}
              setDate={(v) => setConfirmDate(v)}
              setDateToggle={(v) => setDateToggle(v)}
              confirmDate={confirmDate}
              defaultText={defaultText}
              maximumBirthDate={maximumBirthDate}
              onIconToggle={() => setIconToggle(false)}
            />
          </ProgressStep>

          <ProgressStep
            onPrevious={() => setStep(4)}
            previousBtnStyle={styles.previousBtnStyle}
            nextBtnStyle={{
              height: 0,
              width: 0,
            }}
            skipremoveBtnRow={true}
            scrollable={false}
          >
            <ScrollView
              ref={jobDetailsRef}
              showsVerticalScrollIndicator={false}
            >
              <JobDetails
                empId={empId}
                startMonth={startMonth}
                startYear={startYear}
                departmentDataAdd={departmentDataAdd}
                designationAdd={designationAdd}
                countryAdd={countryAdd}
                provinceAdd={provinceAdd}
                cityAdd={cityAdd}
                departmentToggle={departmentToggle}
                designationToggle={designationToggle}
                provinceToggle={provinceToggle}
                countryToggle={countryToggle}
                cityToggle={cityToggle}
                onDepartmentToggle={onDepartmentToggle}
                onDesignationToggle={onDesignationToggle}
                onCountryToggle={onCountryToggle}
                onProvinceToggle={onProvinceToggle}
                onCityToggle={onCityToggle}
                setEmpId={setEmpId}
                setStartMonth={setStartMonth}
                setStartYear={setStartYear}
                selectDepartmentValue={selectDepartmentValue}
                selectDesignationValue={selectDesignationValue}
                selectProvinceValue={selectProvinceValue}
                selectCountryValue={selectCountryValue}
                selectCityValue={selectCityValue}
              />
              <Spacer size={Scaler(120)} />
            </ScrollView>
            <CustomButton
              loading={loading}
              disabled={
                departmentDataAdd == "" ||
                designationAdd == "" ||
                startMonth == "" ||
                startYear == ""
              }
              style={{
                position: "absolute",
                bottom: Platform.OS === "ios" ? Scaler(45) : Scaler(45),
              }}
              onPress={() => setStep(6)}
              status={Lang.NEXT}
            />
          </ProgressStep>

          <ProgressStep
            onNext={() => setStep(6)}
            onPrevious={() => setStep(5)}
            nextBtnText={Lang.NEXT}
            previousBtnStyle={styles.previousBtnStyle}
            nextBtnStyle={{
              ...styles.nextButton,
              backgroundColor:
                isFieldInError("managerEmail") || managerEmail == ""
                  ? theme.colors.disabled
                  : theme.colors.primary,
            }}
            nextBtnTextStyle={{
              ...styles.nextButtonText,
              color:
                isFieldInError("managerEmail") || managerEmail == ""
                  ? theme.colors.disabledText
                  : "#fff",
            }}
            nextBtnDisabled={
              isFieldInError("managerEmail") || managerEmail == ""
                ? true
                : false
            }
            skipBtnText={Lang.DONT_KNOW}
            skipBtnTextStyle={{
              fontSize: 20,
              color: "#7F8190",
              right: wp(3),
            }}
          >
            <ManagerDetail
              managerEmail={managerEmail}
              setManagerEmail={setManagerEmail}
              onFocusManagerEmail={onFocusManagerEmail}
              onBlurManagerEmail={onBlurManagerEmail}
              errorMessage={getErrorsInField("managerEmail")}
              inputViewStyle={
                isFieldInError("managerEmail") ? { borderColor: "red" } : {}
              }
            />
          </ProgressStep>

          <ProgressStep
            onNext={() => setStep(7)}
            onPrevious={() => setStep(6)}
            previousBtnStyle={styles.previousBtnStyle}
            skipBtnText={Lang.SKIP}
            nextBtnText={Lang.NEXT}
            skipBtnTextStyle={styles.skipText}
            nextBtnDisabled={profileDescriptionField == "" ? true : false}
            nextBtnStyle={{
              ...styles.nextButton,
              backgroundColor:
                profileDescriptionField == ""
                  ? theme.colors.disabled
                  : theme.colors.primary,
            }}
            nextBtnTextStyle={{
              ...styles.nextButtonText,
              color:
                profileDescriptionField == ""
                  ? theme.colors.disabledText
                  : "#fff",
            }}
          >
            <ProfileDescription
              describeIconToggle={describeIconToggle}
              profileDescriptionField={profileDescriptionField}
              setDescribeIconToggle={setDescribeIconToggle}
              setProfileDescriptionField={setProfileDescriptionField}
              onFocusDescribe={onFocusDescribe}
              onBlurDescribe={onBlurDescribe}
            />
          </ProgressStep>

          <ProgressStep
            onNext={() => setStep(8)}
            onPrevious={() => setStep(7)}
            nextBtnText={Lang.NEXT}
            previousBtnStyle={styles.previousBtnStyle}
            nextBtnStyle={{
              ...styles.nextButton,
              backgroundColor:
                isFieldInError("linkedinValue") ||
                isFieldInError("twitterValue")
                  ? theme.colors.disabled
                  : theme.colors.primary,
            }}
            nextBtnTextStyle={{
              ...styles.nextButtonText,
              color:
                isFieldInError("linkedinValue") ||
                isFieldInError("twitterValue")
                  ? theme.colors.disabledText
                  : "#fff",
            }}
            skipBtnText={Lang.SKIP}
            skipBtnTextStyle={styles.skipText}
            nextBtnDisabled={
              isFieldInError("linkedinValue") || isFieldInError("twitterValue")
                ? true
                : false
            }
          >
            <SocialDetails
              linkedinValue={linkedinValue}
              twitterValue={twitterValue}
              setLinkedinValue={setLinkedinValue}
              onFocusLinkedin={onFocusLinkedin}
              onBlurLinkedin={onBlurLinkedin}
              setTwitterValue={setTwitterValue}
              onBlurTwitter={onBlurTwitter}
              onFocusTwitter={onFocusTwitter}
              errorMessageLinkedin={getErrorsInField("linkedinValue")}
              inputViewStyleLinkedin={
                isFieldInError("linkedinValue") ? { borderColor: "red" } : {}
              }
              errorMessageTwitter={getErrorsInField("twitterValue")}
              inputViewStyleTwitter={
                isFieldInError("twitterValue") ? { borderColor: "red" } : {}
              }
            />
          </ProgressStep>

          <ProgressStep
            onNext={() => setStep(toggleYes ? 9 : 10)}
            onPrevious={() => setStep(8)}
            nextBtnText={Lang.NEXT}
            previousBtnStyle={styles.previousBtnStyle}
            nextBtnStyle={{
              ...styles.nextButton,
              backgroundColor:
                toggleYes == true || toggleNo == true
                  ? theme.colors.primary
                  : theme.colors.disabled,
            }}
            nextBtnTextStyle={{
              ...styles.nextButtonText,
              color:
                toggleYes == true || toggleNo == true
                  ? "#fff"
                  : theme.colors.disabledText,
            }}
            nextBtnDisabled={
              toggleYes == true || toggleNo == true ? false : true
            }
            skipremoveBtnRow={true}
          >
            <UserRoles
              toggleNo={toggleNo}
              toggleYes={toggleYes}
              managerSelectButton={managerSelectButton}
            />
          </ProgressStep>

          <ProgressStep
            //onPrevious={() => setStep(9)}
           // previousBtnStyle={styles.previousBtnStyle}
            nextBtnStyle={{
              height: 0,
              width: 0,
            }}
            skipremoveBtnRow={true}
            scrollable={false}
            previousBtnStyle={{ height: 0, width: 0, marginLeft: -Scaler(25) }}
            removeBtnRow={true}

          >
            <ScrollView
              ref={choiceManagementRef}
              showsVerticalScrollIndicator={false}
            >
              <ChoiceManagement
                maxLimit={2}
                counter={managementCounter}
                managementCounter={true}
                handleManagementItemClick={handleManagementItemClick}
                data={choiceManagement}
              />
            </ScrollView>
            <CustomButton
              loading={loading}
              disabled={managementCounter !== 2}
              style={{
                position: "absolute",
                bottom: Platform.OS === "ios" ? Scaler(45) : Scaler(55),
              }}
              onPress={() => {
                choiceManagementRef?.current?.scrollTo({
                  x: 0,
                  y: 0,
                  animated: true,
                });
                setStep(11);
              }}
              status={Lang.NEXT}
            />
          </ProgressStep>

          <ProgressStep
            //removeBtnRow
            nextBtnStyle={{
              height: 0,
              width: 0,
            }}
            removeBtnRow={true}

          //  onPrevious={() => setStep(toggleNo ? 9 : 10)}
           // previousBtnStyle={styles.previousBtnStyle}
            skipremoveBtnRow={true}
            scrollable={false}
            previousBtnStyle={{ height: 0, width: 0, marginLeft: -Scaler(25) }}

          >
            <ScrollView
              ref={choiceCommunitiesScrollRef}
              showsVerticalScrollIndicator={false}
            >
              <ChoiceInterest
                maxLimit={toggleYes ? 2 : 3}
                counter={counter}
                handleItemClick={(index) => handleItemClick(index)}
                data={choiceCommunities}
              />
            </ScrollView>
            <CustomButton
              loading={loading}
              disabled={counter == (toggleYes ? 2 : 3) ? false : true}
              style={{
                position: "absolute",
                bottom: Platform.OS === "ios" ? Scaler(45) : Scaler(55),
              }}
              onPress={() => {
                onSubmit();
              }}
              status={Lang.NEXT}
            />
          </ProgressStep>

          <ProgressStep
            // onPrevious={onPrevStep}
            // previousBtnStyle={styles.previousBtnStyle}
            previousBtnStyle={{ height: 0, width: 0, marginLeft: -Scaler(25) }}
            removeBtnRow={true}

            nextBtnDisabled={true}
            skipremoveBtnRow={true}
            scrollable={false}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <FeedManagement
                //scheckNav={checkNav}
                communityList={communityList}
                // choiceCongratulationEmployee={choiceCongratulationEmployee}
                // congratulationArrayEmployee={congratulationArrayEmployee}
                // choicecongratulationManeger={choicecongratulationManeger}
                // congratulationArrayManeger={congratulationArrayManeger}
              />
            </ScrollView>
            <CustomButton
              loading={false}
              disabled={false}
              style={{
                position: "absolute",
                bottom: Platform.OS === "ios" ? Scaler(45) : Scaler(55),
              }}
              onPress={() => onSubmitSteps()}
              status={Lang.DONE}
            />
          </ProgressStep>
        </ProgressSteps>
        {/* </Body> */}
      </View>
    </SafeAreaView>
  );
}

export default CompanyName;
