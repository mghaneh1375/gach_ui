import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  MyView,
  PhoneView,
  SimpleText,
  TextLink,
} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {style} from './style';
import {faAngleUp, faBell} from '@fortawesome/free-solid-svg-icons';
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
  const [pic, setPic] = useState('url(../../../../images/slider.png)');
  const [newAlerts, setNewAlerts] = useState();
  const [headerClick, setHeaderClick] = useState();

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
  // React.useEffect(() => {
  //   document.ready(function () {
  //     document.click(function () {
  //       setShowNotif(showNotif);
  //       setShowProfilePane(false);
  //     });
  //   });
  // });
  React.useEffect(() => {
    setPic(props.pic);
  }, [props.pic]);
  if (isLargePage || props.isRightMenuVisible) {
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
        <MyView
          style={
            isLargePage
              ? {...style.Header_Profile, ...style.Header_Profile_Large}
              : {...style.Header_Profile, ...style.Header_Profile_Phone}
          }>
          <PhoneView style={{paddingRight: 20}}>
            <UserTinyPic
              onPress={() => {
                changeShow(!showProfilePane);
                showNotif ? setShowNotif(!showNotif) : '';
              }}
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

            {!showProfilePane && (
              <SimpleText
                onPress={() => {
                  changeShow(!showProfilePane);
                  showNotif ? setShowNotif(!showNotif) : '';
                }}
                style={
                  isApp
                    ? {
                        ...style.Header_Profile_Text,
                        ...style.Header_Profile_Text_App,
                        marginRight: !showProfilePane ? 40 : 0,
                      }
                    : {
                        ...style.Header_Profile_Text,
                        ...style.Header_Profile_Text_Web,
                        marginRight: !showProfilePane ? 40 : 0,
                      }
                }
                text={
                  !showProfilePane
                    ? commonTranslator.hello + ' - ' + props.name
                    : ' '
                }
              />
            )}
            <MyView
              style={{
                width: 30,
                height: 30,
                marginTop: 10,
                marginRight: 5,
                right: 0,
                visibility: showProfilePane ? 'hidden' : 'visible',
              }}>
              <SimpleFontIcon
                kind={'normal'}
                onPress={() => {
                  changeShow(!showProfilePane);
                  showNotif ? setShowNotif(!showNotif) : '';
                }}
                icon={faAngleUp}
              />
            </MyView>
          </PhoneView>

          {showProfilePane && (
            <MyView style={style.Header_Profile_MENU}>
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
              <TouchableOpacity
                onPress={() => {
                  setShowProfilePane(false);
                  props.navigate('/profile');
                }}>
                <SimpleText text={commonTranslator.profile} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  changeShowNotif(!showNotif);
                  callLogout();
                }}>
                <SimpleText text={commonTranslator.logout} />
              </TouchableOpacity>
            </MyView>
          )}
        </MyView>

        <MyView style={style.Header_NOTIF}>
          <SimpleFontIcon
            onPress={async () => {
              changeShowNotif(!showNotif);
              showProfilePane ? setShowProfilePane(!showProfilePane) : '';
            }}
            icon={faBell}
          />

          {showNotif && (
            <MyView style={style.Header_Profile_Notif}>
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
