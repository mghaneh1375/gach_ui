import React, {useState} from 'react';
import {CommonButton, MyView} from '../../styles/Common';
import {styles} from '../../styles/Common/Styles';
import vars from '../../styles/root';
import {Nav, NavLink} from '../../styles/web/NavbarElement';

const Navbar = props => {
  const [isLogin, setIsLogin] = useState(props.user !== undefined);

  React.useEffect(() => {
    setIsLogin(props.user !== undefined);
  }, [props.user]);

  return (
    <MyView style={{width: '100%'}}>
      <Nav>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/buy">
          آزمون ها
        </NavLink>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/">
          رویداد ها
        </NavLink>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/">
          اخبار
        </NavLink>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/">
          رتبه بندی
        </NavLink>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/">
          همکاران
        </NavLink>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/">
          راهنما
        </NavLink>
        <NavLink style={{...styles.whiteSpaceNoWrap}} to="/">
          تماس با ما
        </NavLink>
        {/* <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
            minWidth: 'unset',
            marginLeft: 0,
          }}
          title={'پشتیبانی'}
          href="/login"
        /> */}
        {!isLogin && (
          <CommonButton
            style={{minWidth: 'unset'}}
            href="/login"
            title={'ورود/ثبت نام'}
          />
        )}
        {isLogin && (
          <CommonButton
            style={{minWidth: 'unset', paddingLeft: 25, paddingRight: 25}}
            href="/profile"
            title={'پروفایل'}
          />
        )}
      </Nav>
    </MyView>
  );
};

export default Navbar;
