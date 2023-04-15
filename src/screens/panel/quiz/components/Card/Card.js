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
  styleCircleBox,
  styleColorWhite,
} from './../../../package/card/Style';
import {
  convertSecToMinWithOutSec,
  convertTimestamp,
  formatPrice,
  getDevice,
} from '../../../../../services/Utility';
import {launchModeKeyVals, kindQuizKeyVals} from '../KeyVals';
import {
  faClock,
  faCog,
  faHourglassEnd,
  faHourglassStart,
  faInfo,
  faListNumeric,
  faPlug,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';
import QuizItemCard from '../../../../../components/web/QuizItemCard';
import {Rating} from 'react-native-ratings';

function Card(props) {
  const [showMore, setShowMore] = useState(false);

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const fontSize = isInPhone ? 10 : 11;
  const valFontSize = isInPhone ? 12 : 15;

  return (
    <CommonWebBox style={{...styleCard, ...styles.BlueBold}}>
      <MyView
        style={
          props.quiz.backColor !== undefined
            ? {
                ...styleYellowBox,
                ...styles.BlueBold,
                ...{
                  backgroundColor: props.quiz.backColor,
                },
              }
            : {
                ...styleYellowBox,
                ...styles.BlueBold,
              }
        }>
        {props.quiz.launchMode === undefined &&
          (props.quizMode === undefined || props.quizMode === 'open') && (
            <MyView
              style={{
                ...styleCircleBox,
              }}>
              <SimpleText
                style={
                  props.quiz.mode !== undefined &&
                  props.quiz.mode === 'tashrihi'
                    ? {
                        ...styleColorWhite,
                        ...styles.BlueBold,
                        ...styles.fontSize11,
                        ...styles.textCenter,
                      }
                    : {...styleColorWhite, ...styles.BlueBold}
                }
                text={
                  props.quiz.mode !== undefined &&
                  props.quiz.mode === 'tashrihi'
                    ? 'آزمون تشریحی'
                    : 'آزمون باز'
                }
              />
            </MyView>
          )}

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
                textFontSize={fontSize}
                valFontSize={valFontSize}
              />
            )}
            {props.quiz.mode !== undefined && (
              <QuizItemCard
                text={Translate.kind}
                val={
                  kindQuizKeyVals.find(elem => elem.id === props.quiz.mode).item
                }
                icon={faInfo}
                textFontSize={fontSize}
                valFontSize={valFontSize}
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
                icon={faCog}
                textFontSize={fontSize}
                valFontSize={valFontSize}
              />
            )}

            {props.quiz.studentsCount !== undefined && (
              <QuizItemCard
                text={Translate.studentsCount}
                val={props.quiz.studentsCount}
                icon={faPlug}
                textFontSize={fontSize}
                valFontSize={valFontSize}
              />
            )}
            {props.quiz.visibility !== undefined && (
              <QuizItemCard
                text={commonTranslator.visibility + ':'}
                val={props.quiz.visibility ? 'قابل رویت' : 'مخفی'}
                icon={faPlug}
                textFontSize={fontSize}
                valFontSize={valFontSize}
              />
            )}
            {props.quiz.duration !== undefined && (
              <QuizItemCard
                text={Translate.duration + ':'}
                val={convertSecToMinWithOutSec(props.quiz.duration)}
                icon={faClock}
                textFontSize={fontSize}
                valFontSize={valFontSize}
              />
            )}
            {props.quiz.questionsCount !== undefined && (
              <QuizItemCard
                text={Translate.questionsCount + ':'}
                val={props.quiz.questionsCount}
                icon={faListNumeric}
                textFontSize={fontSize}
                valFontSize={valFontSize}
              />
            )}

            {props.quiz.timeReminder !== undefined && (
              <QuizItemCard
                text={Translate.timeReminder}
                val={convertSecToMinWithOutSec(props.quiz.timeReminder)}
                icon={faStopwatch}
                textFontSize={fontSize}
                valFontSize={fontSize}
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
                icon={faHourglassStart}
                textFontSize={fontSize}
                valFontSize={fontSize}
              />
              <QuizItemCard
                text={Translate.endLaunching}
                val={convertTimestamp(props.quiz.end)}
                icon={faHourglassEnd}
                textFontSize={fontSize}
                valFontSize={fontSize}
              />
              <QuizItemCard
                text={Translate.startRegistery}
                val={convertTimestamp(props.quiz.startRegistry)}
                icon={faPlug}
                textFontSize={fontSize}
                valFontSize={fontSize}
              />
              <QuizItemCard
                text={Translate.endRegistery}
                val={convertTimestamp(props.quiz.endRegistry)}
                icon={faPlug}
                textFontSize={fontSize}
                valFontSize={fontSize}
              />

              {props.afterQuiz !== undefined && props.afterQuiz && (
                <QuizItemCard
                  text={''}
                  val={
                    props.quiz.status !== undefined &&
                    props.quiz.status !== 'finished'
                      ? props.quiz.status === 'waitForResult'
                        ? Translate.waitForResult
                        : props.quiz.status === 'notStart'
                        ? Translate.notStart
                        : ''
                      : Translate.resultReady
                  }
                  valFontSize={fontSize}
                />
              )}

              {props.quiz.rate !== undefined && (
                <PhoneView style={{width: '100%', direction: 'ltr'}}>
                  <Rating
                    type="star"
                    readonly={true}
                    ratingCount={5}
                    imageSize={30}
                    fractions={2}
                    style={{
                      direction: 'ltr',
                    }}
                    startingValue={props.quiz.rate}
                  />
                </PhoneView>
              )}

              {((props.quizOp !== undefined &&
                props.quiz.status !== undefined &&
                props.quiz.status !== 'inProgress' &&
                props.quiz.status !== 'continue') ||
                (props.isStudent !== undefined && !props.isStudent)) && (
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
              {props.quiz.status !== undefined &&
                props.quiz.status === 'inProgress' && (
                  <CommonButton
                    padding={isInPhone ? '5px 5px' : undefined}
                    textStyle={
                      isInPhone
                        ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                        : {}
                    }
                    title={
                      props.quiz.startAt !== undefined
                        ? 'ادامه آزمون'
                        : commonTranslator.start
                    }
                    onPress={() => props.quizOp()}
                  />
                )}
              {props.quiz.status !== undefined &&
                props.quiz.status === 'continue' && (
                  <CommonButton
                    padding={isInPhone ? '5px 5px' : undefined}
                    textStyle={
                      isInPhone
                        ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                        : {}
                    }
                    title={'ادامه آزمون'}
                    onPress={() => props.quizOp()}
                  />
                )}
              {props.ticketHref !== undefined && (
                <CommonButton
                  padding={isInPhone ? '5px 5px' : undefined}
                  textStyle={
                    isInPhone
                      ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                      : {}
                  }
                  theme={'dark'}
                  title={commonTranslator.ticket}
                  onPress={() => window.open(props.ticketHref)}
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
            props.quiz.description === '' &&
            !isInPhone && <SimpleText style={{minHeight: 62}} />}
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
                padding={isInPhone ? '5px 5px' : undefined}
                textStyle={
                  isInPhone
                    ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                    : {}
                }
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
            padding={isInPhone ? '5px 5px' : undefined}
            textStyle={
              isInPhone ? {fontSize: 14, paddingLeft: 20, paddingRight: 20} : {}
            }
            theme={
              props.quiz.isSelected !== undefined && props.quiz.isSelected
                ? 'yellow'
                : 'yellow-transparent'
            }
            title={props.selectText}
          />
        )}

        {(props.quiz.status !== 'inProgress' ||
          props.quiz.launchMode === undefined) &&
          (!isInPhone ||
            (props.quiz.tags !== undefined && props.quiz.tags.length > 0)) && (
            <MyView
              style={{
                ...styleDigest,
              }}>
              <SimpleText
                style={
                  props.quiz.tags !== undefined && props.quiz.tags.length > 0
                    ? {
                        ...styles.fontSize15,
                        ...styles.BlueBold,
                        ...styles.margin5,
                      }
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
          )}
      </MyView>
    </CommonWebBox>
  );
}

export default Card;
