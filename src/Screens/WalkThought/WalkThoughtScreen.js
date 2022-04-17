// /* eslint-disable react-native/no-inline-styles */
// import React, { useState, useEffect, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
//   ImageBackground,
//   Platform,
//   Pressable,
// } from "react-native";

// const { width } = Dimensions.get("window");
// import {
//   wlakthoughtfrist,
//   wlakthoughtsecond,
//   wlakthoughtthird,
//   arrowbackgroundBlue,
// } from "../../Assets/icon";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { CustomButton } from "../../Components/SharedComponents/Button";
// import { useTheme } from "react-native-paper";
// import Scaler from "../../Utils/Scaler";
// const window = Dimensions.get("window");
// import Lang from "../../Language";
// const screen = Dimensions.get("screen");

// export default function Swiper_screen({ navigation }) {
//   const [sliderState, setSliderState] = useState({ currentPage: 0 });
//   const [dimensions, setDimensions] = useState({ window, screen });
//   const [pageStatus, setPageStatus] = useState(false);
//   const [data] = useState([
//     {
//       id: 1,
//       title: "Step 1",
//       description: Lang.WORK_DESC,
//       image: wlakthoughtfrist,
//     },
//     {
//       id: 2,
//       title: "Step 2",
//       description:Lang.BE_YOURSELF,
//       image: wlakthoughtsecond,
//     },
//     {
//       id: 3,
//       title: "Step 3",
//       description: Lang.SHARE_DESC,
//       image: wlakthoughtthird,
//     },
//   ]);
//   const scrollRef = useRef();

//   const setSliderPage = (event) => {
//     const { currentPage } = sliderState;
//     const { x } = event.nativeEvent.contentOffset;
//     const indexOfNextScreen = Math.round(x / width);
//     if (indexOfNextScreen !== currentPage) {
//       setSliderState({
//         ...sliderState,
//         currentPage: indexOfNextScreen,
//       });
//       if (indexOfNextScreen === 2) {
//         setPageStatus(true);
//       } else if (indexOfNextScreen === 0) {
//         setPageStatus(false);
//       } else if (indexOfNextScreen === 1) {
//         setPageStatus(false);
//       }
//     }
//   };

//   const { currentPage: pageIndex } = sliderState;

//   const toNextPage = () => {
//     if (scrollRef.current !== null) {
//       scrollRef.current?.scrollTo({
//         x: width * (pageIndex + 1),
//         animated: true,
//       });
//     }
//   };

//   useEffect(() => {
//     const subscription = Dimensions.addEventListener(
//       "change",
//       ({ window, screen }) => {
//         setDimensions({ window, screen });
//       }
//     );
//     return () => subscription;
//   });
//   const theme = useTheme();

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView
//         ref={scrollRef}
//         contentContainerStyle={{ flexGrow: 1 }}
//         horizontal={true}
//         scrollEventThrottle={16}
//         pagingEnabled={true}
//         showsHorizontalScrollIndicator={false}
//         onScroll={(event) => {
//           setSliderPage(event);
//         }}
//       >
//         {data.map((item, index) => (
//           <ImageBackground
//             key={index}
//             source={item.image}
//             style={{ width: wp(100), height: hp(100) }}
//             imageStyle={{}}
//           >
//             {pageStatus == false ? (
//               <View
//                 style={{
//                   flexDirection: "row",
//                   width: width / 1,
//                   justifyContent: "space-between",
//                   top:
//                     Platform.OS === "android"
//                       ? dimensions.window.height > 750
//                         ? Scaler(-30)
//                         : Scaler(-40)
//                       : Scaler(1),
//                 }}
//               >
//                 <TouchableOpacity
//                   style={[styles.skipButton2, {}]}
//                   onPress={() => navigation.navigate("SignUpScreen")}
//                 >
//                   <Text style={styles.skipButtonText}>{Lang.SKIP}</Text>
//                 </TouchableOpacity>
//               </View>
//             ) : null}
//             <View style={{ flex: 1, justifyContent: "center" }}>
//               <View style={styles.wrapper}>
//                 <Text
//                   style={{
//                     fontFamily: "Poppins-Medium",
//                     color: "#fff",
//                     fontSize: Scaler(25),
//                     width:
//                       item.description === "Share. Success. Happiness."
//                         ? wp(45)
//                         : wp(63),
//                     top:
//                       item.description === "Share. Success. Happiness."
//                         ? hp(4)
//                         : 0,
//                   }}
//                 >
//                   {item.description}
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.paginationWrapper,
//                   {
//                     top: Platform.OS === "ios" ? hp(19) : hp(19),
//                   },
//                 ]}
//               >
//                 {Array.from(Array(3).keys()).map((key, index) => (
//                   <Pressable
//                     style={{ height: Scaler(25),alignItems:'center' ,justifyContent:'center'}}
//                     onPress={() =>
//                       scrollRef.current.scrollTo({
//                         x: index * width,
//                         y: 0,
//                         animated: true,
//                       })
//                     }
//                     key={index.toString()}
//                   >
//                       {pageIndex === index ? (
//                         <View
//                           style={[
//                             styles.paginationDotsDark,
//                             {
//                               top:
//                                 item.description ===
//                                 "Share. Success. Happiness."
//                                   ? hp(5)
//                                   : 0,
//                             },
//                           ]}
//                           key={index}
//                         />
//                       ) : (
//                         <View
//                           style={[
//                             styles.paginationDots,
//                             {
//                               opacity: 0.2,
//                               top:
//                                 item.description ===
//                                 "Share. Success. Happiness."
//                                   ? hp(5)
//                                   : 0,
//                             },
//                           ]}
//                           key={index}
//                         />
//                       )}
//                   </Pressable>
//                 ))}
//               </View>
//             </View>
//           </ImageBackground>
//         ))}
//       </ScrollView>

//       <View
//         style={{
//           justifyContent: "center",
//           alignSelf: "center",
//           position: "absolute",
//           bottom:
//             Platform.OS === "ios"
//               ? dimensions.window.height > 800
//                 ? Scaler(70)
//                 : Scaler(60)
//               : Scaler(70),
//         }}
//       >
//         {pageStatus ? (
//           <CustomButton
//             buttonIcon={arrowbackgroundBlue}
//             onPress={() => navigation.navigate("SignInScreen")}
//             //onPress={() => navigation.navigate("CompanyName")}
//             style={{
//               top: Scaler(30),
//               backgroundColor: theme.colors.background,
//             }}
//             textStyle={{ fontSize: Scaler(16), color: "#000" }}
//             status={Lang.REHVUP_HAPPINESS}
//           />
//         ) : (
//           <CustomButton
//             onPress={() => toNextPage()}
//             //onPress={() => navigation.navigate("CompanyName")}
//             style={{
//               top: Scaler(30),
//               backgroundColor: theme.colors.background,
//             }}
//             textStyle={{ fontSize: Scaler(16), color: "#000" }}
//             status={Lang.NEXT}
//           />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     justifyContent: "center",
//     marginHorizontal: Scaler(35),
//     top: Platform.OS == "ios" ? hp(14) : hp(16),
//   },
//   paginationWrapper: {
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     top: Platform.OS == "ios" ? hp(19) : hp(21),
//   },
//   paginationDots: {
//     height: hp(0.5),
//     width: wp(9),
//     borderRadius: 10 / 2,
//     backgroundColor: "#FFFFFF",
//     marginLeft: Scaler(10),
//   },
//   paginationDotsDark: {
//     height: hp(0.5),
//     width: wp(8),
//     borderRadius: 10 / 2,
//     backgroundColor: "#FFFFFF",
//     marginLeft: Scaler(10),
//   },
//   skipButton2: {
//     width: Scaler(69),
//     borderRadius: Scaler(32),
//     alignSelf: "flex-end",
//     flex: 1,
//     height: Scaler(41),
//     marginTop: Scaler(50),
//     left: Scaler(150),
//   },
//   skipButtonText: {
//     color: "#FFFFFF",
//     fontSize: Scaler(18),
//     fontFamily: "Poppins-Regular",
//     textAlign: "center",
//     opacity: 0.6,
//     top: hp(1),
//   },
// });






import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Pressable,
} from "react-native";

const { width } = Dimensions.get("window");
import {
  wlakthoughtfrist,
  wlakthoughtsecond,
  wlakthoughtthird,
  arrowbackgroundBlue,
} from "../../Assets/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomButton } from "../../Components/SharedComponents/Button";
import { useTheme } from "react-native-paper";
import Scaler from "../../Utils/Scaler";
const window = Dimensions.get("window");
import Lang from "../../Language";
const screen = Dimensions.get("screen");

export default function Swiper_screen({ navigation }) {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const [dimensions, setDimensions] = useState({ window, screen });
  const [pageStatus, setPageStatus] = useState(false);
  const [data] = useState([
    {
      id: 1,
      title: "Step 1",
      description: Lang.WORK_DESC,
      image: wlakthoughtfrist,
    },
    {
      id: 2,
      title: "Step 2",
      description: Lang.BE_YOURSELF,
      image: wlakthoughtsecond,
    },
    {
      id: 3,
      title: "Step 3",
      description: Lang.SHARE_DESC,
      image: wlakthoughtthird,
    },
  ]);
  const scrollRef = useRef();

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
      if (indexOfNextScreen === 2) {
        setPageStatus(true);
      } else if (indexOfNextScreen === 0) {
        setPageStatus(false);
      } else if (indexOfNextScreen === 1) {
        setPageStatus(false);
      }
    }
  };

  const { currentPage: pageIndex } = sliderState;

  const toNextPage = () => {
    if (scrollRef.current !== null) {
      scrollRef.current?.scrollTo({
        x: width * (pageIndex + 1),
        animated: true,
      });
    }
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription;
  });
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          setSliderPage(event);
        }}
      >
        {data.map((item, index) => (
          <ImageBackground
            key={index}
            source={item.image}
            style={{ width: wp(100), height: hp(100) }}
            imageStyle={{}}
          >
            </ImageBackground>
        ))}
      </ScrollView>

<>
<View style={{ flex: 1, justifyContent: "center", position:'absolute', bottom:Scaler(280) }}>
              <View style={styles.wrapper}>
                {/* <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    color: "#fff",
                    fontSize: Scaler(25),
                    width:
                      item.description === "Share. Success. Happiness."
                        ? wp(45)
                        : wp(63),
                    top:
                      item.description === "Share. Success. Happiness."
                        ? hp(4)
                        : 0,
                  }}
                >
                  {item.description}
                </Text> */}

                <Text
              style={{
                    fontFamily: "Poppins-Medium",
                    color: "#fff",
                    fontSize: Scaler(25),
                    width: wp(75),
                    top:0,
                  }}
            >
              {pageIndex === 0
                ? Lang.WORK_DESC
                : pageIndex === 1
                ? Lang.BE_YOURSELF
                : Lang.SHARE_DESC}
            </Text>
              </View>
              <View
                style={[
                  styles.paginationWrapper,
                  {
                    top: Platform.OS === "ios" ? hp(19) : hp(19),
                  },
                ]}
              >
                {Array.from(Array(3).keys()).map((key, index) => (
                  <Pressable
                    style={{
                      height: Scaler(25),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      scrollRef.current.scrollTo({
                        x: index * width,
                        y: 0,
                        animated: true,
                      })
                    }
                    key={index.toString()}
                  >
                    {pageIndex === index ? (
                      <View
                        style={[
                          styles.paginationDotsDark,
                          {
                            
                          },
                        ]}
                        key={index}
                      />
                    ) : (
                      <View
                        style={[
                          styles.paginationDots,
                          {
                            opacity: 0.2,
                          },
                        ]}
                        key={index}
                      />
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          
</>
      <>
        {pageStatus == false ? (
          <View
            style={{
              flexDirection: "row",
              width: width / 1,
              justifyContent: "space-between",
              top:
                Platform.OS === "android"
                  ? dimensions.window.height > 750
                    ? Scaler(-30)
                    : Scaler(-40)
                  : Scaler(1),
              position: "absolute",
            }}
          >
            <TouchableOpacity
              style={[styles.skipButton2, {}]}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={styles.skipButtonText}>{Lang.SKIP}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </>
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          position: "absolute",
          bottom:
            Platform.OS === "ios"
              ? dimensions.window.height > 800
                ? Scaler(70)
                : Scaler(60)
              : Scaler(70),
        }}
      >
        {pageStatus ? (
          <CustomButton
            buttonIcon={arrowbackgroundBlue}
            onPress={() => navigation.navigate("SignInScreen")}
            //onPress={() => navigation.navigate("CompanyName")}
            style={{
              top: Scaler(30),
              backgroundColor: theme.colors.background,
            }}
            textStyle={{ fontSize: Scaler(16), color: "#000" }}
            status={Lang.REHVUP_HAPPINESS}
          />
        ) : (
          <CustomButton
            onPress={() => toNextPage()}
            //onPress={() => navigation.navigate("CompanyName")}
            style={{
              top: Scaler(30),
              backgroundColor: theme.colors.background,
            }}
            textStyle={{ fontSize: Scaler(16), color: "#000" }}
            status={Lang.NEXT}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    marginHorizontal: Scaler(35),
    top: Platform.OS == "ios" ? hp(14) : hp(16),
  },
  paginationWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: Platform.OS == "ios" ? hp(19) : hp(21),
  },
  paginationDots: {
    height: hp(0.5),
    width: wp(9),
    borderRadius: 10 / 2,
    backgroundColor: "#FFFFFF",
    marginLeft: Scaler(10),
  },
  paginationDotsDark: {
    height: hp(0.5),
    width: wp(8),
    borderRadius: 10 / 2,
    backgroundColor: "#FFFFFF",
    marginLeft: Scaler(10),
  },
  skipButton2: {
    width: Scaler(69),
    borderRadius: Scaler(32),
    alignSelf: "flex-end",
    flex: 1,
    height: Scaler(41),
    marginTop: Scaler(50),
    left: Scaler(150),
  },
  skipButtonText: {
    color: "#FFFFFF",
    fontSize: Scaler(18),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    opacity: 0.6,
    top: hp(1),
  },
});
