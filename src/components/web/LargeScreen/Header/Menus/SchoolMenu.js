import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {faSchool, faUsers} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {MyView} from '../../../../../styles/Common';

function SchoolMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <div className="menu-item-container" style={style.MenuJustLarge}>
        <MenuItem
          onClick={() => navigate('/manageStudent')}
          text={translator.management + ' ' + translator.students}
          icon={faSchool}
          selected={props.selected === 'manageStudent'}
        />
        <MenuItem
          onClick={() => navigate('/manageTeacher')}
          text={translator.management + ' ' + translator.teachers}
          icon={faSchool}
          selected={props.selected === 'manageTeacher'}
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

export default SchoolMenu;
