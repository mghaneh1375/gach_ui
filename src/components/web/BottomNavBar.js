import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'react-router-dom';

import {
  NavItemStyle,
  NavItemContainerStyle,
  NavItemImageStyle,
  NavContainerStyle,
  NavTextStyle,
} from '../../styles/web/BottomNavBar';

export default function BottomNavBar() {
  return (
    <View style={NavContainerStyle}>
      <View style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/login">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/sign-in.png')}
          />
        </Link>
        <Text style={NavTextStyle}>ورود/ثبت نام</Text>
      </View>
      <View style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/support.png')}
          />
        </Link>
        <Text style={NavTextStyle}>پشتیبانی</Text>
      </View>
      <View style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/exam.png')}
          />
        </Link>
        <Text style={NavTextStyle}>آزمون ها</Text>
      </View>
      <View style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/rank.png')}
          />
        </Link>
        <Text style={NavTextStyle}>رتبه بندی</Text>
      </View>
      <View style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/exam.png')}
          />
        </Link>
        <Text style={NavTextStyle}>آزمون ها</Text>
      </View>
    </View>
  );
}
