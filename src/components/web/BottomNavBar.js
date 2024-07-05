import {
  faArchive,
  faCheckDouble,
  faInfo,
  faPeopleGroup,
  faRankingStar,
  faUser,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {Text} from 'react-native';
import {Link} from 'react-router-dom';
import {MyView} from '../../styles/Common';
import {SimpleFontIcon} from '../../styles/Common/FontIcon';
import {styles} from '../../styles/Common/Styles';

import {
  NavItemStyle,
  NavItemContainerStyle,
  NavContainerStyle,
  NavTextStyle,
  TinyNavTextStyle,
} from '../../styles/web/BottomNavBar';
import {BottomLinkExternal} from '../../styles/web/NavbarElement';

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
          <SimpleFontIcon kind={'large'} icon={faUser} />
        </Link>
        <Text style={NavTextStyle}>ورود/ثبت نام</Text>
      </MyView>
      {/* <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/showAllSchools">
          <SimpleFontIcon kind={'large'} icon={faPeopleGroup} />
        </Link>
        <Text style={NavTextStyle}>مدارس</Text>
      </MyView> */}
      <MyView style={NavItemContainerStyle}>
        <BottomLinkExternal href="https://www.irysc.com/%d8%b1%d8%a7%d9%87%d9%86%d9%85%d8%a7%db%8c-%da%af%da%86-%d8%b3%d9%81%db%8c%d8%af-%d8%a2%db%8c%d8%b1%db%8c%d8%b3%da%a9/">
          <SimpleFontIcon kind={'large'} icon={faInfo} />
        </BottomLinkExternal>
        <Text style={NavTextStyle}>راهنما</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/buy">
          <SimpleFontIcon kind={'large'} icon={faCheckDouble} />
        </Link>
        <Text style={NavTextStyle}>آزمون‌ها</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/rankinglist">
          <SimpleFontIcon kind={'large'} icon={faRankingStar} />
        </Link>
        <Text style={NavTextStyle}>رتبه بندی</Text>
      </MyView>
      <MyView style={NavItemContainerStyle}>
        <Link style={NavItemStyle} to="/packages">
          <SimpleFontIcon kind={'large'} icon={faVideo} />
        </Link>
        <Text style={TinyNavTextStyle}>دوره‌های آموزشی</Text>
      </MyView>
      {/* <MyView style={NavItemContainerStyle}>
        <BottomLinkExternal href="https://www.irysc.com/contact-us/">
          <SimpleFontIcon kind={'large'} icon={faInfo} />
        </BottomLinkExternal>
        <Text style={NavTextStyle}>پشتیبانی</Text>
      </MyView> */}
    </MyView>
  );
}
