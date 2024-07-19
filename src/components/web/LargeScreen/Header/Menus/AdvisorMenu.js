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

function AdvisorMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(globalStateContext)];

  const [state] = useGlobalState();

  if (isLargePage) {
    return (
      <MenuItemRepeat
        excludes={['certs', 'mySchool', 'advisor']}
        navigate={props.navigate}
        selected={props.selected}
        child={
          <>
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
              text={translator.teach}
              icon={faBook}
              selected={props.selected === 'mySchedules'}
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
        ...style.MenuJustApp,
        ...{
          zIndex: state.isRightMenuVisible ? 4 : 'unset',
        },
      }}>
      <MenuItemPhone
        onClick={() => navigate('/myStudentRequests')}
        text={translator.myStudentRequests}
        icon={faTicket}
        isApp={false}
        selected={props.selected === 'myStudentRequests'}
      />
      <MenuItemPhone
        onClick={() => navigate('/manageStudent')}
        text={translator.management + ' ' + translator.students}
        icon={faUsers}
        isApp={false}
        selected={props.selected === 'manageStudent'}
      />
      <MenuItemPhone
        onClick={() => navigate('/mySchoolQuizzes')}
        text={translator.mySchoolQuizess}
        icon={faSchool}
        isApp={false}
        selected={props.selected === 'mySchoolQuizzes'}
      />

      <SuperMenuItem
        text={'دوره‌ها'}
        icon={faVideo}
        selected={
          props.selected === 'packages' || props.selected === 'myPackages'
        }
        navigate={navigate}
        items={[
          {
            text: translator.buyPackages,
            url: '/packages',
          },
          {
            text: translator.myPackages,
            url: '/myPackages',
          },
        ]}
      />

      <SuperMenuItem
        text={'آزمون - بخش دانش آموزی'}
        icon={faShoppingCart}
        selected={
          props.selected === 'buy' ||
          props.selected === 'makeQuiz' ||
          props.selected === 'myIRYSCQuizzes' ||
          props.selected === 'myCustomQuizzes'
        }
        navigate={navigate}
        items={[
          {
            text: translator.buyQuiz,
            url: '/buy',
          },
          {
            text: translator.makeQuiz,
            url: '/makeQuiz',
          },
          {
            text: translator.myQuizes,
            url: '/myIRYSCQuizzes',
          },
          {
            text: translator.myCustomQuizess,
            url: '/myCustomQuizzes',
          },
        ]}
      />

      <MenuItemPhone
        onClick={() => navigate('/charge')}
        text={translator.charge}
        icon={faCreditCard}
        selected={props.selected === 'charge'}
      />
      <MenuItemPhone
        onClick={() => navigate('/financeHistory')}
        text={translator.history}
        icon={faHistory}
        selected={props.selected === 'financeHistory'}
      />
      <MenuItemPhone
        onClick={() => navigate('/myFinancePlans')}
        text={translator.myFinancePlans}
        icon={faShop}
        isApp={false}
        selected={props.selected === 'myFinancePlans'}
      />
      <MenuItemPhone
        onClick={() => navigate('/ticket')}
        text={translator.requests}
        icon={faCog}
        selected={props.selected === 'ticket'}
      />

      <MobileLogout name={props.name} navigate={props.navigate} />
    </MyView>
  );
}

export default AdvisorMenu;
