import React from 'react';
import {MyView} from 'react-native-multi-selectbox';
import {CommonButton, CommonWebBox, SimpleText} from '../../../styles/Common';
import {CommonTextInput} from '../../../styles/Common/CommonTextInput';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';

function AccountCharge(props) {
  //آقای عادلی گفتن این پاپ آپ هم میتونه باشه
  return (
    <CommonWebBox
      width={390}
      header={Translate.accountIncrease}
      childStyle={{paddingLeft: 25}}>
      <SimpleText
        style={{
          ...styles.colorOrange,
          ...styles.fontSize15,
          ...styles.FontWeight600,
        }}
        text={Translate.accountBalance + ' ' + props.accountBalance}
      />
      <MyView style={{...styles.marginRight25}}>
        <SimpleText
          style={{...styles.BlueBold, ...styles.fontSize17}}
          text={Translate.money}
        />
        <CommonTextInput
          placeHolder={Translate.moneyEnter}
          subText={Translate.moneyUnit}
          subTextTwo={Translate.moneyStr}
          justNum={true}
        />
      </MyView>
      <CommonButton title={Translate.moneyPort} theme={'dark'} onPress />
    </CommonWebBox>
  );
}

export default AccountCharge;
