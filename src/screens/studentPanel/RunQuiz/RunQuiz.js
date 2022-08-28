import React, {useState} from 'react';
import {useParams} from 'react-router';
import {MyView} from '../../../styles/Common';
import Splash from './components/Splash';
import {dispatchStateContext} from '../../../App';
import {DoQuizProvider} from './components/Context';
import Quiz from './components/Quiz';

function RunQuiz(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const params = useParams();
  const [mode, setMode] = useState();

  const getParams = React.useCallback(() => {
    if (
      params.quizMode === undefined ||
      params.quizId === undefined ||
      props.token === undefined ||
      props.token === null ||
      props.token === ''
    ) {
      props.navigate('/');
      return;
    }
    setMode('splash');
  }, [props, params]);

  React.useEffect(() => {
    getParams();
  }, [params, getParams]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <DoQuizProvider>
      {mode !== undefined && mode === 'splash' && (
        <Splash
          isInReviewMode={props.isInReviewMode}
          token={props.token}
          quizId={params.quizId}
          quizGeneralMode={params.quizId}
          navigate={props.navigate}
          setLoading={setLoading}
          setMode={setMode}
        />
      )}
      {mode !== undefined && mode === 'doQuiz' && (
        <Quiz
          isInReviewMode={props.isInReviewMode}
          token={props.token}
          quizId={params.quizId}
          quizGeneralMode={params.quizId}
          navigate={props.navigate}
          setLoading={setLoading}
          setMode={setMode}
        />
      )}
    </DoQuizProvider>
  );
}

export default RunQuiz;
