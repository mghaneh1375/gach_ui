import React, {useState} from 'react';

import Navbar from '../components/web/Navbar';

import {ScreenScroll, MinFullHeightView} from '../styles/Common';
import {View} from 'react-native';
import {Loader} from '../styles/Common/Loader';

const WebStructue = props => {
  //   const currentRouteName = location.pathname;
  //   const screensWithOutTopNav = ['/login'];
  //   const showTopNavLocal = screensWithOutTopNav.indexOf(currentRouteName) === -1;
  const showTopNavLocal = true;
  const [loading, setLoading] = useState(false);

  return (
    <View style={{flex: 1, height: '100%'}}>
      {showTopNavLocal && <Navbar />}

      {loading && <Loader loading={loading} />}
      <MinFullHeightView>{props.com(setLoading)}</MinFullHeightView>
      {/* <BottomNavBar show={showBottonNavLocal} /> */}
    </View>
  );
};

export default WebStructue;
