import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faHome,
  faCog,
  faUsers,
  faContactBook,
  faMoneyBill,
  faQuestion,
  faGift,
  faCertificate,
  faDashboard,
  faBox,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import {SuperMenuItem} from './SuperMenuItem';
import {MyView} from '../../../../../styles/Common';

function AdminMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

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
          text={translator.basicDefinition}
          icon={faContactBook}
          selected={props.selected === 'book'}
          navigate={navigate}
          items={[
            {
              text: translator.gradeDefinition,
              url: '/basic/grades',
            },
            {
              text: translator.lessonsDefinition,
              url: '/basic/lessons',
            },
            {
              text: translator.subjectDefinition,
              url: '/basic/subjects',
            },
          ]}
        />
        <SuperMenuItem
          text={translator.finantialManagement}
          icon={faMoneyBill}
          selected={props.selected === 'finantial'}
          navigate={navigate}
          items={[
            {
              text: translator.report,
              url: '/finantialReport',
            },
            {
              text: translator.offcode,
              url: '/offs',
            },
          ]}
        />
        <MenuItem
          onClick={() => navigate('/ticket')}
          text={translator.requests}
          icon={faCog}
          selected={props.selected === 'ticket'}
        />
        <MenuItem
          onClick={() => navigate('/cert')}
          text={translator.Certificat}
          icon={faCertificate}
          selected={props.selected === 'cert'}
        />
        <MenuItem
          onClick={() => navigate('/question')}
          text={translator.questions}
          icon={faQuestion}
          selected={props.selected === 'question'}
        />
        <SuperMenuItem
          text={translator.users}
          icon={faUsers}
          selected={props.selected === 'users'}
          navigate={navigate}
          items={[
            {
              text: translator.agent,
              url: '/users/agent',
            },
            {
              text: translator.advisor,
              url: '/users/advisor',
            },
            {
              text: translator.students,
              url: '/users/student',
            },
            {
              text: translator.teacher,
              url: '/users/teacher',
            },
            {
              text: translator.schools,
              url: '/users/school',
            },
            {
              text: translator.authors,
              url: '/users/author',
            },
          ]}
        />

        <SuperMenuItem
          text={translator.configuration}
          icon={faUsers}
          selected={
            props.selected === 'generalConfiguration' ||
            props.selected === 'certificateConfiguration' ||
            props.selected === 'ravanConfiguration' ||
            props.selected === 'schools' ||
            props.selected === 'tarazLevels'
          }
          navigate={navigate}
          items={[
            {
              text: translator.generalConfiguration,
              url: '/generalConfiguration',
            },
            {
              text: translator.certificateConfiguration,
              url: '/certificateConfiguration',
            },
            {
              text: translator.ravanConfiguration,
              url: '/ravanConfiguration',
            },
            {
              text: translator.schools,
              url: '/schools',
            },
            {
              text: translator.tarazLevels,
              url: '/tarazLevels',
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
            {
              text: translator.faqContents,
              url: '/faq-contents',
            },
            {
              text: translator.advContents,
              url: '/adv-contents',
            },
            {
              text: translator.seoContents,
              url: '/seo-contents',
            },
          ]}
        />
        <SuperMenuItem
          text={translator.notifs}
          icon={faMessage}
          selected={props.selected === 'notif'}
          navigate={navigate}
          items={[
            {
              text: translator.innerNotifs,
              url: '/notifs/site',
            },
            {
              text: translator.mailNotifs,
              url: '/notifs/mail',
            },
            {
              text: translator.smslNotifs,
              url: '/notifs/sms',
            },
          ]}
        />
        <SuperMenuItem
          text={translator.spinGift}
          icon={faGift}
          selected={props.selected === 'gift'}
          navigate={navigate}
          items={[
            {
              text: translator.selectGift,
              url: '/gift/selectGift',
            },
            {
              text: translator.generalConfiguration,
              url: '/gift/configuration',
            },
            {
              text: translator.report,
              url: '/gift/report',
            },
          ]}
        />
        <MenuItem
          onClick={() => navigate('/avatars')}
          text={translator.avatars}
          icon={faUsers}
          selected={props.selected === 'avatar'}
        />
      </div>
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
        text={translator.home}
        icon={faHome}
        onClick={() => {
          navigate('/');
        }}
        selected={props.selected === 'home'}
      />
      <MenuItemPhone
        text={translator.requests}
        icon={faCog}
        isApp={false}
        onClick={() => {
          navigate('/ticket');
        }}
      />
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

export default AdminMenu;
