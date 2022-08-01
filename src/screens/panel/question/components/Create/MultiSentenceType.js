import React, {useState} from 'react';
import {View} from 'react-native';
import RadioButtonYesOrNo from '../../../../../components/web/RadioButtonYesOrNo';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import {sentencesCountKeyVals} from '../KeyVals';

function MultiSentenceType(props) {
  const [sentencesAnswer, setSentencesAnswer] = useState();
  const [sentencesCount, setSentencesCount] = useState();

  React.useEffect(() => {
    if (sentencesCount === undefined) return;
    let arr = [];
    for (var i = 0; i < sentencesCount; i++) arr.push('yes');

    setSentencesAnswer(arr);
  }, [sentencesCount]);

  return (
    <View>
      <JustBottomBorderSelect
        placeholder={translator.sentencesCount}
        values={sentencesCountKeyVals}
        value={sentencesCountKeyVals.find(elem => {
          return elem.id == sentencesCount;
        })}
        setter={setSentencesCount}
        afterSetter={counter => {
          props.updateSentencesCount(counter);
        }}
      />
      {sentencesAnswer !== undefined &&
        sentencesAnswer.map((elem, index) => {
          return (
            <RadioButtonYesOrNo
              label={'پاسخ گزاره ' + (index + 1)}
              selected={elem}
              setSelected={status => {
                let tmp = sentencesAnswer;
                tmp[index] = status;
                console.log(tmp);
                setSentencesAnswer(tmp);
              }}
            />
          );
        })}
    </View>
  );
}

export default MultiSentenceType;
