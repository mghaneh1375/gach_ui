import React from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from './../../../../../styles/Common';
import Translate from './Translate';
import commonTranslator from '../../../../../tranlates/Common';
import {
  styleCommonWebBoxView,
  styleTitle,
  styleDigest,
  styleItemsParent,
  styleItem,
  styleItemsGrandParent,
  styleCard,
  stylePricaPane,
  styleYellowBox,
} from './../../../package/card/Style';
import {convertTimestamp} from '../../../../../services/Utility';
import {launchModeKeyVals, kindQuizKeyVals} from '../KeyVals';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {faPlug} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';
import QuizItemCard from '../../../../../components/web/QuizItemCard';

function Card(props) {
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
      <MyView style={{...styleItemsGrandParent}}>
        <PhoneView style={{...styleItemsParent, ...styles.gap15}}>
          {props.quiz.reminder !== undefined && (
            <QuizItemCard
              text={Translate.reminder}
              val={props.quiz.reminder}
              icon={faPlug}
              textFontSize={11}
              valFontSize={15}
            />
          )}
          <QuizItemCard
            text={Translate.kind}
            val={kindQuizKeyVals.find(elem => elem.id === props.quiz.mode).item}
            icon={faPlug}
            textFontSize={11}
            valFontSize={15}
          />
          <QuizItemCard
            text={Translate.isOnline}
            val={
              launchModeKeyVals.find(elem => elem.id === props.quiz.launchMode)
                .item
            }
            icon={faPlug}
            textFontSize={11}
            valFontSize={15}
          />
          {props.quiz.studentsCount !== undefined && (
            <QuizItemCard
              text={Translate.studentsCount}
              val={props.quiz.studentsCount}
              icon={faPlug}
              textFontSize={11}
              valFontSize={15}
            />
          )}
          {props.quiz.visibility !== undefined && (
            <QuizItemCard
              text={commonTranslator.visibility + ':'}
              val={props.quiz.visibility ? 'قابل رویت' : 'مخفی'}
              icon={faPlug}
              textFontSize={11}
              valFontSize={15}
            />
          )}
        </PhoneView>
        <MyView>
          <PhoneView
            style={{
              ...styleItemsParent,
              ...styles.gap15,
              ...styles.marginTop20,
            }}>
            <QuizItemCard
              text={Translate.startLaunching}
              val={convertTimestamp(props.quiz.start)}
              icon={faPlug}
              textFontSize={11}
              valFontSize={11}
            />
            <QuizItemCard
              text={Translate.endLaunching}
              val={convertTimestamp(props.quiz.end)}
              icon={faPlug}
              textFontSize={11}
              valFontSize={11}
            />
            <QuizItemCard
              text={Translate.startRegistery}
              val={convertTimestamp(props.quiz.startRegistry)}
              icon={faPlug}
              textFontSize={11}
              valFontSize={11}
            />
            <QuizItemCard
              text={Translate.endRegistery}
              val={convertTimestamp(props.quiz.endRegistry)}
              icon={faPlug}
              textFontSize={11}
              valFontSize={11}
            />
          </PhoneView>
        </MyView>
      </MyView>

      <MyView>
        <PhoneView style={{...stylePricaPane}}>
          {!props.isAdmin && (
            <PhoneView>
              <SimpleText style={{...styles.BlueBold}} text={Translate.price} />
              <SimpleText
                style={{...styles.BlueBold}}
                text={props.quiz.price + ' تومان'}
              />
            </PhoneView>
          )}
          <PhoneView>
            <CommonButton
              onPress={() => props.onClick(props.quiz.id)}
              theme={
                props.quiz.isSelected !== undefined && props.quiz.isSelected
                  ? 'yellow'
                  : 'yellow-transparent'
              }
              title={
                props.quiz.isSelected !== undefined && props.quiz.isSelected
                  ? commonTranslator.selected
                  : commonTranslator.select
              }
            />
          </PhoneView>
        </PhoneView>
        {props.quiz.tags !== undefined && props.quiz.tags.length > 0 && (
          <MyView
            style={{
              ...styleDigest,
            }}>
            <SimpleText
              style={{...styles.fontSize15, ...styles.BlueBold}}
              text={'# ' + props.quiz.tags.join(' - ')}
            />
          </MyView>
        )}
      </MyView>
    </CommonWebBox>
  );
}

export default Card;
