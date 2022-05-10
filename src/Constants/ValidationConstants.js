import moment from "moment";
import Lang from "../Language";
const currMonth = moment().month() + 1;
const currYear = moment().year();

const ValidationConstants = {
  messages: {
    en: {
      numbers: Lang.numbers,
      email: Lang.email,
      required: Lang.required,
      date: Lang.date,
      minlength: Lang.minlength,
      maxlength: Lang.maxlength,
      equalPassword: Lang.equalPassword,
      hasUpperCase: Lang.hasUpperCase,
      hasLowerCase: Lang.hasLowerCase,
      hasNumber: Lang.hasNumber,
      hasSpecialCharacter: Lang.hasSpecialCharacter,
      linkedin: Lang.linkedin,
      twitter: Lang.twitter,
      nonZero: Lang.nonZero,
      month: Lang.month,
      year: Lang.year,
      empStartMonth: Lang.currMonth,
      empStartYear: Lang.currYear,
      postUrl: Lang.postUrl,
    },
    fr: {
      numbers: Lang.numbers,
      email: Lang.email,
      required: Lang.required,
      date: Lang.date,
      minlength: Lang.minlength,
      maxlength: Lang.maxlength,
      equalPassword: Lang.equalPassword,
      hasUpperCase: Lang.hasUpperCase,
      hasLowerCase: Lang.hasLowerCase,
      hasNumber: Lang.hasNumber,
      hasSpecialCharacter: Lang.hasSpecialCharacter,
      linkedin: Lang.linkedin,
      twitter: Lang.twitter,
      nonZero: Lang.nonZero,
      month: Lang.month,
      year: Lang.year,
      empStartMonth: Lang.currMonth,
      empStartYear: Lang.currYear,
      postUrl: Lang.postUrl,
    },
  }, // rules for validations messages for validation errors
  labels: {
    email: "Email",
    phoneNumber: "Phone Number",
    password: "Password",
    companyCode: "Company Code",
    firstName: "First Name",
    lastName: "Last Name",
    startYear: "Start Year",
    startMonth: "Start Year",
    linkedin: "Linkedin",
    twitter: "Twitter",
    empStartMonth: "Current Month",
    empStartYear: "Current Year",
    postUrl: "postUrl",
  },
  deviceLocale: "en",
  rules: {
    numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: /\S+/,
    hasNumber: /\d/,
    hasUpperCase: /(?=.*[A-Z])/,
    hasLowerCase: /(?=.*[a-z])/,
    hasSpecialCharacter: /(\W)/,
    date(format = "YYYY-MM-DD", value) {
      const d = moment(value, format);
      if (d == null || !d.isValid()) return false;
      return true;
    },
    minlength(length, value) {
      if (length === void 0) {
        throw "ERROR: It is not a valid length, checkout your minlength settings.";
      } else if (value.length >= length) {
        return true;
      }
      return false;
    },
    maxlength(length, value) {
      if (length === void 0) {
        throw "ERROR: It is not a valid length, checkout your maxlength settings.";
      } else if (value.length > length) {
        return false;
      }
      return true;
    },

    equalPassword(dataToCompare, value) {
      return dataToCompare === value;
    },

    empStartMonth(yearValue, monthValue) {
      if (yearValue == "" || yearValue < currYear) {
        return true;
      } else if (yearValue == currYear) {
        if (Number(monthValue) <= Number(currMonth)) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },

    empStartYear(monthValue, yearValue) {
      if (yearValue > currYear) {
        return false;
      } else {
        if (
          monthValue == "" ||
          monthValue < currMonth ||
          monthValue == currMonth
        ) {
          return true;
        } else {
          if (monthValue > currMonth) {
            if (yearValue < currYear) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
      return true;
    },
    twitter: /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
    linkedin: /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/,
    nonZero: /^(([1-9]*)|(([1-9]*)\.([1-9]*)))$/,
    month: /^(0?[1-9]|1[012])$/,
    //year: /^\d{4}$/,
    year: /^(19|20)\d{2}$/,
    postUrl:
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  },
};

export default ValidationConstants;
