/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import CommonStyle from '../../Components/CustomComponents/CommonStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HeaderBackAction} from '../../Components/CustomHeader/Header';
import Body from '../../Components/SharedComponents/Body';
import {goldenIcon, badgesBlankIcon} from '../../Assets/icon';
import {getFontSize} from '../../Components/SharedComponents/ResponsiveSize';
import Lang from "../../Language";

const mybadgesData = [
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
];

const allbadgesData = [
  {
    point: '10k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
  {
    point: '100k Points',
    year: 'May 15, 2021',
    contain: 'Golden Badge',
    mendalImg: goldenIcon,
  },
];

export default function BadgesEarnedScreen({navigation}) {
  const [mybadges, setMybadges] = useState(true);
  const [allBadges, setallBadges] = useState(false);

  const buttonChange = type => {
    if (type === 'mybadges') {
      setMybadges(true);
      setallBadges(false);
    } else {
      setMybadges(false);
      setallBadges(true);
    }
  };
  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={'Badges Earned'}
        headerViewStyle={{backgroundColor:'#fff'}}
      />
      <StatusBar barStyle="light-content" />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          marginVertical: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            borderRadius: 60,
            borderWidth: 2,
            borderColor: '#E9E5E4',
            overflow: 'hidden',
            height: hp(5.7),
            width: wp(90),
          }}>
          <Pressable
            onPress={() => buttonChange('mybadges')}
            style={{
              backgroundColor: !mybadges ? '#fff' : '#4D39E9',
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
              top: 3,
              borderRadius: 50,
              height: hp(4.5),
              left: 5,
            }}>
            <Text
              style={{
                color: !mybadges ? '#000000' : '#FFFFFF',
                fontFamily: 'Poppins-Medium',
                fontSize: getFontSize(15),
              }}>
              {Lang.MY_BADGES}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => buttonChange('allBadges')}
            style={{
              backgroundColor: !allBadges ? '#fff' : '#4D39E9',
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
              top: 3,
              borderRadius: 50,
              height: hp(4.5),
              right: 5,
            }}>
            <Text
              style={{
                color: !allBadges ? '#000000' : '#FFFFFF',
                fontFamily: 'Poppins-Medium',
                fontSize: getFontSize(15),
              }}>
              {Lang.ALL_BADGES}
            </Text>
          </Pressable>
        </View>
      </View>
      {mybadgesData?.length || allbadgesData?.length > 0 ? (
        <Body>
          <View style={{alignItems: 'center'}}>
            <Image
              source={goldenIcon}
              style={{width: wp(20), height: hp(10), marginVertical: hp(2)}}
            />
            <Text
              style={{
                color: '#000',
                fontSize: getFontSize(17),
                top: -10,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {Lang.GOLDEN_BADGE}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp(3),
              justifyContent: 'space-evenly',
            }}>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: getFontSize(17),
                  top: -10,
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'center',
                }}>
                131
              </Text>
              <Text
                style={{
                  color: '#7F8190',
                  fontSize: getFontSize(16),
                  top: -10,
                  fontFamily: 'Poppins-Medium',
                }}>
                {Lang.RANK}
              </Text>
            </View>
            <View
              style={{
                borderRightWidth: 1,
                height: hp(5),
                borderRightColor: '#CECECE',
                alignSelf: 'center',
                top: hp(-1),
              }}
            />
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: getFontSize(17),
                  top: -10,
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'center',
                }}>
                1001
              </Text>
              <Text
                style={{
                  color: '#7F8190',
                  fontSize: getFontSize(16),
                  top: -10,
                  fontFamily: 'Poppins-Medium',
                }}>
                {Lang.POINTS}
              </Text>
            </View>
          </View>
          <View style={{top: hp(-3.5)}}>
            {allBadges == true ? (
              <Body contentContainerStyle={{width: '100%'}}>
                {mybadgesData.map((item, Index) => {
                  return (
                    <View key={Index}>
                      <View
                        style={[
                          CommonStyle.pointCardStyle,
                          {backgroundColor: '#fff', height: hp(10)},
                        ]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginVertical: hp(1),
                            left: wp(5),
                          }}>
                          <Image
                            source={item.mendalImg}
                            style={{height: hp(8)}}
                          />
                          <Text
                            style={{
                              fontFamily: 'Poppins-SemiBold',
                              left: wp(5),
                              color: '#110D26',
                              fontSize: 17,
                            }}>
                            {item.contain}
                          </Text>
                        </View>
                        <View
                          style={{
                            top: hp(-6),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: wp(5),
                            left: wp(10),
                          }}>
                          <View
                            style={{
                              backgroundColor: '#EEEBFF',
                              width: wp(25),
                              height: hp(3.5),
                              borderRadius: 10,
                              top: hp(1),
                              left: wp(8),
                            }}>
                            <Text
                              style={{
                                top: hp(0.5),
                                textAlign: 'center',
                                fontFamily: 'Poppins-SemiBold',
                                color: '#4D39E9',
                                fontSize: 14,
                              }}>
                              {item.point}
                            </Text>
                          </View>
                          <Text
                            style={{
                              padding: 10,
                              textAlign: 'center',
                              fontFamily: 'Poppins-Medium',
                              color: '#7F8190',
                              fontSize: 12,
                              right: wp(10),
                            }}>
                            {item.year}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </Body>
            ) : (
              <Body contentContainerStyle={{width: '100%'}}>
                {allbadgesData.map((item, Index) => {
                  return (
                    <View key={Index}>
                      <View
                        style={[
                          CommonStyle.pointCardStyle,
                          {backgroundColor: '#fff', height: hp(10)},
                        ]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginVertical: hp(1),
                            left: wp(5),
                          }}>
                          <Image
                            source={item.mendalImg}
                            style={{height: hp(8)}}
                          />
                          <Text
                            style={{
                              fontFamily: 'Poppins-SemiBold',
                              left: wp(5),
                              color: '#110D26',
                              fontSize: 17,
                            }}>
                            {item.contain}
                          </Text>
                        </View>
                        <View
                          style={{
                            top: hp(-6),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: wp(5),
                            left: wp(10),
                          }}>
                          <View
                            style={{
                              backgroundColor: '#EEEBFF',
                              width: wp(25),
                              height: hp(3.5),
                              borderRadius: 10,
                              top: hp(1),
                              left: wp(8),
                            }}>
                            <Text
                              style={{
                                top: hp(0.5),
                                textAlign: 'center',
                                fontFamily: 'Poppins-SemiBold',
                                color: '#4D39E9',
                                fontSize: 14,
                              }}>
                              {item.point}
                            </Text>
                          </View>
                          <Text
                            style={{
                              padding: 10,
                              textAlign: 'center',
                              fontFamily: 'Poppins-Medium',
                              color: '#7F8190',
                              fontSize: 12,
                              right: wp(10),
                            }}>
                            {item.year}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </Body>
            )}
          </View>
        </Body>
      ) : (
        <View style={{justifyContent: 'center', flex: 1}}>
          <View
            style={{
              backgroundColor: '#fff',
              alignSelf: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 6,
              shadowOpacity: 0.1,
              elevation: 5,
              borderRadius: 10,
              width: '90%',
              height: hp(55),
            }}>
            <Image
              source={badgesBlankIcon}
              resizeMode={'contain'}
              style={{width: wp(60), height: hp(40), alignSelf: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                padding: 10,
                width: wp(90),
                alignSelf: 'center',
                fontSize: 17,
                fontFamily: 'Poppins-Medium',
                color: '#7F8190',
              }}>
              {Lang.NO_BADGE_DESC}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
