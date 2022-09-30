import React from 'react';
import {CommonButton, PhoneView} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {
  quizContext,
  dispatchQuizContext,
} from '../../../../panel/quiz/components/Context';
import {getRanking} from '../../../../panel/quiz/components/Utility';
import Translate from '../../Translate';
import {getMyAnswerSheet, getRecpForQuiz} from './Utility';
import translator from '../../../../panel/quiz/Translator';
import commonTranslator from '../../../../../translator/Common';

function Ops(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  const prepareShowAnswerSheet = async () => {
    if (state.selectedQuiz.answer_sheet !== undefined) {
      dispatch({
        showAnswers: true,
        showStdAnswers: true,
        allowChangeStdAns: false,
        allowChangeAns: false,
        wanted_answer_sheet: state.selectedQuiz.answer_sheet,
      });

      props.toggleShowPopUp();
      props.setMode('answerSheet');
      return;
    }

    props.setLoading(true);
    let res = await getMyAnswerSheet(
      state.selectedQuiz.id,
      state.selectedQuiz.generalMode,
      props.token,
    );

    props.setLoading(false);

    if (res === null) return;

    state.selectedQuiz.answer_sheet = res;

    dispatch({
      showAnswers: true,
      showStdAnswers: true,
      allowChangeStdAns: false,
      allowChangeAns: false,
      wanted_answer_sheet: res,
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
    });

    props.toggleShowPopUp();
    props.setMode('answerSheet');
  };

  const getRecp = async () => {
    if (state.selectedQuiz.recp !== undefined) {
      props.setRecp(state.selectedQuiz.recp);
      props.toggleShowPopUp();
      props.setMode('recp');
      return;
    }

    props.setLoading(true);
    let res = await getRecpForQuiz(
      state.selectedQuiz.id,
      state.selectedQuiz.generalMode,
      props.token,
    );

    props.setLoading(false);

    if (res === null) return;

    state.selectedQuiz.recp = res;

    dispatch({
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
    });

    props.toggleShowPopUp();
    props.setRecp(res);
  };

  const prepareReview = () => {
    props.navigate(
      '/reviewQuiz/' +
        state.selectedQuiz.generalMode +
        '/' +
        state.selectedQuiz.id,
    );
  };

  const prepareShowResult = async () => {
    dispatch({selectedStudentId: props.user.user.id});
    props.toggleShowPopUp();
    props.setMode('result');
  };

  return (
    <LargePopUp toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView style={{gap: 10}}>
        <CommonButton
          onPress={() => prepareShowResult()}
          title={Translate.result}
          theme={'transparent'}
        />
        <CommonButton
          onPress={() => prepareShowAnswerSheet()}
          title={Translate.answerSheet}
          theme={'transparent'}
        />
        <CommonButton
          onPress={() => getRecp()}
          title={Translate.recp}
          theme={'transparent'}
        />
        <CommonButton
          onPress={() => prepareReview()}
          title={Translate.review}
          theme={'transparent'}
        />
      </PhoneView>
    </LargePopUp>
  );
}

export default Ops;
