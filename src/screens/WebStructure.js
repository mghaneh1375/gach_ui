import React, {useState} from 'react';

import {ScreenScroll, MinFullHeightView} from '../styles/Common';
import {View} from 'react-native';
import {useNavigate} from 'react-router-dom';
import Home from './general/home/Home';
import Login from './general/login/Login';
import WebLogin from './general/login/web/Login';
import WebProfile from './general/profile/web/Profile';
import {getDevice} from '../services/Utility';
import {Device} from '../models/Device';

import 'react-notifications-component/dist/theme.css';
import {ReactNotifications} from 'react-notifications-component';

import {globalStateContext, dispatchStateContext} from '../App';
import Logo from '../components/web/LargeScreen/Header/Logo';
import Header from '../components/web/LargeScreen/Header/Header';
import Menu from '../components/web/LargeScreen/Header/Menu';
import vars from '../styles/root';
import {getToken, getUser, setCacheItem} from '../API/User';
import {TopNavBar} from '../components/web/TopNavBar';
import Navbar from '../components/web/Navbar';
import BottomNavBar from '../components/web/BottomNavBar';
import {generalRequest} from '../API/Utility';
import {routes} from '../API/APIRoutes';

const WebStructue = props => {
  const device = getDevice();
  const navigate = useNavigate();
  const isInLargeMode = device.indexOf(Device.Large) !== -1;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [hideRightMenu, setHideRightMenu] = useState(false);
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [allowRenderPage, setAllowRenderPage] = useState(false);

  React.useEffect(() => {
    const excludeTopNav = ['login', 'profile'];
    const excludeBottomNav = ['login'];
    const excludeAuthRoutes = ['login', 'home'];

    dispatch({
      showTopNav: excludeTopNav.indexOf(props.page) === -1,
      showBottonNav: excludeBottomNav.indexOf(props.page) === -1,
    });

    Promise.all([getToken(), getUser()]).then(res => {
      setToken(res[0]);
      let token = res[0];
      let waitForGetUser = false;

      if (res[0] !== null && res[0] !== undefined) {
        if (res[1] !== null && res[1] !== undefined) setUser(res[1]);
        else waitForGetUser = true;
      }

      if (!waitForGetUser) {
        if (
          (res[1] === null || res[1] === undefined) &&
          excludeAuthRoutes.indexOf(props.page) === -1
        ) {
          navigate('/login');
          return;
        }
      } else {
        Promise.all([
          generalRequest(
            routes.fetchUser,
            'get',
            undefined,
            'user',
            true,
            token,
          ),
        ]).then(res => {
          setUser(res[0]);
          setCacheItem('user', res[0]);
          if (
            (res[0] === null || res[0] === undefined) &&
            excludeAuthRoutes.indexOf(props.page) === -1
          ) {
            navigate('/login');
            return;
          }
        });
      }
      // setCacheItem('token', undefined);
      // setCacheItem('user', undefined);
      setAllowRenderPage(true);
    });
  }, [dispatch, props.page, navigate]);

  const excludeRightMenu = ['login', 'home'];
  const showLoginComponents =
    isInLargeMode && excludeRightMenu.indexOf(props.page) === -1;

  const toggleHideRightMenu = () => {
    setHideRightMenu(!hideRightMenu);
  };

  return (
    <MinFullHeightView>
      {device.indexOf(Device.WebPort) !== -1 && <TopNavBar />}
      {state.showTopNav && device.indexOf(Device.Large) !== -1 && (
        <Navbar user={user} />
      )}
      <View style={{flex: 1, height: '100%'}}>
        {allowRenderPage && (
          <MinFullHeightView>
            {props.page === 'home' && <Home navigate={navigate} />}
            {props.page === 'login' && isInLargeMode && (
              <WebLogin navigate={navigate} />
            )}
            {props.page === 'login' && !isInLargeMode && (
              <Login navigate={navigate} />
            )}

            {showLoginComponents && (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  backgroundColor: vars.DARK_WHITE,
                }}>
                <Logo toggleHideRightMenu={toggleHideRightMenu} />
                <Header
                  pic={'https://statics.okft.org/usersPic/1649843007648.jpg'}
                  name={'محمد قانع'}
                />
                {!hideRightMenu && <Menu selected="profile" />}
                <View
                  style={{
                    width: 'calc(100% - 200px)',
                    minHeight: 'calc(100vh - 60px)',
                  }}>
                  {props.page === 'profile' && (
                    <WebProfile token={token} user={user} navigate={navigate} />
                  )}
                </View>
              </View>
            )}
          </MinFullHeightView>
        )}
      </View>

      {state.showBottonNav && device.indexOf(Device.WebPort) !== -1 && (
        <BottomNavBar />
      )}

      <ReactNotifications />
    </MinFullHeightView>
  );
};

export default WebStructue;
