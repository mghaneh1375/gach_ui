import {View} from 'react-native';
import style, {MenuItem} from './style';
import {
  faHome,
  faBasketShopping,
  faHistory,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import vars from '../../../../styles/root';

const Menu = () => {
  return (
    <View style={style.Menu}>
      <MenuItem icon={faQuestion} />
      <MenuItem icon={faHistory} />
      <MenuItem selected={true} icon={faBasketShopping} />
      <MenuItem icon={faHome} />
    </View>
  );
};

export default Menu;
