import React, {useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import BottomNavBar from '../components/Android/BottomNavBar';
import {View} from 'react-native';
import {TopNavBar} from '../components/Android/TopNavBar';

import {ScreenScroll, MinFullHeightView} from '../styles/Common';

const AppStructue = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [showBottonNavLocal, setShowBottonNavLocal] = useState(true);

  React.useEffect(() => {
    const screensWithOutBottomNav = ['Login', 'ForgetPass'];

    const currentRouteName =
      navigation.getState().routeNames[navigation.getState().index];
    setShowBottonNavLocal(
      screensWithOutBottomNav.indexOf(currentRouteName) === -1,
    );
  }, [isFocused, navigation]);

  return (
    <View style={{flex: 1, height: '100%'}}>
      <TopNavBar />
      <ScreenScroll
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always">
        <MinFullHeightView>{props.com(navigation)}</MinFullHeightView>
      </ScreenScroll>
      <BottomNavBar show={showBottonNavLocal} />
    </View>
  );
};

export default AppStructue;
