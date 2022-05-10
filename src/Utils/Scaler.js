import { create, PREDEF_RES } from "react-native-pixel-perfect";

const designResolution = {
  width: parseInt("375", 10),
  height: parseInt("879", 10),
};
const perfectSize = create(PREDEF_RES.iphoneX.dp);

const Scaler = (size) => perfectSize(size);

export default Scaler;
