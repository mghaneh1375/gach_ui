import React, {useState} from 'react';
import {
  CommonRadioButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';
import commonTranslator from '../../../../../translator/Common';

function MultiSentence(props) {
  const [choices, setChoices] = useState();

  const buildChoices = React.useCallback(() => {
    let tmp = [];

    for (let i = 0; i < props.sentencesCount; i++) {
      let a = '_';
      if (
        i < props.selected.length &&
        (props.selected[i] === '1' || props.selected[i] === 'yes')
      )
        a = 'yes';
      else if (
        i < props.selected.length &&
        (props.selected[i] === '0' || props.selected[i] === 'no')
      )
        a = 'no';

      tmp.push({
        selected: a,
        idx: i,
      });
    }

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
    <MyView
      style={{
        ...styles.gap5,
      }}>
      {choices !== undefined &&
        choices.map((elem, index) => {
          return (
            <PhoneView key={index}>
              <SimpleText
                style={{alignSelf: 'center'}}
                text={'گزاره ' + (index + 1) + ':'}
              />

              <CommonRadioButton
                status={elem.selected === 'yes' ? 'checked' : 'unchecked'}
                onPress={() => onChange(index, 'yes')}
                text={commonTranslator.yes}
              />

              <CommonRadioButton
                status={elem.selected === 'no' ? 'checked' : 'unchecked'}
                onPress={() => onChange(index, 'no')}
                text={commonTranslator.no}
              />

              <CommonRadioButton
                status={elem.selected === '_' ? 'checked' : 'unchecked'}
                onPress={() => onChange(index, '_')}
                text={commonTranslator.nullAns}
              />
            </PhoneView>
          );
        })}
    </MyView>
  );
}

export default MultiSentence;
