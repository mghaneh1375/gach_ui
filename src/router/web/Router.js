import React, {useState} from 'react';
import Navbar from '../../components/web/Navbar';
import Login from '../../screens/general/login/Login';
import WebLogin from '../../screens/general/login/web/Login';
import Home from '../../screens/general/home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {View} from 'react-native';
import BottomNavBar from '../../components/web/BottomNavBar';
import {Device} from '../../models/Device';
import {getDevice} from '../../services/Utility';
import {MinFullHeightView} from '../../styles/Common';
import {Loader} from '../../styles/Common/Loader';
import {globalStateContext} from './../../App';
export default function WebRouter() {
  const device = getDevice();
  // const [showTopNavLocal, setShowTopNavLocal] = useState(true);
  // const [loading, setLoading] = useState(false);
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  return (
    <View style={{flex: 1, height: '100%'}}>
      {state.loading && <Loader />}

      <MinFullHeightView>
        <Router>
          {state.showTopNav && <Navbar />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<WebLogin />} />
          </Routes>
          {device.indexOf(Device.WebPort) !== -1 ? <BottomNavBar /> : ''}
        </Router>
      </MinFullHeightView>
    </View>
  );
}
