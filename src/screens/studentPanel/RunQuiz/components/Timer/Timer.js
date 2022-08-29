import React from 'react';
import CountDown from 'react-native-countdown-component';
import {MyView, PhoneView, SimpleText} from '../../../../../styles/Common';
import {MyCountDown} from '../../../../../styles/Common/MyCountDown';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';

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
          text={'زمان کل آزمون'}
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
          text={props.time}
        />
      </PhoneView>
      <CountDown
        until={props.reminder}
        onFinish={() => {}}
        timeToShow={['M', 'S']}
        digitStyle={{
          backgroundColor: 'blue',
          height: 0,
          width: 20,
          color: vars.RED,
        }}
        digitTxtStyle={{
          ...styles.colorOrangeRed,
          width: 20,
          ...styles.fontSize15,
        }}
        timeLabelStyle={{
          color: 'red',

          fontWeight: 'bold',
        }}
        separatorStyle={{
          ...styles.colorOrangeRed,
          ...styles.fontSize15,
        }}
        showSeparator
        timeLabels={{s: '', m: ''}}
        size={20}
      />
    </MyView>
  );
}

export default Timer;
