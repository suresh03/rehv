import {
  atom,
  DefaultValue,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

const initialState = {
  refreshCommunity: false,
};

const communityAtom = atom({
  key: "communityAtom",
  default: initialState,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      mutateCommunityState = setSelf;
      (async () => {})();
    },
    ({ onSet }) => {
      onSet((_communityState) => {
        //@ts-ignore
        communityState = _communityState;
      });
    },
  ],
});

export const useCommunityState = () => useRecoilState(communityAtom);

export const useCommunityValue = () => useRecoilValue(communityAtom);

export const useSetCommunityState = () => useSetRecoilState(communityAtom);

export const useResetCommunityState = () => useResetRecoilState(communityAtom);

let communityState = initialState;

export const fetchCommunityState = () => communityState;

export let mutateCommunityState;
