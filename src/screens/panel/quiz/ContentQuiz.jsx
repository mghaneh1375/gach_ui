import React, {useState} from 'react';
import List from './components/List.jsx';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import Students from './components/students/Students.jsx';
import Questions from './components/questions/Questions.jsx';
import {
  dispatchQuizContext,
  quizContext,
  QuizProvider,
} from './components/Context.jsx';
import Key from './components/key/Key.jsx';
import Ranking from './components/reports/ranking/Ranking.jsx';
import Karname from './components/reports/karname/Karname.jsx';
import ReportList from './components/reports/list/List.jsx';
import {useParams} from 'react-router';
import {MyView} from '@/styles';
import CreateContentQuiz from './components/CreateContentQuiz.jsx';
import {
  isUserAdmin,
  isUserContentAccess,
  isUserEditorAccess,
} from '@/services/utility.js';
const ContentQuiz = props => {
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
            generalMode={'contentQuiz'}
            isAdmin={isUserAdmin(state.user)}
            isContent={isUserContentAccess(state.user)}
            isEditor={isUserEditorAccess(state.user)}
          />
        )}
        {mode === 'create' && (
          <CreateContentQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={false}
            quizGeneralMode={'content'}
          />
        )}
        {mode === 'update' && (
          <CreateContentQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={true}
            quizGeneralMode={'content'}
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
          />
        )}
        {mode === 'karname' && (
          <Karname
            setLoading={setLoading}
            user={props.user}
            setMode={setMode}
            token={state.token}
            quizMode={params.mode}
            quizId={params.quizId}
            studentId={params.studentId}
          />
        )}
        {mode === 'report' && (
          <ReportList
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}
      </QuizProvider>
    </MyView>
  );
};
export default ContentQuiz;
