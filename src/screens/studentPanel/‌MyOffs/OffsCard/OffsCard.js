import {faBuilding, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import QuizItemCard from '../../../../components/web/QuizItemCard';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import {
  styleCard,
  styleTitle,
  styleYellowBox,
} from '../../../panel/package/card/Style';
import Translate from '../Translate';

function OffsCard(props) {
  return (
    <CommonWebBox
      style={{...styleCard, ...styles.BlueBold, ...styles.padding10}}>
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
            : props.title
        }
      />
      <PhoneView>
        <EqualTwoTextInputs style={{...styles.gap30}}>
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
      <EqualTwoTextInputs style={{width: '100%', gap: 0}}>
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
                ? Translate.amount + ' : ' + props.amount + ' تومان'
                : props.type === 'coin'
                ? Translate.amount + ' : ' + props.amount + Translate.xMoney
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

export default OffsCard;
