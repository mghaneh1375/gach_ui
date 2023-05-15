import React from 'react';

import {
  faHourglassEnd,
  faHourglassStart,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';
import QuizItemCard from '../../../../../components/web/QuizItemCard';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {
  styleCard,
  styleItemsGrandParent,
  styleItemsParent,
  styleTitle,
  styleYellowBox,
} from '../../../../panel/package/card/Style';
import commonTranslator from '../../../../../translator/Common';
import {convertTimestamp, getDevice} from '../../../../../services/Utility';
import Translate from '../../../../schoolPanel/MyHWs/components/Translator';

function Card(props) {
  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const fontSize = isInPhone ? 10 : 11;

  return (
    <CommonWebBox style={{...styleCard, ...styles.BlueBold}}>
      <MyView
        style={{
          ...styleYellowBox,
          ...styles.BlueBold,
        }}>
        <SimpleText
          style={{
            ...styleTitle,
            ...styles.BlueBold,
          }}
          text={props.quiz.title}
        />
      </MyView>
      <MyView style={{...styleItemsGrandParent, ...styles.gap15}}>
        <MyView>
          <PhoneView
            style={{
              ...styleItemsParent,
              ...styles.gap10,
            }}>
            <QuizItemCard
              text={Translate.start}
              val={convertTimestamp(props.quiz.start)}
              icon={faHourglassStart}
              textFontSize={fontSize}
              valFontSize={fontSize}
            />
            <QuizItemCard
              text={Translate.end}
              val={convertTimestamp(props.quiz.end)}
              icon={faHourglassEnd}
              textFontSize={fontSize}
              valFontSize={fontSize}
            />

            <QuizItemCard
              val={
                props.quiz.status !== undefined &&
                props.quiz.status !== 'finished'
                  ? props.quiz.status === 'waitForResult'
                    ? Translate.waitForResult
                    : props.quiz.status === 'notStart'
                    ? Translate.notStart
                    : Translate.inProgress
                  : Translate.resultReady
              }
              valFontSize={fontSize}
            />

            {props.quizOp !== undefined &&
              props.quiz.status !== undefined &&
              props.quiz.status !== 'inProgress' && (
                <CommonButton
                  padding={isInPhone ? '5px 5px' : undefined}
                  textStyle={
                    isInPhone
                      ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                      : {}
                  }
                  title={commonTranslator.op}
                  onPress={() => props.quizOp()}
                />
              )}

            {props.quizOp !== undefined &&
              props.quiz.status !== undefined &&
              props.quiz.status == 'inProgress' && (
                <CommonButton
                  padding={isInPhone ? '5px 5px' : undefined}
                  textStyle={
                    isInPhone
                      ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                      : {}
                  }
                  title={Translate.startHW}
                  onPress={() => props.quizOp()}
                />
              )}
          </PhoneView>
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default Card;
