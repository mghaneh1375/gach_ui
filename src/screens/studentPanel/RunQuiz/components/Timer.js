import React, {useState} from 'react';
import CountDown from 'react-native-countdown-component';
import {convertSecToMin} from '../../../../services/Utility';
import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import Translate from '../Translate';
import ProgressBar from '../../../../styles/Common/ProgressBar';
import {useEffectOnce} from 'usehooks-ts';

function Timer(props) {
  const [reminder, setReminder] = useState(parseInt(props.reminder));
  const [progress, setProgress] = useState(
    ((props.duration - props.reminder) * 100) / props.duration,
  );

  const timer = r => {
    setTimeout(() => {
      console.log(r);
      console.log(((props.duration - r) * 100) / props.duration);
      setProgress(((props.duration - r) * 100) / props.duration);
      timer(r - 140);
    }, [120000]);
  };

  useEffectOnce(() => {
    timer(props.reminder - 130);
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

      {reminder !== undefined && (
        <CountDown
          until={props.reminder}
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
    </MyView>
  );
}

export default Timer;
