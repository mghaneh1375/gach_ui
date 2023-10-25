import React, {useState, useRef, useCallback} from 'react';
import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import {jsPDF} from 'jspdf';
import {toPng} from 'html-to-image';
import {dispatchQuizContext, quizContext} from '../Context';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {getPDFQuestions, getPDFQuizAnswerSheet, savePDF} from '../Utility';
import AnswerSheet from '../AnswerSheet/AnswerSheet';
import {showError, showSuccess} from '../../../../../services/Utility';

function PDFQuizKey(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const ref = useRef();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking) return;
    if (state.selectedQuiz.qNo !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([getPDFQuestions(props.token, state.selectedQuiz.id)]).then(
      res => {
        props.setLoading(false);

        if (res[0] !== null) {
          state.selectedQuiz.qNo = res[0].qNo;

          dispatch({
            selectedQuiz: state.selectedQuiz,
            needUpdate: true,
          });
        } else props.setMode('list');

        setIsWorking(false);
      },
    );
  }, [props, isWorking, state.selectedQuiz, dispatch]);

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

  React.useEffect(() => {
    if (isWorking) return;

    if (state.selectedQuiz.answer_sheet !== undefined) {
      dispatch({
        wanted_answer_sheet: state.selectedQuiz.answer_sheet,
      });
      return;
    }

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      getPDFQuizAnswerSheet(state.selectedQuiz.id, props.token),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] !== null) {
        state.selectedQuiz.answer_sheet = res[0];
        dispatch({
          selectedQuiz: state.selectedQuiz,
          wanted_answer_sheet: res[0],
          new_answer_sheet: res[0],
          needUpdate: true,
          showAnswers: true,
          showStdAnswers: false,
          allowChangeAns: true,
        });
      } else {
        showError('باید ابتدا تعداد سوالات آزمون را مشخص نمایید');
        props.setMode('list');
      }

      setIsWorking(false);
    });
  }, [props, isWorking, state.selectedQuiz, dispatch]);

  return (
    <MyView>
      <EqualTwoTextInputs>
        <PhoneView>
          <CommonButton
            title={'ذخیره'}
            onPress={() => {
              let isValid = true;

              state.wanted_answer_sheet.forEach(element => {
                if (element.answer === 0) {
                  isValid = false;
                  return;
                }
              });
              if (!isValid) {
                showError('لطفا تمامی پاسخ ها را مشخص نمایید');
                return;
              }
              let res = savePDF(
                props.token,
                state.selectedQuiz.id,
                state.wanted_answer_sheet.map(e => {
                  return e.answer;
                }),
              );
              if (res != null) {
                showSuccess();
                props.setMode('list');
              }
            }}
            theme={'dark'}
          />
          <CommonButton title={'پرینت'} onPress={() => print()} />
        </PhoneView>
        <FontIcon
          onPress={() => props.setMode('list')}
          theme="rect"
          kind="normal"
          icon={faArrowLeft}
          parentStyle={{
            alignSelf: 'flex-end',
            marginLeft: 20,
            marginTop: 20,
          }}
        />
      </EqualTwoTextInputs>
      <MyView ref={ref}>
        {state.wanted_answer_sheet !== undefined && (
          <AnswerSheet
            answer_sheet={state.wanted_answer_sheet}
            setLoading={props.setLoading}
            token={props.token}
            state={state}
            dispatch={dispatch}
          />
        )}
      </MyView>
    </MyView>
  );
}

export default PDFQuizKey;
