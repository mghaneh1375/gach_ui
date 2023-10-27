import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faHome,
  faHistory,
  faQuestion,
  faCreditCard,
  faDashboard,
  faShoppingCart,
  faVideo,
  faSun,
  faBandage,
} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';
import {globalStateContext} from '../../../../../App';
import {SuperMenuItem} from './SuperMenuItem';
import MobileLogout from '../MobileLogout';

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
            ? ['my_life_style']
            : ['my_advisor', 'my_advisor_quizzes']
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
        ...style.MenuJustApp,
        ...{
          zIndex: state.isRightMenuVisible ? 4 : 'unset',
        },
      }}>
      <MenuItemPhone
        text={translator.home}
        icon={faHome}
        onClick={() => {
          navigate(isApp ? 'Home' : '/');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'home'}
      />
      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/dashboard');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'dashboard'}
        text={translator.dashboard}
        icon={faDashboard}
      />
      <SuperMenuItem
        text={translator.quiz}
        icon={faShoppingCart}
        selected={props.selected === 'book'}
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
      <SuperMenuItem
        text={translator.packages}
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
        text={'مشاور'}
        icon={faBandage}
        navigate={navigate}
        items={[
          {
            text: state.user?.user?.hasAdvisor
              ? translator.myAdvisor
              : undefined,
            url: '/myAdvisor',
          },
          {
            text: state.user?.user?.hasAdvisor
              ? undefined
              : 'تغییر برنامه ریزی روزانه',
            url: '/myLifeStyle',
          },
          {
            text: translator.advisors,
            url: '/advisors',
          },
          {
            text: state.user?.user?.hasAdvisor ? translator.quizes : undefined,
            url: '/myAdvisor/quiz',
          },
          {
            text: translator.requestsLog,
            url: '/requestLogsForAdvisors',
          },
        ]}
      />

      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/charge');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'charge'}
        text={translator.charge}
        icon={faCreditCard}
      />

      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/myCerts');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'myCerts'}
        text={translator.myCerts}
        icon={faSun}
      />

      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/financeHistory');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'financeHistory'}
        text={translator.history}
        icon={faHistory}
      />
      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/ticket');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'ticket'}
        text={translator.support}
        icon={faQuestion}
      />
      <MobileLogout name={props.name} navigate={props.navigate} />
    </MyView>
  );
}

export default StudentMenu;
