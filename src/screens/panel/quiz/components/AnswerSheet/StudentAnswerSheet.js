import {View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
} from '../../../../../styles/Common';
import AnswerSheet from './AnswerSheet';
import React, {useState, useRef, useCallback} from 'react';
import {dispatchQuizContext, quizContext} from '../Context';
import {updateStudentAnswers} from '../Utility';
import {faLock, faUnlock} from '@fortawesome/free-solid-svg-icons';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {jsPDF} from 'jspdf';
import {toPng} from 'html-to-image';

function StudentAnswerSheet(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [stdChangingMode, setStdChangingMode] = useState();

  React.useEffect(() => {
    dispatch({
      showAnswers: !stdChangingMode,
      allowChangeStdAns: stdChangingMode,
    });
  }, [stdChangingMode, dispatch]);

  const ref = useRef();

  const print = useCallback(() => {
    if (ref.current === null) return;

    props.setLoading(true);

    toPng(ref.current, {cacheBust: true})
      .then(async dataUrl => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        await pdf.save('download.pdf');
        props.setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [ref, props]);

  return (
    <MyView>
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.onBackClick()}
        header={
          state.selectedQuiz.answer_sheets[props.selectedAnswerSheetIdx].student
            .name
        }>
        <EqualTwoTextInputs>
          <MyView>
            <ToggleSwitch
              isOn={stdChangingMode}
              onColor="green"
              offColor="red"
              label="تغییر پاسخ دانش آموز"
              labelStyle={{
                color: 'black',
                fontFamily: 'IRANSans',
              }}
              size="medium"
              onToggle={isOn => {
                setStdChangingMode(isOn);
              }}
            />
            <CommonButton
              style={{alignSelf: 'flex-start'}}
              title={'پرینت'}
              onPress={() => print()}
            />
          </MyView>
          <SimpleFontIcon
            parentStyle={{marginLeft: 20, marginTop: 20}}
            kind={'normal'}
            icon={stdChangingMode ? faUnlock : faLock}
          />
        </EqualTwoTextInputs>
        {stdChangingMode && (
          <CommonButton
            title={'ثبت تغییرات پاسخ برگ دانش آموز'}
            theme={'dark'}
            onPress={async () => {
              let res = await updateStudentAnswers(
                state.selectedQuiz.id,
                state.selectedQuiz.answer_sheets[props.selectedAnswerSheetIdx]
                  .student.id,
                state.selectedQuiz.generalMode,
                {answers: state.new_std_answer_sheet},
                props.token,
              );
              if (res !== null) {
                state.selectedQuiz.answer_sheets[
                  props.selectedAnswerSheetIdx
                ].answers = state.new_std_answer_sheet;

                let data = state.selectedQuiz.answer_sheet.map(
                  (elem, index) => {
                    elem.studentAns = state.new_std_answer_sheet[index];
                    return elem;
                  },
                );
                dispatch({
                  selectedQuiz: state.selectedQuiz,
                  needUpdate: true,
                  wanted_answer_sheet: data,
                });
              }
            }}
          />
        )}
      </CommonWebBox>
      <MyView ref={ref}>
        <AnswerSheet
          answer_sheet={state.wanted_answer_sheet}
          setLoading={props.setLoading}
          token={props.token}
        />
      </MyView>
    </MyView>
  );
}

export default StudentAnswerSheet;
