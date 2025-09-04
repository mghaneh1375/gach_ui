import {MyView} from '@/styles';
import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {globalStateContext} from '../../App.jsx';
import WebStructue from '../../screens/WebStructure';
import {Loader} from '../../styles/common/Loader';

export default function WebRouter() {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();
  return (
    <MyView
      style={{
        flex: 1,
        height: '100%',
      }}>
      {state.loading && <Loader text={state.loadingText} />}

      <Router>
        <Routes>
          <Route
            path="admin/stats/general"
            element={<WebStructue page="generalStats" />}
          />

          <Route path="*" element={<WebStructue page="404" />} />
        </Routes>
      </Router>
    </MyView>
  );
}
