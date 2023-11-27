import React, {useState} from 'react';
import {getWidthHeight} from '../../services/Utility';
import {CommonButton, MyView} from '../../styles/Common';
import {styles} from '../../styles/Common/Styles';
import vars from '../../styles/root';
import {Nav, NavLink, NavLinkExternal} from '../../styles/web/NavbarElement';

const Navbar = props => {
  const [isLogin, setIsLogin] = useState(props.user !== null);

  React.useEffect(() => {
    setIsLogin(props.user !== null);
  }, [props.user]);

  const width = getWidthHeight()[0];

  return (
    <MyView style={{width: '100%'}}>
      <Nav>
        <NavLinkExternal
          rel="noopener noreferrer"
          target="_blank"
          style={{
            ...styles.whiteSpaceNoWrap,
          }}
          href="https://www.irysc.com/category/irysc-news/gachesefid/">
          اخبار
        </NavLinkExternal>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/rankinglist">
          رتبه بندی
        </NavLink>

        <NavLinkExternal
          style={{...styles.whiteSpaceNoWrap}}
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.irysc.com/%d9%87%d9%85%da%a9%d8%a7%d8%b1%d8%a7%d9%86-%d8%a2%db%8c%d8%b1%db%8c%d8%b3%da%a9/">
          همکاران
        </NavLinkExternal>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/showAllSchools">
          مدارس
        </NavLink>
        <NavLinkExternal
          target="_blank"
          rel="noopener noreferrer"
          style={{...styles.whiteSpaceNoWrap}}
          href="https://www.irysc.com/%d8%b1%d8%a7%d9%87%d9%86%d9%85%d8%a7%db%8c-%da%af%da%86-%d8%b3%d9%81%db%8c%d8%af-%d8%a2%db%8c%d8%b1%db%8c%d8%b3%da%a9/">
          راهنما
        </NavLinkExternal>
        <NavLinkExternal
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.whiteSpaceNoWrap,
            display: width > 768 && width < 1100 ? 'none' : 'flex',
          }}
          href="https://www.irysc.com/contact-us/">
          تماس و پشتیبانی
        </NavLinkExternal>
        {/* <NavLink style={{...styles.whiteSpaceNoWrap}} to="/packages">
          بسته های آموزشی
        </NavLink> */}
        <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
            minWidth: 'unset',
            marginLeft: 0,
            paddingLeft: 10,
            paddingRight: 10,
            display: width > 768 && width < 900 ? 'none' : 'flex',
          }}
          title={'دوره های آموزشی'}
          onPress={() => {
            window.location.href = '/packages';
            // window.open(
            //   'https://www.irysc.com/%DA%A9%D9%84%D8%A7%D8%B3-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%A7%D9%84%D9%85%D9%BE%DB%8C%D8%A7%D8%AF%D9%87%D8%A7%DB%8C-%D8%B9%D9%84%D9%85%DB%8C/',
            //   '_blank',
            // );
          }}
        />

        <CommonButton
          style={{
            backgroundColor: vars.ORANGE_RED,
            minWidth: 'unset',
            marginLeft: 0,
            paddingLeft: 10,
            paddingRight: 10,
            display: width > 768 && width < 900 ? 'none' : 'flex',
          }}
          title={'آزمون‌ها'}
          onPress={() => {
            window.location.href = '/buy';
          }}
        />

        {!isLogin && (
          <CommonButton
            style={{minWidth: 'unset', paddingLeft: 10, paddingRight: 10}}
            onPress={() => (window.location.href = '/login')}
            title={'ورود/ثبت نام'}
          />
        )}
        {isLogin && (
          <CommonButton
            style={{minWidth: 'unset', paddingLeft: 25, paddingRight: 25}}
            href="/dashboard"
            title={'پروفایل'}
          />
        )}
      </Nav>
    </MyView>
  );
};

export default Navbar;
