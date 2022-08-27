import React, {useState} from 'react';
import {MyView, PhoneView} from '../../../../styles/Common';
import Card from '../../../panel/quiz/components/Card/Card';
import {
  quizContext,
  dispatchQuizContext,
} from '../../../panel/quiz/components/Context';
import Ops from './Ops';
import {fetchMyQuizze} from './Utility';

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
          setRecp={props.setRecp}
          setLoading={props.setLoading}
          token={props.token}
          setMode={props.setMode}
          user={props.user}
          toggleShowPopUp={() => setShowOpPane(false)}
        />
      )}
      <PhoneView style={{gap: 15, padding: 15}}>
        {quizzes !== undefined &&
          quizzes.map((quiz, index) => {
            return (
              <Card
                quizOp={() => openOpBox(quiz)}
                onClick={() => {}}
                quiz={quiz}
                key={index}
              />
            );
          })}
      </PhoneView>
    </MyView>
  );
}

export default List;
