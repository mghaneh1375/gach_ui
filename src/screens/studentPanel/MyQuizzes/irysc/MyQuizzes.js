import List from './components/List';
import {dispatchStateContext} from '../../../../App';
import React, {useState} from 'react';
import {QuizProvider} from '../../../panel/quiz/components/Context';
import Ranking from '../../../panel/quiz/components/Reports/Ranking/Ranking';
import Recp from '../../../../components/web/Recp';
import Karname from '../../../panel/quiz/components/Reports/Karname/Karname';
import ParticipantReport from '../../../panel/quiz/components/Reports/Participant/ParticipantReport';
import ReportList from '../../../panel/quiz/components/Reports/List/List';
import {useParams} from 'react-router';
import AnswerSheet from './components/AnswerSheet';
import Team from './components/Team';

function MyQuizzes(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');
  const [recp, setRecp] = useState();
  const [wantedQuizId, setWantedQuizId] = useState();
  const params = useParams();
  const status = params.mode !== undefined ? params.mode : 'all';

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
          status={status}
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
        <AnswerSheet
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

      {mode === 'team' && (
        <Team setLoading={setLoading} setMode={setMode} token={props.token} />
      )}

      {mode === 'report' && (
        <ReportList
          setLoading={setLoading}
          onBackClick={() => setMode('list')}
          quizId={wantedQuizId}
          token={props.token}
          accesses={props.user.accesses}
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
      {mode === 'karname' && (
        <Karname
          setLoading={setLoading}
          setMode={setMode}
          onBackClick={() => setMode('ranking')}
          token={props.token}
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
