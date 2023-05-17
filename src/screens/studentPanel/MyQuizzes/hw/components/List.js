import React, {useState} from 'react';
import {MyView, PhoneView, SimpleText} from '../../../../../styles/Common';

import {fetchMyHWs} from './Utility';
import ProgressCard from '../../../‌MyOffs/ProgressCard/ProgressCard';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';
import Card from './Card';

function List(props) {
  const [isWorking, setIsWorking] = useState(false);
  const [quizzes, setQuizzes] = useState();
  const [mode, setMode] = useState();

  React.useEffect(() => {
    setMode(props.status);
  }, [props.status]);

  React.useEffect(() => {
    if (isWorking || quizzes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchMyHWs(props.token, props.advisor)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      setQuizzes(res[0]);
      setIsWorking(false);
    });
  }, [props, quizzes, isWorking]);

  return (
    <MyView>
      <MyView>
        <PhoneView style={{...styles.alignSelfCenter, ...styles.marginTop20}}>
          <ProgressCard
            header={'تمرینهای گذشته'}
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
            header={'تمرینهای پیش رو'}
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
            header={'همه تمرینها'}
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

        {quizzes !== undefined && quizzes.length === 0 && (
          <SimpleText
            style={{
              ...styles.textCenter,
              ...styles.margin30,
              ...styles.BlueBold,
            }}
            text="تمرینی موجود نیست"
          />
        )}

        {quizzes !== undefined && quizzes.length > 0 && (
          <PhoneView style={{gap: 15, padding: 15}}>
            {quizzes !== undefined &&
              mode !== undefined &&
              quizzes.map((quiz, index) => {
                if (
                  mode === 'all' ||
                  (mode === 'passed' && quiz.status === 'finished') ||
                  (mode === 'future' && quiz.status !== 'finished')
                ) {
                  if (quiz.status === 'notStart')
                    return <Card quiz={quiz} key={index} />;

                  return (
                    <Card
                      quizOp={() => props.navigate('/startHW/' + quiz.id)}
                      quiz={quiz}
                      key={index}
                    />
                  );
                }
              })}
          </PhoneView>
        )}
      </MyView>
    </MyView>
  );
}

export default List;
