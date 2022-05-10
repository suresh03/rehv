import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { rightdropdwon, tickIcon } from "../../../Assets/icon";
import { useTheme } from "react-native-paper";
import Scaler from "../../../Utils/Scaler";
import { useNavigation } from "@react-navigation/native";
import Lang from "../../../Language";
import PropTypes from "prop-types";
import Spacer from "../../../Components/SharedComponents/Space";

function ChoiceCard(props) {
  const theme = useTheme();
  const navigation = useNavigation();
  const { item, index, handleItemClick, containerStyle } = props;
  return (
    <View
      key={index}
      style={[
        {
          borderColor:
            item.status == false ? "lightgrey" : theme.colors.primary,
          marginVertical: Scaler(8),
          borderWidth: Scaler(0.8),
          borderRadius: Scaler(10),
          width: wp(90),
          minHeight: Scaler(52),
          paddingVertical: Scaler(2.5),
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity
        onPress={() => handleItemClick(index)}
        style={{
          width: "70%",
          // backgroundColor:'red',
          minHeight: Scaler(54),
          paddingVertical: Scaler(5),
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
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
            resizeMode={"contain"}
          />
        </View>
        <View
          style={{
            width: "75%",
          }}
        >
          <Text
            style={{
              alignItems: "center",
              fontFamily: "Poppins-Medium",
              fontSize: Scaler(16),
              color: "#000",
              marginLeft: Scaler(5),
            }}
          >
            {item.langType === "en" ? item.name : item.frenchName}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignSelf: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() =>
          navigation.navigate("LoremSlider", {
            item: item,
          })
        }
      >
        <Text
          style={[
            {
              fontFamily: "Poppins-Regular",
              color: "grey",
              alignSelf: "center",
              marginRight: Scaler(10),
            },
          ]}
        >
          {Lang.LEARN}
        </Text>

        <Image
          source={rightdropdwon}
          style={{
            width: Scaler(15),
            height: Scaler(15),

            alignSelf: "center",
          }}
          resizeMode={"contain"}
        />
      </TouchableOpacity>

      {item.status == true ? (
        <Image
          style={{
            height: Scaler(50),
            width: Scaler(50),
            resizeMode: "contain",
            position: "absolute",
            top: -Scaler(15),
            right: -Scaler(14),
          }}
          source={tickIcon}
        />
      ) : null}

      <Spacer size={1} horizontal />
    </View>
  );
}

ChoiceCard.propTypes = {
  containerStyle: PropTypes.any,
};

export default ChoiceCard;
