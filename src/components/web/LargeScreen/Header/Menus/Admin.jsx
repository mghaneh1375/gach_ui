import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../tranlates/Common';
import {faHome, faCog, faUsers} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';

function AdminMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <div className="menu-item-container" style={style.MenuJustLarge}>
        <MenuItem
          onClick={() => navigate('/')}
          text={translator.home}
          icon={faHome}
          selected={props.selected === 'home'}
        />
        <MenuItem
          onClick={() => navigate('/ticket')}
          text={translator.requests}
          icon={faCog}
          selected={props.selected === 'ticket'}
        />
        <MenuItem
          onClick={() => navigate('/users')}
          text={translator.users}
          icon={faUsers}
          selected={props.selected === 'users'}
        />
        <MenuItem
          onClick={() => navigate('/quiz')}
          text={translator.quizes}
          icon={faUsers}
          selected={props.selected === 'quiz'}
        />
      </div>
    );
  }

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
          navigate('/');
          props.toggleHideRightMenu();
        }}
        selected={props.selected === 'home'}
      />
      <MenuItemPhone
        text={translator.requests}
        icon={faCog}
        isApp={false}
        onClick={() => {
          navigate('/ticket');
          props.toggleHideRightMenu();
        }}
      />
      <MenuItemPhone
        text={translator.users}
        icon={faUsers}
        isApp={false}
        onClick={() => {
          navigate('/users');
          props.toggleHideRightMenu();
        }}
      />
    </View>
  );
}

export default AdminMenu;
