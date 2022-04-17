// ES6 module syntax
import LocalizedStrings from 'react-native-localization';
import {ENGLISH} from "./english";
import {FRENCH} from "./french";

var Lang = new LocalizedStrings({
  en: ENGLISH,
  fr: FRENCH
});

export default Lang;