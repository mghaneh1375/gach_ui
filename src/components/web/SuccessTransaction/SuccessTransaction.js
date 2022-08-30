import React from 'react';
import {Image} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';

function SuccessTransaction(props) {
  return (
    <CommonWebBox header={Translate.backSuccessTransaction}>
      <MyView style={{...styles.marginRight25}}>
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
          <CommonButton
            style={{justifyContent: 'flex-start'}}
            title={Translate.printRecp}
            theme={'dark'}
          />
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
