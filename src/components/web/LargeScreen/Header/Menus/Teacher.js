import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../tranlates/Common';
import {faSchool, faUsers} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';

function Teacher(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <div className="menu-item-container" style={style.MenuJustLarge}>
        <MenuItem
          onClick={() => navigate('/teachers')}
          text={translator.access + ' ' + translator.teacher}
          icon={faSchool}
          selected={props.selected === 'teachers'}
        />
      </div>
    );
  }

  return (
    <MyView
      style={{
        ...style.Menu,
        ...style.MenuJustPhone,
        ...style.MenuJustApp,
      }}>
      <MenuItemPhone
        text={translator.users}
        icon={faUsers}
        isApp={false}
        onClick={() => {
          navigate('/users');
        }}
      />
    </MyView>
  );
}

export default Teacher;
