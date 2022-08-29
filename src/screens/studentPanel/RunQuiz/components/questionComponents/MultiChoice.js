import React, {useState} from 'react';
import {PhoneView} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import Translate from '../../Translate';
import Choice from './Choice';

function MultiChoice(props) {
  const [choices, setChoices] = useState();

  const buildChoices = React.useCallback(() => {
    let tmp = [];
    for (let i = 1; i <= props.choicesCount; i++) {
      tmp.push({
        text: Translate.choice + i,
        selected: props.selected == i,
        idx: i,
      });
    }
    setChoices(tmp);
  }, [props.choicesCount, props.selected]);

  React.useEffect(() => {
    buildChoices();
  }, [props.choicesCount, props.selected, buildChoices]);

  const onChange = idx => {
    if (props.onChange === undefined) return;
    props.onChange(idx);
  };

  return (
    <PhoneView
      style={{
        ...styles.gap50,
      }}>
      {choices !== undefined &&
        choices.map((elem, index) => {
          return (
            <Choice
              idx={elem.idx}
              key={index}
              onChange={props.onChange === undefined ? undefined : onChange}
              text={elem.text}
              isSelected={elem.selected}
            />
          );
        })}
    </PhoneView>
  );
}

export default MultiChoice;
