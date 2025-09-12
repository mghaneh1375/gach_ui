import React, {useState} from 'react';
import {doQuizContext} from './Context.jsx';
import Test from './Test.jsx';
import {CommonWebBox, MyView, PhoneView, SimpleText} from '@/styles';
import Circle from '../../../../components/web/Circle.jsx';
import vars from '@/styles/root';
import {styles} from '@/styles/common/styles';
const perBox = 10;
function AnswerSheet(props) {
  const useGlobalState = () => [React.useContext(doQuizContext)];
  const [state] = useGlobalState();
  const [boxes, setBoxes] = useState();
  React.useEffect(() => {
    if (state.answers === undefined) return;
    const tmp = [];
    let idx = 0;
    const end = state.answers.length;
    while (idx < end) {
      const limit = idx + perBox > end ? end : idx + perBox;
      tmp.push(state.answers.slice(idx, limit));
      idx += perBox;
    }
    setBoxes(tmp);
  }, [state.answers]);
  return (
    <MyView style={styles.marginTop20}>
      {state.showAnswers && (
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
      )}
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
                  return (
                    <Test
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
