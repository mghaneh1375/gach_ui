import {
  faBandage,
  faBook,
  faCog,
  faComments,
  faCreditCard,
  faDashboard,
  faHistory,
  faHome,
  faMedal,
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
          selected={
            props.selected === 'myAdvisor' ||
            props.selected === 'mySchedules' ||
            props.selected === 'myLifeStyle' ||
            props.selected === 'advisors'
          }
          navigate={navigate}
          items={[
            {
              text:
                props.excludes !== undefined &&
                props.excludes.indexOf('my_advisor') === -1
                  ? translator.myAdvisor
                  : undefined,
              url: '/myAdvisor',
            },
            {
              text:
                props.excludes !== undefined &&
                props.excludes.indexOf('my_schedules') === -1
                  ? translator.mySchedules
                  : undefined,
              url: '/mySchedules',
            },
            {
              text:
                props.excludes !== undefined &&
                props.excludes.indexOf('my_life_style') === -1
                  ? 'برنامه‌ی روزانه‌ی من'
                  : undefined,
              url: '/myLifeStyle',
            },

            {
              text: translator.advisors,
              url: '/advisors',
            },
            {
              text:
                props.excludes !== undefined &&
                props.excludes.indexOf('my_advisor_quizzes') === -1
                  ? translator.quizes
                  : undefined,
              url: '/myAdvisor/quiz',
            },
            {
              text: translator.requestsLog,
              url: '/requestLogsForAdvisors',
            },
          ]}
        />
      )}

      {(props.excludes === undefined ||
        props.excludes.indexOf('teach') === -1) && (
        <SuperMenuItem
          text={translator.teach}
          icon={faBook}
          selected={props.selected === 'teach'}
          navigate={navigate}
          items={[
            {
              text: translator.iryscTeachers,
              url: '/showAllTeachers',
            },
            {
              text: translator.myClassess,
              url: '/myTeachClasses',
            },
            {
              text: translator.myRequests,
              url: '/myScheduleRequests',
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
        props.excludes.indexOf('publicBadges') === -1) && (
        <MenuItem
          onClick={() => navigate('/all-badges')}
          text={translator.badges}
          icon={faMedal}
          selected={props.selected === 'publicBadges'}
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
      {(props.excludes === undefined ||
        props.excludes.indexOf('comments') === -1) && (
        <MenuItem
          onClick={() => navigate('/myComments')}
          text={translator.myComments}
          icon={faComments}
          selected={props.selected === 'myComments'}
        />
      )}
      {props.child}
    </div>
  );
}

export default MenuItemRepeat;
