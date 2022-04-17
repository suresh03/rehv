import React, { Children, useState } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextField } from "../../../Components/SharedComponents/TextField";
import Spacer from "../../../Components/SharedComponents/Space";
import CommonStyle from "../../../Components/CustomComponents/CommonStyle";
import { textShowIcon } from "../../../Assets/icon";
import PropTypes from "prop-types";
import ChangeStyle from "../../../Components/CustomComponents/ChangeStyle";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import Scaler from "../../../Utils/Scaler";
import ChoiceCard from "./ChoiceCard";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";
import Lang from "../../../Language";

function ChoiceManagement(props) {
  const {
    counter,
    managementCounter,
    handleManagementItemClick,
    data,
    maxLimit,
  } = props;
  const navigation = useNavigation();
  const theme = useTheme();
  const [iconToggle, setIconToggle] = useState(false);
  return (
    <View>
      <View>
        <Spacer size={3} />
        <View
          style={{
            width: '95%',
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={commonStyle.tittleStyle}
          >
            {`${Lang.MEMBERS}\n${Lang.COMMUNITIES}`}
          </Text>
          <Pressable onPress={() => setIconToggle(!iconToggle)}>
            <Image
              source={textShowIcon}
              style={{
                width: wp(15),
                height: hp(2),
                alignSelf: "flex-end",
                top: 40,
                left: 30,
              }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        {iconToggle == false ? null : (
          <View
            style={{
              position: "absolute",
              right: Scaler(22),
              top: Scaler(50),
              alignSelf: "flex-end",
              zIndex: 2,
            }}
          >
            <View style={[ChangeStyle.contentTittle]}>
              <Text style={[ChangeStyle.contentStyle]}>
                {Lang.SELECT_COMMUNITY_DESC}
              </Text>
            </View>
          </View>
        )}
        <Spacer size={5} />
        <View style={{width:'88%', flexDirection: "row",justifyContent:'space-between' }}>
          <TextField
            textStyle={ChangeStyle.interesttextStyle}
            status={`${Lang.SELECT} ${maxLimit} ${Lang.COI}\n${Lang.MAKE_HAPPY}`}
          />
          <Text
            style={[
              CommonStyle.interestCountStyle,
              { fontFamily: "Poppins-SemiBold",left:Scaler(12) },
            ]}
          >
            {`${counter}/${maxLimit}`}{" "}
          </Text>
        </View>
        <View>
          {Children.toArray(
            data?.map((item, index) => {
              return (
                <ChoiceCard
                  item={item}
                  index={index}
                  handleItemClick={(i) => handleManagementItemClick(i)}
                />
              );
            })
          )}
        </View>
      </View>
      <View style={{ height: hp(25) }} />
    </View>
  );
}

ChoiceManagement.propTypes = {
  counter: PropTypes.number,
  managementCounter: PropTypes.bool,
  maxLimit: PropTypes.number,
  data: PropTypes.array,
  handleManagementItemClick: PropTypes.func,
};

ChoiceManagement.propTypes = {
  counter: 0,
  managementCounter: false,
};
export default ChoiceManagement;
