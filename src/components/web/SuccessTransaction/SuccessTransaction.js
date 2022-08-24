import {faSmile} from '@fortawesome/free-solid-svg-icons';
import {
  BigBoldBlueText,
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';

function SuccessTransaction(props) {
  return (
    <CommonWebBox header={Translate.backSuccessTransaction}>
      <MyView style={{...styles.marginRight25}}>
        <MyView style={{...styles.flexDirectionRow}}>
          <SimpleFontIcon
            style={{
              ...styles.padding0,
              ...styles.colorGreen,
              marginTop: -15,
            }}
            icon={'url(../../../images/SvgSymbol/1F600.svg)'}
            kind={'large'}
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
          <SimpleText
            style={{...styles.BlueBold, ...styles.marginTop15}}
            text={Translate.refCode + ' : ' + props.refCode}
          />
          <PhoneView>
            <CommonButton title={Translate.payGive} theme={'dark'} />
          </PhoneView>
        </MyView>
        <SimpleText
          text={Translate.buyerName + ' ' + props.buyerName}
          style={{...styles.BlueBold, ...styles.marginTop50}}
        />
        {props.link !== undefined && props.link}
        {props.onBack !== undefined && (
          <SimpleText
            onPress={() => props.onBack()}
            style={{...styles.colorOrange, ...styles.FontWeight600}}
            text={Translate.showHome}
          />
        )}

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
