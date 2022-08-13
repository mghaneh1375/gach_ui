import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import WheelOfFortune from 'react-native-wheel-of-fortune';
import {CommonButton} from '../../../styles/Common';

const participants = [
  '%10',
  '%20',
  '%30',
  '%40',
  '%50',
  '%60',
  '%70',
  '%90',
  'FREE',
];
function Gift(props) {
  const [winnerValue, setWinnerValue] = useState();
  const [winnerIndex, setWinnerIndex] = useState();
  const [started, setStarted] = useState();
  //   const child = useRef();

  const wheelOptions = {
    rewards: participants,
    rSize: 100,
    borderWidth: 5,
    borderColor: '#fff',
    innerRadius: 30,
    duration: 6000,
    backgroundColor: 'red',
    textAngle: 'horizontal',
    knobSource: require('./../../../images/student.png'),
    onRef: ref => ref._onPress(),
    // (child = ref)
  };
  return (
    <MyView>
      <CommonButton
        title={'بچرخون!'}
        onPress={() => {
          console.log('Salam');
          this.buttonPress();
        }}
        style={styles.startButtonText}
      />
      <MyView onPress={() => console.log('asd')} style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            setWinnerValue(value);
            setWinnerIndex(index);
          }}
        />
        {winnerIndex != null && (
          <MyView>
            <Text style={styles.winnerText}>
              You win {participants[winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setWinnerIndex(null);
                //   child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </MyView>
        )}
      </MyView>
    </MyView>
  );
}
export default Gift;

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
