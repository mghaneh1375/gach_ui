import React from 'react';
import {CommonWebBox, PhoneView, SimpleText} from '@/styles';
import {styles} from '../../../../styles/common/styles';
export default function Description(props) {
  return (
    <PhoneView>
      <CommonWebBox
        style={{
          ...styles.width80,
        }}>
        <SimpleText
          style={{
            ...styles.BlueBold,
          }}
          text={' توضیحات '}
        />
        <SimpleText text={props.descriptionText} />
      </CommonWebBox>
    </PhoneView>
  );
}
