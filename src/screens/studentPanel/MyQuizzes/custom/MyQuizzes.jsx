import React, {useState} from 'react';
import {dispatchStateContext} from '@/App.jsx';
import {QuizProvider} from '../../../panel/quiz/components/Context.jsx';
import Karname from '../../../panel/quiz/components/reports/karname/Karname.jsx';
import Recp from '../../../../components/web/Recp.jsx';
import List from './components/List.jsx';
function MyQuizzes(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [mode, setMode] = useState('list');
  const [dispatch] = useGlobalState();
  const [recp, setRecp] = useState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
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
          token={props.token}
          navigate={props.navigate}
        />
      )}

      {mode === 'result' && (
        <Karname
          setLoading={setLoading}
          setMode={setMode}
          onBackClick={() => setMode('list')}
          token={props.token}
          generalQuizMode={'custom'}
          user={props.user}
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
