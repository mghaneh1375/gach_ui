import React, {useState} from 'react';
import {PhoneView, MyView} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import {changeText} from '../../../../../services/Utility';

const QuizRegistryInfo = props => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  React.useEffect(() => {
    setStart(props.start);
  }, [props.start]);

  React.useEffect(() => {
    setEnd(props.end);
  }, [props.end]);

  return (
    <MyView>
      <PhoneView style={{gap: 10, marginBottom: 10}}>
        <JustBottomBorderTextInput
          placeholder={translator.price}
          subText={translator.price}
          value={props.price}
          onChangeText={text => changeText(text, props.setPrice)}
          justNum={true}
        />
        <JustBottomBorderTextInput
          placeholder={translator.ranking}
          subText={translator.ranking}
          value={props.ranking}
          onChangeText={text => changeText(text, props.setRanking)}
          justNum={true}
        />
        <JustBottomBorderTextInput
          subText={translator.capacity}
          placeholder={translator.capacity}
          value={props.capacity}
          onChangeText={text => changeText(text, props.setCapacity)}
          justNum={true}
        />
      </PhoneView>
      {start !== undefined && end !== undefined && (
        <PhoneView style={{gap: 10, marginBottom: 10}}>
          <JustBottomBorderDatePicker
            placeholder={translator.startRegistryDate}
            subText={translator.startRegistryDate}
            value={start}
            setter={props.setStart}
          />
          <JustBottomBorderDatePicker
            placeholder={translator.endRegistryDate}
            subText={translator.endRegistryDate}
            value={end}
            setter={props.setEnd}
          />
        </PhoneView>
      )}
    </MyView>
  );
};

export default QuizRegistryInfo;
