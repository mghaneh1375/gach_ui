import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import {getAnswerSheets} from '../Utility';
import Card from './Card';
import {
  AnswerSheetProvider,
  answerSheetContext,
  dispatchAnswerSheetContext,
} from './../AnswerSheet/AnswerSheetProvider';
import AnswerSheet from '../AnswerSheet/AnswerSheet';

function CV(props) {
  const [isWorking, setIsWorking] = useState(false);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);

  React.useEffect(() => {
    if (!isWorking && props.quiz.answer_sheets === undefined) {
      setIsWorking(true);
      props.setLoading(true);
      Promise.all([
        getAnswerSheets(props.quiz.id, props.quiz.generalMode, props.token),
      ]).then(res => {
        props.setLoading(false);

        if (res[0] !== null) {
          props.quiz.answer_sheets = res[0];
          props.updateQuiz(props.quiz);
        }

        setIsWorking(false);
      });
    }
  }, [props, isWorking]);

  return (
    <AnswerSheetProvider>
      <View style={{zIndex: 'unset'}}>
        {showAnswerSheet && <AnswerSheet />}
        {!showAnswerSheet && (
          <CommonWebBox
            backBtn={true}
            onBackClick={() => props.setMode('list')}>
            <PhoneView style={{flexWrap: 'wrap'}}>
              {props.quiz.answer_sheets !== undefined &&
                props.quiz.answer_sheets.map((elem, index) => {
                  console.log(elem);
                  return (
                    <Card
                      setShowAnswerSheet={setShowAnswerSheet}
                      key={index}
                      token={props.token}
                      setLoading={props.setLoading}
                      quizId={props.quiz.id}
                      quizGeneralMode={props.quiz.generalMode}
                      quizMode={props.quiz.mode}
                      answerSheet={elem}
                    />
                  );
                })}
            </PhoneView>
          </CommonWebBox>
        )}
      </View>
    </AnswerSheetProvider>
  );
}

export default CV;
