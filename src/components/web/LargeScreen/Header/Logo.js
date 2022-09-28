import React from 'react';
import {Image} from 'react-native';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {style} from './style';
import {faClose, faNavicon} from '@fortawesome/free-solid-svg-icons';
import {getDevice} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';
import {PhoneView, MyView} from '../../../../styles/Common';
import {globalStateContext} from '../../../../App';

const Logo = props => {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;

  const useGlobalState = () => [React.useContext(globalStateContext)];

  const [state] = useGlobalState();

  if (!props.isLogin) return <></>;
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
        <MyView style={{width: 40, height: 40, alignSelf: 'center'}}>
          {!state.isRightMenuVisible && state.isFilterMenuVisible && (
            <FontIcon
              style={{padding: device.indexOf(Device.App) === -1 ? 7 : 15}}
              onPress={e => props.toggleRightMenuVisibility()}
              icon={faClose}
              back={'yellow'}
            />
          )}
          {(state.isRightMenuVisible || !state.isFilterMenuVisible) && (
            <FontIcon
              style={{padding: device.indexOf(Device.App) === -1 ? 7 : 15}}
              onPress={e => props.toggleRightMenuVisibility()}
              icon={faNavicon}
            />
          )}
        </MyView>
      )}
    </PhoneView>
  );
};

export default Logo;
