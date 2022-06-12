import React from 'react';
import Navbar from '../../components/web/Navbar';
import Login from '../../screens/general/login/Login';
import Home from '../../screens/general/home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {View} from 'react-native';
import BottomNavBar from '../../components/web/BottomNavBar';
import {Device} from '../../models/Device';
import {getDevice} from '../../services/Utility';

export default function WebRouter() {
  const device = getDevice();

  return (
    <View>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {device.indexOf(Device.PhonePort) !== -1 ? <BottomNavBar /> : ''}
      </Router>
    </View>
  );
}
