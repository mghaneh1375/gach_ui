import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';

function Agent(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <MenuItemRepeat
        excludes={['package', 'certs', 'quiz_makeQuiz']}
        navigate={props.navigate}
        selected={props.selected}
        child={
          <MenuItem
            onClick={() => navigate('/schoolUsers')}
            text={translator.schools}
            icon={faUsers}
            selected={props.selected === 'schools'}
          />
        }
      />
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

export default Agent;
