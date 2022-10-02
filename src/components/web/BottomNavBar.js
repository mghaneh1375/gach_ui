import React from 'react';
import {Text, View} from 'react-native';
import {Link} from 'react-router-dom';
import {MyView} from '../../styles/Common';
import {styles} from '../../styles/Common/Styles';

import {
  NavItemStyle,
  NavItemContainerStyle,
  NavItemImageStyle,
  NavContainerStyle,
  NavTextStyle,
} from '../../styles/web/BottomNavBar';

export default function BottomNavBar() {
  return (
    <MyView
      style={{
        ...NavContainerStyle,
        justifyContent: 'center',
        ...styles.zIndex20,
      }}>
      <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/login">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/sign-in.png')}
          />
        </Link>
        <Text style={NavTextStyle}>ورود/ثبت نام</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/support.png')}
          />
        </Link>
        <Text style={NavTextStyle}>پشتیبانی</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/exam.png')}
          />
        </Link>
        <Text style={NavTextStyle}>آزمون ها</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/rank.png')}
          />
        </Link>
        <Text style={NavTextStyle}>رتبه بندی</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/">
          <img
            style={NavItemImageStyle}
            src={require('./../../images/exam.png')}
          />
        </Link>
        <Text style={NavTextStyle}>آزمون ها</Text>
      </MyView>
    </MyView>
  );
}
