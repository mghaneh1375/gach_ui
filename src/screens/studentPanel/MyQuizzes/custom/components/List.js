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
import {fetchMyQuizzes} from './Utility';
import commonTranslator from '../../../../../translator/Common';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [customQuizzes, setQuizzes] = useState();
  const [showOpPane, setShowOpPane] = useState(false);

  React.useEffect(() => {
    if (isWorking) return;

    if (state.customQuizzes !== undefined) {
      setQuizzes(state.customQuizzes);
      return;
    }

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchMyQuizzes(props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      dispatch({customQuizzes: res[0]});
      setQuizzes(res[0]);
      setIsWorking(false);
    });
  }, [props, dispatch, state.customQuizzes, isWorking]);

  const openOpBox = quiz => {
    dispatch({selectedQuiz: quiz});
    setShowOpPane(true);
  };

  return (
    <MyView>
      {showOpPane && (
        <Ops
          setRecp={props.setRecp}
          setLoading={props.setLoading}
          token={props.token}
          setMode={props.setMode}
          user={props.user}
          navigate={props.navigate}
          toggleShowPopUp={() => setShowOpPane(false)}
        />
      )}
      {customQuizzes !== undefined && customQuizzes.length > 0 && (
        <PhoneView style={{gap: 15, padding: 15}}>
          {customQuizzes.map((quiz, index) => {
            return (
              <Card
                quizOp={() =>
                  quiz.status !== 'inProgress' && quiz.status !== 'continue'
                    ? openOpBox(quiz)
                    : props.navigate('/startQuiz/custom/' + quiz.id)
                }
                isStudent={true}
                onClick={() => {}}
                quiz={quiz}
                key={index}
              />
            );
          })}
        </PhoneView>
      )}
      {customQuizzes !== undefined && customQuizzes.length === 0 && (
        <CommonWebBox
          header={''}
          addBtn={true}
          onAddClick={() => (window.location.href = '/makeQuiz')}>
          <SimpleText text={commonTranslator.noQuiz} />
        </CommonWebBox>
      )}
    </MyView>
  );
}

export default List;
