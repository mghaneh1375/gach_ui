import React, {useState} from 'react';
import {
  faClockRotateLeft,
  faNewspaper,
  faPaperPlane,
  faQuestion,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import QuizItemCard from '../../../../components/web/QuizItemCard';
import vars from '../../../../styles/root';
import translator from '../../../../screens/advisorPanel/MyFinancePlans/components/Translator';
import Circle from '../../../../components/web/Circle';
import {Image} from 'react-native';
import {Rating} from 'react-native-ratings';

function MyAdvisorFinancePlan(props) {
  const [pic, setPic] = useState();

  React.useEffect(() => {
    setPic(props.data.pic);
  }, [props.data.pic]);

  return (
    <CommonWebBox width={'100%'}>
      <MyView
        style={{paddingRight: 10, ...styles.gap15, ...styles.marginTop10}}>
        <EqualTwoTextInputs
          style={{
            ...styles.alignItemsCenter,
            ...styles.paddingRight15,
            backgroundColor: vars.YELLOW_WHITE,
            borderRadius: 5,
            height: 40,
            marginRight: 0,
          }}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={props.plan?.title}
          />

          <PhoneView
            style={{
              ...styles.positionAbsolute,
              top: -5,
              left: 15,
              ...styles.gap15,
            }}>
            <SimpleText
              style={{...styles.colorDarkBlue, ...styles.alignSelfCenter}}
              text={'امتیاز'}
            />
            <Circle
              diameter={50}
              text={props.data.rate === 0 ? '-' : props.data.rate}
              color={vars.WHITE}
              backgroundColor={vars.ORANGE_RED}
            />
          </PhoneView>
        </EqualTwoTextInputs>

        <EqualTwoTextInputs>
          <PhoneView style={{...styles.gap30}}>
            <MyView
              style={{
                ...styles.marginTop20,
                ...{
                  border: '4px solid',
                  borderColor: vars.ORANGE,
                  borderRadius: 7,
                  padding: 3,
                },
              }}>
              <Image
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                source={pic}
              />
            </MyView>

            <MyView
              style={{
                ...styles.gap10,
                ...styles.marginTop20,
                ...styles.width100,
              }}>
              <SimpleText
                style={{
                  ...styles.BlueBold,
                  ...styles.fontSize15,
                }}
                text={props.data.name}
              />

              {props.plan !== undefined && (
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
                      val={
                        props.plan.maxChat === -1
                          ? 'نامحدود'
                          : props.plan.maxChat
                      }
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
                      val={
                        props.plan.maxChat === -1
                          ? 'نامحدود'
                          : props.plan.maxChat
                      }
                      icon={faQuestion}
                      background={false}
                      iconFontSize={'normal'}
                      color={vars.YELLOW}
                      textFontSize={14}
                      valFontSize={14}
                      isBold={false}
                    />
                  </PhoneView>
                  <QuizItemCard
                    text={translator.startEnd}
                    val={
                      props.plan.createdAt.split('-')[0] +
                      ' تا ' +
                      props.plan.finishAt.split('-')[0]
                    }
                    icon={faClockRotateLeft}
                    background={false}
                    iconFontSize={'normal'}
                    color={vars.YELLOW}
                    textFontSize={14}
                    valFontSize={14}
                    isBold={false}
                  />
                </>
              )}
            </MyView>
          </PhoneView>

          {props.setRate !== undefined && (
            <MyView
              style={
                props.isInPhone
                  ? {...styles.marginTop10}
                  : {...styles.justifyContentSpaceBetween}
              }>
              <PhoneView
                style={{
                  ...styles.alignSelfEnd,
                  ...styles.alignItemsCenter,
                  ...styles.gap10,
                  ...styles.marginLeft15,
                }}>
                <SimpleText
                  style={{...styles.dark_blue_color}}
                  text={'امتیاز شما به مشاور'}
                />
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={30}
                  fractions={0}
                  onFinishRating={rating => props.setRate(rating)}
                  style={{
                    direction: 'ltr',
                    cursor: 'pointer',
                  }}
                  startingValue={props.rate}
                />
              </PhoneView>

              <PhoneView style={{...styles.alignSelfEnd}}>
                {props.onRemove !== undefined && (
                  <CommonButton
                    theme={'orangeRed'}
                    onPress={() => props.onRemove()}
                    title={'حذف مشاور'}
                  />
                )}
                <CommonButton
                  onPress={() =>
                    window.open(
                      '/ticket?section=advisor&userId=' + props.data.id,
                    )
                  }
                  title={'صحبت با مشاور'}
                />
              </PhoneView>
            </MyView>
          )}
        </EqualTwoTextInputs>

        {props.plan?.description !== undefined &&
          props.plan?.description.length > 0 && (
            <SimpleText
              style={{
                ...styles.dark_blue_color,
              }}
              text={'توضیحات: ' + props.plan.description}
            />
          )}
      </MyView>
    </CommonWebBox>
  );
}

export default MyAdvisorFinancePlan;
