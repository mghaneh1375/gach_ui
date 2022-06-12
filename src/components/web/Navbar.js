import React from 'react';
import {Nav, NavLink, NavButtonY} from '../../styles/web/NavbarElement';

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
        <NavButtonY to="/login">ورود/ثبت نام</NavButtonY>
      </Nav>
    </>
  );
};

export default Navbar;
