import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faSchool,
  faShop,
  faTicket,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';
import {SuperMenuItem} from './SuperMenuItem';

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
          <SuperMenuItem
            text={translator.advicing}
            icon={faSchool}
            selected={props.selected === 'schoolQuiz'}
            navigate={navigate}
            items={[
              {
                text: translator.myStudentRequests,
                url: '/myStudentRequests',
              },
              {
                text: translator.mySchoolQuizess,
                url: '/mySchoolQuizzes',
              },
              {
                text: translator.management + ' ' + translator.students,
                url: '/manageStudent',
              },
              {
                text: translator.myFinancePlans,
                url: '/myFinancePlans',
              },
            ]}
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
        onClick={() => navigate('/myStudentRequests')}
        text={translator.myStudentRequests}
        icon={faTicket}
        isApp={false}
        selected={props.selected === 'myStudentRequests'}
      />
      <MenuItemPhone
        onClick={() => navigate('/mySchoolQuizzes')}
        text={translator.mySchoolQuizess}
        icon={faSchool}
        isApp={false}
        selected={props.selected === 'mySchoolQuizzes'}
      />
      <MenuItemPhone
        onClick={() => navigate('/manageStudent')}
        text={translator.management + ' ' + translator.students}
        icon={faUsers}
        isApp={false}
        selected={props.selected === 'manageStudent'}
      />
      <MenuItemPhone
        onClick={() => navigate('/myFinancePlans')}
        text={translator.myFinancePlans}
        icon={faShop}
        isApp={false}
        selected={props.selected === 'myFinancePlans'}
      />
    </MyView>
  );
}

export default AdvisorMenu;
