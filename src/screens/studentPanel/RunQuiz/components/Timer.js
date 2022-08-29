import React from 'react';
import CountDown from 'react-native-countdown-component';
import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import Translate from '../Translate';

function Timer(props) {
  return (
    <MyView>
      <PhoneView style={{gap: 1}}>
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
          text={props.totalTime}
        />
      </PhoneView>
      <CountDown
        until={props.reminder}
        onFinish={() => {}}
        timeToShow={['M', 'S']}
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
        timeLabels={{s: '', m: ''}}
        size={20}
      />
    </MyView>
  );
}

export default Timer;
