import {faTasks} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, MenuItemPhone} from '../style';

function JustTeacher(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <MenuItem
        onClick={() => navigate('/myTasks')}
        text={'آزمون‌های من'}
        icon={faTasks}
        selected={props.selected === 'myTasks'}
      />
    );
  }

  return (
    <MenuItemPhone
      onClick={() => navigate('/myTasks')}
      text={'آزمون‌های من'}
      icon={faTasks}
      selected={props.selected === 'myTasks'}
    />
  );
}

export default JustTeacher;
