import React, {useRef, useState} from 'react';
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
let timerVar2;
let localReminder_ = undefined;

function Timer(props) {
  const timerRef = useRef();

  const [progress, setProgress] = useState(
    ((props.duration - props.reminder) * 100) / props.duration,
  );

  React.useEffect(() => {
    if (props.reminder !== undefined && localReminder_ === undefined) {
      localReminder_ = props.reminder;
    }
  }, [props.reminder]);

  const timer = React.useCallback(() => {
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

        if (localReminder_ > 60) {
          localReminder_ -= 60;

          if (localReminder_ < 360 && localReminder_ > 300) {
            showWarnign('کمتر از ۵ دقیقه به پایان آزمون شما زمان باقیست.');
          } else if (localReminder_ < 180 && localReminder_ > 120) {
            showWarnign('کمتر از ۲ دقیقه به پایان آزمون شما زمان باقیست.');
          }

          timerRef.current.innerText =
            convertSecToMinWithOutSec(localReminder_) + Translate.reminder;
        } else {
          props.callExit();
        }
      }, [60000]);

      timerVar2 = setInterval(() => {
        props.callNeedStore();
      }, [300000]);
    }, 1000);
  }, [props]);

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

      <SimpleTextWithRef ref={timerRef} />
    </MyView>
  );
}

export default Timer;
