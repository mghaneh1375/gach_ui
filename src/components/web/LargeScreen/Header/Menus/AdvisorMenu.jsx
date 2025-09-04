import {
  faBook,
  faComment,
  faSchool,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {globalStateContext} from '../../../../../App';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MyView} from '../../../../../styles/Common';
import translator from '../../../../../translator/Common';
import MobileLogout from '../MobileLogout';
import {MenuItem, MenuItemPhone, style} from '../style';
import MenuItemRepeat from './MenuItemRepeat';
import MenuItemRepeatForPhone from './MenuItemRepeatForPhone';
import {SuperMenuItem} from './SuperMenuItem';

function AdvisorMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  if (isLargePage) {
    return (
      <MenuItemRepeat
        excludes={['certs', 'mySchool', 'comments']}
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
            {props.hasTeacherAccess && (
              <MenuItem
                onClick={() => navigate('/myTasks')}
                text={'آزمون\u200cهای من (مخصوصا مصححین)'}
                icon={faTasks}
                selected={props.selected === 'myTasks'}
              />
            )}
            <SuperMenuItem
              text={'نظرات'}
              icon={faComment}
              selected={
                props.selected === 'myComments' ||
                props.selected === 'commentsAboutMe'
              }
              navigate={navigate}
              items={[
                {
                  text: translator.myComments,
                  url: '/myComments',
                },
                {
                  text: translator.commentsAboutMe,
                  url: '/commentsAboutMe',
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
            {props.hasTeacherAccess && (
              <MenuItemPhone
                onClick={() => navigate('/myTasks')}
                text={'آزمون\u200cهای من (مخصوصا مصححین)'}
                icon={faTasks}
                selected={props.selected === 'myTasks'}
              />
            )}
          </>
        }
      />

      <MobileLogout name={props.name} navigate={props.navigate} />
    </MyView>
  );
}

export default AdvisorMenu;
