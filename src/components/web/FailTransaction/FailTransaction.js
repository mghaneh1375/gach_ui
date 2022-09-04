import React from 'react';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {CommonWebBox, MyView, SimpleText} from '../../../styles/Common';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';

function FailTransaction(props) {
  return (
    <CommonWebBox header={Translate.backSuccessTransaction}>
      <MyView style={{...styles.marginRight25}}>
        <MyView style={{...styles.flexDirectionRow}}>
          <SimpleFontIcon
            style={{
              ...styles.padding0,
              ...styles.colorRed,
              marginTop: -15,
            }}
            icon={faXmark}
            kind={'large'}
          />
        </MyView>
        <MyView style={{...styles.gap15}}>
          <SimpleText
            style={{
              ...styles.colorRed,
              ...styles.fontSize20,
              ...styles.FontWeight600,
            }}
            text={Translate.failPay}
          />
        </MyView>
        <SimpleText
          text={Translate.failMessage}
          style={{...styles.BlueBold, ...styles.marginTop20}}
        />
        {props.link !== undefined && props.link}
        <SimpleText
          style={{
            ...styles.BlueBold,
            ...styles.FontWeight600,
            ...styles.fontSize13,
          }}
          text={Translate.failBank}
        />
        <SimpleText
          style={{
            ...styles.BlueBold,
            ...styles.FontWeight600,
            ...styles.fontSize11,
          }}
          text={Translate.failBankSub}
        />
        <SimpleText
          style={{
            ...styles.marginTop20,
            ...styles.BlueBold,
            ...styles.FontWeight600,
            ...styles.fontSize11,
          }}
          text={Translate.someReasons}
        />
        <SimpleText
          style={{
            ...styles.BlueBold,
            ...styles.FontWeight600,
            ...styles.fontSize11,
          }}
          text={Translate.out}
        />
        <SimpleText
          style={{
            ...styles.BlueBold,
            ...styles.FontWeight600,
            ...styles.fontSize11,
          }}
          text={Translate.problem}
        />
      </MyView>
    </CommonWebBox>
  );
}

export default FailTransaction;
