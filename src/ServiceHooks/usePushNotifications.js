import React from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotificationServices from "../Services/PushNotificationServices";
import SnackbarHandler from "../Utils/SnackbarHandler";

function usePushNotifications(props) {
  const [token, setToken] = React.useState("");

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      SnackbarHandler.errorToast(
        "A new FCM message arrived!",
        JSON.stringify(remoteMessage)
      );
    });
    return unsubscribe;
  }, []); 

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
  }, []);

  useEffect(() => {
    // Get the device token
    PushNotificationServices.requestUserPermission().then(() => {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
          setToken(token);
        });
    });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      console.log(token);
      setToken(token);
    });
  }, []);
  return { token };
}

export default usePushNotifications;
