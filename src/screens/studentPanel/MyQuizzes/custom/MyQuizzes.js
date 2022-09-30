import React, {useState} from 'react';
import {dispatchStateContext} from '../../../../App';
import {QuizProvider} from '../../../panel/quiz/components/Context';
import Karname from '../../../panel/quiz/components/Reports/Karname/Karname';
import Recp from '../../../../components/web/Recp';
import List from './components/List';
import StudentAnswerSheet from '../../../panel/quiz/components/AnswerSheet/StudentAnswerSheet';

function MyQuizzes(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [mode, setMode] = useState('list');
  const [dispatch] = useGlobalState();
  const [recp, setRecp] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <QuizProvider>
      {mode === 'list' && (
        <List
          setRecp={setRecp}
          setMode={setMode}
          user={props.user}
          setLoading={setLoading}
          token={props.token}
          navigate={props.navigate}
        />
      )}
      {mode === 'answerSheet' && (
        <StudentAnswerSheet
          selectedAnswerSheetIdx={0}
          setLoading={setLoading}
          onBackClick={() => setMode('list')}
          token={props.token}
        />
      )}
      {mode === 'karname' && (
        <Karname
          setLoading={setLoading}
          setMode={setMode}
          onBackClick={() => setMode('ranking')}
          token={props.token}
        />
      )}
      {mode === 'recp' && (
        <Recp
          setLoading={setLoading}
          onBackClick={() => setMode('list')}
          user={props.user.user}
          recp={recp}
        />
      )}
    </QuizProvider>
  );
}

export default MyQuizzes;
