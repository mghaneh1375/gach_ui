import {NavLink as Link} from 'react-router-dom';
import styled from 'styled-components';

import vars from '../root';

export const Nav = styled.nav`
  background: white;
  height: ${vars.NAV_BAR_H};
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 5px 5px 5px #aaaaaa;
  margin: 0 auto;
  max-width: 85%;
  width: 85%;
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 12;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const NavLink = styled(Link)`
  color: ${vars.LIGHT_SILVER} !important;
  display: flex;
  font-family: IRANSans;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;
export const NavLinkExternal = styled.a`
  color: ${vars.LIGHT_SILVER} !important;
  display: flex;
  font-family: IRANSans;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;

export const BottomLinkExternal = styled.a`
  width: 50px;
  height: 50px;
  display: flex;
  shadow-color: black;
  shadow-opacity: 0.8;
  shadow-radius: 10px;
  elevation: 10;
  border-radius: 50%;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  align-content: center;
  align-items: center;
  box-shadow: 0px 3px 6px #818181a8;
`;

export const NavButtonY = styled(Link)`
  color: white;
  background-color: yellow;
  text-decoration: none;
  padding: 5px 1rem;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
  &.active {
    color: #4d4dff;
  }
`;
