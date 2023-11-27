import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {style, MenuItemPhone, MenuItem} from '../style';
import translator from '../../../../../translator/Common';
import {faSchool, faTasks, faUsers} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';

function Teacher(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <>
        <MenuItemRepeat
          navigate={props.navigate}
          selected={props.selected}
          excludes={['quiz', 'package', 'certs', 'charge']}
          child={
            <MenuItem
              onClick={() => navigate('/myTasks')}
              text={'آزمون‌های من'}
              icon={faTasks}
              selected={props.selected === 'myTasks'}
            />
          }
        />
      </>
    );
  }

  return (
    <MyView
      style={{
        ...style.Menu,
        ...style.MenuJustPhone,
        ...style.MenuJustApp,
      }}></MyView>
  );
}

export default Teacher;
