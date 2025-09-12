import React from 'react';
import {Image} from 'react-native';
import {FontIcon} from '@/styles/common/FontIcon.jsx';
import {style} from './Style.jsx';
import {faClose, faNavicon} from '@fortawesome/free-solid-svg-icons';
import {getDevice} from '@/services/utility';
import {Device} from '@/models/device';
import {PhoneView, MyView} from '@/styles/commonComponents.jsx';
import {globalStateContext} from '../../../../App.jsx';
const Logo = props => {
  const device = getDevice();
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();
  if (!props.isLogin) return <></>;
  return (
    <PhoneView
      style={
        state.isInPhone
          ? {
              ...style.Logo,
              ...style.LogoJustPhone,
            }
          : {
              ...style.Logo,
              ...style.LogoJustLarge,
            }
      }>
      <Image
        resizeMode="contain"
        style={
          state.isInPhone
            ? [
                {
                  ...style.LogoImage,
                  ...style.LogoImageJustPhone,
                },
              ]
            : [
                {
                  ...style.LogoImage,
                  ...style.LogoImageJustLarge,
                },
              ]
        }
        source={require('./../../../../images/irysc.png')}
      />

      {props.isLogin && (
        <MyView
          style={{
            width: 40,
            height: 40,
            alignSelf: 'center',
          }}>
          {!state.isRightMenuVisible && state.isFilterMenuVisible && (
            <FontIcon
              style={{
                padding: device.indexOf(Device.App) === -1 ? 7 : 15,
              }}
              onPress={e => props.toggleRightMenuVisibility()}
              icon={faClose}
              back={'yellow'}
            />
          )}
          {(state.isRightMenuVisible || !state.isFilterMenuVisible) && (
            <FontIcon
              style={{
                padding: device.indexOf(Device.App) === -1 ? 7 : 15,
              }}
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
