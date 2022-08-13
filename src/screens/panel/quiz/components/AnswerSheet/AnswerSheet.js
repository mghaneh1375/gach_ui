import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox, PhoneView, MyView} from '../../../../../styles/Common';
import Test from './Test';

const perBox = 10;

function AnswerSheet(props) {
  const [boxes, setBoxes] = useState();

  React.useEffect(() => {
    if (props.answer_sheet === undefined) return;

    let tmp = [];
    let idx = 0;
    let end = props.answer_sheet.length;

    while (idx < end) {
      let limit = idx + perBox > end ? end : idx + perBox;
      tmp.push(props.answer_sheet.slice(idx, limit));
      idx += limit;
    }
    setBoxes(tmp);
  }, [props.answer_sheet]);

  return (
    <MyView>
      <PhoneView
        style={{
          flexWrap: 'wrap',
          justifyContent: 'start',
          padding: 10,
          direction: 'ltr',
        }}>
        {boxes !== undefined &&
          boxes.map((box, index) => {
            return (
              <CommonWebBox key={index}>
                {box.map((elem, idx) => {
                  if (elem.type === 'test')
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
