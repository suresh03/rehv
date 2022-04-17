import React from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  responsiveSize,
  getFontSize,
} from "../../../Components/SharedComponents/ResponsiveSize";
import { TextField } from "../../../Components/SharedComponents/TextField";
import Spacer from "../../../Components/SharedComponents/Space";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import { profilePic } from "../../../Assets/icon";
import PropTypes from "prop-types";
import ChangeStyle from "../../../Components/CustomComponents/ChangeStyle";
import Scaler from "../../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import Lang from "../../../Language";

function FeedManagement(props) {
  const { communityList } = props;
  console.log("CommunityList", communityList);
  const theme = useTheme();
  return (
    <View style={{ flex: 1, width: wp(100) }}>
      <Spacer size={Scaler(8)} />
      <TextField
        textStyle={CommonStyle.tittleStyle}
        status={Lang.CONGRATS}
      />
      <Spacer size={Scaler(8)} />
      <View style={{ flexDirection: "row" }}>
        <TextField
          textStyle={[ChangeStyle.interesttextStyle, { width: wp(70) }]}
          status={Lang.PEOPLE_INTEREST}
        />
      </View>
      {communityList.map((item, ind) => {
        return (
          <View style={{ flex: 1, marginVertical: 10 }} key={ind}>
            <View style={{}}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: "lightgrey",
                    height: hp(7.5),
                    paddingRight: Scaler(20),
                    marginVertical: responsiveSize(10),
                    borderWidth: responsiveSize(0.8),
                    borderRadius: responsiveSize(10),
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <View
                    style={{
                      height: Scaler(52),
                      width: Scaler(52),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.picture }}
                      style={{
                        height: Scaler(45),
                        width: Scaler(45),
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: Scaler(18),
                      ...theme.fonts.medium,
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme.colors.text
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {item.users.map((user, index) => {

                return (
                  <View
                    style={[ChangeStyle.congratulationViewStyle, {}]}
                    key={index}
                  >
                    <View style={{ height: Scaler(70) }}>
                      {user?.profilePic == undefined ||
                        user?.profilePic == null ||
                        user?.profilePic?.trim() == "" ? (
                        <Image
                          style={{
                            height: Scaler(70),
                            width: Scaler(70),
                            borderRadius: Scaler(35),
                          }}
                          source={profilePic}
                          resizeMode={"contain"}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: user?.profilePic?.trim(),
                          }}
                          style={{
                            height: Scaler(70),
                            width: Scaler(70),
                            borderRadius: Scaler(35),
                            resizeMode: "cover",
                          }}
                        />
                      )}
                    </View>
                    <Spacer size={Scaler(20)} />
                    <View style={{ height: Scaler(40) }}>
                      <Text
                        numberOfLines={2}
                        style={{
                          textAlign: "center",
                          fontSize: Scaler(14),
                          color: theme.colors.text,
                          ...theme.fonts.regular,
                        }}
                      >
                        {user.name + " " + user.lastName}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        );
      })}
      <Spacer size={Scaler(100)} />
    </View>
  );
}

FeedManagement.propTypes = {
  communityList: PropTypes.array,
};

export default FeedManagement;
