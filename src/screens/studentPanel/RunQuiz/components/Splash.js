import React, {useState} from 'react';
import {CommonButton, MyView} from '../../../../styles/Common';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import {doQuiz, reviewQuiz} from './Utility';

function Splash(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking || state.questions !== undefined) return;
    setIsWorking(true);
    props.setLoading(true);
    console.log('As ' + props.quizGeneralMode);
    Promise.all([
      props.isInReviewMode
        ? reviewQuiz(props.quizId, props.quizGeneralMode, props.token)
        : doQuiz(props.quizId, props.quizGeneralMode, props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res === null) {
        props.navigate('/');
        return;
      }
      dispatch({questions: res[0].questions, quizInfo: res[0].quizInfo});
      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, state.questions]);

  return (
    <MyView>
      {state.questions !== undefined && (
        <CommonButton title="start" onPress={() => props.setMode('doQuiz')} />
      )}
    </MyView>
  );
}

export default Splash;
