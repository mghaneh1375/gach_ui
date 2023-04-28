import {
  faBandage,
  faCog,
  faCreditCard,
  faDashboard,
  faHistory,
  faHome,
  faSchool,
  faShoppingCart,
  faSun,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import translator from '../../../../../translator/Common';
import {MenuItem, style} from '../style';
import {SuperMenuItem} from './SuperMenuItem';

function MenuItemRepeat(props) {
  const navigate = props.navigate;

  return (
    <div className="menu-item-container" style={style.MenuJustLarge}>
      <MenuItem
        onClick={() => navigate('/')}
        text={translator.home}
        icon={faHome}
        selected={props.selected === '/'}
      />
      <MenuItem
        onClick={() => navigate('/dashboard')}
        text={translator.dashboard}
        icon={faDashboard}
        selected={props.selected === 'dashboard'}
      />

      {(props.excludes === undefined ||
        props.excludes.indexOf('mySchool') === -1) && (
        <SuperMenuItem
          text={translator.mySchool}
          icon={faSchool}
          selected={props.selected === 'schoolQuiz'}
          navigate={navigate}
          items={[
            {
              text: translator.quizes,
              url: '/mySchool/quiz',
            },
            {
              text: translator.hws,
              url: '/mySchool/hw',
            },
          ]}
        />
      )}
      {(props.excludes === undefined ||
        props.excludes.indexOf('quiz') === -1) && (
        <SuperMenuItem
          text={'آزمون'}
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
              text:
                props.excludes !== undefined &&
                props.excludes.indexOf('quiz_makeQuiz') === -1
                  ? translator.makeQuiz
                  : undefined,
              url: '/makeQuiz',
            },
            {
              text: translator.myQuizes,
              url: '/myIRYSCQuizzes',
            },
            {
              text:
                props.excludes !== undefined &&
                props.excludes.indexOf('quiz_makeQuiz') === -1
                  ? translator.myCustomQuizess
                  : undefined,
              url: '/myCustomQuizzes',
            },
          ]}
        />
      )}

      {(props.excludes === undefined ||
        props.excludes.indexOf('advisor') === -1) && (
        <SuperMenuItem
          text={'مشاور'}
          icon={faBandage}
          selected={props.selected === 'buy'}
          navigate={navigate}
          items={[
            {
              text: translator.myAdvisor,
              url: '/myAdvisor',
            },
            {
              text: translator.advisors,
              url: '/advisors',
            },
            {
              text: translator.requestsLog,
              url: '/requestLogsForAdvisors',
            },
          ]}
        />
      )}

      {(props.excludes === undefined ||
        props.excludes.indexOf('package') === -1) && (
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
      )}

      {(props.excludes === undefined ||
        props.excludes.indexOf('charge') === -1) && (
        <MenuItem
          onClick={() => navigate('/charge')}
          text={translator.charge}
          icon={faCreditCard}
          selected={props.selected === 'charge'}
        />
      )}

      {(props.excludes === undefined ||
        props.excludes.indexOf('certs') === -1) && (
        <MenuItem
          onClick={() => navigate('/myCerts')}
          text={translator.myCerts}
          icon={faSun}
          selected={props.selected === 'myCerts'}
        />
      )}

      {(props.excludes === undefined ||
        props.excludes.indexOf('financeHistory') === -1) && (
        <MenuItem
          onClick={() => navigate('/financeHistory')}
          text={translator.history}
          icon={faHistory}
          selected={props.selected === 'financeHistory'}
        />
      )}

      {/* <MenuItem text={translator.support} icon={faQuestion} /> */}
      <MenuItem
        onClick={() => navigate('/ticket')}
        text={translator.requests}
        icon={faCog}
        selected={props.selected === 'ticket'}
      />
      {props.child}
    </div>
  );
}

export default MenuItemRepeat;
