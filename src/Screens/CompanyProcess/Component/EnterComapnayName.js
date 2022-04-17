/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
import CommonStyle from '../../../Components/CustomComponents/CommonStyle';
import Padding from '../../../Components/SharedComponents/Padding';
import {
  getFontSize,
  responsiveSize,
} from '../../../Components/SharedComponents/ResponsiveSize';
import Spacer from '../../../Components/SharedComponents/Space';
import {TextField} from '../../../Components/SharedComponents/TextField';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Body from '../../../Components/SharedComponents/Body';
import ChangeStyle from '../../../Components/CustomComponents/ChangeStyle';
import Lang from "../../../Language";
import {
  rightdropdwon,
  giftIcon,
  teaCupIcon,
  handIcon,
  cupIcon,
  fingerIcon,
  starIcon,
  treeIcon,
  kingIcon,
  thum,
  openGiftIcon,
  roketIcon,
  calender,
  blubIcon,
  bodyIcon,
} from '../../../Assets/icon';

export default class EnterCompanyName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemdiseble: '',
      checkNav: '',
      choiceCommunities: [
        {
          img: giftIcon,
          value: 'Having Fun',
          status: false,
        },
        {
          img: thum,
          value: 'Doing the Right Thing',
          status: false,
        },
        {
          img: calender,
          value: 'Current Events',
          status: false,
        },
        {
          img: handIcon,
          value: 'Making Things Better',
          status: false,
        },
        {
          img: fingerIcon,
          value: 'Doing a Great Job',
          status: false,
        },
        {
          img: blubIcon,
          value: 'Sparking Innovation',
          status: false,
        },
        {
          img: roketIcon,
          value: 'Inspiring & Motivating',
          status: false,
        },
        {
          img: teaCupIcon,
          value: 'Amazing Food',
          status: false,
        },
        {
          img: kingIcon,
          value: 'Great Leadership',
          status: false,
        },
        {
          img: cupIcon,
          value: 'Getting Involved',
          status: false,
        },
        {
          img: openGiftIcon,
          value: 'Learning Insights',
          status: false,
        },
        {
          img: bodyIcon,
          value: 'Exercise & Wellbeing',
          status: false,
        },
        {
          img: treeIcon,
          value: 'Eco-Friendly',
          status: false,
        },
        {
          img: starIcon,
          value: 'Enhancing Our Culture',
          status: false,
        },
      ],
      counter: 0,
    };
  }

  handleItemClick = index => {
    const {choiceCommunities} = this.state;
    choiceCommunities[index].status = !choiceCommunities[index].status;
    let counter = choiceCommunities.reduce((a, b) => {
      if (b.status) {
        a = a + 1;
      }
      return a;
    }, 0);
    this.setState({itemdiseble: counter, counter});
  };
  
  render() {
    return (
      <SafeAreaView style={CommonStyle.container}>
        <Body
          keyboardDismissMode="interactive"
          contentContainerStyle={{flexGrow: 1}}>
          <Padding horizontal size={responsiveSize(25)}>
            <TextField
              textStyle={CommonStyle.tittleStyle}
              status="Manegement"
            />
            <Spacer size={3} />
            <TextField
              textStyle={[CommonStyle.tittleStyle, {}]}
              status="Communities"
            />
            <Spacer size={5} />
            <View style={{flexDirection: 'row'}}>
              <TextField
                textStyle={ChangeStyle.interesttextStyle}
                status="Select 3 communities of interest that make you happy!"
              />
              {this.state.counter < 4 ? (
                <Text style={CommonStyle.interestCountStyle}>
                  {`${this.state.counter}/3`}{' '}
                </Text>
              ) : (
                <Text style={CommonStyle.interestCountStyle}>3/3 </Text>
              )}
            </View>
            <View>
              {this.state.choiceCommunities?.map((item, index) => {
                return (
                  <View key={index}>
                    <View
                      style={[
                        ChangeStyle.choicequestionStyle,
                        {
                          borderColor:
                            item.status == false ? 'lightgrey' : '#6111f4',
                          height: hp(7),
                        },
                      ]}>
                      <View style={{flexDirection: 'row', width: wp(50)}}>
                        <TouchableOpacity
                          onPress={() => this.handleItemClick(index)}
                          style={{width: wp(52)}}>
                          <Image
                            source={item.img}
                            style={[
                              ChangeStyle.interestimgStyle,
                              {right: responsiveSize(30)},
                            ]}
                            resizeMode={'contain'}
                          />
                          <Text
                            style={{
                              alignItems: 'center',
                              left: responsiveSize(55),
                              fontWeight: '500',
                              fontSize: getFontSize(17),
                              top: responsiveSize(-40),
                            }}>
                            {item.value}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={ChangeStyle.rightarrowTouchStyle}>
                          <Text style={[ChangeStyle.statictextStyle]}>
                            {Lang.LEARN}
                          </Text>
                          <Image
                            source={rightdropdwon}
                            style={ChangeStyle.rightArrowStyle}
                            resizeMode={'contain'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </Padding>
        </Body>
      </SafeAreaView>
    );
  }
}
