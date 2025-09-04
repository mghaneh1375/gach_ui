import React, {useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import BottomNavBar from '../components/android/BottomNavBar.jsx';
import {TopNavBar} from '../components/android/TopNavBar.jsx';
import {
  ScreenScroll,
  MinFullHeightView,
  MyView,
} from '../styles/CommonComponents.jsx';
import {Loader} from '../styles/common/Loader.jsx';
import {globalStateContext} from '../App.jsx';
import {fetchUser, getToken, getUser} from '../api/user';
import Logo from '../components/web/largeScreen/header/Logo.jsx';
import Header from '../components/web/largeScreen/header/Header.jsx';
import Menu from '../components/web/largeScreen/header/Menu.jsx';

const AppStructue = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const navigate = navigation.navigate;
  const [currentPage, setCurrentPage] = useState(undefined);
  const [showBottonNavLocal, setShowBottonNavLocal] = useState(true);
  const [hideRightMenu, setHideRightMenu] = useState(true);
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  React.useEffect(() => {
    const screensWithOutBottomNav = ['Login', 'ForgetPass'];
    const excludeAuthRoutes = ['Login', 'Home'];
    const currentRouteName =
      navigation.getState().routeNames[navigation.getState().index];
    setCurrentPage(currentRouteName);
    setShowBottonNavLocal(
      screensWithOutBottomNav.indexOf(currentRouteName) === -1,
    );
    Promise.all([getToken(), getUser()]).then(res => {
      setToken(res[0]);
      const token = res[0];
      let waitForGetUser = false;
      if (res[0] !== null && res[0] !== undefined) {
        if (res[1] !== null && res[1] !== undefined) setUser(res[1]);
        else waitForGetUser = true;
      }
      if (!waitForGetUser) {
        if (
          (res[1] === null || res[1] === undefined) &&
          excludeAuthRoutes.indexOf(currentRouteName) === -1
        ) {
          navigation.navigate('Login');
          return;
        }
      } else {
        fetchUser(token, user => {
          setUser(user);
          if (
            (user === null || user === undefined) &&
            excludeAuthRoutes.indexOf(currentRouteName) === -1
          ) {
            navigation.navigate('Login');
            return;
          }
        });
      }
    });
  }, [isFocused, navigation]);
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();
  const toggleHideRightMenu = () => {
    setHideRightMenu(!hideRightMenu);
  };
  return (
    <MyView
      style={{
        flex: 1,
        height: '100%',
      }}>
      {user === undefined && <TopNavBar />}
      {user !== undefined && (
        <Logo isLogin={true} toggleHideRightMenu={toggleHideRightMenu} />
      )}
      {!hideRightMenu && currentPage !== undefined && user !== undefined && (
        <Menu
          toggleHideRightMenu={toggleHideRightMenu}
          navigate={navigate}
          accesses={user !== undefined ? user.accesses : null}
          selected={currentPage}
        />
      )}

      <ScreenScroll
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always">
        <MinFullHeightView>
          {state.loading && <Loader />}
          {props.com({
            navigate: navigate,
            user: user,
          })}
        </MinFullHeightView>
      </ScreenScroll>

      <BottomNavBar show={showBottonNavLocal} />

      {user !== undefined && (
        <Header
          pic={user.user.pic}
          name={user.user.firstName + ' ' + user.user.lastName}
          hideRightMenu={hideRightMenu}
        />
      )}
    </MyView>
  );
};
export default AppStructue;
