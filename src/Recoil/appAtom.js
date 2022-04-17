import AsyncStorage from "@react-native-community/async-storage";
import SplashScreen from "react-native-splash-screen";
import {
  atom,
  DefaultValue,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

const LOADER_DELAY = 1000;

const initialState = {
  loggedIn: false,
  user: undefined,
  token: "",
  accountFreezed: false,
  languageId: "5afeb323e17292bad4f89825",
};

const appAtom = atom({
  key: "appAtom",
  default: initialState,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      mutateAppState = setSelf;
      (async () => {
        const token = await AsyncStorage.getItem("token");
        const userString = await AsyncStorage.getItem("user");
        if (token && userString) {
          setSelf({
            loggedIn: true,
            token,
            user: JSON.parse(userString),
          });
        }
        // setTimeout(() => {
        //   SplashScreen.hide();
        // }, LOADER_DELAY);
      })();
    },
    ({ onSet }) => {
      onSet((_appState) => {
        //@ts-ignore
        appState = _appState;
      });
    },
  ],
});

export const useAppState = () => useRecoilState(appAtom);

export const useAppValue = () => useRecoilValue(appAtom);

export const useSetAppState = () => useSetRecoilState(appAtom);

export const useResetAppState = () => useResetRecoilState(appAtom);

let appState = initialState;

export const fetchAppState = () => appState;

export let mutateAppState;
