import React, {useState} from 'react';
import {MyView, PhoneView} from '../../../../../styles/Common';
import Card from '../../../../panel/quiz/components/Card/Card';
import {
  quizContext,
  dispatchQuizContext,
} from '../../../../panel/quiz/components/Context';
import Ops from './Ops';
import {fetchMyQuizzes} from './Utility';
import ProgressCard from '../../../‌MyOffs/ProgressCard/ProgressCard';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [quizzes, setQuizzes] = useState();
  const [showOpPane, setShowOpPane] = useState(false);
  const [mode, setMode] = useState();

  React.useEffect(() => {
    setMode(props.status);
  }, [props.status]);

  React.useEffect(() => {
    if (isWorking) return;

    if (state.quizzes !== undefined) {
      setQuizzes(state.quizzes);
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
          setLoading={props.setLoading}
          token={props.token}
          setMode={props.setMode}
          navigate={props.navigate}
          user={props.user}
          toggleShowPopUp={() => setShowOpPane(false)}
        />
      )}
      {quizzes !== undefined && quizzes.length > 0 && (
        <MyView>
          <PhoneView style={{...styles.alignSelfCenter, ...styles.marginTop20}}>
            <ProgressCard
              header={'آزمونهای گذشته'}
              theme={vars.ORANGE}
              color={mode === 'generalRanking' ? vars.WHITE : vars.DARK_BLUE}
              width={250}
              percent={mode === 'passed' ? '90%' : '10%'}
              onPress={() => {
                if (mode === 'passed') return;
                setMode('passed');
              }}
              style={{...styles.cursor_pointer}}
            />
            <ProgressCard
              header={'آزمونهای پیش رو'}
              theme={vars.ORANGE_RED}
              color={mode === 'quizRanking' ? vars.WHITE : vars.DARK_BLUE}
              width={250}
              percent={mode === 'future' ? '90%' : '10%'}
              onPress={() => {
                if (mode === 'future') return;
                setMode('future');
              }}
              style={{...styles.cursor_pointer}}
            />
            <ProgressCard
              header={'همه آزمونها'}
              theme={vars.DARK_BLUE}
              color={mode === 'all' ? vars.WHITE : vars.DARK_BLUE}
              width={250}
              percent={mode === 'all' ? '90%' : '10%'}
              onPress={() => {
                if (mode === 'all') return;
                setMode('all');
              }}
              style={{...styles.cursor_pointer}}
            />
          </PhoneView>
          <PhoneView style={{gap: 15, padding: 15}}>
            {quizzes !== undefined &&
              mode !== undefined &&
              quizzes.map((quiz, index) => {
                if (
                  mode === 'all' ||
                  (mode === 'passed' && quiz.status === 'finished') ||
                  (mode === 'future' && quiz.status !== 'finished')
                ) {
                  if (
                    quiz.status === 'finished' ||
                    quiz.status === 'inProgress'
                  ) {
                    return (
                      <Card
                        quizOp={() =>
                          quiz.status === 'finished'
                            ? openOpBox(quiz)
                            : props.navigate(
                                '/startQuiz/' +
                                  quiz.generalMode +
                                  '/' +
                                  quiz.id,
                              )
                        }
                        isStudent={true}
                        onClick={() => {}}
                        quiz={quiz}
                        afterQuiz={true}
                        key={index}
                      />
                    );
                  }

                  return (
                    <Card
                      quizOp={undefined}
                      isStudent={true}
                      onClick={() => {}}
                      quiz={quiz}
                      afterQuiz={true}
                      key={index}
                    />
                  );
                }
              })}
          </PhoneView>
        </MyView>
      )}
    </MyView>
  );
}

export default List;
