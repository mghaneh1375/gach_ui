import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import Key from '../../panel/quiz/components/Key/Key';
import {
  dispatchMyQuizzesContext,
  myQuizzesContext,
  MyQuizzesProvider,
} from './components/Context';
import Create from './components/Create';
import List from './components/List';
import Questions from './components/Questions/Questions';
import Students from './components/Students/Students';

function MyQuizzes(props) {
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
          />
        )}
        {mode === 'create' && (
          <Create
            setMode={setMode}
            token={state.token}
            navigator={navigate}
            setLoading={setLoading}
          />
        )}
        {mode === 'student' && (
          <Students
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}
        {mode === 'question' && (
          <Questions
            setLoading={setLoading}
            setMode={setMode}
            user={state.user}
            navigate={navigate}
            token={state.token}
          />
        )}
        {mode === 'key' && (
          <Key
            stateContext={myQuizzesContext}
            dispatchStateContext={dispatchMyQuizzesContext}
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}
      </MyQuizzesProvider>
    </>
  );
}

export default MyQuizzes;
