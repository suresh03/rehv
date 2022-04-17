/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import CommonStyle from '../../Components/CustomComponents/CommonStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HeaderBackAction} from '../../Components/CustomHeader/Header';
import Body from '../../Components/SharedComponents/Body';
import Lang from "../../Language";

const points_Data = [
  {
    point: '10 Points',
    year: 'May 15, 2021',
    contain: 'Commenting on John’s Poll.',
  },
  {
    point: '10 Points',
    year: 'May 15, 2021',
    contain: 'Commenting on John’s Poll.',
  },
  {
    point: '10 Points',
    year: 'May 15, 2021',
    contain: 'Commenting on John’s Poll.',
  },
  {
    point: '10 Points',
    year: 'May 15, 2021',
    contain: 'Commenting on John’s Poll.',
  },
  {
    point: '10 Points',
    year: 'May 15, 2021',
    contain: 'Commenting on John’s Poll.',
  },
  {
    point: '10 Points',
    year: 'May 15, 2021',
    contain: 'Commenting on John’s Poll.',
  },
  {
    point: '10 Points',
    year: 'May 15, 2021',
    contain: 'Commenting on John’s Poll.',
  },
];

export default function PointsEarnedScreen({navigation}) {
  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={Lang.POINTS_EARNED}
        headerViewStyle={{backgroundColor:'#fff'}}
      />
      <StatusBar barStyle="light-content" />
      <Body>
        <View
          style={[
            CommonStyle.pointCardStyle,
            {backgroundColor: '#EEEBFF', height: hp(20)},
          ]}>
          <View style={{alignSelf: 'center', top: hp(2)}}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                color: '#7F8190',
                fontSize: 20,
                marginVertical: hp(1),
              }}>
              {Lang.TOTAL}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                color: '#4D39E9',
                fontSize: 30,
                height: hp(5),
              }}>
              1001
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                color: '#110D26',
                fontSize: 22,
                marginVertical: hp(1),
              }}>
              {Lang.POINTS}
            </Text>
          </View>
        </View>

        <Body contentContainerStyle={{width: '100%'}}>
          {points_Data.map((item, Index) => {
            return (
              <View key={Index}>
                <View
                  style={[
                    CommonStyle.pointCardStyle,
                    {backgroundColor: '#fff'},
                  ]}>
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: wp(5),
                      marginVertical: hp(1),
                      top: hp(1),
                    }}>
                    <View
                      style={{
                        backgroundColor: '#EEEBFF',
                        width: wp(25),
                        height: hp(5),
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          top: hp(1.2),
                          textAlign: 'center',
                          fontFamily: 'Poppins-SemiBold',
                          color: '#4D39E9',
                          fontSize: 16,
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
                        left: wp(5),
                      }}>
                      {item.year}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      left: wp(8),
                      color: '#110D26',
                      fontSize: 15,
                    }}>
                    {item.contain}
                  </Text>
                  ;
                </View>
              </View>
            );
          })}
        </Body>
      </Body>
    </SafeAreaView>
  );
}
