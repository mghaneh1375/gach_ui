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
import {MyView} from '../../../../../styles/Common';

function MenuItemRepeat(props) {
  const navigate = props.navigate;
  return (
    <div className="menu-item-container" style={style.MenuJustLarge}>
      <MenuItem
        onClick={() => navigate('/dashboard')}
        text={translator.home}
        icon={faHome}
        selected={props.selected === 'dashboard'}
      />
      <MenuItem
        onClick={() => navigate('/myQuizzes')}
        text={translator.myQuizes}
        icon={faShoppingCart}
        selected={props.selected === 'myQuizzes'}
      />
      <MenuItem
        onClick={() => navigate('/buy')}
        selected={props.selected === 'buy'}
        text={translator.buyQuiz}
        icon={faBasketShopping}
      />
      <MenuItem
        onClick={() => navigate('/schoolUsers')}
        text={translator.schools}
        icon={faUsers}
        selected={props.selected === 'schools'}
      />
      <MenuItem
        onClick={() => navigate('/charge')}
        text={translator.charge}
        icon={faCreditCard}
      />
      <MenuItem text={translator.history} icon={faHistory} />
      <MenuItem text={translator.support} icon={faQuestion} />
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
