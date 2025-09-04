import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {isUserAdvisor} from '../../../services/utility';
import {MyQuizzesProvider} from '../myQuizzes/components/Context.jsx';
import Copy from './components/Copy.jsx';
import Create from './components/Create.jsx';
import List from './components/List.jsx';
import Recp from './components/Recp.jsx';
import Students from './components/students/Students.jsx';
function MyHWs(props) {
  const navigate = props.navigate;
  const [mode, setMode] = useState('list');
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const setLoading = status => {
    dispatch({
      loading: status,
    });
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
      </MyQuizzesProvider>
    </>
  );
}
export default MyHWs;
