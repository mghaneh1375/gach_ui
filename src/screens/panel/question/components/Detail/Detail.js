import React, {useState} from 'react';
import {View} from 'react-native';
import {addQuestionsToQuiz, filter} from '../Utility';
import Question from './Question';
import Quizzes from './../../../../../components/web/Quizzes';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../tranlates/Common';

function Detail(props) {
  const [selectingQuiz, setselectingQuiz] = useState(false);
  const [questionId, setQuestionId] = useState();
  const [selectedQuizzes, setSelectedQuizzes] = useState();
  const [quizzes, setQuizzes] = useState();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking || !selectingQuiz || quizzes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.fetchIRYSCRegistrableQuizzes,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        setselectingQuiz(false);
        return;
      }

      setQuizzes(res[0]);
      setIsWorking(false);
    });
  }, [props, isWorking, quizzes, selectingQuiz]);

  React.useEffect(() => {
    if (isWorking || props.subject.questions !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      filter(
        props.token,
        undefined,
        undefined,
        props.subject.subject.id,
        undefined,
        undefined,
        true,
      ),
    ]).then(res => {
      props.setLoading(false);
      setIsWorking(false);

      if (res[0] === null) {
        props.setMode('list');
        return;
      }

      props.setSubject(res[0][0]);
    });
  }, [props, isWorking]);

  return (
    <View>
      {!selectingQuiz &&
        props.subject.questions !== undefined &&
        props.subject.questions.map((elem, index) => {
          return (
            <Question
              setselectingQuiz={setselectingQuiz}
              setQuestionId={setQuestionId}
              question={elem}
              key={index}
            />
          );
        })}
      {selectingQuiz && quizzes !== undefined && (
        <Quizzes
          onPress={async () => {
            props.setLoading(true);
            let res = await addQuestionsToQuiz(
              questionId,
              selectedQuizzes,
              props.token,
            );
            props.setLoading(false);
            if (res !== null) {
              showSuccess(commonTranslator.success);
              setselectingQuiz(false);
              setSelectedQuizzes([]);
            }
          }}
          setSelectedQuizzes={setSelectedQuizzes}
          quizzes={quizzes}
        />
      )}
    </View>
  );
}

export default Detail;
