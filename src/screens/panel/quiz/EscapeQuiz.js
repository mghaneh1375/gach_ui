import React, {useState} from 'react';
import {MyView} from '../../../styles/Common';
import {useParams} from 'react-router';
import List from './components/List';
import {QuizProvider} from './components/Context';
import {dispatchStateContext, globalStateContext} from '../../../App';

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
      </QuizProvider>
    </MyView>
  );
}

export default EscapeQuiz;
