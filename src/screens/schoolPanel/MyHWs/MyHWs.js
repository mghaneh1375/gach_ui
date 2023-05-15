import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {isUserAdvisor} from '../../../services/Utility';
import Students from '../MyQuizzes/components/Students/Students';
import {MyQuizzesProvider} from '../MyQuizzes/components/Context';
import Copy from './components/Copy';
import Create from './components/Create';
import List from './components/List';
import Recp from './components/Recp';
import Report from './components/Report';

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
            generalQuizMode={'hw'}
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
