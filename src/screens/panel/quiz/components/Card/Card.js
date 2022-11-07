import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from './../../../../../styles/Common';
import Translate from './Translate';
import commonTranslator from '../../../../../translator/Common';
import {
  styleTitle,
  styleDigest,
  styleItemsParent,
  styleItemsGrandParent,
  styleCard,
  stylePricaPane,
  styleYellowBox,
} from './../../../package/card/Style';
import {
  convertSecToMinWithOutSec,
  convertTimestamp,
  formatPrice,
} from '../../../../../services/Utility';
import {launchModeKeyVals, kindQuizKeyVals} from '../KeyVals';
import {
  faClock,
  faListNumeric,
  faPlug,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';
import QuizItemCard from '../../../../../components/web/QuizItemCard';

function Card(props) {
  const [showMore, setShowMore] = useState(false);
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
        {!showMore && (
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
            {props.quiz.mode !== undefined && (
              <QuizItemCard
                text={Translate.kind}
                val={
                  kindQuizKeyVals.find(elem => elem.id === props.quiz.mode).item
                }
                icon={faPlug}
                textFontSize={11}
                valFontSize={15}
              />
            )}
            {props.quiz.launchMode !== undefined && (
              <QuizItemCard
                text={Translate.isOnline}
                val={
                  launchModeKeyVals.find(
                    elem => elem.id === props.quiz.launchMode,
                  ).item
                }
                icon={faPlug}
                textFontSize={11}
                valFontSize={15}
              />
            )}

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
            {props.quiz.duration !== undefined && (
              <QuizItemCard
                text={Translate.duration + ':'}
                val={convertSecToMinWithOutSec(props.quiz.duration)}
                icon={faClock}
                textFontSize={11}
                valFontSize={15}
              />
            )}
            {props.quiz.questionsCount !== undefined && (
              <QuizItemCard
                text={Translate.questionsCount + ':'}
                val={props.quiz.questionsCount}
                icon={faListNumeric}
                textFontSize={11}
                valFontSize={15}
              />
            )}

            {props.quiz.timeReminder !== undefined && (
              <QuizItemCard
                text={Translate.timeReminder}
                val={convertSecToMinWithOutSec(props.quiz.timeReminder)}
                icon={faStopwatch}
                textFontSize={11}
                valFontSize={11}
              />
            )}
          </PhoneView>
        )}

        <MyView>
          {!showMore && (
            <PhoneView
              style={{
                ...styleItemsParent,
                ...styles.gap10,
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

              {props.quiz.status !== undefined &&
                props.quiz.status !== 'finished' && (
                  <QuizItemCard
                    text={''}
                    val={
                      props.quiz.status === 'waitForResult'
                        ? Translate.waitForResult
                        : props.quiz.status === 'notStart'
                        ? Translate.notStart
                        : ''
                    }
                    valFontSize={11}
                  />
                )}

              {((props.quiz.status !== undefined &&
                props.quiz.status !== 'inProgress' &&
                props.quiz.status !== 'continue') ||
                (props.isStudent !== undefined && !props.isStudent)) && (
                <CommonButton
                  title={commonTranslator.op}
                  onPress={() => props.quizOp()}
                />
              )}
              {props.quiz.status !== undefined &&
                props.quiz.status === 'inProgress' && (
                  <CommonButton
                    title={commonTranslator.start}
                    onPress={() => props.quizOp()}
                  />
                )}
              {props.quiz.status !== undefined &&
                props.quiz.status === 'continue' && (
                  <CommonButton
                    title={'ادامه آزمون'}
                    onPress={() => props.quizOp()}
                  />
                )}
            </PhoneView>
          )}
        </MyView>

        <MyView>
          {props.quiz.description !== undefined &&
            props.quiz.description !== '' && (
              <MyView>
                <SimpleText
                  style={{
                    minHeight: 40,
                    maxHeight: showMore ? 150 : 40,
                    width: '100%',
                    overflow: 'hidden',
                    lineHeight: 20,
                    textOverflow: showMore ? 'unset' : 'ellipsis',
                    whiteSpace: showMore ? 'break-spaces' : 'nowrap',
                  }}
                  text={props.quiz.description}
                />
                <SimpleText
                  onPress={() => setShowMore(!showMore)}
                  style={{
                    ...styles.colorOrange,
                    ...styles.cursor_pointer,
                    ...styles.alignSelfEnd,
                  }}
                  text={
                    !showMore
                      ? commonTranslator.showMore
                      : commonTranslator.showLess
                  }
                />
              </MyView>
            )}

          {props.quiz.description !== undefined &&
            props.quiz.description === '' && (
              <SimpleText style={{minHeight: 62}} />
            )}
        </MyView>
      </MyView>

      <MyView>
        {props.quiz.price !== undefined && (
          <PhoneView style={{...stylePricaPane}}>
            {!props.isAdmin && (
              <PhoneView>
                <SimpleText
                  style={{...styles.BlueBold}}
                  text={Translate.price}
                />
                <SimpleText
                  style={{...styles.BlueBold}}
                  text={
                    props.quiz.price > 0
                      ? formatPrice(props.quiz.price) + ' تومان'
                      : 'رایگان'
                  }
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
        )}
        {props.onSelect !== undefined && (
          <CommonButton
            onPress={() => props.onSelect(props.quiz.id)}
            theme={
              props.quiz.isSelected !== undefined && props.quiz.isSelected
                ? 'yellow'
                : 'yellow-transparent'
            }
            title={props.selectText}
          />
        )}

        <MyView
          style={{
            ...styleDigest,
          }}>
          <SimpleText
            style={
              props.quiz.tags !== undefined && props.quiz.tags.length > 0
                ? {...styles.fontSize15, ...styles.BlueBold, ...styles.margin5}
                : {
                    ...styles.fontSize15,
                    ...styles.BlueBold,
                    ...styles.margin5,
                    ...{visibility: 'hidden'},
                  }
            }
            text={
              props.quiz.tags !== undefined && props.quiz.tags.length > 0
                ? '# ' + props.quiz.tags.join(' - ')
                : 'salam'
            }
          />
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default Card;
