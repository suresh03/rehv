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
import { HeaderCustomLearn } from "../../Components/CustomHeader/HeaderBack";
import { useRoute } from "@react-navigation/native";
import Scaler from "../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import Spacer from "../../Components/SharedComponents/Space";
import Lang from "../../Language";

const slides = [loremIcon];
import { whiteback } from "../../Assets/icon";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
export default function LoremSlider({ navigation, route }) {
  const { name, description, picture, communityImage, totalMembers } =
    route.params.item;
  console.log("item", route.params.item);
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
      <View style={{ height:hp(61) }}>
        <ImageBackground
          source={{ uri: communityImage }}
          style={{ height: "100%", width: "100%" }}
          imageStyle={{height: "100%", width: "100%"}}
          >
          <HeaderCustomLearn
            backButtonStyle={{
              zIndex: 2,
              position: "absolute",
              top: Scaler(42),
              width:35,
              resizeMode:'contain'
            }}
            onBackPress={() => navigation.goBack()}
          />
        </ImageBackground>
      </View>
      <View style={ChangeStyle.lorembackgroundStyle}>
        <Body>
          <View style={ChangeStyle.loremViewStyle}>
            <View style={[ChangeStyle.boxStyle]}>
            <View style={{width:"25%"}}>
              <Image
                style={{ height: Scaler(52), width: Scaler(52) }}
                source={{uri:picture}}
                resizeMode={"contain"}
              />
              </View>
              <View
                style={{
                  alignSelf: "center",
                  width: "75%",
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
                      right:4
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
