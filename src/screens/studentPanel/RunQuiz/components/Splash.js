import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import {
  basketBox,
  styleCircleBox,
  styleColorWhite,
  styleTitle,
  styleYellowBox,
} from '../../../panel/package/card/Style';
import Translate from '../Translate';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import {doQuiz, reviewQuiz} from './Utility';
import commonTranslator from '../../../../translator/Common';
import {styles} from '../../../../styles/Common/Styles';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {
  faBusinessTime,
  faHardHat,
  faMessage,
  faQuestion,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import QuizItemCard from '../../../../components/web/QuizItemCard';

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
        <MyView>
          <CommonWebBox>
            <EqualTwoTextInputs>
              <PhoneView>
                <MyView
                  style={{
                    ...styleYellowBox,
                    width: '100%',
                    marginTop: 0,
                  }}>
                  <SimpleText
                    style={{
                      ...styleTitle,
                      ...styles.BlueBold,
                    }}
                    text={'مطابق Ui به اندازه متن title کش میاد'}
                  />
                </MyView>
              </PhoneView>
              <PhoneView style={{marginTop: -10}}>
                <FontIcon
                  // onPress={() => props.back}
                  kind={'normal'}
                  theme={'rect'}
                  back={'orange'}
                  parentStyle={{
                    gap: 15,
                    marginTop: 15,
                    marginLeft: 10,
                    marginRight: 15,
                  }}
                  icon={faTimes}
                />
              </PhoneView>
            </EqualTwoTextInputs>
            <PhoneView style={{...styles.gap50}}>
              <QuizItemCard
                icon={faBusinessTime}
                iconFontSize={'large'}
                color={vars.ORANGE}
                textFontSize={10}
                valFontSize={16}
                text={'مدت زمان '}
                val={'25 دقیقه'}
              />
              <QuizItemCard
                icon={faMessage}
                iconFontSize={'large'}
                background={false}
                color={vars.ORANGE}
                textFontSize={10}
                valFontSize={16}
                text={'تعداد سوال'}
                val={'70000'}
              />
              <QuizItemCard
                icon={faQuestion}
                iconFontSize={'normal'}
                color={vars.ORANGE}
                textFontSize={11}
                valFontSize={15}
                text={'نوع آزمون تستی'}
                val={'بسیار دشوار'}
              />
            </PhoneView>
          </CommonWebBox>

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
        </MyView>
      )}
    </MyView>
  );
}

export default Splash;
