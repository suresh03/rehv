/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Text, StatusBar, SafeAreaView, Image, Linking, TouchableOpacity, View } from 'react-native';
import CommonStyle from '../../Components/CustomComponents/CommonStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { HeaderBackAction } from '../../Components/CustomHeader/Header';
import { contactUs, rehvupEmail } from '../../Assets/icon';
import Lang from "../../Language";

export default function ContactUsScreen({ navigation }) {
  return (
    <SafeAreaView style={CommonStyle.container}>
      <HeaderBackAction
        back_nav={() => navigation.pop()}
        headerText={true}
        headerContain={Lang.CONTACT_US}
        headerViewStyle={{ backgroundColor: '#fff' }}
      />
      <StatusBar barStyle="light-content" />
      <Image
        source={contactUs}
        resizeMode={'contain'}
        style={{ alignSelf: 'center', width: wp(80), height: hp(30) }}
      />

      <Image
        source={rehvupEmail}
        resizeMode={'contain'}
        style={{ alignSelf: 'center', width: wp(20), height: hp(10) }}
      />
      <View style={{ flexDirection: "row", alignSelf:'center' }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL(`tel:519-749-9899`)} >
          <Text
            style={{
              color: '#110D26',
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'Poppins-Medium',
            }}>
            519-749-9899
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL(`tel:1-888-228-5446`)} >
          <Text
            style={{
              color: '#110D26',
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'Poppins-Medium',
            }}>
            / 1-888-228-5446
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL('mailto:info@rehvup.io')} >
        <Image
          source={rehvupEmail}
          resizeMode={'contain'}
          style={{ alignSelf: 'center', width: wp(20), height: hp(15) }}
        />
        <Text
          style={{
            color: '#110D26',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            top: hp(-2),
          }}>
          info@rehvup.io
        </Text>
      </TouchableOpacity>
      <Image
        source={rehvupEmail}
        resizeMode={'contain'}
        style={{ alignSelf: 'center', width: wp(20), height: hp(15) }}
      />
      <Text
        style={{
          color: '#110D26',
          textAlign: 'center',
          fontSize: 20,
          fontFamily: 'Poppins-Medium',
          width: wp(60),
          alignSelf: 'center',
          top: hp(-2),
        }}>
        {Lang.ADDRESS}
      </Text>
    </SafeAreaView>
  );
}
