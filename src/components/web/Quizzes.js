import React, {useState} from 'react';
import {generalRequest} from '../../API/Utility';
import Card from '../../screens/panel/quiz/components/Card/Card';
import {CommonWebBox} from '../../styles/Common';

function Quizzes(props) {
  const [quizzes, setQuizzes] = useState(props.quizzes);
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking || quizzes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(props.fetchUrl, 'get', undefined, 'data', props.token),
    ]).then(res => {
      props.setLoading(false);
      setIsWorking(false);

      if (res[0] === null) {
        if (props.fail !== undefined) props.fail();
        return;
      }

      setQuizzes(res[0]);
      if (props.setQuizzes !== undefined) props.setQuizzes(res[0]);
    });
  }, [props, isWorking, quizzes]);

  return (
    <CommonWebBox>
      {quizzes !== undefined &&
        quizzes.map((quiz, index) => {
          return <Card quiz={quiz} key={index} />;
        })}
    </CommonWebBox>
  );
}

export default Quizzes;
