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
        text={props.code === '' ? Translate.intelOffs : Translate.offsCode}
      />
      <PhoneView style={{...styles.gap50}}>
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
          val={props.expiredAt}
          icon={faTimesCircle}
          background={false}
          textFontSize={11}
          valFontSize={15}
          color={'orange'}
        />
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
          {props.code !== '' ? (
            <SimpleText
              style={{
                ...styleTitle,
                ...styles.BlueBold,
              }}
              text={Translate.amount + ' : ' + props.amount + Translate.price}
            />
          ) : (
            <SimpleText
              style={{
                ...styleTitle,
                ...styles.BlueBold,
              }}
              text={Translate.percent + ' ' + props.amount}
            />
          )}
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
        text={props.code === '' ? Translate.penPercent : Translate.penCode}
      />
    </CommonWebBox>
  );
}

export default OffsCard;
