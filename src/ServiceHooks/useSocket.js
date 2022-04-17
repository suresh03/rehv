import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { someAtom } from './recoilstates/someState';

const useSocket = () => {
  const [someState, setSomeState] = useRecoilState(someAtom);
  const latestSomeState = useRef(someState);

  useEffect(()=> {
    latestSomeState.current = someState;
  },[someState]);

  // I use useEffect here as an example,
  // custom hook can contain any React hooks
  useEffect(()=>{
    // your custom hook logic here
    // use latestSomeState.current for latest value
  });
}