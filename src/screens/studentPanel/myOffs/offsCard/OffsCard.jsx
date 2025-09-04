import React from 'react';
import {faBuilding, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import QuizItemCard from '../../../../components/web/QuizItemCard.jsx';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '@/styles';
import {styles} from '../../../../styles/common/styles';
import {
  styleCard,
  styleTitle,
  styleYellowBox,
} from '../../../panel/package/card/style';
import Translate from '../translate';
function GiftOffsCard(props) {
  return (
    <CommonWebBox
      style={{
        ...styleCard,
        ...styles.BlueBold,
        ...styles.padding10,
      }}>
      <SimpleText
        style={{
          ...styles.BlueBold,
          ...styles.fontSize15,
          ...styles.paddingRight15,
        }}
        text={
          props.code === ''
            ? Translate.intelOffs
            : props.title === undefined || props.title.length === 0
            ? 'کد تخفیف'
            : props.title.indexOf('ایکس') !== -1
            ? 'شارژ ایکس پول'
            : props.title.indexOf('اعتبار') !== -1
            ? 'شارژ اعتبار'
            : props.title
        }
      />
      <PhoneView>
        <EqualTwoTextInputs
          style={{
            ...styles.gap30,
          }}>
          <QuizItemCard
            text={Translate.placeUse}
            val={props.placeUse}
            icon={faBuilding}
            background={false}
            textFontSize={11}
            valFontSize={15}
            color={'orange'}
          />
          <QuizItemCard
            text={Translate.expiredAt}
            val={props.expiredAt === undefined ? '' : props.expiredAt}
            icon={faTimesCircle}
            background={false}
            textFontSize={11}
            valFontSize={15}
            color={'orange'}
          />
          <QuizItemCard
            text={Translate.createdAt}
            val={props.createdAt === undefined ? '' : props.createdAt}
            icon={faTimesCircle}
            background={false}
            textFontSize={11}
            valFontSize={15}
            color={'orange'}
          />
        </EqualTwoTextInputs>
      </PhoneView>
      <EqualTwoTextInputs
        style={{
          width: '100%',
          gap: 0,
        }}>
        <PhoneView
          style={{
            ...styleYellowBox,
            ...styles.BlueBold,
            ...styles.margin0,
            boxShadow: '1px 1px 20px 0px #bebebe',
            width: props.code !== '' ? '60%' : '100%',
          }}>
          <SimpleText
            style={{
              ...styleTitle,
              ...styles.BlueBold,
            }}
            text={
              props.amount === undefined
                ? props.amount
                : props.type === 'money' ||
                  props.type === 'value' ||
                  (props.subType !== undefined && props.subType === 'value')
                ? Translate.amount +
                  ' : ' +
                  (props.amount.indexOf('تومان') === -1
                    ? props.amount + ' تومان'
                    : props.amount)
                : props.type === 'coin'
                ? Translate.amount +
                  ' : ' +
                  (props.amount.indexOf('ایکس') === -1
                    ? props.amount + Translate.xMoney
                    : props.amount)
                : ' ' + props.amount + ' ' + Translate.percent
            }
          />
        </PhoneView>
        {props.code && (
          <PhoneView
            style={{
              ...styleYellowBox,
              ...styles.BlueBold,
              ...styles.margin0,
              boxShadow: '1px 1px 20px 0px #bebebe',
              width: '40%',
            }}>
            <SimpleText
              style={{
                ...styleTitle,
                ...styles.BlueBold,
              }}
              text={Translate.offsCode + ' : '}
            />
            <SimpleText
              style={{
                ...styleTitle,
                ...styles.BlueBold,
              }}
              text={props.code}
            />
          </PhoneView>
        )}
      </EqualTwoTextInputs>
      <SimpleText
        style={{
          ...styles.BlueBold,
          ...styles.fontSize10,
          marginTop: -10,
        }}
        text={
          props.code === ''
            ? Translate.penPercent
            : props.title
            ? ''
            : Translate.penCode
        }
      />
    </CommonWebBox>
  );
}
export default GiftOffsCard;
