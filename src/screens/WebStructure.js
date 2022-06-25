import React, {useState} from 'react';

import {
  MinFullHeightView,
  LargeContentConianerStyle,
  PhoneContentConianerStyle,
} from '../styles/Common';
import {View} from 'react-native';
import {useNavigate} from 'react-router-dom';
import Home from './general/home/Home';
import Login from './general/login/Login';
import WebLogin from './general/login/web/Login';
import WebProfile from './general/profile/web/Profile';
import Profile from './general/profile/Profile';
import {getDevice} from '../services/Utility';
import {Device} from '../models/Device';

// import 'react-notifications-component/dist/theme.css';
import {ReactNotifications} from 'react-notifications-component';

import {globalStateContext, dispatchStateContext} from '../App';
import Logo from '../components/web/LargeScreen/Header/Logo';
import Header from '../components/web/LargeScreen/Header/Header';
import Menu from '../components/web/LargeScreen/Header/Menu';
import {fetchUser, getToken, getUser} from '../API/User';
import Navbar from '../components/web/Navbar';
import BottomNavBar from '../components/web/BottomNavBar';
import Certificate from './certificate/Certificate';

const WebStructue = props => {
  const device = getDevice();
  const navigate = useNavigate();
  const isInLargeMode = device.indexOf(Device.Large) !== -1;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const excludeRightMenu = ['login', 'home'];

  const [hideRightMenu, setHideRightMenu] = useState(
    device.indexOf(Device.Large) === -1 ||
      excludeRightMenu.indexOf(props.page) !== -1,
  );
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
        fetchUser(token, user => {
          setUser(user);
          if (
            (user === null || user === undefined) &&
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

  const toggleHideRightMenu = () => {
    setHideRightMenu(!hideRightMenu);
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
      {allowRenderPage && (
        <MinFullHeightView>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Logo toggleHideRightMenu={toggleHideRightMenu} />

            {user !== undefined && (
              <Header
                pic={'https://statics.okft.org/usersPic/1649843007648.jpg'}
                name={user.user.firstName + ' ' + user.user.lastName}
                hideRightMenu={hideRightMenu}
              />
            )}
            {!hideRightMenu && (
              <Menu
                toggleHideRightMenu={toggleHideRightMenu}
                navigate={navigate}
                selected={props.page}
              />
            )}
            <View
              style={
                isInLargeMode && !hideRightMenu
                  ? LargeContentConianerStyle
                  : PhoneContentConianerStyle
              }>
              {props.page === 'home' && <Home navigate={navigate} />}
              {props.page === 'profile' && isInLargeMode && (
                <WebProfile token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'profile' && !isInLargeMode && (
                <Profile token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'cert' && (
                <Certificate token={token} user={user} navigate={navigate} />
              )}
            </View>
          </View>

          {user === undefined && device.indexOf(Device.Large) !== -1 && (
            <Navbar user={user} />
          )}
          {props.page === 'login' && isInLargeMode && (
            <WebLogin navigate={navigate} />
          )}
          {props.page === 'login' && !isInLargeMode && (
            <Login navigate={navigate} />
          )}

          {device.indexOf(Device.WebPort) !== -1 && user === undefined && (
            <BottomNavBar />
          )}

          <ReactNotifications />
        </MinFullHeightView>
      )}
    </View>
  );
};

export default WebStructue;
