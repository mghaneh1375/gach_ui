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

function Timer() {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [reminder, setReminder] = useState(parseInt(state.reminder));
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(
    ((state.duration - state.reminder) * 100) / state.duration,
  );

  const timer = () => {
    setTimeout(() => {
      setProgress(((state.duration - state.reminder) * 100) / state.duration);
      timer(state.reminder - 60);
      setReminder(state.reminder - 60);

      if (counter + 1 < state.refresh) {
        setCounter(counter + 1);
        dispatch({reminder: state.reminder - 60});
      } else {
        setCounter(0);
        dispatch({needStore: true});
      }
    }, [60000]);
  };

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
          text={convertSecToMin(state.duration)}
        />
      </PhoneView>
      <ProgressBar percent={progress} />

      {reminder !== undefined && reminder < 300 && (
        <CountDown
          until={reminder}
          onFinish={() => {}}
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

      {reminder !== undefined && reminder > 300 && (
        <SimpleText text={convertSecToMinWithOutSec(reminder)} />
      )}
    </MyView>
  );
}

export default Timer;
