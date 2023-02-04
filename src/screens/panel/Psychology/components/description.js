import React from 'react';
import {CommonWebBox, PhoneView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';

export default function Description(props) {
  return (
    <PhoneView>
      <CommonWebBox style={{...styles.width80}}>
        <SimpleText style={{...styles.BlueBold}} text={' توضیحات '} />
        <SimpleText text={props.descriptionText} />
      </CommonWebBox>
    </PhoneView>
  );
}
