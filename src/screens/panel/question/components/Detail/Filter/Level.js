import RadioButtonYesOrNo from '../../../../../../components/web/RadioButtonYesOrNo';
import React from 'react';
import {
  BigBoldBlueText,
  CommonRadioButton,
  PhoneView,
  SimpleText,
} from '../../../../../../styles/Common';
import {questionContext, dispatchQuestionContext} from './../Context';
import {View} from 'react-native';

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
    <View>
      <BigBoldBlueText text={'سطح سختی سوال'} />

      <PhoneView style={{gap: 50, flexWrap: 'wrap'}}>
        <PhoneView style={{minWidth: 200}}>
          <CommonRadioButton
            value="easy"
            status={state.showEasy ? 'checked' : 'unchecked'}
            onPress={() => filter('easy')}
            text={''}
          />
          <View>
            <SimpleText text={'نمایش سوالات آسان'} />
            <SimpleText
              style={{fontSize: 11}}
              text={'تعداد سوالات موجود: ' + state.total_easy}
            />
          </View>
        </PhoneView>

        <PhoneView style={{minWidth: 200}}>
          <CommonRadioButton
            value="mid"
            status={state.showMid ? 'checked' : 'unchecked'}
            onPress={() => filter('mid')}
            text={''}
          />
          <View>
            <SimpleText text={'نمایش سوالات متوسط'} />
            <SimpleText
              style={{fontSize: 11}}
              text={'تعداد سوالات موجود: ' + state.total_mid}
            />
          </View>
        </PhoneView>

        <PhoneView style={{minWidth: 200}}>
          <CommonRadioButton
            value="hard"
            status={state.showHard ? 'checked' : 'unchecked'}
            onPress={() => filter('hard')}
            text={''}
          />
          <View>
            <SimpleText text={'نمایش سوالات سخت'} />
            <SimpleText
              style={{fontSize: 11}}
              text={'تعداد سوالات موجود: ' + state.total_hard}
            />
          </View>
        </PhoneView>
      </PhoneView>
    </View>
  );
}

export default Level;
