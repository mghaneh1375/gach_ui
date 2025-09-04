import React from 'react';
import {Image} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';
import commonTranslator from '../../../translator/Common';

function SuccessTransaction(props) {
  return (
    <CommonWebBox header={Translate.backSuccessTransaction}>
      <MyView style={{...styles.marginRight25, ...styles.gap10}}>
        <MyView style={{...styles.flexDirectionRow}}>
          <Image
            style={{...styles.symbol}}
            source={require('../../../images/PngSymbol/1F600@2x (2).png')}
          />
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
          {props.transactionId !== undefined && (
            <CommonButton
              style={{justifyContent: 'flex-start'}}
              title={Translate.printRecp}
              onPress={() =>
                (window.location.href = '/invoice/' + props.transactionId)
              }
              theme={'dark'}
            />
          )}
        </MyView>

        {props.link !== undefined && props.link}

        <PhoneView>
          <SimpleText
            style={{
              ...styles.BlueBold,
              ...styles.FontWeight600,
              ...styles.fontSize13,
              ...styles.marginLeft5,
            }}
            text={Translate.back}
          />
          <SimpleText
            onPress={() => (window.location.href = '/')}
            style={{
              ...styles.colorOrange,
              ...styles.FontWeight600,
              ...styles.fontSize13,
              ...styles.marginLeft5,
              ...styles.cursor_pointer,
            }}
            text={commonTranslator.home}
          />
          <SimpleText
            style={{
              ...styles.BlueBold,
              ...styles.FontWeight600,
              ...styles.fontSize13,
            }}
            text={commonTranslator.clickHere}
          />
        </PhoneView>

        <PhoneView>
          <SimpleText
            style={{
              ...styles.colorOrange,
              ...styles.FontWeight600,
              ...styles.fontSize13,
              ...styles.marginLeft5,
            }}
            text={Translate.showPay}
          />
          <SimpleText
            onPress={() => props.navigate('/financeHistory')}
            style={{
              ...styles.dark_blue_color,
              ...styles.FontWeight600,
              ...styles.fontSize13,
              ...styles.marginLeft5,
              ...styles.cursor_pointer,
            }}
            text={commonTranslator.finantialHistory}
          />
          <SimpleText
            style={{
              ...styles.colorOrange,
              ...styles.FontWeight600,
              ...styles.fontSize13,
            }}
            text={commonTranslator.go}
          />
        </PhoneView>
      </MyView>
    </CommonWebBox>
  );
}

export default SuccessTransaction;
