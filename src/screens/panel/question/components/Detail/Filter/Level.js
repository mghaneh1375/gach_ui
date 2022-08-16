import React from 'react';
import {
  BigBoldBlueText,
  CommonRadioButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../../styles/Common';
import {styles} from '../../../../../../styles/Common/Styles';
import translator from '../../../Translator';
import {questionContext, dispatchQuestionContext} from './../Context';

function Level(props) {
  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();

  const filter = level => {
    let newShowEasy = state.showEasy;
    let newShowMid = state.showMid;
    let newShowHard = state.showHard;

    if (level === 'easy') {
      dispatch({showEasy: !state.showEasy});
      newShowEasy = !newShowEasy;
    } else if (level === 'mid') {
      dispatch({showMid: !state.showMid});
      newShowMid = !newShowMid;
    } else if (level === 'hard') {
      dispatch({showHard: !state.showHard});
      newShowHard = !newShowHard;
    }

    props.localFilter(
      newShowEasy,
      newShowMid,
      newShowHard,
      state.showTest,
      state.showShortAnswer,
      state.showMultiSentence,
      state.showTashrihi,
      state.authors,
    );
  };

  return (
    <MyView>
      <BigBoldBlueText text={translator.levelQuestion} />

      <PhoneView style={styles.gap50}>
        <PhoneView style={styles.minWidth200}>
          <CommonRadioButton
            value="easy"
            status={state.showEasy ? 'checked' : 'unchecked'}
            onPress={() => filter('easy')}
            text={''}
          />
          <MyView>
            <SimpleText text={translator.questionShowEasy} />
            <SimpleText
              style={styles.fontSize11}
              text={translator.questionNumber + state.total_easy}
            />
          </MyView>
        </PhoneView>

        <PhoneView style={styles.minWidth200}>
          <CommonRadioButton
            value="mid"
            status={state.showMid ? 'checked' : 'unchecked'}
            onPress={() => filter('mid')}
            text={''}
          />
          <MyView>
            <SimpleText text={translator.questionShowMid} />
            <SimpleText
              style={styles.fontSize11}
              text={translator.questionNumber + state.total_mid}
            />
          </MyView>
        </PhoneView>

        <PhoneView style={styles.minWidth200}>
          <CommonRadioButton
            value="hard"
            status={state.showHard ? 'checked' : 'unchecked'}
            onPress={() => filter('hard')}
            text={''}
          />
          <MyView>
            <SimpleText text={translator.questionShowHard} />
            <SimpleText
              style={styles.fontSize11}
              text={translator.questionNumber + state.total_hard}
            />
          </MyView>
        </PhoneView>
      </PhoneView>
    </MyView>
  );
}

export default Level;
