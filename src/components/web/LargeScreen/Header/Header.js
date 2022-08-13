import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {PhoneView, SimpleText, TextLink} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {style} from './style';
import {faAngleDown, faBell} from '@fortawesome/free-solid-svg-icons';
import {getDevice} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';
import {logout} from '../../../../API/User';
import commonTranslator from '../../../../tranlates/Common';
import newAlertsKeyVals from './NewAlertsKeyVals';
import UserTinyPic from '../UserTinyPic';

const Header = props => {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const isApp = device.indexOf(Device.App) !== -1;

  const [showProfilePane, setShowProfilePane] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [pic, setPic] = useState(undefined);
  const [newAlerts, setNewAlerts] = useState();

  React.useEffect(() => {
    setNewAlerts(props.newAlerts);
  }, [props.newAlerts]);

  React.useEffect(() => {
    setShowNotif(false);
  }, [props.navigate]);

  const changeShow = newStatus => {
    setShowProfilePane(newStatus);
  };

  const callLogout = async () => {
    props.setLoading(true);
    await logout(props.token, props.navigate);
    props.setUser(undefined);
    props.setLoading(false);
  };

  const changeShowNotif = newStatus => {
    setShowNotif(newStatus);
  };

  React.useEffect(() => {
    setPic(props.pic);
  }, [props.pic]);

  if (isLargePage || !props.hideRightMenu) {
    return (
      <PhoneView
        style={
          isLargePage
            ? {...style.Header, ...style.HeaderJustLarge}
            : isApp
            ? {
                ...style.Header,
                ...style.HeaderJustPhone,
                ...style.HeaderJustApp,
              }
            : {
                ...style.Header,
                ...style.HeaderJustPhone,
                ...style.HeaderJustWebPhone,
              }
        }>
        <PhoneView
          style={
            isLargePage
              ? {...style.Header_Profile, ...style.Header_Profile_Large}
              : {...style.Header_Profile, ...style.Header_Profile_Phone}
          }>
          <UserTinyPic
            style={
              isApp
                ? {
                    ...style.Header_Profile_Image,
                    ...style.Header_Profile_Image_App,
                  }
                : {
                    ...style.Header_Profile_Image,
                    ...style.Header_Profile_Image_Web,
                  }
            }
            pic={pic}
          />
          <SimpleText
            style={
              isApp
                ? {
                    ...style.Header_Profile_Text,
                    ...style.Header_Profile_Text_App,
                  }
                : {
                    ...style.Header_Profile_Text,
                    ...style.Header_Profile_Text_Web,
                  }
            }
            text={commonTranslator.hello + ' - ' + props.name}
          />
          <MyView style={{width: 30, height: 30, marginTop: 5, marginRight: 5}}>
            <SimpleFontIcon
              style={{}}
              onPress={() => changeShow(!showProfilePane)}
              icon={faAngleDown}
            />
          </MyView>

          {showProfilePane && (
            <MyView style={style.Header_Profile_MENU}>
              <TouchableOpacity
                onPress={() => {
                  setShowProfilePane(false);
                  props.navigate('/profile');
                }}>
                <SimpleText text={commonTranslator.profile} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await callLogout();
                  window.location.href = '/';
                }}>
                <SimpleText text={commonTranslator.logout} />
              </TouchableOpacity>
            </MyView>
          )}
        </PhoneView>

        <MyView style={style.Header_NOTIF}>
          <SimpleFontIcon
            onPress={() => changeShowNotif(!showNotif)}
            icon={faBell}
          />

          {showNotif && (
            <MyView style={style.Header_Profile_MENU}>
              {newAlerts !== undefined &&
                newAlerts.map((elem, index) => {
                  return (
                    <TextLink
                      style={{fontSize: 10}}
                      key={index}
                      text={
                        newAlertsKeyVals.find(itr => itr.id === elem.key)
                          .title +
                        ' ' +
                        elem.value
                      }
                      href={'/ticket?section=upgradelevel'}
                    />
                  );
                })}
            </MyView>
          )}
        </MyView>
      </PhoneView>
    );
  }

  return <></>;
};
export default Header;
