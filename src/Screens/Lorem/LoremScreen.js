/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import CommonStyle from "../../Components/CustomComponents/CommonStyle";

import { loremIcon, giftIcon } from "../../Assets/icon";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Body from "../../Components/SharedComponents/Body";
import ChangeStyle from "../../Components/CustomComponents/ChangeStyle";
import { HeaderCustom } from "../../Components/CustomHeader/HeaderBack";
import { useRoute } from "@react-navigation/native";
import Scaler from "../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import Spacer from "../../Components/SharedComponents/Space";
import Lang from "../../Language";

const slides = [loremIcon];
import { whiteback } from "../../Assets/icon";
export default function LoremSlider({ navigation, route }) {
  const { name, description, picture, communityImage,  totalMembers } = route.params.item;
  console.log("item", route.params.item)
  const theme = useTheme();
  return (
    <View style={CommonStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

      {/* <SliderBox
        ImageComponent={FastImage}
        images={slides}
        sliderBoxHeight={hp(60)}
        dotColor="#fff"
        inactiveDotColor="lightgrey"
        dotStyle={ChangeStyle.sliderimgStyle}
      /> */}

      <Image source={{uri:communityImage}} style={{ height: hp(61), width: "100%" }} />
      <HeaderCustom
        back_navstyle={{ marginTop: Platform.OS === "ios" ? hp(-58) : hp(-62) }}
        back_whiteColor={() => navigation.goBack()}
      />

      <View style={ChangeStyle.lorembackgroundStyle}>
        <Body>
          <View style={ChangeStyle.loremViewStyle}>
            <View style={[ChangeStyle.boxStyle]}>
              <Image
                style={{ height: Scaler(52), width: Scaler(52) }}
                source={{uri:picture}}
                resizeMode={"contain"}
              />
              <View
                style={{
                  alignSelf: "center",
                  width: Scaler(150),
                  alignItems: "center",
                  //paddingHorizontal: 5,
                }}
              >
                <Text
                  style={[
                    ChangeStyle.loremtextStyle,
                    {
                      textAlign: "left",
                      fontSize: Scaler(13),
                      color: "#000",
                    },
                  ]}
                >
                  {name}
                </Text>
              </View>
            </View>
            <View style={ChangeStyle.secondboxStyle}>
              <Text style={{ fontSize: 20, ...theme.fonts.medium }}>
                {totalMembers}
              </Text>
              <Text style={ChangeStyle.loremMemberStyle}>{Lang.MEMBERS}</Text>
            </View>
          </View>
          <Text style={ChangeStyle.loremcontentStyle}>{description}</Text>
        </Body>
      </View>
    </View>
  );
}
