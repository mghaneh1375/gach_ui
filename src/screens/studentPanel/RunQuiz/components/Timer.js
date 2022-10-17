import React, {useState} from 'react';
import CountDown from 'react-native-countdown-component';
import {
  convertSecToMin,
  convertSecToMinWithOutSec,
} from '../../../../services/Utility';
import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import Translate from '../Translate';
import ProgressBar from '../../../../styles/Common/ProgressBar';
import {useEffectOnce} from 'usehooks-ts';
import {dispatchDoQuizContext, doQuizContext} from './Context';

let timerVar;

function Timer() {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const startAt = Date.now();

  const [progress, setProgress] = useState(
    ((state.quizInfo.duration - state.reminder) * 100) /
      state.quizInfo.duration,
  );

  const timer = React.useCallback(() => {
    console.log('salam ' + state.refresh);

    timerVar = setTimeout(() => {
      setProgress(
        ((state.quizInfo.duration - state.reminder) * 100) /
          state.quizInfo.duration,
      );

      if ((Date.now() - startAt) / 60000 < state.refresh) {
        dispatch({reminder: state.reminder - 60});
        timer();
      } else {
        dispatch({needStore: true});
        clearTimeout(timerVar);
      }
    }, [60000]);
  }, [
    dispatch,
    state.quizInfo.duration,
    state.refresh,
    state.reminder,
    startAt,
  ]);

  useEffectOnce(() => {
    timer();
  });

  return (
    <MyView>
      <PhoneView style={{gap: 1, marginBottom: 20}}>
        <SimpleText
          style={{
            width: 'calc(50% - 1px)',
            height: 22,
            ...styles.textCenter,
            ...styles.fontSize11,
            ...styles.colorWhite,
            backgroundColor: vars.DARK_BLUE,
            paddingTop: 2,
            marginLeft: 1,
          }}
          text={Translate.totalTime}
        />
        <SimpleText
          style={{
            width: 'calc(50% - 1px)',
            height: 22,
            ...styles.colorOrangeRed,
            ...styles.colorWhite,
            ...styles.textCenter,
            backgroundColor: vars.ORANGE_RED,
          }}
          text={convertSecToMin(state.quizInfo.duration)}
        />
      </PhoneView>
      <ProgressBar percent={progress} />

      {state.reminder !== undefined && state.reminder < 300 && (
        <CountDown
          until={state.reminder}
          onFinish={() => {
            dispatch({exit: true});
          }}
          timeToShow={['H', 'M', 'S']}
          style={{direction: 'ltr', marginTop: 20}}
          digitStyle={{
            backgroundColor: 'blue',
            height: 0,
            width: 20,
            color: vars.RED,
          }}
          digitTxtStyle={{
            ...styles.colorOrangeRed,
            width: 20,
            fontFamily: 'IRANSans',
            ...styles.fontSize15,
          }}
          timeLabelStyle={{
            color: 'red',
            fontWeight: 'bold',
          }}
          separatorStyle={{
            ...styles.colorOrangeRed,
            ...styles.fontSize15,
            ...styles.margin5,
          }}
          showSeparator
          timeLabels={{h: '', s: '', m: ''}}
          size={20}
        />
      )}

      {state.reminder !== undefined && state.reminder > 300 && (
        <SimpleText
          text={convertSecToMinWithOutSec(state.reminder) + Translate.reminder}
        />
      )}
    </MyView>
  );
}

export default Timer;
