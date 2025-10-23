import React, {useState} from 'react';
import Circle from '@/components/web/Circle.jsx';
import {CommonWebBox, PhoneView, MyView, SimpleText} from '@/styles';
import {styles} from '@/styles/common/styles.js';
import vars from '@/styles/root';
import MultiSentence from './MultiSentence.jsx';
import ShortAnswer from './ShortAnswer.jsx';
import Test from './Test.jsx';
const perBox = 10;
function AnswerSheet(props) {
  const [boxes, setBoxes] = useState();
  React.useEffect(() => {
    if (props.answer_sheet === undefined) return;
    const tmp = [];
    let idx = 0;
    const end = props.answer_sheet.length;
    while (idx < end) {
      const limit = idx + perBox > end ? end : idx + perBox;
      tmp.push(props.answer_sheet.slice(idx, limit));
      idx += perBox;
    }
    setBoxes(tmp);
  }, [props.answer_sheet]);
  return (
    <MyView style={styles.marginTop20}>
      <PhoneView style={styles.gap15}>
        <Circle
          style={styles.alignSelfCenter}
          diameter={13}
          backgroundColor={vars.CREAM}
        />
        <SimpleText text={'پاسخ دانش آموز'} />
        <Circle
          style={styles.alignSelfCenter}
          diameter={13}
          backgroundColor={vars.GREEN}
        />
        <SimpleText text={'پاسخ صحیح'} />
      </PhoneView>
      <PhoneView
        style={{
          justifyContent: 'start',
          padding: 5,
          direction: 'ltr',
        }}>
        {boxes !== undefined &&
          boxes.map((box, index) => {
            return (
              <CommonWebBox
                no_gap={true}
                style={{
                  padding: 5,
                }}
                key={index}>
                {box.map((elem, idx) => {
                  if (elem.type === 'test')
                    return (
                      <Test
                        setLoading={props.setLoading}
                        token={props.token}
                        index={idx + index * perBox}
                        key={idx}
                        state={props.state}
                        dispatch={props.dispatch}
                      />
                    );
                  else if (elem.type === 'short_answer')
                    return (
                      <ShortAnswer
                        setLoading={props.setLoading}
                        token={props.token}
                        index={idx + index * perBox}
                        key={idx}
                      />
                    );
                  else if (elem.type === 'MULTI_SENTENCE')
                    return (
                      <MultiSentence
                        setLoading={props.setLoading}
                        token={props.token}
                        index={idx + index * perBox}
                        key={idx}
                      />
                    );
                })}
              </CommonWebBox>
            );
          })}
      </PhoneView>
    </MyView>
  );
}
export default AnswerSheet;
