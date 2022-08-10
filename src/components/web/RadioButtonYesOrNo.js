import {CommonRadioButton, PhoneView, SimpleText} from '../../styles/Common';
import commonTranslator from '../../tranlates/Common';
import React from 'react';
function RadioButtonYesOrNo(props) {
  return (
    <PhoneView style={{marginTop: 8}}>
      <SimpleText text={props.label} />
      <CommonRadioButton
        style={{marginTop: -3}}
        status={props.selected === 'yes' ? 'checked' : 'unchecked'}
        onPress={() => props.setSelected('yes')}
        text={commonTranslator.yes}
      />
      <CommonRadioButton
        style={{marginTop: -3}}
        status={props.selected === 'no' ? 'checked' : 'unchecked'}
        onPress={() => props.setSelected('no')}
        text={commonTranslator.no}
      />
    </PhoneView>
  );
}

export default RadioButtonYesOrNo;
