import moment from "moment";
import React, { useState, useEffect } from "react";
import { AppState } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export const TimeTrackerContext = React.createContext({ isActive: true });
import useApiServices from "../Services/useApiServices";

export function TimeTrackerProvider(props) {
  const [isActive, setIsActive] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const { ApiGetMethod } = useApiServices();
  const [startTime, setStartTime] = useState(null);

  const submitToServer = () => {
    let diffInMinute = moment().diff(startTime, "minute");
    console.log("diffInMinute", diffInMinute);
  };

  useFocusEffect(
    React.useCallback(() => {
      const subscription = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (
            appState.match(/inactive|background/) &&
            nextAppState === "active"
          ) {
            handleConnectivityChange(isActive);
            console.log("App has come to the foreground!");
            setStartTime(moment());
          } else {
            submitToServer();
            console.log("App has come to the background!");
          }
          setAppState(nextAppState);
        }
      );
      return () => {
        subscription.remove();
      };
    }, [appState])
  );

  const handleConnectivityChange = (active) => {
    console.log("handleConnectivityChange", active);
    setIsActive(active);
  };

  return (
    <TimeTrackerContext.Provider value={isActive}>
      {props.children}
    </TimeTrackerContext.Provider>
  );
}
