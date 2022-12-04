import React, {useState} from 'react';
import {Device} from '../../../../../models/Device';
import {getDevice, getWidthHeight} from '../../../../../services/Utility';
import {style, MenuItemPhone} from '../style';
import translator from '../../../../../translator/Common';
import {
  faHome,
  faBasketShopping,
  faHistory,
  faQuestion,
  faCreditCard,
  faCheckSquare,
  faCog,
  faDashboard,
  faAngleDown,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import {
  MyView,
  PhoneView,
  SimpleText,
  TextLink,
} from '../../../../../styles/Common';
import MenuItemRepeat from './MenuItemRepeat';
import {styles} from '../../../../../styles/Common/Styles';
import {faAngleUp, faBell} from '@fortawesome/free-solid-svg-icons';
import commonTranslator from '../../../../../translator/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {TouchableOpacity} from 'react-native';
import {dispatchStateContext, globalStateContext} from '../../../../../App';
import UserTinyPic from '../../UserTinyPic';
import newAlertsKeyVals from '../NewAlertsKeyVals';
import {logout} from '../../../../../API/User';
import {SuperMenuItem} from './SuperMenuItem';

function StudentMenu(props) {
  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;
  const navigate = props.navigate;
  const [newAlerts, setNewAlerts] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const isApp = device.indexOf(Device.App) !== -1;
  const width = getWidthHeight()[0];
  const [pic, setPic] = useState('url(../../../../images/slider.png)');

  const [showProfilePane, setShowProfilePane] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  React.useEffect(() => {
    setPic(state.user.user.pic);
  }, [state.user.user.pic]);

  if (isLargePage) {
    return (
      <MenuItemRepeat navigate={props.navigate} selected={props.selected} />
    );
  }

  const callLogout = async () => {
    dispatch({loading: true});
    await logout(state.token, props.navigate);
    dispatch({loading: false, user: null});
  };

  const changeShowNotif = newStatus => {
    setShowNotif(newStatus);
  };
  return (
    <MyView
      className={'menu-container-in-phone'}
      style={{
        ...style.Menu,
        ...style.MenuJustPhone,
        ...style.MenuJustApp,
        ...{
          zIndex: state.isRightMenuVisible ? 4 : 'unset',
        },
      }}>
      <MenuItemPhone
        text={translator.home}
        icon={faHome}
        onClick={() => {
          navigate(isApp ? 'Home' : '/');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'home'}
      />
      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/dashboard');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'dashboard'}
        text={translator.dashboard}
        icon={faDashboard}
      />
      <SuperMenuItem
        text={'آزمون'}
        icon={faShoppingCart}
        selected={props.selected === 'book'}
        navigate={navigate}
        items={[
          {
            text: translator.buyQuiz,
            url: '/buy',
          },
          {
            text: translator.makeQuiz,
            url: '/makeQuiz',
          },
          {
            text: translator.myQuizes,
            url: '/myIRYSCQuizzes',
          },
          {
            text: translator.myCustomQuizess,
            url: '/myCustomQuizzes',
          },
        ]}
      />
      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/charge');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'charge'}
        text={translator.charge}
        icon={faCreditCard}
      />
      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/financeHistory');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'financeHistory'}
        text={translator.history}
        icon={faHistory}
      />
      <MenuItemPhone
        onClick={() => {
          navigate(isApp ? 'Home' : '/ticket');
          props.toggleRightMenuVisibility();
        }}
        selected={props.selected === 'ticket'}
        text={translator.support}
        icon={faQuestion}
      />

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
        <PhoneView style={{...style.Header_Profile}}>
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
    </MyView>
  );
}

export default StudentMenu;
