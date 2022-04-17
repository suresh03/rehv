/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {getFontSize} from '../../Components/SharedComponents/ResponsiveSize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ImageSliderIcon,
  ImageParticipantIcon,
  greylogoIcon,
  whiteback,
  greyshareIcon,
  greychatIcon,
} from '../../Assets/icon';
import {SliderBox} from 'react-native-image-slider-box';
import {FastImage} from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Lang from "../../Language";
const slides = [ImageSliderIcon, ImageParticipantIcon, ImageSliderIcon];

export default function CommentPictureScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <SliderBox
        ImageComponent={FastImage}
        images={slides}
        sliderBoxHeight={hp(100)}
        dotColor="rgba(255, 255, 255, 1)"
        inactiveDotColor="lightgrey"
        dotStyle={{
          width: wp(2.8),
          height: hp(1.4),
          borderRadius: 15,
          top: hp(-18),
        }}
      />
      {/* <ImageBackground source ={shadowIcon} style={{height: hp(1), width: wp(100), top: hp(-100) }}> */}
      <LinearGradient
        colors={['#000000', 'rgba(0, 0, 0, 0)']}
        style={{height: hp(30), width: wp(100), top: hp(-100)}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Image
              source={whiteback}
              resizeMode={'contain'}
              style={{left: 10, width: wp(7), height: hp(2.2), top: hp(7)}}
            />
          </TouchableOpacity>
          <View style={{flex: 1, top: hp(7)}}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: getFontSize(17),
                fontFamily: 'Poppins-Medium',
              }}>
              Wayne's {Lang.POST}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: getFontSize(14),
                fontFamily: 'Poppins-Regular',
                opacity: 0.7,
              }}>
              {Lang.MANAGER}
            </Text>
          </View>
        </View>
        {/* </ImageBackground> */}
      </LinearGradient>

      <LinearGradient
        colors={['#000000', 'rgba(0, 0, 0, 0.5)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: hp(15),
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <View style={{top: hp(25)}}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#fff',
                fontSize: getFontSize(17),
                fontFamily: 'Poppins-Medium',
                left: 10,
                width: wp(95),
                height: hp(10),
              }}>
              {Lang.IDEA_DESC}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                left: wp(2),
                justifyContent: 'space-around',
                top: hp(-3),
                height: hp(30),
              }}>
              <Image
                source={greylogoIcon}
                style={{width: wp(10), height: hp(5)}}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  width: wp(10),
                  height: hp(3),
                  right: wp(5),
                  top: hp(1),
                  color: '#ffff',
                  fontFamily: 'Poppins-Medium',
                }}>
                123
              </Text>
              <Image
                source={greychatIcon}
                style={{width: wp(10), height: hp(5), right: wp(10)}}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  width: wp(10),
                  height: hp(3),
                  right: wp(15),
                  top: hp(1),
                  color: '#ffff',
                  fontFamily: 'Poppins-Medium',
                }}>
                55
              </Text>
              <Image
                source={greyshareIcon}
                style={{width: wp(10), height: hp(5)}}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  width: wp(10),
                  height: hp(3),
                  right: wp(5),
                  top: hp(1),
                  color: '#ffff',
                  fontFamily: 'Poppins-Medium',
                }}>
                325
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
