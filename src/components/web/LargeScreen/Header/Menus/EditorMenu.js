import React from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice} from '../../../../../services/Utility';
import {MenuItem, style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faHome,
  faCog,
  faUsers,
  faQuestion,
  faDashboard,
  faBox,
} from '@fortawesome/free-solid-svg-icons';
import {SuperMenuItem} from './SuperMenuItem';
import {MyView} from '../../../../../styles/Common';
import MobileLogout from '../MobileLogout';
import {globalStateContext} from '../../../../../App';

function EditorMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(globalStateContext)];

  const [state] = useGlobalState();

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
        <MenuItem
          onClick={() => navigate('/ticket')}
          text={translator.requests}
          icon={faCog}
          selected={props.selected === 'ticket'}
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
            {
              text: translator.teachersContents,
              url: '/contents-teacher',
            },
          ]}
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
        ...style.MenuJustApp,
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

      <MenuItemPhone
        onClick={() => navigate('/ticket')}
        text={translator.requests}
        icon={faCog}
        selected={props.selected === 'ticket'}
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
          {
            text: translator.teachersContents,
            url: '/contents-teacher',
          },
        ]}
      />

      <MobileLogout name={props.name} navigate={props.navigate} />
    </MyView>
  );
}

export default EditorMenu;
