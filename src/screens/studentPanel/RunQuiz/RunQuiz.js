import React, {useState} from 'react';
import {useParams} from 'react-router';
import {MyView, PhoneView} from '../../../styles/Common';
import Splash from './components/Splash';
import {dispatchStateContext} from '../../../App';
import {DoQuizProvider} from './components/Context';
import Quiz from './components/Quiz';
import {triangleDown} from 'victory-core/lib/victory-util/point-path-helpers';
import Filter from './components/Filter';

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
    dispatch({
      isRightMenuVisible: false,
    });
  }, [dispatch]);

  React.useEffect(() => {
    getParams();
  }, [params, getParams]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <PhoneView>
      <DoQuizProvider>
        {mode !== undefined && (
          <Filter isInReviewMode={props.isInReviewMode} mode={mode} />
        )}
        <MyView style={{width: 'calc(100% - 200px)'}}>
          {mode !== undefined && mode === 'splash' && (
            <Splash
              isInReviewMode={props.isInReviewMode}
              token={props.token}
              quizId={params.quizId}
              quizGeneralMode={params.quizMode}
              navigate={props.navigate}
              setLoading={setLoading}
              setMode={setMode}
              // onBack={() => props.user  props.navigate('/myQuizzes')}
            />
          )}
          {mode !== undefined && mode === 'doQuiz' && (
            <Quiz
              isInReviewMode={props.isInReviewMode}
              token={props.token}
              quizId={params.quizId}
              quizGeneralMode={params.quizMode}
              navigate={props.navigate}
              setLoading={setLoading}
              setMode={setMode}
              onBack={() => props.navigate('/myQuizzes')}
            />
          )}
        </MyView>
      </DoQuizProvider>
    </PhoneView>
  );
}

export default RunQuiz;
