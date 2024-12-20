import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faCog,
  faCreditCard,
  faHistory,
  faSchool,
  faShop,
  faShoppingCart,
  faUsers,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import {MyView} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';
import {SuperMenuItem} from './SuperMenuItem';

function SchoolMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  if (isLargePage) {
    return (
      <MenuItemRepeat
        excludes={['certs', 'mySchool']}
        navigate={props.navigate}
        selected={props.selected}
        child={
          <>
            <SuperMenuItem
              text={translator.mySchool}
              icon={faSchool}
              selected={
                props.selected === 'mySchoolQuizzes' ||
                props.selected === 'mySchoolHWs'
              }
              navigate={navigate}
              items={[
                {
                  text: translator.mySchoolQuizess,
                  url: '/mySchoolQuizzes',
                },
                {
                  text: translator.hws,
                  url: '/mySchoolHWs',
                },
              ]}
            />
            <MenuItem
              onClick={() => navigate('/manageStudent')}
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
      }}>
      <SuperMenuItem
        text={translator.mySchool}
        icon={faSchool}
        selected={
          props.selected === 'mySchoolQuizzes' ||
          props.selected === 'mySchoolHWs'
        }
        navigate={navigate}
        items={[
          {
            text: translator.mySchoolQuizess,
            url: '/mySchoolQuizzes',
          },
          {
            text: translator.hws,
            url: '/mySchoolHWs',
          },
        ]}
      />

      <MenuItemPhone
        onClick={() => navigate('/manageStudent')}
        text={translator.management + ' ' + translator.students}
        icon={faUsers}
        selected={props.selected === 'manageStudent'}
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
    </MyView>
  );
}

export default SchoolMenu;
