import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {isUserAdvisor} from '../../../services/Utility';
import {MyQuizzesProvider} from './components/Context';
import Copy from './components/Copy';
import Create from './components/Create';
import List from './components/List';
import Recp from './components/Recp';
import Report from './components/Report';
import Students from './components/Students/Students';

function MyHWs(props) {
  const navigate = props.navigate;
  const [mode, setMode] = useState('list');

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [state, dispatch] = useGlobalState();

  return (
    <>
      <MyQuizzesProvider>
        {mode === 'list' && (
          <List
            setMode={setMode}
            token={state.token}
            user={state.user}
            navigator={navigate}
            setLoading={setLoading}
          />
        )}
        {mode === 'update' && (
          <Create
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={true}
            navigator={navigate}
            isAdvisor={isUserAdvisor(state.user)}
          />
        )}
        {mode === 'create' && (
          <Create
            setMode={setMode}
            token={state.token}
            navigator={navigate}
            setLoading={setLoading}
            isAdvisor={isUserAdvisor(state.user)}
          />
        )}
        {mode === 'student' && (
          <Students
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}

        {mode === 'copy' && (
          <Copy setLoading={setLoading} setMode={setMode} token={state.token} />
        )}
        {mode === 'recp' && (
          <Recp setLoading={setLoading} setMode={setMode} token={state.token} />
        )}

        {mode === 'report' && (
          <Report
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}
      </MyQuizzesProvider>
    </>
  );
}

export default MyHWs;
