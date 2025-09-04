import React, {useState} from 'react';
import {MyView} from '@/styles';
import {useParams} from 'react-router';
import List from './components/List.jsx';
import {
  QuizProvider,
  dispatchQuizContext,
  quizContext,
} from './components/Context.jsx';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import CreateEscapeQuiz from './components/CreateEscapeQuiz.jsx';
import Key from './components/key/Key.jsx';
import Students from './components/students/Students.jsx';
import Questions from './components/questions/Questions.jsx';
import CreateGift from './components/gift/Create.jsx';
import ListGift from './components/gift/List.jsx';
import Ranking from './components/reports/ranking/Ranking.jsx';
import {
  isUserAdmin,
  isUserContentAccess,
  isUserEditorAccess,
} from '../../../services/utility';
function EscapeQuiz(props) {
  const [mode, setMode] = useState('karname');
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  const params = useParams();
  React.useEffect(() => {
    if (props.mode !== undefined) {
      setMode(props.mode);
    } else setMode('list');
  }, [props.mode]);
  return (
    <MyView>
      <QuizProvider>
        {mode === 'list' && (
          <List
            setMode={setMode}
            navigate={navigate}
            setLoading={setLoading}
            token={state.token}
            generalMode={'escape'}
            isAdmin={isUserAdmin(state.user)}
            isContent={isUserContentAccess(state.user)}
            isEditor={isUserEditorAccess(state.user)}
          />
        )}
        {mode === 'create' && (
          <CreateEscapeQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={false}
            quizGeneralMode={'escape'}
          />
        )}

        {mode === 'gifts' && (
          <ListGift
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}

        {mode === 'createGift' && (
          <CreateGift
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}

        {mode === 'update' && (
          <CreateEscapeQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={true}
            quizGeneralMode={'escape'}
          />
        )}

        {mode === 'key' && (
          <Key
            stateContext={quizContext}
            dispatchStateContext={dispatchQuizContext}
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}

        {mode === 'student' && (
          <Students
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            isAdmin={isUserAdmin(state.user)}
          />
        )}
        {mode === 'question' && (
          <Questions
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}

        {mode === 'ranking' && (
          <Ranking
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            quizMode={params.mode}
            quizId={params.quizId}
            quizName={params.quizName}
            isAdmin={true}
          />
        )}
      </QuizProvider>
    </MyView>
  );
}
export default EscapeQuiz;
