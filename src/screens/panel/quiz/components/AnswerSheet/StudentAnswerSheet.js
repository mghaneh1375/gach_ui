import ToggleSwitch from 'toggle-switch-react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  MyViewWithRef,
  PhoneView,
} from '../../../../../styles/Common';
import AnswerSheet from './AnswerSheet';
import React, {useState, useRef, useCallback} from 'react';

import {updateStudentAnswers} from '../Utility';
import {faLock, faUnlock} from '@fortawesome/free-solid-svg-icons';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {jsPDF} from 'jspdf';
import {toPng} from 'html-to-image';
import {styles} from '../../../../../styles/Common/Styles';
import commonTranslator from '../../../../../translator/Common';
import {getDevice, showError} from '../../../../../services/Utility';

function StudentAnswerSheet({
  token,
  setLoading,
  state,
  dispatch,
  selectedAnswerSheetIdx,
  onBackClick,
}) {
  const [stdChangingMode, setStdChangingMode] = useState();

  React.useEffect(() => {
    dispatch({
      showAnswers: !stdChangingMode,
    });
  }, [stdChangingMode, dispatch]);

  const ref = useRef();

  const print = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    setLoading(true);

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
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        showError(commonTranslator.err);
        setLoading(false);
      });
  }, [ref, setLoading]);

  console.log(state.selectedQuiz);

  return (
    <MyView>
      <CommonWebBox
        backBtn={true}
        onBackClick={() => onBackClick()}
        header={
          state.selectedQuiz.answer_sheets !== undefined &&
          selectedAnswerSheetIdx !== undefined &&
          state.selectedQuiz.answer_sheets.length > selectedAnswerSheetIdx
            ? state.selectedQuiz.answer_sheets[selectedAnswerSheetIdx].student
                .name
            : ''
        }>
        <EqualTwoTextInputs>
          <MyView>
            {state.allowChangeStdAns && (
              <PhoneView>
                <ToggleSwitch
                  isOn={stdChangingMode}
                  onColor="green"
                  offColor="red"
                  label="تغییر پاسخ دانش آموز"
                  labelStyle={styles.blackColor}
                  size="medium"
                  onToggle={isOn => {
                    setStdChangingMode(isOn);
                  }}
                />
                <SimpleFontIcon
                  parentStyle={styles.margin20}
                  kind={'normal'}
                  icon={stdChangingMode ? faUnlock : faLock}
                />
              </PhoneView>
            )}
            {getDevice().indexOf('WebPort') === -1 && (
              <CommonButton
                style={styles.alignSelfStart}
                title={commonTranslator.print}
                onPress={() => print()}
              />
            )}
          </MyView>
        </EqualTwoTextInputs>
        {stdChangingMode && (
          <CommonButton
            title={'ثبت تغییرات پاسخ برگ دانش آموز'}
            theme={'dark'}
            onPress={async () => {
              let res = await updateStudentAnswers(
                state.selectedQuiz.id,
                state.selectedQuiz.answer_sheets[selectedAnswerSheetIdx].student
                  .id,
                state.selectedQuiz.generalMode,
                {answers: state.new_std_answer_sheet},
                token,
              );
              if (res !== null) {
                state.selectedQuiz.answer_sheets[
                  selectedAnswerSheetIdx
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
      <MyViewWithRef style={styles.margin15} ref={ref}>
        <AnswerSheet
          answer_sheet={state.wanted_answer_sheet}
          setLoading={setLoading}
          token={token}
          state={state}
          dispatch={dispatch}
        />
      </MyViewWithRef>
    </MyView>
  );
}

export default StudentAnswerSheet;
