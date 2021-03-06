import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../tranlates/Common';
import {
  faHome,
  faBasketShopping,
  faHistory,
  faQuestion,
  faCreditCard,
  faCheckSquare,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';

function StudentMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <div className="menu-item-container" style={style.MenuJustLarge}>
        <MenuItem
          onClick={() => navigate('/dashboard')}
          text={translator.home}
          icon={faHome}
          selected={props.selected === 'dashboard'}
        />
        <MenuItem text={translator.myQuizes} icon={faCheckSquare} />
        <MenuItem text={translator.buyQuiz} icon={faBasketShopping} />
        <MenuItem text={translator.charge} icon={faCreditCard} />
        <MenuItem text={translator.history} icon={faHistory} />
        <MenuItem text={translator.support} icon={faQuestion} />
        <MenuItem
          onClick={() => navigate('/ticket')}
          text={translator.requests}
          icon={faCog}
          selected={props.selected === 'ticket'}
        />
      </div>
    );
  }

  const isApp = device.indexOf(Device.App) !== -1;

  return (
    <View
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
          props.toggleHideRightMenu();
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
          props.toggleHideRightMenu();
        }}
      />
    </View>
  );
}

export default StudentMenu;
