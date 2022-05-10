/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ToastAndroid,
  Keyboard,
  Platform,
} from "react-native";
import { CustomButton } from "../../../Components/SharedComponents/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextField } from "../../../Components/SharedComponents/TextField";
import ChangeStyle from "../../../Components/CustomComponents/ChangeStyle";
import { arrowbackgroundBlue, greyArrow } from "../../../Assets/icon";
import Spacer from "../../../Components/SharedComponents/Space";
import Scaler from "../../../Utils/Scaler";
import { withTheme } from "react-native-paper";
import Lang from "../../../Language";

class OtpInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      buttonUp: false,
      oneborderColor: true,
      secondborderColor: false,
      threeborderColor: false,
      fourborderColor: false,
      fiveborderColor: false,
      sixborderColor: false,
    };
  }

  handleChangeTextOne = (text) => {
    this.setState({ one: text, buttonUp: true }, () => {
      if (this.state.one) this.refs.two.focus();
    });
  };
  handleChangeTextTwo = (text) => {
    this.setState({ two: text }, () => {
      if (this.state.two) this.refs.three.focus();
    });
  };
  handleChangeTextThree = (text) => {
    this.setState({ three: text }, () => {
      if (this.state.three) this.refs.four.focus();
    });
  };
  handleChangeTextFour = (text) => {
    this.setState({ four: text }, () => {
      if (this.state.four) this.refs.five.focus();
    });
  };
  handleChangeTextFive = (text) => {
    this.setState({ five: text }, () => {
      if (this.state.five) {
        this.refs.six.focus(),
          this.setState({ sixFocus: true, fiveFocus: false });
      }
    });
  };
  handleChangeTextSix = (text) => {
    this.setState({ six: text, sixFocus: true });
  };

  backspace = (id) => {
    if (id === "two") {
      if (this.state.two) {
        this.setState({ two: "" });
      } else if (this.state.one) {
        this.setState({ one: "" });
        this.refs.one.focus();
      }
    } else if (id === "three") {
      if (this.state.three) {
        this.setState({ three: "" });
      } else if (this.state.two) {
        this.setState({ two: "" });
        this.refs.two.focus();
      }
    } else if (id === "four") {
      if (this.state.four) {
        this.setState({ four: "" });
      } else if (this.state.three) {
        this.setState({ three: "" });
        this.refs.three.focus();
      }
    } else if (id === "five") {
      if (this.state.five) {
        this.setState({ five: "" });
      } else if (this.state.four) {
        this.setState({ four: "" });
        this.refs.four.focus();
      }
    } else if (id === "six") {
      if (this.state.six) {
        this.setState({ six: "" });
      } else if (this.state.five) {
        this.setState({ five: "" });
        this.refs.five.focus();
      }
    }
  };

  VerifyCode() {
    if (
      this.state.one == "" ||
      this.state.two == "" ||
      this.state.three == "" ||
      this.state.four == ""
    ) {
      ToastAndroid.show("Please Enter OTP.", ToastAndroid.LONG);
      return;
    } else {
      // this.Modal_closed()
    }
  }
  onFirstFocus = () => {
    this.setState({
      buttonUp: true,
      oneborderColor: true,
      secondborderColor: false,
      threeborderColor: false,
      fourborderColor: false,
      fiveborderColor: false,
      sixborderColor: false,
    });
  };

  secondFocus = () => {
    this.setState({
      oneborderColor: false,
      secondborderColor: true,
      threeborderColor: false,
      fourborderColor: false,
      fiveborderColor: false,
      sixborderColor: false,
    });
  };

  threeFocus = () => {
    this.setState({
      oneborderColor: false,
      secondborderColor: false,
      threeborderColor: true,
      fourborderColor: false,
      fiveborderColor: false,
      sixborderColor: false,
    });
  };

  fourFocus = () => {
    this.setState({
      oneborderColor: false,
      secondborderColor: false,
      threeborderColor: false,
      fourborderColor: true,
      fiveborderColor: false,
      sixborderColor: false,
    });
  };

  fiveFocus = () => {
    this.setState({
      oneborderColor: false,
      secondborderColor: false,
      threeborderColor: false,
      fourborderColor: false,
      fiveborderColor: true,
      sixborderColor: false,
    });
  };

  sixFocus = () => {
    this.setState({
      oneborderColor: false,
      secondborderColor: false,
      threeborderColor: false,
      fourborderColor: false,
      fiveborderColor: false,
      sixborderColor: true,
    });
  };

  render() {
    let { one, two, three, four, five, six } = this.state;
    let code = one + two + three + four + five + six;

    return (
      <>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp(85),
              alignSelf: "center",
              marginHorizontal: Scaler(20),
              marginTop: Scaler(60),
            }}
          >
            <TextInput
              maxLength={1}
              onFocus={() => this.onFirstFocus()}
              ref="one"
              returnKeyType="next"
              selectionColor="#000"
              placeholder={"-"}
              placeholderTextColor={"#000"}
              keyboardType="number-pad"
              onChangeText={(text) => {
                this.handleChangeTextOne(text);
              }}
              value={this.state.one}
              style={[
                styles.textInputstyle,
                {
                  borderColor:
                    this.state.oneborderColor == true
                      ? this.props.theme.colors.primary
                      : "lightgrey",
                },
              ]}
            />
            <TextInput
              maxLength={1}
              onFocus={() => this.secondFocus()}
              ref="two"
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === "Backspace" ? this.backspace("two") : null
              }
              keyboardType="phone-pad"
              returnKeyType="next"
              autoCorrect={false}
              placeholder={"-"}
              selectionColor="#000"
              placeholderTextColor={"#000"}
              keyboardType="number-pad"
              onChangeText={(text) => {
                this.handleChangeTextTwo(text);
              }}
              value={this.state.two}
              style={[
                styles.textInputstyle,
                {
                  borderColor:
                    this.state.secondborderColor == true
                      ? this.props.theme.colors.primary
                      : "lightgrey",
                },
              ]}
            />
            <TextInput
              maxLength={1}
              onFocus={() => this.threeFocus()}
              ref="three"
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === "Backspace" ? this.backspace("three") : null
              }
              autoCorrect={false}
              placeholder={"-"}
              selectionColor="#000"
              placeholderTextColor={"#000"}
              keyboardType="number-pad"
              onChangeText={(text) => {
                this.handleChangeTextThree(text);
              }}
              value={this.state.three}
              style={[
                styles.textInputstyle,
                {
                  borderColor:
                    this.state.threeborderColor == true
                      ? this.props.theme.colors.primary
                      : "lightgrey",
                },
              ]}
            />
            <TextInput
              maxLength={1}
              onFocus={() => this.fourFocus()}
              ref="four"
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === "Backspace" ? this.backspace("four") : null
              }
              autoCorrect={false}
              placeholder={"-"}
              selectionColor="#000"
              placeholderTextColor={"#000"}
              keyboardType="number-pad"
              onChangeText={(text) => {
                this.handleChangeTextFour(text);
              }}
              style={[
                styles.textInputstyle,
                {
                  borderColor:
                    this.state.fourborderColor == true
                      ? this.props.theme.colors.primary
                      : "lightgrey",
                },
              ]}
            />
            <TextInput
              maxLength={1}
              onFocus={() => this.fiveFocus()}
              ref="five"
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === "Backspace" ? this.backspace("five") : null
              }
              autoCorrect={false}
              maxLength={1}
              placeholder={"-"}
              selectionColor="#000"
              placeholderTextColor={"#000"}
              keyboardType="number-pad"
              onChangeText={(text) => {
                this.handleChangeTextFive(text);
              }}
              style={[
                styles.textInputstyle,
                {
                  borderColor:
                    this.state.fiveborderColor === true
                      ? this.props.theme.colors.primary
                      : "lightgrey",
                },
              ]}
            />
            <TextInput
              maxLength={1}
              onFocus={() => this.sixFocus()}
              ref="six"
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === "Backspace" ? this.backspace("six") : null
              }
              autoCorrect={false}
              maxLength={1}
              placeholder={"-"}
              selectionColor="#000"
              placeholderTextColor={"#000"}
              keyboardType="number-pad"
              onChangeText={(text) => {
                this.handleChangeTextSix(text);
              }}
              style={[
                styles.textInputstyle,
                {
                  borderColor:
                    this.state.sixborderColor == true
                      ? this.props.theme.colors.primary
                      : "lightgrey",
                },
              ]}
              returnKeyType="done"
              returnKeyLabel="Done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>

          <Spacer size={Scaler(20)} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <TextField
              textStyle={ChangeStyle["textchangeStyle"]}
              status={Lang.RESEND}
            />

            <TextField
              onPress={() => this.props.resendOtp()}
              textStyle={ChangeStyle["signStyle"]}
              status={" " + Lang.RESEND_TXT}
            />
          </View>
        </View>
        {this.props.check === true ? (
          <CustomButton
          loading={this.props.loading}
          disabled={code.length < 6}
          buttonIcon={
            this.props.loading || code.length < 6
              ? greyArrow
              : arrowbackgroundBlue
          }
          onPress={() => this.props.VerifyCode(code)}
          status={Lang.VERIFY}
          style={{
            bottom:Scaler(30)
          }}
        />
        ):<CustomButton
          loading={this.props.loading}
          disabled={code.length < 6}
          buttonIcon={
            this.props.loading || code.length < 6
              ? greyArrow
              : arrowbackgroundBlue
          }
          onPress={() => this.props.VerifyCode(code)}
          status={Lang.VERIFY}
        />}
        {/* <CustomButton
          loading={this.props.loading}
          disabled={code.length < 6}
          buttonIcon={
            this.props.loading || code.length < 6
              ? greyArrow
              : arrowbackgroundBlue
          }
          onPress={() => this.props.VerifyCode(code)}
          status={Lang.VERIFY}
          style={{
            bottom:Scaler(78)
          }}
        /> */}
        {/* <CustomButton
          loading={this.props.loading}
          disabled={code.length < 6}
          buttonIcon={
            this.props.loading || code.length < 6
              ? greyArrow
              : arrowbackgroundBlue
          }
          onPress={() => this.props.VerifyCode(code)}
          style={{
            position: "absolute",
            bottom: Platform.OS === "ios" ? Scaler(45) : Scaler(50),
          }}
          status={Lang.VERIFY}
        /> */}
      </>
    );
  }
}

export default withTheme(OtpInput);

const styles = StyleSheet.create({
  textInputstyle: {
    width: wp(12),
    borderWidth: 1,
    borderRadius: Scaler(10),
    height: hp(8),
    textAlign: "center",
    color: "#000",
    backgroundColor: "#fff",
    alignSelf: "center",
    fontSize: 20,
  },
});
