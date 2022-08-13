import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import {getAnswerSheets} from '../Utility';
import Card from './Card';
import {dispatchQuizContext, quizContext} from '../Context';
import translator from '../../Translator';

import StudentAnswerSheet from '../AnswerSheet/StudentAnswerSheet';

function CV(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [selectedAnswerSheetIdx, setSelectedAnswerSheetIdx] = useState();

  React.useEffect(() => {
    if (selectedAnswerSheetIdx === undefined) return;

    dispatch({
      showAnswers: true,
      showStdAnswers: true,
      allowChangeStdAns: false,
      allowChangeAns: false,
    });

    setShowAnswerSheet(true);
  }, [selectedAnswerSheetIdx, dispatch]);

  React.useEffect(() => {
    if (!showAnswerSheet) {
      // setStdChangingMode(false);
      setSelectedAnswerSheetIdx(undefined);
      dispatch({
        wanted_answer_sheet: undefined,
        new_std_answer_sheet: undefined,
        showAnswers: undefined,
        showStdAnswers: undefined,
        allowChangeStdAns: undefined,
        allowChangeAns: undefined,
      });
    }
  }, [showAnswerSheet, dispatch]);

  React.useEffect(() => {
    if (isWorking || state.selectedQuiz.answer_sheets !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      getAnswerSheets(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] !== null) {
        state.selectedQuiz.answer_sheet = res[0].answers;
        state.selectedQuiz.answer_sheets = res[0].students;
        dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      } else props.setMode('list');

      setIsWorking(false);
    });
  }, [props, isWorking, dispatch, state.selectedQuiz]);

  return (
    <MyView style={{zIndex: 'unset'}}>
      {showAnswerSheet && (
        <StudentAnswerSheet
          selectedAnswerSheetIdx={selectedAnswerSheetIdx}
          onBackClick={setShowAnswerSheet(false)}
        />
      )}
      {!showAnswerSheet && (
        <CommonWebBox
          header={translator.correntAnswerSheets}
          backBtn={true}
          onBackClick={() => props.setMode('list')}>
          <PhoneView style={{flexWrap: 'wrap'}}>
            {state.selectedQuiz.answer_sheets !== undefined &&
              state.selectedQuiz.answer_sheets.map((elem, index) => {
                return (
                  <Card
                    setSelectedAnswerSheetIdx={setSelectedAnswerSheetIdx}
                    key={index}
                    token={props.token}
                    setLoading={props.setLoading}
                    index={index}
                  />
                );
              })}
          </PhoneView>
        </CommonWebBox>
      )}
    </MyView>
  );
}

export default CV;
