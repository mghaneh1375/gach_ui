import React, {useState} from 'react';
import {MyView} from '../../../styles/Common';
import {useParams} from 'react-router';
import List from './components/List';
import {
  QuizProvider,
  dispatchQuizContext,
  quizContext,
} from './components/Context';
import {dispatchStateContext, globalStateContext} from '../../../App';
import CreateEscapeQuiz from './components/CreateEscapeQuiz';
import Key from './components/Key/Key';
import Students from './components/Students/Students';
import Questions from './components/Questions/Questions';
import CreateGift from './components/Gift/Create';
import ListGift from './components/Gift/List';
import ReportList from './components/Reports/List/List';
import Ranking from './components/Reports/Ranking/Ranking';

function EscapeQuiz(props) {
  const [mode, setMode] = useState('karname');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
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
