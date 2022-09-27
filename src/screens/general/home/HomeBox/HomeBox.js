import {transform} from '@babel/core';
import React from 'react';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import translator from '../translator';

function HomeBox(props) {
  return (
    <CommonWebBox width={300} style={{...styles.overFlowHidden, height: 137}}>
      <PhoneView
        style={{
          width: 33,
          height: 137,
          backgroundColor:
            props.color === 'red'
              ? vars.RED
              : props.color === 'orange'
              ? vars.ORANGE
              : props.color === 'orangered'
              ? vars.ORANGE_RED
              : vars.DARK_BLUE,
          position: 'absolute',
          borderRadius: 11,
          top: 0,
          right: 0,
        }}></PhoneView>
      <MyView style={{...styles.paddingRight30}}>
        <SimpleText
          style={{...styles.BlueBold, ...styles.fontSize25}}
          text={translator.more}
        />
        {/* <SimpleText
          style={{
            ...styles.colorOrange,
            ...styles.bold,
            ...styles.fontSize25,
          }}
          text={props.number}
        />
        <SimpleText
          style={{
            ...styles.alignSelfEnd,
            ...styles.BlueBold,
            ...styles.fontSize25,
          }}
          text={props.text}
        /> */}
      </MyView>
    </CommonWebBox>
  );
}

export default HomeBox;
