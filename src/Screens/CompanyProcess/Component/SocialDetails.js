import React from "react";
/* eslint-disable react-native/no-inline-styles */
import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Spacer from "../../../Components/SharedComponents/Space";
import PropTypes from "prop-types";
import { linkdingIcon, twitterIcon } from "../../../Assets/icon";
import OutlinedInput from "../../../Components/SharedComponents/OutlinedInput";
import commonStyle from "../../../Components/CustomComponents/CommonStyle";
import Lang from "../../../Language";

function SocialDetails(props) {
  const {
    linkedinValue,
    setLinkedinValue,
    onFocusLinkedin,
    onBlurLinkedin,
    twitterValue,
    setTwitterValue,
    onBlurTwitter,
    onFocusTwitter,
    errorMessageTwitter,
    inputViewStyleTwitter,
    errorMessageLinkedin,
    inputViewStyleLinkedin,
  } = props;

  return (
    <>
      <View style={{ height: hp(63) }}>
        <View>
          <Spacer />
          <Text style={commonStyle.tittleStyle}>{Lang.SOCIAL_MEDIA}</Text>

          <Spacer size={30} />
          <OutlinedInput
            placeholder={Lang.LINKEDIN}
            placeholderTextColor={"grey"}
            img={linkdingIcon}
            value={linkedinValue}
            onChangeText={(text) => setLinkedinValue(text)}
            onFocus={() => onFocusLinkedin()}
            onBlur={() => onBlurLinkedin()}
            errorMessage={errorMessageLinkedin}
            inputViewStyle={inputViewStyleLinkedin}
          />
          <Spacer size={15} />
          <OutlinedInput
            placeholder={Lang.TWITTER}
            placeholderTextColor={"grey"}
            img={twitterIcon}
            value={twitterValue}
            onChangeText={(text) => setTwitterValue(text)}
            onBlur={() => onBlurTwitter()}
            onFocus={() => onFocusTwitter()}
            errorMessage={errorMessageTwitter}
            inputViewStyle={inputViewStyleTwitter}
          />
        </View>
      </View>
    </>
  );
}

SocialDetails.propTypes = {
  linkedinValue: PropTypes.string,
  setLinkedinValue: PropTypes.func,
  onFocusLinkedin: PropTypes.func,
  onBlurLinkedin: PropTypes.func,
  twitterValue: PropTypes.string,
  setTwitterValue: PropTypes.func,
  onBlurTwitter: PropTypes.func,
  onFocusTwitter: PropTypes.func,
  errorMessage: PropTypes.array,
  inputViewStyle: PropTypes.object,
  errorMessageTwitter: PropTypes.array,
  inputViewStyleTwitter: PropTypes.object,
  errorMessageLinkedin: PropTypes.array,
  inputViewStyleLinkedin: PropTypes.object,
};

export default SocialDetails;
