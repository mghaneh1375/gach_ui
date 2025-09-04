import React, {useState} from 'react';
import {
  faAngleDown,
  faAngleUp,
  faBell,
  faGift,
} from '@fortawesome/free-solid-svg-icons';
import {style} from './style';
import {
  MyView,
  PhoneView,
  SimpleText,
  TextLink,
} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import UserTinyPic from '../UserTinyPic';
import {TouchableOpacity} from 'react-native';
import {Device} from '../../../../models/Device';
import {getDevice, getWidthHeight} from '../../../../services/Utility';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import vars from '../../../../styles/root';
import newAlertsKeyVals from './NewAlertsKeyVals';
import commonTranslator from '../../../../translator/Common';
import {styles} from '../../../../styles/Common/Styles';
import {logout} from '../../../../API/User';

function MobileLogout(props) {
  const device = getDevice();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const isApp = device.indexOf(Device.App) !== -1;
  const width = getWidthHeight()[0];
  const [pic, setPic] = useState('url(../../../../images/slider.png)');
  const [newAlerts, setNewAlerts] = useState();

  React.useEffect(() => {
    setPic(state.user.user.pic);
  }, [state.user.user.pic]);

  const callLogout = async () => {
    dispatch({loading: true});
    await logout(state.token, props.navigate);
    dispatch({loading: false, user: null});
  };

  const changeShowNotif = newStatus => {
    setShowNotif(newStatus);
  };

  const [showProfilePane, setShowProfilePane] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  React.useEffect(() => {
    setNewAlerts(state.newAlerts);
  }, [state.newAlerts]);

  return (
    <PhoneView
      style={
        isApp
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
          newAlerts !== undefined && newAlerts.gift_id !== undefined
            ? {...style.Gift_Header_Profile}
            : {...style.Header_Profile}
        }>
        <UserTinyPic
          onPress={() => {
            setShowProfilePane(!showProfilePane);
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
                  marginRight:
                    width < 768 && showProfilePane
                      ? 10
                      : width > 768 && showProfilePane
                      ? 'calc(50% - 25px)'
                      : -15,
                  marginTop: width < 768 && showProfilePane ? -260 : -5,
                }
          }
          pic={pic}
        />

        <PhoneView
          style={
            isApp
              ? {
                  marginRight: !showProfilePane ? 40 : 0,
                }
              : {
                  marginRight: !showProfilePane ? 40 : 0,
                }
          }>
          {!showProfilePane && (
            <SimpleText
              onPress={() => {
                setShowProfilePane(!showProfilePane);
                showNotif ? setShowNotif(!showNotif) : '';
              }}
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
              text={
                !showProfilePane
                  ? state.user.user.firstName + ' ' + state.user.user.lastName
                  : ' '
              }
            />
          )}
          <MyView
            style={{
              width: 30,
              height: 30,
              marginRight: showProfilePane ? 'calc(100% + 100px)' : 5,
              marginTop: showProfilePane ? -130 : 10,
              zIndex: showProfilePane ? 10 : 'unset',
            }}>
            <SimpleFontIcon
              kind={'midSize'}
              onPress={() => {
                setShowProfilePane(!showProfilePane);
                showNotif ? setShowNotif(!showNotif) : '';
              }}
              icon={showProfilePane ? faAngleDown : faAngleUp}
            />
          </MyView>
        </PhoneView>

        {showProfilePane && (
          <MyView
            style={{
              ...style.Header_Profile_MENU,
              ...styles.boxShadow,
            }}>
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
              text={props.name}
            />
            <MyView>
              <TouchableOpacity
                onPress={() => {
                  setShowProfilePane(false);
                  props.navigate('/profile');
                }}>
                <SimpleText
                  style={{
                    ...styles.borderBottom1,
                    ...styles.paddingBottomUp5,
                  }}
                  text={commonTranslator.profile}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowProfilePane(false);
                  props.navigate('/profile-config');
                }}>
                <SimpleText
                  style={{
                    ...styles.borderBottom1,
                    ...styles.paddingBottomUp5,
                  }}
                  text={commonTranslator.profileConfig}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  setShowProfilePane(false);
                  props.navigate('/myOffs');
                }}>
                <SimpleText
                  style={{
                    ...styles.borderBottom1,
                    ...styles.paddingBottomUp5,
                  }}
                  text={commonTranslator.offsBonus}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  callLogout();
                }}>
                <SimpleText
                  style={{
                    ...styles.paddingBottomUp5,
                  }}
                  text={commonTranslator.logout}
                />
              </TouchableOpacity>
            </MyView>
          </MyView>
        )}
      </PhoneView>

      <PhoneView style={{gap: 10}}>
        {newAlerts !== undefined && newAlerts.gift_id !== undefined && (
          <MyView style={style.Header_NOTIF}>
            <SimpleFontIcon
              onPress={() =>
                (window.location.href = '/spinner/' + newAlerts.gift_id)
              }
              icon={faGift}
            />
          </MyView>
        )}
        <MyView style={style.Header_NOTIF}>
          <SimpleFontIcon
            onPress={async () => {
              changeShowNotif(!showNotif);
              showProfilePane ? setShowProfilePane(!showProfilePane) : '';
            }}
            icon={faBell}
          />

          {newAlerts !== undefined &&
            newAlerts.events !== undefined &&
            newAlerts.events.length > 0 && (
              <SimpleText
                style={{
                  position: 'absolute',
                  right: -10,
                  top: -5,
                  backgroundColor: vars.RED,
                  borderRadius: '50%',
                  textAlign: 'center',
                  fontWeight: 'bolder',
                  width: 20,
                  height: 20,
                  color: vars.YELLOW,
                }}
                text={newAlerts.events.length}
              />
            )}

          {showNotif && (
            <MyView style={style.Header_Profile_Notif}>
              <MyView style={{...styles.gap15}}>
                {newAlerts !== undefined &&
                  newAlerts.events !== undefined &&
                  newAlerts.events.map((elem, index) => {
                    return (
                      <MyView key={index}>
                        <TextLink
                          style={{...styles.fontSize12, ...styles.BlueBold}}
                          // text={
                          //   newAlertsKeyVals.find(itr => itr.id === elem.key)
                          //     .title + newAlerts.events.length
                          // }
                          text={
                            newAlertsKeyVals.find(itr => itr.id === elem.key)
                              .title
                          }
                          href={
                            elem.key === 'new_tickets'
                              ? '/ticket?section=upgradelevel'
                              : '/notif/' + elem.id
                          }
                        />
                        <SimpleText
                          style={{fontSize: 10, color: vars.DARK_BLUE}}
                          text={elem.value}
                        />
                      </MyView>
                    );
                  })}
                {/* {newAlerts !== undefined && newAlerts.gift_id !== undefined && (
                <TextLink
                  style={{...styles.fontSize12, ...styles.BlueBold}}
                  text={'گردونه شانس'}
                  href={'/spinner/' + newAlerts.gift_id}
                />
              )} */}
              </MyView>
              <TextLink
                style={{
                  ...styles.BlueBold,
                  ...styles.fontSize12,
                  ...styles.alignSelfEnd,
                }}
                href={'/myNotifs'}
                text={'تمام نامه‌های من'}
              />
            </MyView>
          )}
        </MyView>
      </PhoneView>
    </PhoneView>
  );
}

export default MobileLogout;
