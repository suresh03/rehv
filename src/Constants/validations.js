const validations = {
  matchRegexp: (value, regexp) => {
    const validationRegexp =
      regexp instanceof RegExp ? regexp : new RegExp(regexp);
    return validations.isEmpty(value) || validationRegexp.test(value);
  },

  isEmail: (value) =>
    validations.matchRegexp(
      value,
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    ),

  isExists: (value) => value !== null && value !== undefined,

  isEmpty: (value) => {
    if (value instanceof Array) {
      return value.length === 0;
    }
    return value === "" || !validations.isExists(value);
  },

  required: (value) => !validations.isEmpty(value),

  isNumber: (value) => validations.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i),

  isFloat: (value) =>
    validations.matchRegexp(value, /^[+-]?([0-9]*[.])?[0-9]+$/i),

  isPositive: (value) => {
    if (validations.isExists(value)) {
      return (
        (validations.isNumber(value) || validations.isFloat(value)) &&
        value >= 0
      );
    }
    return true;
  },

  maxNumber: (value, max) =>
    validations.isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10),

  minNumber: (value, min) =>
    validations.isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10),

  maxFloat: (value, max) =>
    validations.isEmpty(value) || parseFloat(value) <= parseFloat(max),

  minFloat: (value, min) =>
    validations.isEmpty(value) || parseFloat(value) >= parseFloat(min),

  isString: (value) =>
    !validations.isEmpty(value) ||
    typeof value === "string" ||
    value instanceof String,

  minStringLength: (value, length) =>
    validations.isString(value) && value.length >= length,

  maxStringLength: (value, length) =>
    validations.isString(value) && value.length <= length,
};

export default validations;
