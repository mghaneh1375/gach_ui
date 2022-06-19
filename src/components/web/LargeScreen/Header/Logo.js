import {Image, View} from 'react-native';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import style from './style';
import {faNavicon} from '@fortawesome/free-solid-svg-icons';

const Logo = props => {
  return (
    <View style={style.Logo}>
      <Image
        resizeMode="contain"
        style={{height: '90%', width: 'calc(100% - 30px)', marginRight: -20}}
        source={require('./../../../../images/irysc.png')}
      />
      <View style={{width: 30, height: 30, alignSelf: 'center'}}>
        <FontIcon onPress={e => props.toggleHideRightMenu()} icon={faNavicon} />
      </View>
    </View>
  );
};

export default Logo;
