import React, {useRef, useState} from 'react';
import CountDown from 'react-native-countdown-component';
import {
  convertSecToMin,
  convertSecToMinWithOutSec,
  showWarnign,
} from '../../../../services/Utility';
import {
  MyView,
  PhoneView,
  SimpleText,
  SimpleTextWithRef,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import Translate from '../Translate';
import ProgressBar from '../../../../styles/Common/ProgressBar';
import {useEffectOnce} from 'usehooks-ts';

let timerVar;
let localReminder_ = undefined;

function Timer(props) {
  const timerRef = useRef();
  const startAt = Date.now();

  const [progress, setProgress] = useState(
    ((props.duration - props.reminder) * 100) / props.duration,
  );

  React.useEffect(() => {
    console.log('props reminder is ' + props.reminder);
    if (props.reminder !== undefined && localReminder_ === undefined) {
      localReminder_ = props.reminder;
    }
  }, [props.reminder]);

  const timer = React.useCallback(() => {
    console.log('salam ' + props.refresh);
    const interval_id = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }

    setTimeout(() => {
      timerRef.current.innerText =
        convertSecToMinWithOutSec(localReminder_) + Translate.reminder;

      timerVar = setInterval(() => {
        setProgress(((props.duration - localReminder_) * 100) / props.duration);

        if (
          localReminder_ > 60 &&
          (Date.now() - startAt) / 60000 < props.refresh
        ) {
          localReminder_ -= 60;

          if (localReminder_ < 360 && localReminder_ > 300) {
            showWarnign('کمتر از ۵ دقیقه به پایان آزمون شما زمان باقیست.');
          } else if (localReminder_ < 180 && localReminder_ > 120) {
            showWarnign('کمتر از ۲ دقیقه به پایان آزمون شما زمان باقیست.');
          }

          timerRef.current.innerText =
            convertSecToMinWithOutSec(localReminder_) + Translate.reminder;
        } else {
          localReminder_ = undefined;
          props.callNeedStore();
          clearInterval(timerVar);
        }
      }, [60000]);
    }, 1000);
  }, [props, startAt]);

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
          text={convertSecToMin(props.duration)}
        />
      </PhoneView>
      <ProgressBar percent={progress} />

      {/* {localReminder_ !== undefined && localReminder_ < 300 && (
        <CountDown
          until={props.reminder}
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
      )} */}

      {/* text={convertSecToMinWithOutSec(localReminder_) + Translate.reminder} */}
      {/* {localReminder_ !== undefined && localReminder_ > 300 && (
        <SimpleTextWithRef ref={timerRef} />
      )} */}

      <SimpleTextWithRef ref={timerRef} />
    </MyView>
  );
}

export default Timer;
