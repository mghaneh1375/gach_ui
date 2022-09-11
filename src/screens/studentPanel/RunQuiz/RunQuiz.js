import React, {useState} from 'react';
import {useParams} from 'react-router';
import {MyView, PhoneView} from '../../../styles/Common';
import Splash from './components/Splash';
import {dispatchStateContext} from '../../../App';
import {DoQuizProvider} from './components/Context';
import Quiz from './components/Quiz';
import Filter from './components/Filter';
import vars from '../../../styles/root';
import {useEffectOnce} from 'usehooks-ts';

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
  }, [params, props]);

  React.useEffect(() => {
    dispatch({
      isRightMenuVisible: false,
    });
  }, [dispatch]);

  useEffectOnce(() => {
    getParams();
  });

  const setLoading = status => {
    dispatch({loading: status});
  };

  const setLoadingWithText = status => {
    dispatch({
      loading: status,
      loadingText: 'در حال ذخیره کردن پاسخ ها. لطفا شکیبا باشید.',
    });
  };

  return (
    <PhoneView>
      <DoQuizProvider>
        {mode !== undefined && (
          <Filter
            isInReviewMode={props.isInReviewMode}
            mode={mode}
            token={props.token}
          />
        )}
        <MyView style={{width: vars.LEFT_SECTION_WIDTH}}>
          {mode !== undefined && mode === 'splash' && (
            <Splash
              setLoadingWithText={setLoadingWithText}
              isInReviewMode={props.isInReviewMode}
              token={props.token}
              quizId={params.quizId}
              quizGeneralMode={params.quizMode}
              navigate={props.navigate}
              setLoading={setLoading}
              setMode={setMode}
              onBack={() =>
                props.user.accesses.indexOf('student') !== -1
                  ? props.navigate('/myQuizzes')
                  : props.navigate('/quiz/list')
              }
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
              onBack={() =>
                props.user.accesses.indexOf('student') !== -1
                  ? props.navigate('/myQuizzes')
                  : props.navigate('/quiz/list')
              }
            />
          )}
        </MyView>
      </DoQuizProvider>
    </PhoneView>
  );
}

export default RunQuiz;
