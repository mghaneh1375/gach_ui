import {
  faBasketShopping,
  faCog,
  faCreditCard,
  faDashboard,
  faHistory,
  faHome,
  faQuestion,
  faShoppingCart,
  faSun,
  faUsers,
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
      <SuperMenuItem
        text={'آزمون'}
        icon={faShoppingCart}
        selected={props.selected === 'buy' || props.selected === 'makeQuiz'}
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
          // {
          //   text: translator.schools,
          //   url: '/schoolUsers',
          // },
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
      <MenuItem
        onClick={() => navigate('/charge')}
        text={translator.charge}
        icon={faCreditCard}
        selected={props.selected === 'charge'}
      />
      <MenuItem
        onClick={() => navigate('/myCerts')}
        text={translator.myCerts}
        icon={faSun}
        selected={props.selected === 'myCerts'}
      />
      <MenuItem
        onClick={() => navigate('/financeHistory')}
        text={translator.history}
        icon={faHistory}
        selected={props.selected === 'financeHistory'}
      />
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
