import React from 'react';
import Navbar from '../../components/web/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {View} from 'react-native';
import BottomNavBar from '../../components/web/BottomNavBar';
import {Device} from '../../models/Device';
import {getDevice} from '../../services/Utility';
import {MinFullHeightView} from '../../styles/Common';
import {Loader} from '../../styles/Common/Loader';
import {globalStateContext} from './../../App';
import TopNavBar from '../../components/web/TopNavBar';
import WebStructue from '../../screens/WebStructure';

export default function WebRouter() {
  const device = getDevice();

  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  return (
    <View style={{flex: 1, height: '100%'}}>
      {state.loading && <Loader />}

      <MinFullHeightView>
        <Router>
          {device.indexOf(Device.WebPort) !== -1 && <TopNavBar />}
          {state.showTopNav && device.indexOf(Device.Large) !== -1 && (
            <Navbar />
          )}

          <Routes>
            <Route exact path="/" element={<WebStructue page="home" />} />
            <Route path="/login" element={<WebStructue page="login" />} />
            <Route path="/profile" element={<WebStructue page="profile" />} />
          </Routes>
          {state.showBottonNav && device.indexOf(Device.WebPort) !== -1 && (
            <BottomNavBar />
          )}
        </Router>
      </MinFullHeightView>
    </View>
  );
}
