import React, {useState} from 'react';
import {getWidthHeight} from '../../services/Utility';
import {CommonButton, MyView} from '../../styles/Common';
import {styles} from '../../styles/Common/Styles';
import vars from '../../styles/root';
import {Nav, NavLink, NavLinkExternal} from '../../styles/web/NavbarElement';

const Navbar = props => {
  const [isLogin, setIsLogin] = useState(props.user !== undefined);

  React.useEffect(() => {
    setIsLogin(props.user !== undefined);
  }, [props.user]);

  const width = getWidthHeight()[0];

  return (
    <MyView style={{width: '100%'}}>
      <Nav>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/buy">
          آزمون ها
        </NavLink>
        <NavLinkExternal
          rel="noopener noreferrer"
          target="_blank"
          style={{
            ...styles.whiteSpaceNoWrap,
          }}
          href="https://irysc.com">
          اخبار
        </NavLinkExternal>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/rankinglist">
          رتبه بندی
        </NavLink>
        <NavLinkExternal
          style={{...styles.whiteSpaceNoWrap}}
          rel="noopener noreferrer"
          target="_blank"
          href="https://irysc.com">
          همکاران
        </NavLinkExternal>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="schools">
          مدارس
        </NavLink>
        <NavLinkExternal
          target="_blank"
          rel="noopener noreferrer"
          style={{...styles.whiteSpaceNoWrap}}
          href="https://irysc.com">
          راهنما
        </NavLinkExternal>
        <NavLinkExternal
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.whiteSpaceNoWrap,
            display: width > 768 && width < 1100 ? 'none' : 'flex',
          }}
          href="https://irysc.com">
          تماس و پشتیبانی
        </NavLinkExternal>
        <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
            minWidth: 'unset',
            marginLeft: 0,
            paddingLeft: 10,
            paddingRight: 10,
            display: width > 768 && width < 900 ? 'none' : 'flex',
          }}
          title={'کلاس های المپیاد'}
          onPress={() => {
            window.open('https://irysc.com', '_blank');
          }}
        />
        {!isLogin && (
          <CommonButton
            style={{minWidth: 'unset', paddingLeft: 10, paddingRight: 10}}
            href="/login"
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
