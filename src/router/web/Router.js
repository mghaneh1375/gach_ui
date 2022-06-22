import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {View} from 'react-native';
import {Loader} from '../../styles/Common/Loader';
import {globalStateContext} from './../../App';
import WebStructue from '../../screens/WebStructure';

export default function WebRouter() {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  return (
    <View style={{flex: 1, height: '100%'}}>
      {state.loading && <Loader />}

      <Router>
        <Routes>
          <Route exact path="/" element={<WebStructue page="home" />} />
          <Route path="/login" element={<WebStructue page="login" />} />
          <Route path="/profile" element={<WebStructue page="profile" />} />
        </Routes>
      </Router>
    </View>
  );
}
