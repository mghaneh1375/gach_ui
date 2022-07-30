import RadioButtonYesOrNo from '../../../../../../components/web/RadioButtonYesOrNo';
import React from 'react';
import {
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
    if (level === 'easy') dispatch({showEasy: !state.showEasy});
    else if (level === 'mid') dispatch({showMid: !state.showMid});
    else if (level === 'hard') dispatch({showHard: !state.showHard});

    props.localFilter();
  };

  return (
    <PhoneView style={{gap: 50}}>
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
            text={'تعداد سوالات موجود: ' + state.easy}
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
            text={'تعداد سوالات موجود: ' + state.mid}
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
            text={'تعداد سوالات موجود: ' + state.hard}
          />
        </View>
      </PhoneView>
    </PhoneView>
  );
}

export default Level;
