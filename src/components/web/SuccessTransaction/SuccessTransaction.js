import React from 'react';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';
import Smile from '../../../images/SvgSymbol/1F600.svg';

function SuccessTransaction(props) {
  return (
    <CommonWebBox header={Translate.backSuccessTransaction}>
      <MyView style={{...styles.marginRight25}}>
        <MyView style={{...styles.flexDirectionRow}}>
          <img src={Smile} />
        </MyView>
        <MyView style={{...styles.gap15}}>
          <SimpleText
            style={{
              ...styles.colorGreen,
              ...styles.fontSize20,
              ...styles.FontWeight600,
            }}
            text={Translate.successPay}
          />
          {props.refCode !== undefined && (
            <SimpleText
              style={{...styles.BlueBold, ...styles.marginTop15}}
              text={Translate.refCode + ' : ' + props.refCode}
            />
          )}
          <PhoneView>
            <CommonButton title={Translate.printRecp} theme={'dark'} />
          </PhoneView>
        </MyView>
        <SimpleText
          text={Translate.buyerName + ' ' + props.buyerName}
          style={{...styles.BlueBold, ...styles.marginTop50}}
        />
        {props.link !== undefined && props.link}

        <SimpleText
          onPress={() => props.navigate('/')}
          style={{
            ...styles.BlueBold,
            ...styles.FontWeight600,
            ...styles.fontSize13,
          }}
          text={Translate.back}
        />
        <SimpleText
          onPress={() => props.navigate('/finantialHistory')}
          style={{
            ...styles.colorOrange,
            ...styles.FontWeight600,
            ...styles.fontSize13,
          }}
          text={Translate.showPay}
        />
      </MyView>
    </CommonWebBox>
  );
}

export default SuccessTransaction;
