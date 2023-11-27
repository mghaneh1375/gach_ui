import React, {useState} from 'react';
import {
  faNewspaper,
  faPaperPlane,
  faQuestion,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import QuizItemCard from '../../../components/web/QuizItemCard';
import {formatPrice} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import translator from '../../advisorPanel/MyFinancePlans/components/Translator';

function FinancePlan(props) {
  const [showMore, setShowMore] = useState(false);

  return (
    <CommonWebBox width={props.isInPhone ? 'calc(100% - 60px)' : 480}>
      <MyView
        style={{paddingRight: 10, ...styles.gap15, ...styles.marginTop10}}>
        <MyView
          style={{
            ...styles.justifyContentCenter,
            ...styles.paddingRight15,
            backgroundColor: vars.YELLOW_WHITE,
            borderRadius: 5,
            height: 40,
            marginRight: 0,
          }}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={props.plan.title}
          />
        </MyView>
        {props.plan.description !== undefined && props.plan.description !== '' && (
          <MyView
            style={{
              minHeight: showMore ? 260 : 70,
              maxHeight: showMore ? 'unset' : 70,
            }}>
            <SimpleText
              style={{
                ...styles.dark_blue_color,
                ...{
                  maxHeight: showMore ? 'unset' : 50,
                  overflow: showMore ? 'unset' : 'hidden',
                },
              }}
              text={'توضیحات: ' + props.plan.description}
            />
            {showMore && (
              <SimpleText
                style={{
                  ...styles.yellow_color,
                  ...styles.alignSelfEnd,
                  ...styles.cursor_pointer,
                }}
                text={'نمایش کمتر'}
                onPress={() => setShowMore(false)}
              />
            )}

            {!showMore && (
              <SimpleText
                style={{
                  ...styles.yellow_color,
                  ...styles.alignSelfEnd,
                  ...styles.cursor_pointer,
                }}
                text={'نمایش بیشتر'}
                onPress={() => setShowMore(true)}
              />
            )}
          </MyView>
        )}

        {!showMore && (
          <>
            <PhoneView style={{...styles.gap15}}>
              <QuizItemCard
                text={translator.maxKarbarg}
                val={
                  props.plan.maxKarbarg === -1
                    ? 'نامحدود'
                    : props.plan.maxKarbarg
                }
                icon={faNewspaper}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />
              <QuizItemCard
                text={translator.maxVideoCalls}
                val={props.plan.videoCalls}
                icon={faVideo}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />

              <QuizItemCard
                text={translator.maxChat}
                val={props.plan.maxChat === -1 ? 'نامحدود' : props.plan.maxChat}
                icon={faPaperPlane}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />

              <QuizItemCard
                text={translator.maxExam}
                val={props.plan.maxChat === -1 ? 'نامحدود' : props.plan.maxChat}
                icon={faQuestion}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={false}
              />
            </PhoneView>

            <EqualTwoTextInputs>
              <MyView>
                <SimpleText
                  style={{...styles.BlueBold, ...styles.fontSize17}}
                  text={formatPrice(props.plan.price) + ' تومان'}
                />

                <SimpleText
                  style={{...styles.dark_blue_color, ...styles.fontSize13}}
                  text={translator.price}
                />
              </MyView>
              {props.onSelect !== undefined && (
                <CommonButton
                  onPress={() => props.onSelect()}
                  theme={'yellow'}
                  title={'انتخاب برنامه'}
                />
              )}
            </EqualTwoTextInputs>
            {props.plan.videoLink && (
              <MyView>
                <SimpleText text="برای مشاهده جزئیات بیشتر روی لینک زیر کلیک کنید" />
                <a target="_blank" href={props.plan.videoLink}>
                  توضیحات بیشتر
                </a>
              </MyView>
            )}
            {(props.plan.videoLink === undefined ||
              props.plan.videoLink === '') && (
              <MyView style={{height: 40}}></MyView>
            )}
          </>
        )}
      </MyView>
    </CommonWebBox>
  );
}

export default FinancePlan;
