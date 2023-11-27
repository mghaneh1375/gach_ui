import React, {useState} from 'react';
import {getPDFQuestions} from '../Utility';
import UploadQuestions from './UploadQuestions';
import UploadSubjects from './UploadSubjects';

function PDFQuestion(props) {
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking) return;
    if (props.state.selectedQuiz.qNo !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      getPDFQuestions(props.token, props.state.selectedQuiz.id),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] !== null) {
        props.state.selectedQuiz.qNo = res[0].qNo;
        props.state.selectedQuiz.file = res[0].file;

        props.dispatch({
          selectedQuiz: props.state.selectedQuiz,
          needUpdate: true,
        });
      } else props.setMode('list');

      setIsWorking(false);
    });
  }, [props, isWorking, props.state.selectedQuiz, props.dispatch]);

  return (
    <>
      <UploadQuestions
        setMode={props.setMode}
        setLoading={props.setLoading}
        token={props.token}
        state={props.state}
        dispatch={props.dispatch}
      />
      {props.state.selectedQuiz.questionsCount > 0 && (
        <UploadSubjects
          state={props.state}
          dispatch={props.dispatch}
          setLoading={props.setLoading}
          token={props.token}
        />
      )}
    </>
  );
}

export default PDFQuestion;
