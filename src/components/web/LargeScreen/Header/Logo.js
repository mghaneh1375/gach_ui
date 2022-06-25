import {Image, View} from 'react-native';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {style} from './style';
import {faNavicon} from '@fortawesome/free-solid-svg-icons';
import {getDevice} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';
import {PhoneView} from '../../../../styles/Common';

const Logo = props => {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;

  return (
    <PhoneView
      style={
        isLargePage
          ? {...style.Logo, ...style.LogoJustLarge}
          : {...style.Logo, ...style.LogoJustPhone}
      }>
      <Image
        resizeMode="contain"
        style={
          isLargePage
            ? [{...style.LogoImage, ...style.LogoImageJustLarge}]
            : [{...style.LogoImage, ...style.LogoImageJustPhone}]
        }
        source={require('./../../../../images/irysc.png')}
      />

      {props.isLogin && (
        <View style={{width: 40, height: 40, alignSelf: 'center'}}>
          <FontIcon
            style={{padding: device.indexOf(Device.App) === -1 ? 7 : 15}}
            onPress={e => props.toggleHideRightMenu()}
            icon={faNavicon}
          />
        </View>
      )}
    </PhoneView>
  );
};

export default Logo;
