import {
  faBasketShopping,
  faCog,
  faCreditCard,
  faHistory,
  faHome,
  faQuestion,
  faShoppingCart,
  faUsers,
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
        selected={props.selected === 'dashboard'}
      />
      <SuperMenuItem
        text={'آزمون'}
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
          {
            text: translator.schools,
            url: '/schoolUsers',
          },
        ]}
      />
      <MenuItem
        onClick={() => navigate('/charge')}
        text={translator.charge}
        icon={faCreditCard}
      />
      <MenuItem
        onClick={() => navigate('/financeHistory')}
        text={translator.history}
        icon={faHistory}
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
