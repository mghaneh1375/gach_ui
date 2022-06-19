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
import {globalStateContext, dispatchStateContext} from '../App';
import Logo from '../components/web/LargeScreen/Header/Logo';
import Header from '../components/web/LargeScreen/Header/Header';
import Menu from '../components/web/LargeScreen/Header/Menu';
import vars from '../styles/root';

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

  React.useEffect(() => {
    const excludeTopNav = ['login', 'profile'];
    const excludeBottomNav = ['login'];
    dispatch({
      showTopNav: excludeTopNav.indexOf(props.page) === -1,
      showBottonNav: excludeBottomNav.indexOf(props.page) === -1,
    });
  }, [dispatch, props.page]);

  const excludeRightMenu = ['login', 'home'];
  const showLoginComponents =
    isInLargeMode && excludeRightMenu.indexOf(props.page) === -1;

  const toggleHideRightMenu = () => {
    setHideRightMenu(!hideRightMenu);
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
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
            <View style={{minHeight: 'calc(100vh - 60px)', marginTop: 60}}>
              {props.page === 'profile' && <WebProfile navigate={navigate} />}
            </View>
          </View>
        )}
      </MinFullHeightView>
    </View>
  );
};

export default WebStructue;
