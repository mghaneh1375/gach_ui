import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faBook,
  faCog,
  faCreditCard,
  faHistory,
  faSchool,
  faShop,
  faShoppingCart,
  faTicket,
  faUsers,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';
import {SuperMenuItem} from './SuperMenuItem';
import MobileLogout from '../MobileLogout';
import {globalStateContext} from '../../../../../App';
import MenuItemRepeatForPhone from './MenuItemRepeatForPhone';

function AdvisorMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  if (isLargePage) {
    return (
      <MenuItemRepeat
        excludes={['certs', 'mySchool']}
        navigate={props.navigate}
        selected={props.selected}
        child={
          <>
            <SuperMenuItem
              text={translator.advicingForAdvisors}
              icon={faSchool}
              selected={
                props.selected === 'myStudentRequests' ||
                props.selected === 'manageStudent' ||
                props.selected === 'mySchoolQuizzes' ||
                props.selected === 'myFinancePlans'
              }
              navigate={navigate}
              items={[
                {
                  text: translator.myStudentRequests,
                  url: '/myStudentRequests',
                },
                {
                  text: translator.management + ' ' + translator.students,
                  url: '/manageStudent',
                },
                {
                  text: translator.mySchoolQuizess,
                  url: '/mySchoolQuizzes',
                },
                {
                  text: translator.myFinancePlans,
                  url: '/myFinancePlans',
                },
              ]}
            />
            <SuperMenuItem
              text={translator.teachForTeachers}
              icon={faBook}
              selected={
                props.selected === 'myTeachSchedules' ||
                props.selected === 'myTeachRequests' ||
                props.selected === 'myTeachTransactions'
              }
              navigate={navigate}
              items={[
                {
                  text: translator.myTeachSchedules,
                  url: '/myTeachSchedules',
                },
                {
                  text: translator.myTeachRequests,
                  url: '/myTeachRequests',
                },
                {
                  text: translator.myTeachTransactions,
                  url: '/myTeachTransactions',
                },
              ]}
            />
          </>
        }
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
            <SuperMenuItem
              text={translator.advicingForAdvisors}
              icon={faSchool}
              selected={
                props.selected === 'myStudentRequests' ||
                props.selected === 'manageStudent' ||
                props.selected === 'mySchoolQuizzes' ||
                props.selected === 'myFinancePlans'
              }
              navigate={navigate}
              items={[
                {
                  text: translator.myStudentRequests,
                  url: '/myStudentRequests',
                },
                {
                  text: translator.management + ' ' + translator.students,
                  url: '/manageStudent',
                },
                {
                  text: translator.mySchoolQuizess,
                  url: '/mySchoolQuizzes',
                },
                {
                  text: translator.myFinancePlans,
                  url: '/myFinancePlans',
                },
              ]}
            />
            <SuperMenuItem
              text={translator.teachForTeachers}
              icon={faBook}
              selected={
                props.selected === 'myTeachSchedules' ||
                props.selected === 'myTeachRequests' ||
                props.selected === 'myTeachTransactions'
              }
              navigate={navigate}
              items={[
                {
                  text: translator.myTeachSchedules,
                  url: '/myTeachSchedules',
                },
                {
                  text: translator.myTeachRequests,
                  url: '/myTeachRequests',
                },
                {
                  text: translator.myTeachTransactions,
                  url: '/myTeachTransactions',
                },
              ]}
            />
          </>
        }
      />

      <MobileLogout name={props.name} navigate={props.navigate} />
    </MyView>
  );
}

export default AdvisorMenu;
