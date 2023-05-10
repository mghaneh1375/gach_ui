import {dispatchStateContext, globalStateContext} from '../../../../App';
import React, {useState} from 'react';
import {QuizProvider} from '../../../panel/quiz/components/Context';
import List from './components/List';
import {useParams} from 'react-router';
import Karname from '../../../panel/quiz/components/Reports/Karname/Karname';
import StudentAnswerSheet from '../../../panel/quiz/components/AnswerSheet/StudentAnswerSheet';
import AnswerSheet from '../irysc/components/AnswerSheet';

function MyQuizzes(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');

  const setLoading = status => {
    dispatch({loading: status});
  };

  const params = useParams();
  const status = params.mode !== undefined ? params.mode : 'all';

  return (
    <QuizProvider>
      {mode === 'list' && (
        <List
          status={status}
          setMode={setMode}
          user={state.user}
          advisor={props.advisor === undefined ? false : props.advisor}
          setLoading={setLoading}
          token={state.token}
          money={state.user.user.money}
          navigate={props.navigate}
        />
      )}
      {mode === 'result' && (
        <Karname
          setLoading={setLoading}
          setMode={setMode}
          onBackClick={() => setMode('list')}
          token={state.token}
          user={state.user}
        />
      )}
      {mode === 'answerSheet' && (
        <AnswerSheet
          selectedAnswerSheetIdx={0}
          setLoading={setLoading}
          onBackClick={() => setMode('list')}
          token={state.token}
        />
      )}
    </QuizProvider>
  );
}

export default MyQuizzes;
