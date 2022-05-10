import React from 'react';
import {View, Text} from 'react-native';
import CommonStyle from '../../../Components/CustomComponents/CommonStyle';
import ChangeStyle from '../../../Components/CustomComponents/ChangeStyle';

export const ContentText = props => {
  return (
    <View style={CommonStyle.container}>
      <View style={[ChangeStyle.contentTittle, props.customtittleStyle]}>
        <Text style={[ChangeStyle.contentStyle, props.valueStyle]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </View>
    </View>
  );
};
