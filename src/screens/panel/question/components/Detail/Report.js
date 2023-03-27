import {MyView, PhoneView, SimpleText} from '../../../../../styles/Common';
import React from 'react';
import {questionContext, dispatchQuestionContext} from './Context';

function Report() {
  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <MyView style={{gap: 20}}>
      <PhoneView style={{gap: 50}}>
        <SimpleText
          style={{minWidth: 200}}
          text={'تعداد سوالات آسان: ' + state.easy}
        />
        <SimpleText
          style={{minWidth: 200}}
          text={'تعداد سوالات متوسط: ' + state.mid}
        />
        <SimpleText
          style={{minWidth: 200}}
          text={'تعداد سوالات سخت: ' + state.hard}
        />
        <SimpleText
          style={{minWidth: 200}}
          text={'تعداد سوالات تستی: ' + state.test}
        />
        <SimpleText
          style={{minWidth: 200}}
          text={'تعداد سوالات کوتاه پاسخ: ' + state.short_answer}
        />
        <SimpleText
          style={{minWidth: 200}}
          text={'تعداد سوالات چندگزاره ای: ' + state.multi_sentence}
        />
        <SimpleText
          style={{minWidth: 200}}
          text={'تعداد سوالات تشریحی: ' + state.tashrihi}
        />
      </PhoneView>
    </MyView>
  );
}

export default Report;
