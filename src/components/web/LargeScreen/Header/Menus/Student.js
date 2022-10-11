import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faHome,
  faBasketShopping,
  faHistory,
  faQuestion,
  faCreditCard,
  faCheckSquare,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';

function StudentMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <MenuItemRepeat navigate={props.navigate} selected={props.selected} />
    );
  }

  const isApp = device.indexOf(Device.App) !== -1;

  return (
    <MyView
      style={{
        ...style.Menu,
        ...style.MenuJustPhone,
        ...style.MenuJustApp,
      }}>
      <MenuItemPhone
        text={translator.home}
        icon={faHome}
        onClick={() => {
          navigate(isApp ? 'Home' : '/');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'home'}
      />
      <MenuItemPhone text={translator.myQuizes} icon={faCheckSquare} />
      <MenuItemPhone text={translator.buyQuiz} icon={faBasketShopping} />
      <MenuItemPhone text={translator.charge} icon={faCreditCard} />
      <MenuItemPhone text={translator.history} icon={faHistory} />
      <MenuItemPhone text={translator.support} icon={faQuestion} />
      <MenuItemPhone
        text={translator.config}
        icon={faCog}
        isApp={isApp}
        onClick={() => {
          navigate(isApp ? 'Profile' : '/profile');
          props.toggleRightMenuVisibility();
        }}
      />
    </MyView>
  );
}

export default StudentMenu;
