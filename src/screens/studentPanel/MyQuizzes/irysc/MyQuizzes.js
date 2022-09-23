import List from './components/List';
import {dispatchStateContext} from '../../../../App';
import React, {useState} from 'react';
import {QuizProvider} from '../../../panel/quiz/components/Context';
import StudentAnswerSheet from '../../../panel/quiz/components/AnswerSheet/StudentAnswerSheet';
import Ranking from '../../../panel/quiz/components/Reports/Ranking/Ranking';
import Recp from '../../../../components/web/Recp';
import Karname from '../../../panel/quiz/components/Reports/Karname/Karname';
import ParticipantReport from '../../../panel/quiz/components/Reports/Participant/ParticipantReport';

function MyQuizzes(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');
  const [recp, setRecp] = useState();
  const [wantedQuizId, setWantedQuizId] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    if (recp === undefined) return;
    setMode('recp');
  }, [recp]);

  return (
    <QuizProvider>
      {mode === 'list' && (
        <List
          setRecp={setRecp}
          setMode={setMode}
          user={props.user}
          setLoading={setLoading}
          setWantedQuizId={setWantedQuizId}
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
      {mode === 'students' && (
        <ParticipantReport
          setLoading={setLoading}
          onBackClick={() => setMode('list')}
          quizId={wantedQuizId}
          token={props.token}
        />
      )}
      {mode === 'result' && (
        <Karname
          setLoading={setLoading}
          setMode={setMode}
          onBackClick={() => setMode('list')}
          token={props.token}
          user={props.user}
        />
      )}
      {mode === 'ranking' && <Ranking setMode={setMode} />}
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
