import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

const initialState = {
  modalVisible: false,
};

const createPostAtom = atom({
  key: "createPostAtom",
  default: initialState,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      mutateCreatePostState = setSelf;
      (async () => {})();
    },
    ({ onSet }) => {
      onSet((_createPostState) => {
        //@ts-ignore
        createPostState = _createPostState;
      });
    },
  ],
});

export const useCreatePostState = () => useRecoilState(createPostAtom);

export const useCreateValue = () => useRecoilValue(createPostAtom);

export const useSetCreatePostState = () => useSetRecoilState(createPostAtom);

export const useResetCreatePostState = () =>
  useResetRecoilState(createPostAtom);

let createPostState = initialState;

export const fetchCreatePostState = () => createPostState;

export let mutateCreatePostState;
