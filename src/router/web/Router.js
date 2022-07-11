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
          <Route path="/cert" element={<WebStructue page="cert" />} />
          <Route path="/quiz" element={<WebStructue page="quiz" />} />
          <Route path="/question" element={<WebStructue page="question" />} />
          <Route path="/offs" element={<WebStructue page="offs" />} />
          <Route path="/ticket" element={<WebStructue page="ticket" />} />
          <Route path="/users" element={<WebStructue page="users" />} />
          <Route path="/avatars" element={<WebStructue page="avatars" />} />
          <Route path="*" element={<WebStructue page="404" />} />
        </Routes>
      </Router>
    </View>
  );
}
