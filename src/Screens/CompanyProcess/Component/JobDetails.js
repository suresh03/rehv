import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getFontSize } from "../../../Components/SharedComponents/ResponsiveSize";
import Spacer from "../../../Components/SharedComponents/Space";
import {
  CalendarSqure,
  empolyeeId,
  marketingIcon,
  desigantionIcon,
  locationIcon,
} from "../../../Assets/icon";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import PropTypes from "prop-types";
// import DeptJson from "../../../Constants/DepartmentAndDesignation.json";
import Dropdown from "../../../Components/CustomComponents/Dropdown";
import { useTheme } from "react-native-paper";
import { useValidation } from "react-native-form-validator";
import ValidationConstants from "../../../Constants/ValidationConstants";
import useApiServices from "../../../Services/useApiServices";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";
import Lang from "../../../Language";
import { DeptJson } from "../../../Utils/DepartmentData";
import countryJson from "../../../Constants/CountryStateCity/country.json";
import stateJson from "../../../Constants/CountryStateCity/states.json";
import cityJson from "../../../Constants/CountryStateCity/city.json";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const { height, width } = Dimensions.get("window");

function JobDetails(props) {
  const { ApiGetMethod } = useApiServices();

  const {
    departmentToggle,
    departmentDataAdd,
    onDepartmentToggle,
    selectDepartmentValue,
    designationToggle,
    designationAdd,
    onDesignationToggle,
    selectDesignationValue,
    selectProvinceValue,
    selectCountryValue,
    selectCityValue,
    countryAdd,
    countryToggle,
    onCountryToggle,
    provinceAdd,
    provinceToggle,
    onProvinceToggle,
    cityToggle,
    cityAdd,
    onCityToggle,
    empId,
    setEmpId,
    startMonth,
    startYear,
    setStartMonth,
    setStartYear,
  } = props;

  const [deptArr, setDeptArr] = useState([]);
  const [designationArr, setDesignationArr] = useState([]);
  const [countryList, setCountryList] = useState([...countryJson]);
  const [statesList, setStatesList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState([]);
  const [employmentDate, setEmploymentDate] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("38");
  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { startMonth, startYear },
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
        console.log(item, departmentDataAdd);
        setDesignationArr(item.designation);
      }
    });
  }, [departmentDataAdd]);

  useEffect(() => {
    setCountryList(countryJson);
  }, [empId, departmentDataAdd, designationAdd]);

  useEffect(() => {
    // ApiGetMethod("user/getStatesList").then((res) => {
    //   if (res.statusCode === 200) {
    //     let states = res.data.list.map(
    //       ({ createdAt, updatedAt, __v, ...rest }) => {
    //         return rest;
    //       }
    //     );
    //     console.log("statelist ", states);
    //     setStatesList(states);
    //   }
    // });

    let temp = [...stateJson];
    const tempState = temp.filter(
      (item) => item.countryId == selectedCountryId
    );
    console.log("temp => ", selectedCountryId);

    setStatesList(tempState);
  }, [selectedCountryId]);

  useEffect(() => {
    // ApiGetMethod(
    //   `user/getProvincesList?province_id=${selectedProvinceId}`
    // ).then((res) => {
    //   if (res.statusCode === 200) {
    //     let city = res.data.list.map(({ _id, city }) => {
    //       let obj = {
    //         _id: _id,
    //         name: city,
    //       };
    //       return obj;
    //     });
    //     console.log("cityList ", city);

    //     setCityList(city);
    //   }
    // });
    let temp = [...cityJson];

    const tempCity = temp.filter((item) => item.stateId == selectedProvinceId);

    setCityList(tempCity);
    console.log("timer1",tempCity);

  }, [selectedProvinceId]);

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

  useEffect(() => {
    validate({
      departmentDataAdd: { required: true },
    });
  }, [departmentDataAdd]);

  useEffect(() => {
    validate({
      designationAdd: { required: true },
    });
  }, [designationAdd]);

  const theme = useTheme();

  return (
    <View style={{ alignSelf: "center" }}>
      <Spacer />
      <Text style={commonStyle.tittleStyle}>{Lang.SUBMIT_JDETAILS}</Text>
      <Spacer size={40} />

      <View style={{ alignItems: "center" }}>
        <OutlinedInput
          placeholder={Lang.EMP_ID}
          placeholderTextColor={"grey"}
          img={empolyeeId}
          value={empId}
          onChangeText={(v) => setEmpId(v)}
        />
        <Spacer size={10} />
        <Dropdown
          opened={departmentToggle}
          onDropdownClick={onDepartmentToggle}
          data={deptArr}
          selectedItem={departmentDataAdd}
          placeholder={Lang.DEPT}
          onSelect={(item) => selectDepartmentValue(item.name)}
          leftIcon={marketingIcon}
          borderColor={
            isFieldInError("departmentDataAdd") ? "red" : theme.colors.border
          }
          errorMessage={getErrorsInField("departmentDataAdd")}
        />
        <Spacer size={25} />
        <Dropdown
          opened={designationToggle}
          onDropdownClick={onDesignationToggle}
          data={designationArr}
          selectedItem={designationAdd}
          placeholder={Lang.DESIGNATION}
          onSelect={(item) => selectDesignationValue(item.name)}
          leftIcon={desigantionIcon}
          borderColor={
            isFieldInError("designationAdd") ? "red" : theme.colors.border
          }
          errorMessage={getErrorsInField("designationAdd")}
        />

        <Spacer size={25} />

        <Text
          style={{
            fontSize: getFontSize(15),
            ...theme.fonts.medium,
            color: "#000",
            alignSelf: "flex-start",
            left: 10,
          }}
        >
          {Lang.EMP_SDATE}
        </Text>
        <Spacer size={15} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width - 44,
          }}
        >
          <OutlinedInput
            inputViewStyle={{
              width: wp("43%"),
              borderColor: isFieldInError("startMonth")
                ? "red"
                : theme.colors.border,
            }}
            keyboardType={"numeric"}
            maxLength={2}
            placeholder={Lang.MONTH}
            placeholderTextColor={"grey"}
            img={CalendarSqure}
            value={startMonth}
            onChangeText={(v) => setStartMonth(v)}
            errorMessage={getErrorsInField("startMonth")}
          />
          <OutlinedInput
            inputViewStyle={{
              width: wp("43%"),
              borderColor: isFieldInError("startYear")
                ? "red"
                : theme.colors.border,
            }}
            img={CalendarSqure}
            keyboardType={"numeric"}
            maxLength={4}
            placeholder={Lang.JOB_YEAR}
            placeholderTextColor={"grey"}
            value={startYear}
            onChangeText={(v) => setStartYear(v)}
            errorMessage={getErrorsInField("startYear")}
          />
        </View>

        <Spacer size={10} />
        <Dropdown
          opened={countryToggle}
          onDropdownClick={onCountryToggle}
          data={countryList}
          selectedItem={countryAdd}
          placeholder={Lang.COUNTRY}
          onSelect={(item) => {
            console.log("item => ", item);
            setSelectedCountryId(item.id);
            selectCountryValue(item.name);
          }}
          leftIcon={locationIcon}
        />
        <Spacer size={25} />
        <Dropdown
          opened={provinceToggle}
          onDropdownClick={onProvinceToggle}
          data={statesList}
          selectedItem={provinceAdd}
          placeholder={Lang.PROVINCE}
          onSelect={(item) => {
            setSelectedProvinceId(item.id);
            selectProvinceValue(item.name);
          }}
          leftIcon={locationIcon}
        />
        <Spacer size={25} />

        <Dropdown
          opened={cityToggle}
          onDropdownClick={onCityToggle}
          data={cityList}
          selectedItem={cityAdd}
          placeholder={Lang.CITY}
          onSelect={(item) => selectCityValue(item.name)}
          leftIcon={locationIcon}
        />
      </View>
    </View>
  );
}

JobDetails.propTypes = {
  departmentToggle: PropTypes.bool,
  departmentDataAdd: PropTypes.string,
  departmentField: PropTypes.string,
  onDepartmentToggle: PropTypes.func,
  departmentData: PropTypes.array,
  selectDepartmentValue: PropTypes.func,
  designationToggle: PropTypes.bool,
  designationAdd: PropTypes.string,
  designationField: PropTypes.string,
  onDesignationToggle: PropTypes.func,
  designationField: PropTypes.string,
  designationData: PropTypes.array,
  provinceData: PropTypes.array,
  provinceFiled: PropTypes.string,
  provinceAdd: PropTypes.string,
  provinceToggle: PropTypes.bool,
  onProvinceToggle: PropTypes.func,
  cityToggle: PropTypes.bool,
  cityAdd: PropTypes.string,
  cityFiled: PropTypes.string,
  onCityToggle: PropTypes.func,
  cityData: PropTypes.array,
  selectDesignationValue: PropTypes.func,
  selectProvinceValue: PropTypes.func,
  selectCityValue: PropTypes.func,
  empId: PropTypes.string,
  setEmpId: PropTypes.func,
  startYear: PropTypes.string,
  startMonth: PropTypes.string,
  setStartYear: PropTypes.func,
  setStartMonth: PropTypes.func,
};

export default JobDetails;
