import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Aniamted,
} from "react-native";
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Scaler from "../../../Utils/Scaler";
import { useTheme } from "react-native-paper";
import moment from "moment";
import { whitecheckmark, dwonArrowIcon, dropDwonUp } from "../../../Assets/icon";
import RNPoll from "react-native-poll";
const { width } = Dimensions.get("window");
import RNAnimated from "react-native-animated-component";
import * as Animatable from "react-native-animatable";
import Lang from "../../../Language";

function PollDetailQuestion(props) {
  const { pollDetail, onOptionSelection, options } = props;
  const [getPollSwipper, setPollSwipper] = useState(false);
  const pollChoices = [
    {
      choice: "Option A",
      id: "61f4e9c8ba8713af0dfb3a7d",
      question: "industry. ",
      votes: 3,
    },
    {
      choice: "Option B",
      id: "61f4e9c8ba8713af0dfb3a7c",
      question: "industry. ",
      votes: 3,
    },
    {
      choice: "Option C",
      id: "61f4e9c8ba8713af0dfb3a7e",
      question: "industry. ",
      votes: 4,
    },
    {
      choice: "Option D",
      id: "61f4edc8ba8713af0dfb3a7s",
      question: "Lorem industry. ",
      votes: 0,
    },
  ];
  const theme = useTheme();
  const [getSelectedIndex, setSelectedIndex] = useState(null);

  console.log("options => ", options);
  // console.log("Poll details => " + JSON.stringify(pollDetail))

  function toggleAnimated() {
    const endWidth = 0;
    Animated.timing(this.state.width, {
      toValue: endWidth,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  const showData = (item, index) => {

    if (pollDetail.isGivenAnswer === false) {
      let totalVotes = pollDetail.totalVotes;
      let total = item.votes;
      let percent = Math.round((total / totalVotes) * 100);
      console.log("percent", percent, "index");
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            console.log("percent", percent, "index");
            if (getSelectedIndex === null) {
              // console.log("selectedChoice", selectedChoice, "options", options)
              setSelectedIndex(index);
              onOptionSelection(item);
            }
          }}
          style={{
            width: "100%",
            height: 55,
            backgroundColor: getSelectedIndex === index ? "#4d39E9" : "#FFFF",
            marginVertical: 5,
            borderRadius: 10,
            paddingHorizontal: 20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {getSelectedIndex != null ? (
            <View
              style={{
                width: percent + "%",
                height: "100%",
                backgroundColor:
                  getSelectedIndex === index
                    ? "rgba(255, 255, 255, 0.2)"
                    : "#EEEBFF",
                position: "absolute",
                borderRadius: 10,
              }}
            />
          ) : null}
          <Text
            style={{
              fontSize: Scaler(16),
              ...theme.fonts.regular,
              opacity: 0.8,
              fontWeight: "700",
              color: getSelectedIndex === index ? "#FFFF" : "#000",
            }}
          >
            {item.choice}
          </Text>
          {getSelectedIndex != null ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: Scaler(16),
                  ...theme.fonts.regular,
                  opacity: 0.8,
                  fontWeight: "700",
                  color: getSelectedIndex === index ? "#FFFF" : "#000",
                }}
              >
                {percent}%
              </Text>
              <Image
                source={whitecheckmark}
                style={{ width: 20, height: 20, marginLeft: 5 }}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      );
    } else {
      let totalVotes = pollDetail.totalVotes;
      let total = item.votes;
      let percent = Math.round((total / totalVotes) * 100);
      console.log("percent", percent, "index");
      let cho = "sdfdsgsdfjiougjdfklgjnfdkljuhgreijhkfldhnjeyfdhkyisjkriyjhlhnxgyrsnhnkjdfhyjhgnjkdsh9oujnbfdriyusi"
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: "100%",
            height: 55,
            backgroundColor: item.createdBy === 1 ? "#4d39E9" : "#FFF",
            marginVertical: 5,
            borderRadius: 10,
            //paddingHorizontal: 20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {item.isAnswered ? (
            <View
              style={{
                width: percent + "%",
                height: "100%",
                backgroundColor: item.createdBy === 1 ? "rgba(255, 255, 255, 0.2)"
                  : "#EEEBFF",
                position: "absolute",
                borderRadius: 10,
              }}
            />
          ) : null}
          <Text
            style={{
              fontSize: Scaler(16),
              ...theme.fonts.regular,
              opacity: 0.8,
              fontWeight: "700",
              //color: getSelectedIndex === index ? "#FFFF" : "#000",
              color: item.createdBy === 1 ? "#FFFF" : "#000",
              marginLeft: Scaler(17),
            }}
          >
            {/* {item.choice} */}
            {item.choice.length < 32
                ? `${item.choice}`
                : `${item.choice.substring(0, 32)}...`}
          </Text>
          {item.createdBy === 1 ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 20
              }}
            >
              <Text
                style={{
                  fontSize: Scaler(16),
                  ...theme.fonts.regular,
                  opacity: 0.8,
                  fontWeight: "700",
                  // color: getSelectedIndex === index ? "#FFFF" : "#000",
                  color: item.createdBy === 1 ? "#FFFF" : "#000",
                }}
              >
                {percent}%
              </Text>
              <Image
                source={item.createdBy === 1 ? whitecheckmark : null}
                style={{ width: 20, height: 20, marginLeft: 5 }}
              />
            </View>
          ) : <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginRight: Scaler(19),
            }}
          >
            <Text
              style={{
                fontSize: Scaler(16),
                ...theme.fonts.regular,
                opacity: 0.8,
                fontWeight: "700",
                // color: getSelectedIndex === index ? "#FFFF" : "#000",
                color: "#000",
              }}
            >
              {percent}%
            </Text>
          </View>}
        </TouchableOpacity>
      );
    }



  };

  if (options === undefined) {
    return <View />;
  }
  return (
    <View
      style={{
        marginHorizontal: Scaler(10),
        alignItems: "flex-start"
      }}
    >
      {/* <Text
        style={{
          color: "#fff",
          fontSize: Scaler(16),
          ...theme.fonts.medium,
          left: Scaler(10),
          width: wp(95),
        }}
      >
        {pollDetail?.question}
      </Text> */}
      <View style={{ width: "100%",height: 50, alignItems:'center', justifyContent:'center' }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setPollSwipper(data => !data)} style={{ width: 80, height: 20, borderRadius: 30, backgroundColor: "rgba(255, 255, 255, 1)", alignItems: 'center', justifyContent: 'center', position: "absolute" }}>
          <Image source={!getPollSwipper ? dropDwonUp : dwonArrowIcon} style={{ width: 15, height: 15 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: theme.colors.panelRed,
          width: Scaler(145),
          height: Scaler(65),
          borderRadius: Scaler(15),
          justifyContent: "center"
          // top: Scaler(15),
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: Scaler(12),
              ...theme.fonts.regular,
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            {Lang.EXPIRES_ON}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: Scaler(21),
              textAlign: "center",
              ...theme.fonts.medium,
            }}
          >
            {pollDetail.length != 0
              ? moment(pollDetail?.data[0].data[0].expiresDateOn).format(
                "MMM, DD"
              )
              : ""}
          </Text>
        </View>
      </View>

      {getPollSwipper ?
        <View style={{ overflow: "hidden" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: Scaler(16),
              ...theme.fonts.medium,
              left: Scaler(10),
              width: wp(95),
              top: Scaler(8)
            }}
          >
            {pollDetail?.question}
          </Text>
          <View
            style={{
              width: width / 1.07,
              borderRadius: Scaler(10),
              paddingHorizontal: Scaler(5),
              marginVertical: Scaler(15),
              alignSelf: 'center'
            }}
          >
            {options.length > 0
              ? options.map((item, index) => {
                return showData(item, index);
              })
              : null}
          </View>
        </View> : null}
    </View>
  );
}

PollDetailQuestion.propTypes = {
  pollDetail: PropTypes.object,
  onOptionSelection: PropTypes.func,
};

export default PollDetailQuestion;
