import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

const initialState = {
  connected: false,
  socketRef: null,
  socketLoading: false,
  newMessage: {},
  chatList:[]
};

const socketAtom = atom({
  key: "socketAtom",
  default: initialState,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      mutateSocketState = setSelf;
      (async () => {})();
    },
    ({ onSet }) => {
      onSet((_SocketState) => {
        //@ts-ignore
        SocketState = _SocketState;
      });
    },
  ],
});

export const useSocketState = () => useRecoilState(socketAtom);

export const useSocketValue = () => useRecoilValue(socketAtom);

export const useSetSocketState = () => useSetRecoilState(socketAtom);

export const useResetSocketState = () => useResetRecoilState(socketAtom);

let SocketState = initialState;

export const fetchSocketState = () => SocketState;

export let mutateSocketState;
