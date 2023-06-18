import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {faSchool, faTicket, faUsers} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';

function AdvisorMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <MenuItemRepeat
        excludes={['certs', 'package', 'quiz', 'mySchool', 'advisor']}
        navigate={props.navigate}
        selected={props.selected}
        child={
          <>
            <MenuItem
              onClick={() => navigate('/myStudentRequests')}
              text={translator.myStudentRequests}
              icon={faTicket}
              selected={props.selected === 'myStudentRequests'}
            />
            <MenuItem
              onClick={() => navigate('/mySchoolQuizzes')}
              text={translator.mySchoolQuizess}
              icon={faSchool}
              selected={props.selected === 'mySchoolQuizzes'}
            />
            <MenuItem
              onClick={() => navigate('/manageStudent')}
              text={translator.management + ' ' + translator.students}
              icon={faUsers}
              selected={props.selected === 'manageStudent'}
            />
            <MenuItem
              onClick={() => navigate('/myFinanceOffers')}
              text={translator.management + ' ' + translator.students}
              icon={faUsers}
              selected={props.selected === 'manageStudent'}
            />
          </>
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

export default AdvisorMenu;
