import React, {useMemo} from 'react';
import {
  faHourglassEnd,
  faHourglassStart,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '@/styles/common/styles';
import QuizItemCard from '@/components/web/QuizItemCard.jsx';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import {
  styleCard,
  styleItemsGrandParent,
  styleItemsParent,
  styleTitle,
  styleYellowBox,
} from '../../../../panel/package/card/style';
import {convertTimestamp, getDevice} from '@/services/utility';
import Translate from '../../../../schoolPanel/myHWs/components/translator';
function Card(props) {
  const isInPhone = useMemo(() => {
    return getDevice().indexOf('WebPort') !== -1;
  }, []);
  const fontSize = isInPhone ? 10 : 11;
  return (
    <CommonWebBox
      style={{
        ...styleCard,
        ...styles.BlueBold,
      }}>
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
      <MyView
        style={{
          ...styleItemsGrandParent,
          ...styles.gap15,
        }}>
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

            {props.quiz.status !== undefined &&
              props.quiz.status === 'notStart' && (
                <QuizItemCard val={Translate.notStart} valFontSize={fontSize} />
              )}

            {props.quizOp !== undefined &&
              props.quiz.status !== undefined &&
              props.quiz.status !== 'inProgress' && (
                <CommonButton
                  padding={isInPhone ? '5px 5px' : undefined}
                  textStyle={
                    isInPhone
                      ? {
                          fontSize: 14,
                          paddingLeft: 20,
                          paddingRight: 20,
                        }
                      : {}
                  }
                  title={Translate.startHW}
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
                      ? {
                          fontSize: 14,
                          paddingLeft: 20,
                          paddingRight: 20,
                        }
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
