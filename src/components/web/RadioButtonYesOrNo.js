import {CommonRadioButton, PhoneView, SimpleText} from '../../styles/Common';
import commonTranslator from '../../translator/Common';
import React from 'react';
import JustBottomBorderTextInput from '../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../styles/Common/Styles';
function RadioButtonYesOrNo(props) {
  return (
    <PhoneView>
      <SimpleText style={{alignSelf: 'center'}} text={props.label} />
      <CommonRadioButton
        status={props.selected === 'yes' ? 'checked' : 'unchecked'}
        onPress={() => props.setSelected('yes')}
        text={props.text1 === undefined ? commonTranslator.yes : props.text1}
      />
      {props.textInput !== undefined && props.textInput && (
        <PhoneView style={{...styles.gap7}}>
          <CommonRadioButton
            status={props.selected === 'ok' ? 'checked' : 'unchecked'}
            onPress={() => props.setSelected('ok')}
            text={props.inputText}
          />
          <JustBottomBorderTextInput
            onChangeText={props.onChangeText}
            justNum={props.justNum}
            placeholder={props.text}
            subText={props.text}
            disable={props.selected === 'ok' ? false : true}
            value={props.textValue}
            setOffset={props.setOffset}
          />
        </PhoneView>
      )}
      <CommonRadioButton
        status={props.selected === 'no' ? 'checked' : 'unchecked'}
        onPress={() => props.setSelected('no')}
        text={props.text2 === undefined ? commonTranslator.no : props.text2}
      />
    </PhoneView>
  );
}

export default RadioButtonYesOrNo;
