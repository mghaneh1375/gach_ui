import React, {useState} from 'react';

import {
  MinFullHeightView,
  LargeContentConianerStyle,
  PhoneContentConianerStyle,
} from '../styles/Common';
import {View} from 'react-native';
import {useNavigate, useParams} from 'react-router-dom';
import Home from './general/home/Home';
import Login from './general/login/Login';
import WebLogin from './general/login/web/Login';
import WebProfile from './general/profile/web/Profile';
import Profile from './general/profile/Profile';
import {getDevice} from '../services/Utility';
import {Device} from '../models/Device';

import 'react-notifications-component/dist/theme.css';
import {ReactNotifications} from 'react-notifications-component';

import {globalStateContext, dispatchStateContext} from '../App';
import Logo from '../components/web/LargeScreen/Header/Logo';
import Header from '../components/web/LargeScreen/Header/Header';
import Menu from '../components/web/LargeScreen/Header/Menu';
import {fetchUser, getToken, getUser} from '../API/User';
import Navbar from '../components/web/Navbar';
import BottomNavBar from '../components/web/BottomNavBar';
import Quiz from './panel/quiz/Quiz';
import Question from './panel/question/Question';
import vars from '../styles/root';
import Off from './panel/offcode/Off';
import Users from './panel/users/Users';
import Avatar from './panel/Config/Avatars/Avatar';
import PageNotFound from './general/404/PageNotFound';
import General from './panel/Config/Configuration/General';
import Ravan from './panel/Config/Configuration/Ravan';
import Schools from './panel/Config/Schools/Schools';
import Grade from './panel/Basic/grade/Grade';
import {generalRequest} from '../API/Utility';
import {routes} from '../API/APIRoutes';
import Lesson from './panel/Basic/lesson/Lesson';
import Package from './panel/package/Package';
import Subject from './panel/Basic/subject/Subject';
import Certificate from './panel/certificate/Certificate';
import Ticket from './panel/ticket/Ticket';
import Dashboard from './studentPanel/dashboard/Dashboard';
import Gift from './general/Gift/Gift';
import Buy from './studentPanel/Buy/Buy';

const WebStructue = props => {
  const navigate = useNavigate();

  const device = getDevice();
  const isInLargeMode = device.indexOf(Device.Large) !== -1;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [hideRightMenu, setHideRightMenu] = useState(true);
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [allowRenderPage, setAllowRenderPage] = useState(false);
  const [newAlerts, setNewAlerts] = useState();

  React.useEffect(() => {
    const excludeRightMenu = ['login', 'home'];
    const excludeTopNav = ['login', 'profile'];
    const excludeBottomNav = ['login'];
    const excludeAuthRoutes = ['login', 'home'];

    dispatch({
      showTopNav: excludeTopNav.indexOf(props.page) === -1,
      showBottonNav: excludeBottomNav.indexOf(props.page) === -1,
    });

    const d = getDevice();
    setHideRightMenu(
      d.indexOf(Device.Large) === -1 ||
        excludeRightMenu.indexOf(props.page) !== -1,
    );

    Promise.all([getToken(), getUser()]).then(async res => {
      setToken(res[0]);
      let token = res[0];
      let waitForGetUser = false;

      if (token !== null && token !== undefined) {
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

      let userTmp = res[1];

      // setCacheItem('token', undefined);
      // setCacheItem('user', undefined);
      setAllowRenderPage(true);

      if (
        newAlerts === undefined &&
        token !== null &&
        token !== undefined &&
        userTmp !== null &&
        userTmp !== undefined &&
        (userTmp.accesses.indexOf('admin') !== -1 ||
          userTmp.accesses.indexOf('superadmin') !== -1)
      ) {
        let res = await generalRequest(
          routes.fetchNewAlerts,
          'get',
          undefined,
          'data',
          token,
        );
        if (res !== null) setNewAlerts(res);
        else setNewAlerts([]);
      }
    });
  }, [dispatch, props.page, navigate, newAlerts]);

  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };

  const toggleHideRightMenu = () => {
    setHideRightMenu(user === undefined ? true : !hideRightMenu);
  };

  const params = useParams();

  return (
    <View style={{flex: 1, height: '100%', backgroundColor: vars.DARK_WHITE}}>
      {allowRenderPage && (
        <MinFullHeightView>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Logo
              isLogin={user !== undefined}
              toggleHideRightMenu={toggleHideRightMenu}
            />

            {user === undefined && device.indexOf(Device.Large) !== -1 && (
              <Navbar user={user} />
            )}

            {user !== undefined && (
              <Header
                pic={user.user.pic}
                name={user.user.firstName + ' ' + user.user.lastName}
                token={token}
                hideRightMenu={hideRightMenu}
                setLoading={setLoading}
                navigate={navigate}
                setUser={setUser}
                newAlerts={newAlerts}
              />
            )}
            {!hideRightMenu && (
              <Menu
                toggleHideRightMenu={toggleHideRightMenu}
                navigate={navigate}
                selected={props.page}
                accesses={user !== undefined ? user.accesses : null}
              />
            )}
            <View
              style={
                isInLargeMode && !hideRightMenu
                  ? LargeContentConianerStyle
                  : PhoneContentConianerStyle
              }>
              {props.page === 'home' && <Home navigate={navigate} />}
              {/* {props.page === 'home' && <Gift navigate={navigate} />} */}
              {props.page === 'profile' && isInLargeMode && (
                <WebProfile
                  setUser={setUser}
                  token={token}
                  user={user}
                  navigate={navigate}
                />
              )}
              {props.page === 'dashboard' && (
                <Dashboard
                  setUser={setUser}
                  token={token}
                  user={user}
                  navigate={navigate}
                />
              )}
              {props.page === 'profile' && !isInLargeMode && (
                <Profile
                  setUser={setUser}
                  token={token}
                  user={user}
                  navigate={navigate}
                />
              )}
              {props.page === 'cert' && (
                <Certificate token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'quiz' &&
                params !== undefined &&
                params.mode !== undefined &&
                params.mode === 'list' && (
                  <Quiz token={token} user={user} navigate={navigate} />
                )}
              {props.page === 'quiz' &&
                params !== undefined &&
                params.mode !== undefined &&
                params.mode === 'package' && (
                  <Package token={token} user={user} navigate={navigate} />
                )}
              {props.page === 'question' && (
                <Question token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'offs' && (
                <Off token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'ticket' && (
                <Ticket token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'basic' &&
                params !== undefined &&
                params.mode !== undefined &&
                params.mode === 'grades' && (
                  <Grade token={token} user={user} navigate={navigate} />
                )}
              {props.page === 'basic' &&
                params !== undefined &&
                params.mode !== undefined &&
                params.mode === 'lessons' && (
                  <Lesson token={token} user={user} navigate={navigate} />
                )}
              {props.page === 'basic' &&
                params !== undefined &&
                params.mode !== undefined &&
                params.mode === 'subjects' && (
                  <Subject token={token} user={user} navigate={navigate} />
                )}
              {props.page === 'avatars' && (
                <Avatar token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'generalConfiguration' && (
                <General token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'ravanConfiguration' && (
                <Ravan token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'schools' && (
                <Schools token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'finantialReport' && (
                <Schools token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'users' && (
                <Users token={token} user={user} navigate={navigate} />
              )}
              {props.page === 'buy' && (
                <Buy token={token} user={user} navigate={navigate} />
              )}
              {props.page === '404' && <PageNotFound navigate={navigate} />}
            </View>
          </View>

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
