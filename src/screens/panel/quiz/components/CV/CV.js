import React, {useState} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {getAnswerSheets} from '../Utility';
import Card from './Card';

function CV(props) {
  const [isWorking, setIsWorking] = useState(false);

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
    <View style={{zIndex: 'unset'}}>
      <CommonWebBox backBtn={true} onBackClick={() => props.setMode('list')}>
        <PhoneView style={{flexWrap: 'wrap'}}>
          {props.quiz.answer_sheets !== undefined &&
            props.quiz.answer_sheets.map((elem, index) => {
              return (
                <Card
                  token={props.token}
                  setLoading={props.setLoading}
                  user={elem.student}
                  quizId={props.quiz.id}
                  quizMode={props.quiz.generalMode}
                  answerSheet={elem.answerSheet}
                  answerSheetAfterCorrection={elem.answerSheetAfterCorrection}
                />
              );
            })}
        </PhoneView>
      </CommonWebBox>
    </View>
  );
}

export default CV;
