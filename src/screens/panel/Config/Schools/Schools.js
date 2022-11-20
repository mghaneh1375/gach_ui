import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import List from './components/List/List';
import Create from './components/Create';
import {isUserAdmin} from '../../../../services/Utility';
import {MyView} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import {SchoolProvider} from './components/Context';

function Schools() {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [mode, setMode] = useState('list');
  const isAdmin = isUserAdmin(state.user);

  return (
    <MyView
      style={
        isAdmin
          ? {}
          : state.isInPhone
          ? {width: '100%', alignSelf: 'center', marginTop: 20}
          : {width: vars.LEFT_SECTION_WIDTH, alignSelf: 'center', marginTop: 20}
      }>
      {!isAdmin && (
        <div
          style={{
            position: 'fixed',
            zIndex: -1,
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'url(./assets/images/back3.png)',
          }}></div>
      )}
      <SchoolProvider>
        {mode === 'list' && (
          <List
            showBottomNav={state.isInPhone && state.showBottonNav}
            isAdmin={isAdmin}
            setMode={isAdmin ? setMode : {}}
            setLoading={setLoading}
            token={state.token}
          />
        )}
        {mode === 'create' && isAdmin && (
          <Create
            setMode={setMode}
            setLoading={setLoading}
            token={state.token}
            isInEditMode={false}
          />
        )}
        {mode === 'update' && isAdmin && (
          <Create
            setMode={setMode}
            setLoading={setLoading}
            token={state.token}
            isInEditMode={true}
          />
        )}
      </SchoolProvider>
    </MyView>
  );
}

export default Schools;
