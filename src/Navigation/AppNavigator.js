import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./RootStack";
import AuthStackNavigator from "./AuthNavigation";
import { useAppValue } from "../Recoil/appAtom";
import useChat from "../ServiceHooks/useChat";
import analytics from "@react-native-firebase/analytics";

// const config = {
//   screens: {
//     BottomTabs: 'BottomTabs'
//   },
// };

// const linking = {
//   prefixes: ['RehvUp://'],
//   config,
// };

function AppNavigator(props) {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const appState = useAppValue();
  console.log(appState);
  const { loggedIn, user } = appState;
  const { nav } = props;

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
          console.log("analytics => ", previousRouteName, currentRouteName);
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      {loggedIn == true && user?.accountVerified ? (
        <AuthStackNavigator />
      ) : (
        <RootStackNavigator />
      )}
    </NavigationContainer>
  );
}

export default AppNavigator;
