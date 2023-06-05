import React, {useState} from 'react';
import List from './components/List';
import {dispatchStateContext, globalStateContext} from '../../../App';
import Students from './components/Students/Students';
import Questions from './components/Questions/Questions';
import {
  dispatchQuizContext,
  quizContext,
  QuizProvider,
} from './components/Context';
import Key from './components/Key/Key';
import Ranking from './components/Reports/Ranking/Ranking';
import {useParams} from 'react-router';
import {MyView} from '../../../styles/Common';
import CreateOnlineQuiz from './components/CreateOnlineQuiz';

const OnlineStanding = props => {
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
            generalMode={'onlineStanding'}
          />
        )}
        {mode === 'create' && (
          <CreateOnlineQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={false}
          />
        )}
        {mode === 'update' && (
          <CreateOnlineQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={true}
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
};

export default OnlineStanding;
