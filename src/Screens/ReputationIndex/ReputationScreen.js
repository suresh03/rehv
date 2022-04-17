/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import CommonStyle from '../../Components/CustomComponents/CommonStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HeaderBackAction} from '../../Components/CustomHeader/Header';
import Body from '../../Components/SharedComponents/Body';
import {rrr, wwwee, www} from '../../Assets/icon';
import {Divider} from 'react-native-paper';
import Lang from "../../Language";

const reputationData = [
  {
    point: '30k Points',
    reputationImg: www,
    reputationName: 'Myles',
  },
  {
    point: '20k Points',
    reputationImg: wwwee,
    reputationName: 'Patrick',
  },
  {
    point: '10k Points',
    reputationImg: rrr,
    reputationName: 'Christopher',
  },
  {
    point: '5k Points',
    reputationImg: www,
    reputationName: 'Maria',
  },
  {
    point: '4k Points',
    reputationImg: wwwee,
    reputationName: 'Vernon',
  },
  {
    point: '100k Points',
    reputationImg: rrr,
    reputationName: 'Vernon',
  },
  {
    point: '60k Points',
    reputationImg: www,
    reputationName: 'Christopher',
  },
];

export default function ReputationIndexScreen({navigation}) {
  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={'Reputation Index'}
        headerViewStyle={{backgroundColor:'#fff'}}
      />
      <StatusBar barStyle="light-content" />
      <Body>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(5),
          }}>
          <View style={CommonStyle.reputationImgStyle}>
            <Image
              source={wwwee}
              style={CommonStyle.reputationiconStyle}
              resizeMode={'contain'}
            />
            <Text style={CommonStyle.reputationNameStyle}>Derek</Text>
            <Text style={CommonStyle.reputationPointStyle}>60k {Lang.POINTS}</Text>
          </View>
          <View
            style={{
              height: 125,
              width: 125,
              borderRadius: 80,
              borderColor: '#EEEBFF',
              borderWidth: 6,
            }}>
            <Image
              source={rrr}
              style={{width: 112, height: 112, alignSelf: 'center'}}
              resizeMode={'contain'}
            />
            <Text style={CommonStyle.reputationNameStyle}>Erma</Text>
            <Text style={[CommonStyle.reputationPointStyle, {right: wp(0)}]}>
              100k {Lang.POINTS}
            </Text>
          </View>
          <View style={CommonStyle.reputationImgStyle}>
            <Image
              source={wwwee}
              style={CommonStyle.reputationiconStyle}
              resizeMode={'contain'}
            />
            <Text style={CommonStyle.reputationNameStyle}>David</Text>
            <Text style={CommonStyle.reputationPointStyle}>40k {Lang.POINTS}</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            marginVertical: hp(5),
            marginHorizontal: wp(3),
          }}>
          {reputationData.map((item, Index) => {
            return (
              <View key={Index}>
                <TouchableOpacity
                  style={{
                    marginVertical: hp(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={item.reputationImg}
                    style={{height: hp(8), width: wp(15)}}
                    resizeMode={'contain'}
                  />
                  <Text
                    style={{
                      width: wp(50),
                      fontFamily: 'Poppins-SemiBold',
                      color: '#110D26',
                      fontSize: 17,
                      alignSelf: 'center',
                    }}>
                    {item.reputationName}
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#EEEBFF',
                      padding: 5,
                      width: wp(27),
                      borderRadius: 15,
                      overflow: 'hidden',
                      right: wp(6),
                      height: hp(4.5),
                      alignSelf: 'center',
                      top: hp(0.5),
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Poppins-SemiBold',
                        color: '#4D39E9',
                        fontSize: 15,
                        top: hp(0.3),
                      }}>
                      {item.point}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Divider
                  style={{width: wp(90), alignSelf: 'center', top: hp(0)}}
                />
              </View>
            );
          })}
        </View>
      </Body>
    </SafeAreaView>
  );
}
