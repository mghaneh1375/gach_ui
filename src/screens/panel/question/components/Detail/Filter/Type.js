import React from 'react';
import {
  BigBoldBlueText,
  CommonRadioButton,
  PhoneView,
  SimpleText,
} from '../../../../../../styles/Common';
import {questionContext, dispatchQuestionContext} from '../Context';
import {View} from 'react-native';

function Type(props) {
  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();

  const filter = type => {
    let newShowTest = state.showTest;
    let newShowShortAnswer = state.showShortAnswer;
    let newShowMultiSentence = state.showMultiSentence;
    let newShowTashrihi = state.showTashrihi;

    if (type === 'test') {
      dispatch({showTest: !state.showTest});
      newShowTest = !newShowTest;
    } else if (type === 'short_answer') {
      dispatch({showShortAnswer: !state.showShortAnswer});
      newShowShortAnswer = !newShowShortAnswer;
    } else if (type === 'multi_sentence') {
      dispatch({showMultiSentence: !state.showMultiSentence});
      newShowMultiSentence = !newShowMultiSentence;
    } else {
      dispatch({showTashrihi: !state.showTashrihi});
      newShowTashrihi = !newShowTashrihi;
    }

    props.localFilter(
      state.showEasy,
      state.showMid,
      state.showHard,
      newShowTest,
      newShowShortAnswer,
      newShowMultiSentence,
      newShowTashrihi,
      state.authors,
    );
  };

  return (
    <View>
      <BigBoldBlueText text={'نوع سوال'} />
      <PhoneView style={{gap: 50}}>
        <PhoneView style={{minWidth: 200}}>
          <CommonRadioButton
            value="test"
            status={state.showTest ? 'checked' : 'unchecked'}
            onPress={() => filter('test')}
            text={''}
          />
          <View>
            <SimpleText text={'نمایش سوالات تستی'} />
            <SimpleText
              style={{fontSize: 11}}
              text={'تعداد سوالات موجود: ' + state.total_test}
            />
          </View>
        </PhoneView>

        <PhoneView style={{minWidth: 200}}>
          <CommonRadioButton
            value="short_answer"
            status={state.showShortAnswer ? 'checked' : 'unchecked'}
            onPress={() => filter('short_answer')}
            text={''}
          />
          <View>
            <SimpleText text={'نمایش سوالات کوتاه پاسخ: '} />
            <SimpleText
              style={{fontSize: 11}}
              text={'تعداد سوالات موجود: ' + state.total_short_answer}
            />
          </View>
        </PhoneView>

        <PhoneView style={{minWidth: 200}}>
          <CommonRadioButton
            value="multi_sentence"
            status={state.showMultiSentence ? 'checked' : 'unchecked'}
            onPress={() => filter('multi_sentence')}
            text={''}
          />
          <View>
            <SimpleText text={'نمایش سوالات چندگزاره ای'} />
            <SimpleText
              style={{fontSize: 11}}
              text={'تعداد سوالات موجود: ' + state.total_multi_sentence}
            />
          </View>
        </PhoneView>

        <PhoneView style={{minWidth: 200}}>
          <CommonRadioButton
            value="tashrihi"
            status={state.showTashrihi ? 'checked' : 'unchecked'}
            onPress={() => filter('tashrihi')}
            text={''}
          />
          <View>
            <SimpleText text={'نمایش سوالات تشریحی'} />
            <SimpleText
              style={{fontSize: 11}}
              text={'تعداد سوالات موجود: ' + state.total_tashrihi}
            />
          </View>
        </PhoneView>
      </PhoneView>
    </View>
  );
}

export default Type;
