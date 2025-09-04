import {faMedal, faSun} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {globalStateContext} from '../../../../../App';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MyView} from '../../../../../styles/Common';
import translator from '../../../../../translator/Common';
import MobileLogout from '../MobileLogout';
import {MenuItemPhone, style} from '../style';
import MenuItemRepeat from './MenuItemRepeat';
import MenuItemRepeatForPhone from './MenuItemRepeatForPhone';

function StudentMenu(props) {
  const device = getDevice();
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();
  const isApp = device.indexOf(Device.App) !== -1;

  if (!state.isInPhone) {
    return (
      <MenuItemRepeat
        // excludes={['advisor', 'mySchool']}
        excludes={
          state.user?.user?.hasAdvisor
            ? []
            : ['my_advisor', 'my_advisor_quizzes', 'my_schedules']
        }
        navigate={props.navigate}
        selected={props.selected}
      />
    );
  }

  return (
    <MyView
      className={'menu-container-in-phone'}
      style={{
        ...style.Menu,
        ...style.MenuJustPhone,
        ...{
          zIndex: state.isRightMenuVisible ? 4 : 'unset',
        },
      }}>
      <MenuItemRepeatForPhone
        excludes={['certs', 'mySchool']}
        navigate={props.navigate}
        selected={props.selected}
        child={
          <>
            <MenuItemPhone
              onClick={() => navigate(isApp ? 'Home' : '/myCerts')}
              selected={props.selected === 'myCerts'}
              text={translator.myCerts}
              icon={faSun}
            />
            <MenuItemPhone
              onClick={() => navigate('/all-badges')}
              selected={props.selected === 'publicBadges'}
              text={translator.badges}
              icon={faMedal}
            />
          </>
        }
      />
      <MobileLogout name={props.name} navigate={props.navigate} />
    </MyView>
  );
}

export default StudentMenu;
