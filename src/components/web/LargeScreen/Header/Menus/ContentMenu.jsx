import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faHome,
  faUsers,
  faQuestion,
  faDashboard,
  faBox,
  faShoppingCart,
  faVideo,
  faBandage,
  faCreditCard,
  faHistory,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import {SuperMenuItem} from './SuperMenuItem';
import {MyView} from '../../../../../styles/Common';
import MobileLogout from '../MobileLogout';
import {globalStateContext} from '../../../../../App';

function ContentMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(globalStateContext)];

  const [state] = useGlobalState();

  const hasAdvisor = state.user?.user?.hasAdvisor;

  if (isLargePage) {
    return (
      <div className="menu-item-container" style={style.MenuJustLarge}>
        <MenuItem
          onClick={() => navigate('/')}
          text={translator.home}
          icon={faHome}
          selected={props.selected === 'home'}
        />
        <MenuItem
          onClick={() => navigate('/dashboard')}
          text={translator.dashboard}
          icon={faDashboard}
          selected={props.selected === 'dashboard'}
        />

        <SuperMenuItem
          text={translator.questions}
          icon={faQuestion}
          selected={
            props.selected === 'questions' ||
            props.selected === 'spec-questions'
          }
          navigate={navigate}
          items={[
            {
              text: 'سوالات عادی',
              url: '/question',
            },
            {
              text: 'سوالات آزمون فرار',
              url: '/spec-question',
            },
          ]}
        />
        <SuperMenuItem
          text={translator.quizes}
          icon={faUsers}
          selected={props.selected === 'quiz'}
          navigate={navigate}
          items={[
            {
              text: translator.listQuiz,
              url: '/quiz/list',
            },
            {
              text: translator.openQuiz,
              url: '/quiz/open',
            },
            {
              text: translator.onlineStanding,
              url: '/quiz/onlineStanding',
            },
            {
              text: translator.escapeQuiz,
              url: '/quiz/escape',
            },
            {
              text: translator.contentQuiz,
              url: '/quiz/content',
            },
            {
              text: translator.packageQuiz,
              url: '/quiz/package',
            },
          ]}
        />

        <SuperMenuItem
          text={translator.contents}
          icon={faBox}
          selected={props.selected === 'contents'}
          navigate={navigate}
          items={[
            {
              text: translator.listContents,
              url: '/contents',
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

        <SuperMenuItem
          text={'دوره‌ها' + ' - بخش دانش آموزی'}
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
          selected={props.selected === 'buy'}
          navigate={navigate}
          items={[
            {
              text: hasAdvisor ? translator.myAdvisor : undefined,
              url: '/myAdvisor',
            },
            {
              text: hasAdvisor ? translator.mySchedules : undefined,
              url: '/mySchedules',
            },
            {
              text: 'برنامه‌ی روزانه‌ی من',
              url: '/myLifeStyle',
            },

            {
              text: translator.advisors,
              url: '/advisors',
            },
            {
              text: hasAdvisor ? translator.quizes : undefined,
              url: '/myAdvisor/quiz',
            },
            {
              text: translator.requestsLog,
              url: '/requestLogsForAdvisors',
            },
          ]}
        />
        <MenuItem
          onClick={() => navigate('/charge')}
          text={translator.charge}
          icon={faCreditCard}
          selected={props.selected === 'charge'}
        />
        <MenuItem
          onClick={() => navigate('/financeHistory')}
          text={translator.history}
          icon={faHistory}
          selected={props.selected === 'financeHistory'}
        />
        <MenuItem
          onClick={() => navigate('/ticket')}
          text={translator.requests}
          icon={faCog}
          selected={props.selected === 'ticket'}
        />
      </div>
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
        marginBottom: '145px',
      }}>
      <MenuItemPhone
        text={translator.home}
        icon={faHome}
        onClick={() => {
          navigate('/');
        }}
        selected={props.selected === 'home'}
      />
      <MenuItemPhone
        text={translator.dashboard}
        icon={faDashboard}
        selected={props.selected === 'dashboard'}
        onClick={() => navigate('/dashboard')}
      />

      <SuperMenuItem
        text={translator.questions}
        icon={faQuestion}
        selected={
          props.selected === 'questions' || props.selected === 'spec-questions'
        }
        navigate={navigate}
        items={[
          {
            text: 'سوالات عادی',
            url: '/question',
          },
          {
            text: 'سوالات آزمون فرار',
            url: '/spec-question',
          },
        ]}
      />

      <SuperMenuItem
        text={translator.contents}
        icon={faBox}
        selected={props.selected === 'contents'}
        navigate={navigate}
        items={[
          {
            text: translator.listContents,
            url: '/contents',
          },
        ]}
      />
      <SuperMenuItem
        text={translator.quizes}
        icon={faUsers}
        selected={props.selected === 'quiz'}
        navigate={navigate}
        items={[
          {
            text: translator.listQuiz,
            url: '/quiz/list',
          },
          {
            text: translator.openQuiz,
            url: '/quiz/open',
          },
          {
            text: translator.onlineStanding,
            url: '/quiz/onlineStanding',
          },
          {
            text: translator.escapeQuiz,
            url: '/quiz/escape',
          },
          {
            text: translator.contentQuiz,
            url: '/quiz/content',
          },
          {
            text: translator.packageQuiz,
            url: '/quiz/package',
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

      <SuperMenuItem
        text={'دوره‌ها' + ' - بخش دانش آموزی'}
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
        selected={props.selected === 'buy'}
        navigate={navigate}
        items={[
          {
            text: hasAdvisor ? translator.myAdvisor : undefined,
            url: '/myAdvisor',
          },
          {
            text: hasAdvisor ? translator.mySchedules : undefined,
            url: '/mySchedules',
          },
          {
            text: 'برنامه‌ی روزانه‌ی من',
            url: '/myLifeStyle',
          },

          {
            text: translator.advisors,
            url: '/advisors',
          },
          {
            text: hasAdvisor ? translator.quizes : undefined,
            url: '/myAdvisor/quiz',
          },
          {
            text: translator.requestsLog,
            url: '/requestLogsForAdvisors',
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
        onClick={() => navigate('/ticket')}
        text={translator.requests}
        icon={faCog}
        selected={props.selected === 'ticket'}
      />
      <MobileLogout name={props.name} navigate={props.navigate} />
    </MyView>
  );
}

export default ContentMenu;
