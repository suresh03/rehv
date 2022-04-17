import React, { Children, useState } from "react";
import { View, Pressable, Image, Text } from "react-native";
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
import ChoiceCard from "./ChoiceCard";
import Scaler from "../../../Utils/Scaler";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";
import Lang from "../../../Language";

function ChoiceInterest(props) {
  const { counter, handleItemClick, data, maxLimit } = props;
  const [iconToggle, setIconToggle] = useState(false);

  return (
    <View>
      <View>
        <Spacer size={3} />
        <View
          style={{
            width: "95%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={commonStyle.tittleStyle}>
            {`${Lang.COMMUNITY_OF}\n ${Lang.INTEREST}`}
          </Text>
          <Pressable onPress={() => setIconToggle(!iconToggle)}>
            <Image
              source={textShowIcon}
              style={{
                width: wp(15),
                height: hp(2),
                alignSelf: "flex-end",
                top: Scaler(42),
                left: Scaler(16),
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
                {`${Lang.SELECT_MAXIMUM} ${maxLimit} ${Lang.COMMUNITY_FROM_LIST}`}
              </Text>
            </View>
          </View>
        )}
        <Spacer size={5} />
        <View
          style={{
            width: "88%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            textStyle={ChangeStyle.interesttextStyle}
            status={`${Lang.SELECT} ${maxLimit} ${Lang.COI}\n${Lang.MAKE_HAPPY}`}
          />

          <Text
            style={[
              CommonStyle.interestCountStyle,
              { fontFamily: "Poppins-SemiBold", left: Scaler(12) },
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
                  handleItemClick={(i) => handleItemClick(i)}
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

ChoiceInterest.propTypes = {
  counter: PropTypes.number,
  maxLimit: PropTypes.number,
  data: PropTypes.array,
  handleItemClick: PropTypes.func,
};

ChoiceInterest.propTypes = {
  counter: 0,
};
export default ChoiceInterest;
