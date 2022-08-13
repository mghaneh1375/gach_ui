import React, {useState} from 'react';
import {View} from 'react-native';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import {sentencesCountKeyVals} from '../KeyVals';
import MultiSentenceYesOrNo from './MultiSentenceYesOrNo';

function MultiSentenceType(props) {
  const [sentencesAnswer, setSentencesAnswer] = useState();
  const [sentencesCount, setSentencesCount] = useState();
  const [initialed, setInitialed] = useState(false);

  React.useEffect(() => {
    if (initialed) return;

    if (
      props.initSentencesCount !== undefined &&
      props.initAnswer !== undefined
    ) {
      setSentencesCount(props.initSentencesCount);

      let arr = [];
      for (var i = 0; i < props.initAnswer.length; i++) {
        if (props.initAnswer[i] == '1') {
          arr.push('yes');
        } else {
          arr.push('no');
        }
      }

      setSentencesAnswer(arr);
      setInitialed(true);
    }
  }, [initialed, props.initSentencesCount, props.initAnswer]);

  const buildSentencesAnswer = counter => {
    let arr = [];
    for (var i = 0; i < counter; i++) arr.push('yes');

    setSentencesAnswer(arr);
  };

  return (
    <MyView style={{gap: 20, width: '100%'}}>
      <JustBottomBorderSelect
        placeholder={translator.sentencesCount}
        values={sentencesCountKeyVals}
        value={sentencesCountKeyVals.find(elem => {
          return elem.id == sentencesCount;
        })}
        setter={setSentencesCount}
        afterSetter={counter => {
          props.updateSentencesCount(counter);
          buildSentencesAnswer(counter);
        }}
      />
      <MyView>
        {sentencesAnswer !== undefined &&
          sentencesAnswer.map((elem, index) => {
            return (
              <MultiSentenceYesOrNo
                status={elem}
                key={index}
                index={index}
                update={(index, status) => {
                  let tmp = sentencesAnswer;
                  tmp[index] = status;
                  setSentencesAnswer(tmp);
                  let ans = '';
                  for (let i = 0; i < sentencesAnswer.length; i++) {
                    ans += sentencesAnswer[i] === 'yes' ? '1' : '0';
                  }

                  props.setAnswer(ans);
                }}
              />
            );
          })}
      </MyView>
    </MyView>
  );
}

export default MultiSentenceType;
