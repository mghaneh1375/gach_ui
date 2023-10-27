import React, {useState} from 'react';
import {dispatchQuizContext, quizContext} from '../Context';
import {getPDFQuestions} from '../Utility';
import {CommonWebBox} from '../../../../../styles/Common';
import translator from '../../Translator';
import UploadQuestions from './UploadQuestions';
import UploadSubjects from './UploadSubjects';

function PDFQuestion(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

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
          state.selectedQuiz.file = res[0].file;

          dispatch({
            selectedQuiz: state.selectedQuiz,
            needUpdate: true,
          });
        } else props.setMode('list');

        setIsWorking(false);
      },
    );
  }, [props, isWorking, state.selectedQuiz, dispatch]);

  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={translator.questions}>
      <UploadQuestions setLoading={props.setLoading} token={props.token} />
      <UploadSubjects setLoading={props.setLoading} token={props.token} />
    </CommonWebBox>
  );
}

export default PDFQuestion;
