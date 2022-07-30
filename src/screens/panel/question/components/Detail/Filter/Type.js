import React from 'react';
import {
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
    if (type === 'test') dispatch({showTest: !state.showTest});
    else if (type === 'short_answer')
      dispatch({showShortAnswer: !state.showShortAnswer});
    else if (type === 'multi_sentence')
      dispatch({showMultiSentence: !state.showMultiSentence});
    else dispatch({showTashrihi: !state.showTashrihi});

    props.localFilter();
  };

  return (
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
  );
}

export default Type;
