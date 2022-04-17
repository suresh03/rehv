import React, { useEffect } from "react";
import { View, DeviceEventEmitter } from "react-native";
import AppNavigator from "./src/Navigation/AppNavigator";
import { RecoilRoot } from "recoil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntIcons from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Provider as PaperProvider } from "react-native-paper";
import { DayTheme } from "./src/Constants/theme";
import crashlytics from "@react-native-firebase/crashlytics";
import { createStore } from "redux";
import Reducers from "./src/Redux/reducers";
import { Provider } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import FlashMessage from "react-native-flash-message";
import TouchID from "react-native-touch-id";
import AsyncStorage from "@react-native-community/async-storage";
import Lang from "./src/Language";
import { useNavigationContainerRef } from "@react-navigation/native";
let store = createStore(Reducers);
import messaging from "@react-native-firebase/messaging";
import { storeToLocal } from "./src/Utils/LocalStorage";
import notifee, { EventType, AndroidImportance } from "@notifee/react-native";
import { NetworkProvider } from "./src/Utils/NetworkProvider";
import SplashScreen from "react-native-splash-screen";

const TOPIC = "MyNews";
const App = () => {
  const navigationRef = useNavigationContainerRef();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log("Authorization status(authStatus):", authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((fcmToken) => {
          console.log("FCM Token -> ", fcmToken);
          storeToLocal("firebaseToken", {
            fcmId: fcmToken.toString(),
          });
        });
    } else {
      console.log("Not Authorization status:", authStatus);
    }

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "onNotificationOpenedApp: " +
            "Notification caused app to open from background state",
          remoteMessage
        );
        var data = JSON.parse(remoteMessage.data.data);
        console.log("backgrond open", data);
        if (remoteMessage.data.type === "1") {
          navigationRef.navigate("PostDetailScreen", {
            postId: data._id,
            eventType: data.eventType,
          });
        } else if (remoteMessage.data.type === "2") {
          navigationRef.navigate("PostDetailScreen", {
            postId: data._id,
            eventType: data.eventType,
          });
        } else if (remoteMessage.data.type === "3") {
          navigationRef.navigate("CommentScreen", {
            data: {
              isLikes: data?.isLikes,
              eventType: data.eventType,
              pictureUrl: data?.pictureUrl,
              isCommented: data?.isCommented,
              postId: data._id,
              totalLikes: data.totalLikes,
              totalComments: data.totalComments,
              description: data?.description,
              name: "Singh",
              postCreatedUserType: data.postCreatedUserType,
              selectedCommunityId: data.communityId,
            },
            item: data,
          });
        } else if (remoteMessage.data.type === "4") {
          navigationRef.navigate("PostDetailScreen", {
            postId: data._id,
            eventType: data.eventType,
          });
        } else if (remoteMessage.data.type === "5") {
          navigationRef.navigate("Acheivement");
        } else if (remoteMessage.data.type === "6") {
          navigationRef.navigate("TrendingScreen");
        } else if (remoteMessage.data.type === "7") {
          navigationRef.navigate("HomeScreen");
        } else if (remoteMessage.data.type === "8") {
          navigationRef.navigate("Achievements");
        } else if (remoteMessage.data.type === "9") {
          navigationRef.navigate("Achievements");
        }
      }
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
      onMessageReceived(remoteMessage);
    });

    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Suscribed`);
      });

    return () => {
      unsubscribe;
    };
  }, []);

  const goTopage = (detail) => {
    var data = JSON.parse(detail.data.data);
    console.log("BBBBBBBBBBB", detail);
    if (detail.data.type === "1") {
      navigationRef.navigate("PostDetailScreen", {
        postId: data._id,
        eventType: data.eventType,
      });
    } else if (detail.data.type === "2") {
      navigationRef.navigate("PostDetailScreen", {
        postId: data._id,
        eventType: data.eventType,
      });
    } else if (detail.data.type === "3") {
      navigationRef.navigate("CommentScreen", {
        data: {
          isLikes: data?.isLikes,
          eventType: data.eventType,
          pictureUrl: data?.pictureUrl,
          isCommented: data?.isCommented,
          postId: data._id,
          totalLikes: data.totalLikes,
          totalComments: data.totalComments,
          description: data?.description,
          name: "Singh",
          postCreatedUserType: data.postCreatedUserType,
          selectedCommunityId: data.communityId,
        },
        item: data,
      });
    } else if (detail.data.type === "4") {
      navigationRef.navigate("PostDetailScreen", {
        postId: data._id,
        eventType: data.eventType,
      });
    } else if (detail.data.type === "5") {
      navigationRef.navigate("Acheivement");
    } else if (detail.data.type === "6") {
      navigationRef.navigate("TrendingScreen");
    } else if (detail.data.type === "7") {
      navigationRef.navigate("HomeScreen");
    } else if (detail.data.type === "8") {
      navigationRef.navigate("Achievements");
    } else if (detail.data.type === "9") {
      navigationRef.navigate("Achievements");
    }
  };

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log("[Forground Event CLick ]", { type, detail });
      switch (type) {
        case EventType.DISMISSED:
          console.log("User dismissed notification", detail.notification);
          break;
        case EventType.PRESS:
          console.log("User pressed notification", detail?.notification);
          goTopage(detail?.notification);
          break;
      }
    });
  }, []);

  const onMessageReceived = async (message) => {
    console.log("[By NOTIFY]", { message });
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
    });

    // // Display a notification
    notifee.displayNotification({
      ...message.notification,
      android: {
        ...message.notification.android,
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: "ic_small_icon",
      },
      data: {
        ...message.data,
      },
    });
  };

  useEffect(() => {
    checkTouchId();
  }, []);

  const initialFunctionLoader = () => {
    getLanguageData();
    crashlytics().log("App mounted.");
  };

  const getLanguageData = async () => {
    const lang = await AsyncStorage.getItem("LANGUAGE");
    if (lang) {
      Lang.setLanguage(lang);
    } else {
      Lang.setLanguage("en");
    }
  };

  useEffect(() => {
    MaterialCommunityIcons.loadFont();
    EvilIcons.loadFont();
    AntIcons.loadFont();
    Feather.loadFont();
    Ionicons.loadFont();
    Entypo.loadFont();
    FontAwesome.loadFont();
  }, []);

  const checkTouchId = async () => {
    const getLockEnabled = await AsyncStorage.getItem("LOCK_TYPE");
    const getToken = await AsyncStorage.getItem("token");
    console.log("LOCK_TYPE " + getLockEnabled);
    const optionalConfigObject = {
      title: Lang.REHVUP,
      sensorDescription: Lang.TOUCH_SENSOR,
      sensorErrorDescription: Lang.TOUCH_ERROR,
      imageColor: DayTheme.colors.primary,
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    };
    if (getLockEnabled) {
      await TouchID.authenticate(
        "Please verify your identity.",
        optionalConfigObject
      )
        .then((success) => {
          SplashScreen.hide();
          return initialFunctionLoader();
        })
        .catch((error) => {
          DeviceEventEmitter.emit("authState", "failure");
          SplashScreen.hide();
          return initialFunctionLoader();
        });
    } else {
      SplashScreen.hide();
      return initialFunctionLoader();
    }
  };

  return (
    <NetworkProvider>
      <PaperProvider theme={DayTheme}>
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <RecoilRoot>
              <MenuProvider>
                <AppNavigator nav={navigationRef} />
                <FlashMessage
                  position="top"
                  textStyle={{ alignSelf: "center", textAlign: "center" }}
                  titleStyle={{ alignSelf: "center", textAlign: "center" }}
                />
              </MenuProvider>
            </RecoilRoot>
          </View>
        </Provider>
      </PaperProvider>
    </NetworkProvider>
  );
};

export default App;
