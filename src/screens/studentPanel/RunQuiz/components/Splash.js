import React from 'react';
import {CommonButton, MyView} from '../../../../styles/Common';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import {doQuiz, reviewQuiz} from './Utility';

function Splash(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  //   const [isWorking, setIsWorking] = useState(false);

  const fetchQuiz = React.useCallback(() => {
    console.log('sq');
    if (state.questions !== undefined) return;
    Promise.all([
      props.isInReviewMode
        ? reviewQuiz(props.quizId, props.quizGeneralMode, props.token)
        : doQuiz(props.quizId, props.quizGeneralMode, props.token),
    ]).then(res => {
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      dispatch({questions: res[0].questions, quizInfo: res[0].info});
    });
  }, [dispatch, props, state.questions]);

  React.useEffect(() => {
    console.log('Asd');
    fetchQuiz();
  }, [fetchQuiz]);

  return (
    <MyView>
      {state.questions !== undefined && (
        <CommonButton title="start" onPress={() => props.setMode('doQuiz')} />
      )}
    </MyView>
  );
}

export default Splash;
