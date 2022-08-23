import React, {useState} from 'react';
import {set} from 'react-native-reanimated';
import Quizzes from '../../../../components/web/Quizzes';
import {MyView, PhoneView} from '../../../../styles/Common';
import Card from '../../../panel/quiz/components/Card/Card';
import {
  quizContext,
  dispatchQuizContext,
} from '../../../panel/quiz/components/Context';
import {fetchMyQuizze} from './Utility';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [quizzes, setQuizzes] = useState();

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

  return (
    <PhoneView style={{gap: 15, padding: 15}}>
      {quizzes !== undefined &&
        quizzes.map((quiz, index) => {
          return <Card onClick={() => {}} quiz={quiz} key={index} />;
        })}
    </PhoneView>
  );
}

export default List;
