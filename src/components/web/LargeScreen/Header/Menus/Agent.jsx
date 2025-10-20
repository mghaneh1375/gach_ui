import React from 'react';
import {Device} from '@/models/device';
import {getDevice} from '@/services/utility';
import {MenuItem, style, MenuItemPhone} from '../Style.jsx';
import translator from '@/translator/common.js';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '@/styles';
import MenuItemRepeat from './MenuItemRepeat.jsx';
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
