import React, {useState} from 'react';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import Card from '../../../../panel/quiz/components/Card/Card';
import {
  quizContext,
  dispatchQuizContext,
} from '../../../../panel/quiz/components/Context';
import Ops from './Ops';
import {fetchMyQuizze} from './Utility';
import commonTranslator from '../../../../../translator/Common';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [quizzes, setQuizzes] = useState();
  const [showOpPane, setShowOpPane] = useState(false);

  React.useEffect(() => {
    if (isWorking) return;

    if (state.quizzes !== undefined) {
      setQuizzes(state.quizzes);
      return;
    }

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchMyQuizze(props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      dispatch({quizzes: res[0]});
      setQuizzes(res[0]);
      setIsWorking(false);
    });
  }, [props, dispatch, state.quizzes, isWorking]);

  const openOpBox = quiz => {
    dispatch({selectedQuiz: quiz});
    setShowOpPane(true);
  };

  return (
    <MyView>
      {showOpPane && (
        <Ops
          setWantedQuizId={props.setWantedQuizId}
          setRecp={props.setRecp}
          setLoading={props.setLoading}
          token={props.token}
          setMode={props.setMode}
          user={props.user}
          navigate={props.navigate}
          toggleShowPopUp={() => setShowOpPane(false)}
        />
      )}
      {quizzes !== undefined && quizzes.length > 0 && (
        <PhoneView style={{gap: 15, padding: 15}}>
          {quizzes.map((quiz, index) => {
            return (
              <Card
                quizOp={() =>
                  quiz.status !== 'inProgress' && quiz.status !== 'continue'
                    ? openOpBox(quiz)
                    : props.navigate(
                        '/startQuiz/' + quiz.generalMode + '/' + quiz.id,
                      )
                }
                isStudent={props.user.accesses.indexOf('student') !== -1}
                onClick={() => {}}
                quiz={quiz}
                key={index}
              />
            );
          })}
        </PhoneView>
      )}
      {quizzes !== undefined && quizzes.length === 0 && (
        <CommonWebBox
          header={''}
          addBtn={true}
          onAddClick={() => (window.location.href = '/buy')}>
          <SimpleText text={commonTranslator.noQuiz} />
        </CommonWebBox>
      )}
    </MyView>
  );
}

export default List;
