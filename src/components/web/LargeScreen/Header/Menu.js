import {View} from 'react-native';
import style, {MenuItem} from './style';
import {
  faHome,
  faBasketShopping,
  faHistory,
  faQuestion,
  faCreditCard,
  faCheckSquare,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import translator from '../../../../tranlates/Common';

const Menu = () => {
  return (
    <View style={style.Menu}>
      <MenuItem text={translator.home} icon={faHome} />
      <MenuItem text={translator.myQuizes} icon={faCheckSquare} />
      <MenuItem
        text={translator.buyQuiz}
        selected={true}
        icon={faBasketShopping}
      />
      <MenuItem text={translator.charge} icon={faCreditCard} />
      <MenuItem text={translator.history} icon={faHistory} />
      <MenuItem text={translator.support} icon={faQuestion} />
      <MenuItem text={translator.config} icon={faCog} />
    </View>
  );
};

export default Menu;
