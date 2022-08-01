import React, {useState} from 'react';
import {View} from 'react-native';
import RadioButtonYesOrNo from '../../../../../components/web/RadioButtonYesOrNo';
import {PhoneView} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import translator from '../../Translator';
import {sentencesCountKeyVals} from '../KeyVals';
import MultiSentenceYesOrNo from './MultiSentenceYesOrNo';

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
    <View style={{gap: 20, width: '100%'}}>
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
      <View>
        {sentencesAnswer !== undefined &&
          sentencesAnswer.map((elem, index) => {
            return (
              <MultiSentenceYesOrNo
                key={index}
                index={index}
                update={(index, status) => {
                  let tmp = sentencesAnswer;
                  tmp[index] = status;
                  setSentencesAnswer(tmp);
                }}
              />
            );
          })}
      </View>
    </View>
  );
}

export default MultiSentenceType;
