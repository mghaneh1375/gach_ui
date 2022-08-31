import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import {basketBox} from '../../../panel/package/card/Style';
import Translate from '../Translate';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import {doQuiz, reviewQuiz} from './Utility';
import commonTranslator from '../../../../translator/Common';

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
      {state.quizInfo !== undefined && (
        <CommonWebBox
          style={{
            ...basketBox,
            ...{
              width: vars.BASKET_WIDTH_WITH_OPEN_MENU,
              padding: 0,
              height: 'unset',
            },
          }}>
          <EqualTwoTextInputs>
            <CommonButton
              onPress={props.onBack}
              title={commonTranslator.back}
              theme={'orangeRed'}
            />

            <CommonButton
              title={
                props.isInReviewMode
                  ? Translate.review
                  : state.quizInfo.isNewPerson
                  ? Translate.start
                  : Translate.continue
              }
              onPress={() => props.setMode('doQuiz')}
            />
          </EqualTwoTextInputs>
        </CommonWebBox>
      )}
    </MyView>
  );
}

export default Splash;
