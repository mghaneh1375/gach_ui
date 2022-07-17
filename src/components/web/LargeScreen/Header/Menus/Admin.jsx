import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../tranlates/Common';
import {
  faHome,
  faCog,
  faUsers,
  faContactBook,
} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {SuperMenuItem} from './SuperMenuItem';

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
        <SuperMenuItem
          text={translator.basicDefinition}
          icon={faContactBook}
          selected={props.selected === 'book'}
          navigate={navigate}
          items={[
            {
              text: translator.gradeDefinition,
              url: 'basic/grades',
            },
            {
              text: translator.lessonsDefinition,
              url: 'basic/lessons',
            },
            {
              text: translator.subjectDefinition,
              url: 'basic/subjects',
            },
          ]}
        />
        <MenuItem
          onClick={() => navigate('/ticket')}
          text={translator.requests}
          icon={faCog}
          selected={props.selected === 'ticket'}
        />
        <SuperMenuItem
          text={translator.users}
          icon={faUsers}
          selected={props.selected === 'users'}
          navigate={navigate}
          items={[
            {
              text: translator.agent,
              url: '/users/agent',
            },
            {
              text: translator.advisor,
              url: '/users/advisor',
            },
            {
              text: translator.students,
              url: '/users/student',
            },
            {
              text: translator.schools,
              url: '/users/school',
            },
          ]}
        />
        <SuperMenuItem
          text={translator.configuration}
          icon={faUsers}
          selected={props.selected === 'quiz'}
          navigate={navigate}
          items={[
            {
              text: translator.generalConfiguration,
              url: '/generalConfiguration',
            },
            {
              text: translator.ravanConfiguration,
              url: '/ravanConfiguration',
            },
            {
              text: translator.schools,
              url: '/schools',
            },
          ]}
        />
        <MenuItem
          onClick={() => navigate('/quiz')}
          text={translator.quizes}
          icon={faUsers}
          selected={props.selected === 'quiz'}
        />
        <MenuItem
          onClick={() => navigate('/avatar')}
          text={translator.avatars}
          icon={faUsers}
          selected={props.selected === 'avatar'}
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
        }}
        selected={props.selected === 'home'}
      />
      <MenuItemPhone
        text={translator.requests}
        icon={faCog}
        isApp={false}
        onClick={() => {
          navigate('/ticket');
        }}
      />
      <MenuItemPhone
        text={translator.users}
        icon={faUsers}
        isApp={false}
        onClick={() => {
          navigate('/users');
        }}
      />
    </View>
  );
}

export default AdminMenu;
