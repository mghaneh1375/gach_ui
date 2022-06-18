import React from 'react';
import {CommonButton} from '../../styles/Common';
import vars from '../../styles/root';
import {Nav, NavLink} from '../../styles/web/NavbarElement';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">آزمون ها</NavLink>
        <NavLink to="/">رویداد ها</NavLink>
        <NavLink to="/">اخبار</NavLink>
        <NavLink to="/">رتبه بندی</NavLink>
        <NavLink to="/">همکاران</NavLink>
        <NavLink to="/">راهنما</NavLink>
        <NavLink to="/">تماس با ما</NavLink>
        <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
            minWidth: 'unset',
            marginLeft: 0,
          }}
          title={'پشتیبانی'}
          href="/login"
        />
        <CommonButton
          style={{minWidth: 'unset'}}
          href="/login"
          title={'ورود/ثبت نام'}
        />
      </Nav>
    </>
  );
};

export default Navbar;
