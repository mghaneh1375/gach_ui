import React, {useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
  TextLink,
} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {style} from './style';
import {faAngleUp, faBell, faGift} from '@fortawesome/free-solid-svg-icons';
import {getDevice, getWidthHeight} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';
import {logout} from '../../../../API/User';
import commonTranslator from '../../../../translator/Common';
import newAlertsKeyVals from './NewAlertsKeyVals';
import UserTinyPic from '../UserTinyPic';
import {styles} from '../../../../styles/Common/Styles';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import vars from '../../../../styles/root';

const Header = props => {
  const isApp = getDevice().indexOf(Device.App) !== -1;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [showProfilePane, setShowProfilePane] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [pic, setPic] = useState('url(../../../../images/slider.png)');
  const [newAlerts, setNewAlerts] = useState();

  React.useEffect(() => {
    setNewAlerts(props.newAlerts);
  }, [props.newAlerts]);

  React.useEffect(() => {
    setShowNotif(false);
  }, [props.navigate]);

  React.useEffect(() => {
    if (wrapperRef === undefined || wrapperRef.current === undefined) return;
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (showProfilePane) setShowProfilePane(false);
      }
    }

    if (showProfilePane) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [wrapperRef, showProfilePane]);

  const callLogout = async () => {
    props.setLoading(true);
    await logout(props.token, props.navigate);
    dispatch({user: null});
    props.setLoading(false);
  };

  const changeShowNotif = newStatus => {
    setShowNotif(newStatus);
  };

  const wrapperRef = useRef(null);

  React.useEffect(() => {
    setPic(props.pic);
  }, [props.pic]);

  if (!state.isInPhone || props.isRightMenuVisible) {
    const width = getWidthHeight()[0];

    return (
      <PhoneView
        style={
          !state.isInPhone
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
        <MyView style={{...style.Header_Profile}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              flexFlow: 'row wrap',
              flexShrink: 1,
              width: '100%',
            }}
            ref={wrapperRef}>
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
                      marginTop: width < 768 && showProfilePane ? -121 : -5,
                    }
              }
              pic={pic}
            />

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
                        marginRight: !showProfilePane ? 40 : 0,
                      }
                    : {
                        ...style.Header_Profile_Text,
                        ...style.Header_Profile_Text_Web,
                        marginRight: !showProfilePane ? 40 : 0,
                      }
                }
                text={!showProfilePane ? props.name : ' '}
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
                kind={'midSize'}
                onPress={() => {
                  setShowProfilePane(!showProfilePane);
                  showNotif ? setShowNotif(!showNotif) : '';
                }}
                icon={faAngleUp}
              />
            </MyView>

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
                      changeShowNotif(!showNotif);
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
          </div>
        </MyView>
        <PhoneView style={{gap: '10px'}}>
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
                        <EqualTwoTextInputs key={index}>
                          <TextLink
                            style={{...styles.fontSize12, ...styles.BlueBold}}
                            // text={
                            //   newAlertsKeyVals.find(itr => itr.id === elem.key)
                            //     .title + newAlerts.events.length
                            // }
                            text={
                              newAlertsKeyVals.find(itr => itr.id === elem.key)
                                .title +
                              ' ' +
                              elem.value
                            }
                            href={
                              elem.key === 'new_tickets'
                                ? '/ticket?section=upgradelevel'
                                : '/notif/' + elem.id
                            }
                          />
                          {/* <SimpleText
                          style={{fontSize: 10, color: vars.DARK_BLUE}}
                          text={elem.value}
                        /> */}
                        </EqualTwoTextInputs>
                      );
                    })}
                  {/* {newAlerts !== undefined &&
                    newAlerts.gift_id !== undefined && (
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

  return <></>;
};
export default Header;
