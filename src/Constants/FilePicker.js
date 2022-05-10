import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from "react-native-document-picker";
import { AccordionGroup } from "react-native-paper/lib/typescript/components/List/List";

class FilePicker {
  handleError = (err) => {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
    } else {
      throw err;
    }
  };

  pickMultiple = () =>
    new Promise((resolve, reject) => {
      DocumentPicker.pickMultiple({
        type: [types.images, types.video],
        allowMultiSelection: true,
      })
        .then((res) => {
          const files = res.reduce((acc, curr) => {
            const { name, type, uri } = curr;
            let file = {
              name: name.replace(/\s/g, "_"),
              type,
              uri,
            };
            return acc.concat(file);
          }, []);

          resolve(files);
        })
        .catch(this.handleError);
    });

  pickSingle = () =>
    new Promise((resolve, reject) => {
      DocumentPicker.pickSingle({
        type: [types.images, types.video],
        allowMultiSelection: true,
      })
        .then((res) => {
          const { name, type, uri } = res;
          let file = {
            name: name.replace(/\s/g, "_"),
            type,
            uri,
          };
          resolve(file);
        })
        .catch(this.handleError);
    });
}

export default new FilePicker();
