import React from 'react';
import {PhoneView, MyView} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {changeText} from '../../../../../services/Utility';

const QuizRegistryInfo = props => {
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
      <PhoneView style={{gap: 10, marginBottom: 10}}>
        <JustBottomBorderDatePicker
          placeholder={translator.startRegistryDate}
          subText={translator.startRegistryDate}
          value={props.start}
          setter={props.setStart}
        />
        <JustBottomBorderDatePicker
          placeholder={translator.endRegistryDate}
          subText={translator.endRegistryDate}
          value={props.end}
          setter={props.setEnd}
        />
      </PhoneView>
    </MyView>
  );
};

export default QuizRegistryInfo;
