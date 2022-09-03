import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import React, {useState, useRef, useCallback} from 'react';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import AnswerSheet from '../AnswerSheet/AnswerSheet';
import {dispatchQuizContext, quizContext} from '../Context';
import {getAnswerSheet} from '../Utility';
import {jsPDF} from 'jspdf';
import {toPng} from 'html-to-image';
import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
} from '../../../../../styles/Common';

function Key(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);

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
      getAnswerSheet(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        props.token,
      ),
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
        });
      } else props.setMode('list');

      setIsWorking(false);
    });
  }, [props, isWorking, state.selectedQuiz, dispatch]);

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
      <EqualTwoTextInputs>
        <CommonButton title={'پرینت'} onPress={() => print()} />
        <FontIcon
          onPress={() => props.setMode('list')}
          theme="rect"
          kind="normal"
          icon={faArrowLeft}
          parentStyle={{alignSelf: 'flex-end', marginLeft: 20, marginTop: 20}}
        />
      </EqualTwoTextInputs>
      <MyView ref={ref}>
        {state.wanted_answer_sheet !== undefined && (
          <AnswerSheet
            answer_sheet={state.wanted_answer_sheet}
            setLoading={props.setLoading}
            token={props.token}
          />
        )}
      </MyView>
    </MyView>
  );
}

export default Key;
