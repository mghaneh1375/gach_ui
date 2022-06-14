import CountDown from 'react-native-countdown-component';
import vars from './../root';

export const MyCountDown = props => (
  <CountDown
    until={props.until}
    onFinish={props.onFinish}
    timeToShow={['M', 'S']}
    digitStyle={{
      backgroundColor: 'white',
      borderColor: vars.LIGHT_SILVER,
      borderWidth: 1,
      color: vars.RED,
      borderRadius: 10,
      marginTop: 30,
    }}
    timeLabels={{m: null, s: null}}
    size={20}
  />
);
