import { showMessage, hideMessage } from "react-native-flash-message";
import { DayTheme } from "../Constants/theme";

class SnackbarHandler {
  errorToast = (title, message) => {
    showMessage({
      message: message,
      description: "",
      type: "danger",
      //backgroundColor: "red", // background color
      // color: "#fff", // text color
    });
  };

  successToast = (title, message) => {
    showMessage({
      message: message,
      description: "",
      type: "success",
      //backgroundColor: "green", // background color
      // color: "#fff", // text color
    });
  };

  normalToast = (title, message) => {
    showMessage({
      message: message,
      description: "",
      type: "info",
      backgroundColor: DayTheme.colors.primary, // background color
      //  color: "#fff", // text color
    });
  };
}

export default new SnackbarHandler();
