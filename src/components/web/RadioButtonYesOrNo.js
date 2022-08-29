import {CommonRadioButton, PhoneView, SimpleText} from '../../styles/Common';
import commonTranslator from '../../translator/Common';
import React from 'react';
function RadioButtonYesOrNo(props) {
  return (
    <PhoneView>
      <SimpleText style={{alignSelf: 'center'}} text={props.label} />
      <CommonRadioButton
        status={props.selected === 'yes' ? 'checked' : 'unchecked'}
        onPress={() => props.setSelected('yes')}
        text={commonTranslator.yes}
      />
      <CommonRadioButton
        status={props.selected === 'no' ? 'checked' : 'unchecked'}
        onPress={() => props.setSelected('no')}
        text={commonTranslator.no}
      />
    </PhoneView>
  );
}

export default RadioButtonYesOrNo;
