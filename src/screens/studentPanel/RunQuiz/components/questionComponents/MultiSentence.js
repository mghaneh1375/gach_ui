import React, {useState} from 'react';
import {PhoneView} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import MultiSentenceYesOrNo from '../../../../panel/question/components/Create/MultiSentenceYesOrNo';

function MultiSentence(props) {
  const [choices, setChoices] = useState();

  const buildChoices = React.useCallback(() => {
    let tmp = [];

    for (let i = 0; i < props.sentencesCount; i++) {
      let a = '_';
      if (
        (i < props.selected.length && props.selected[i] === '1') ||
        props.selected[i] === 'yes'
      )
        a = 'yes';
      else if (
        (i < props.selected.length && props.selected[i] === '0') ||
        props.selected === 'no'
      )
        a = 'no';

      tmp.push({
        selected: a,
        idx: i,
      });
    }
    console.log(tmp);
    setChoices(tmp);
  }, [props.sentencesCount, props.selected]);

  React.useEffect(() => {
    buildChoices();
  }, [props.sentencesCount, props.selected, buildChoices]);

  const onChange = (sentenceIdx, newStatus) => {
    if (props.onChange === undefined) return;
    let tmp = [];
    choices.forEach((elem, idx) => {
      if (sentenceIdx !== idx) tmp.push(elem);
      else
        tmp.push({
          selected: newStatus,
          idx: sentenceIdx,
        });
    });

    props.onChange(
      tmp
        .map(elem => {
          let a = '_';
          if (elem.selected === 'yes' || elem.selected === '1') a = '1';
          else if (elem.selected === 'no' || elem.selected === '0') a = '0';

          return a;
        })
        .join(''),
    );
  };

  return (
    <PhoneView
      style={{
        ...styles.gap50,
      }}>
      {choices !== undefined &&
        choices.map((elem, index) => {
          return (
            <MultiSentenceYesOrNo
              index={elem.idx}
              key={index}
              update={props.onChange === undefined ? undefined : onChange}
              status={elem.selected}
            />
          );
        })}
    </PhoneView>
  );
}

export default MultiSentence;
